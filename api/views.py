from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# Rest imports 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

# dependency imports
from . mongo_client import mongodb_client
from .models import UserProfileSchema, EmergencyReport, ChatMessage
from api.util.token import generate_user_token, get_token_user_id
from api.auth.user import authenticate_user, IsAuthenticated
from werkzeug.security import generate_password_hash
from bson import ObjectId
from api.firestore import firestore_db, firestore 
from datetime import datetime

client = mongodb_client

@api_view(['GET'])
def index(self):
    if not IsAuthenticated(self):
        return Response({"error":"Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user_id = get_token_user_id(self)
    except:
        return Response({"error":"Token not found"}, status=status.HTTP_401_UNAUTHORIZED)
    vol_collection = client["aida-db"]["volunteers"]
    user = vol_collection.find_one({"_id":ObjectId(user_id)})
    if not user:
        return Response({"error":"User not found"})
    user["_id"] = str(user["_id"])
    data = {
            "message":"Welcome to Aida",
            "profile": user
            }
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
def register(self):
    #Initialization
    vol_collection = client["aida-db"]["volunteers"]
    data = self.data
    username = data.get("username").lower()
    hashed_password = generate_password_hash(data["password"])
    data["password"] = hashed_password

    # Checks
    if vol_collection.count_documents({"username":username}) != 0:
        return Response({"error":"Username already exists"}, status=status.HTTP_409_CONFLICT)
    elif vol_collection.count_documents({"email":data.get("email")}) != 0:
        return Response({"error":"email already exists"}, status=status.HTTP_409_CONFLICT)

    try:
        validated_user = UserProfileSchema(**data).to_dict()
        vol_collection.insert_one(validated_user).inserted_id
        return Response({"message":"Registered Successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def login(self):
    data = self.data
    if not data['username'] or not data['password']:
        return Response({'message':'Missing data'}, status=status.HTTP_400_BAD_REQUEST)

    user_id= authenticate_user(data["username"], password=data["password"])
    if user_id is None:
        return Response({'message':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    token_data = generate_user_token(user_id)
    
    return Response({"message":"Login Successful","token":token_data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def make_emergency_report(self):
    data = self.data
    response = {
      "message": "Emergency reported successfully.",
      "emergency_id": "abc123"
    }
    try:
        new_report = EmergencyReport(**data)
        report_collection = client["aida-db"]["EmergencyReport"]
        emergency_id = report_collection.insert_one(new_report.to_dict()).inserted_id
        response["emergency_id"] = str(emergency_id)
        create_chat(str(emergency_id))
        return Response(response, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def respond_to_emergency(self, emergency_id):
    data = self.data

    volunteer_id = get_token_user_id(self) # Use jwt to get user info
   
    #Check if volunteer exists
    try:
        volunteer = client["aida-db"]["volunteers"].find_one({"_id":ObjectId(volunteer_id)})
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
    # Check if Emergency exists
    try:
        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
    
    #Add volunteer to emergency responders (All responders are added or are part of the chat automatically) 
    volunteer_id=str(volunteer.pop("_id"))
    volunteer["volunteer_id"] = str(volunteer_id)
    volunteer.pop("password")
    responder = emergency_ref.collection('responders').document(volunteer_id)
    if responder.get().exists:
        return Response({"error":"Volunteer is already a responder"}, status=status.HTTP_404_NOT_FOUND)
    responder.set(volunteer)
    return Response({"message":"Emergency responded successfully"}, status=status.HTTP_200_OK)


def create_chat(emergency_id):
    report = client["aida-db"]["EmergencyReport"]
    if not report.find_one({"_id":ObjectId(emergency_id)}):
        return None
    
    emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
    emergency_ref.collection('chat_messages').add({"message": "Emergency Reported!"})
    emergency_ref.collection('responders')
    return True


@api_view(["GET"])
def get_emergency_report(self, emergency_id):
    try:
        report = client["aida-db"]["EmergencyReport"]
        the_report = report.find_one({"_id":ObjectId(emergency_id)})
        the_report["_id"] = str(the_report['_id'])
        return Response(dict(the_report), status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def responders_list(self, emergency_id):
    try:
        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
        emergency_responders = emergency_ref.collection("responders").stream()

        results = []
        for responder in emergency_responders:
            results.append(responder.to_dict())  # Add document ID
        if not results:
            raise ValueError("Invalid Emergency ID received!")
        return Response(results, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_chat_messages(self, emergency_id):
    try:
        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
        emergency_responders = emergency_ref.collection("chat_messages").stream()
        results = []
        for message in emergency_responders:
            results.append(message.to_dict())
        if not results:
            raise ValueError("Invalid Emergency ID received!")
        return Response(results, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def send_chat_message(self, emergency_id):
    report = client["aida-db"]["EmergencyReport"]
    if not report.find_one({"_id":ObjectId(emergency_id)}):
        return Response({"error":"Invalid Emergency ID received!"}, status=status.HTTP_400_BAD_REQUEST)
    
    emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
    emergency_ref.collection('chat_messages').add({"message": "Emergency Reported!"})
    emergency_ref.collection('responders')
    return Response({"message":"Message sent successfully"}, status=status.HTTP_200_OK)

   

class chat_messages(APIView):
    def get(self, request, emergency_id):
        try:
            emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
            emergency_responders = emergency_ref.collection("chat_messages").stream()
            results = []
            for message in emergency_responders:
                results.append(message.to_dict())
            if not results:
                raise ValueError("Invalid Emergency ID received!")
            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)



    def post(self, request, emergency_id):
        user_id = get_token_user_id(request) 
        
        report = client["aida-db"]["EmergencyReport"]
        if not report.find_one({"_id":ObjectId(emergency_id)}):
            return Response({"error":"Invalid Emergency ID received!"}, status=status.HTTP_400_BAD_REQUEST)

        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
        user_chat = emergency_ref.collection('responders').document(user_id).get()
        if not user_chat.exists:
            return Response({"error":"User not a responder to emergency!"}, status=status.HTTP_400_BAD_REQUEST)

        valid_message = {
                "user_id":user_id,
                "message":request.data["message"],
                "timestamp": str(datetime.now())
                }
        valid_message["sender_name"] = user_chat.to_dict()["username"]
        emergency_ref.collection('chat_messages').add(valid_message)
        
        return Response({"message":"Message sent successfully"}, status=status.HTTP_200_OK)
        
