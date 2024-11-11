from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Rest imports 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

# dependency imports
from . mongo_client import mongodb_client
from .models import UserProfileSchema, EmergencyReport, ChatMessage
from api.util.token import generate_user_token, get_token_user_id
from api.util.location import get_location_from_ip
from api.auth.user import authenticate_user, IsAuthenticated
from api.firestore import firestore_db, firestore 
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime
from ipware import get_client_ip
from werkzeug.security import generate_password_hash
import requests
import os


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
    email = data.get("email").lower()
    password = data["password"]
    if not email or not password:
        return Response({"error": "Email and Password is required"}, status=status.HTTP_404_NOT_FOUND)
    # Checks
    if vol_collection.count_documents({"email":email}) != 0:
        return Response({"error":"Email is already registered"}, status=status.HTTP_409_CONFLICT)

    hashed_password = generate_password_hash(password)
    data["password"] = hashed_password
    try:
        validated_user = UserProfileSchema(**data).to_dict()
        vol_collection.insert_one(validated_user).inserted_id
        return Response({"message":"Registered Successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": "An error occured"}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def login(self):
    data = self.data
    if not data['email'] or not data['password']:
        return Response({'message':'Email and password is required'}, status=status.HTTP_400_BAD_REQUEST)

    user_id= authenticate_user(data["email"], password=data["password"])
    if user_id is None:
        return Response({'message':'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    token_data = generate_user_token(user_id)
    
    return Response({"message":"Login Successful","token":token_data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def make_emergency_report(self):
    data = self.data
    response = {}
    try:
        #Handle uploaded images
        if "image" in data.FILES:
            image_file = data.FILES['image']
            file_path = os.path.join('images', image_file.name)  
            saved_path = default_storage.save(file_path, ContentFile(image_file.read()))
            full_url = default_storage.url(saved_path)
            data["image_url"]= full_url 

        #Handle uploaded audio
        if 'audio_file' in data.FILES:
            audio_file = data.FILES['audio_file']
            file_path = os.path.join('audio', audio_file.name)  # Define a folder within MEDIA_ROOT
            saved_path = default_storage.save(file_path, ContentFile(audio_file.read()))
            full_url = default_storage.url(saved_path)

        #Handle location
        if data.get("location", None) == None or data.get("location", None) == None:
            ip_address = get_client_ip(requests)
            location = get_location_from_ip(ip_address)
            if location:
                data['longitude'] = location['longitude']
                data['latitude'] = location['latitude']
        new_report = EmergencyReport(**data)
        report_collection = client["aida-db"]["EmergencyReport"]
        emergency_id = report_collection.insert_one(new_report.to_dict()).inserted_id
        response["emergency_id"] = str(emergency_id)
        create_chat(str(emergency_id))
        return Response(response, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return Response({"error":"A server error occurred"}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_all_emergencies(self):
#     emergency_collection = firestore_db.collection("emergency_collection").stream()
#     all_emergencies = [item.to_dict() for item in emergency_collection]
    
#     json_data = dumps(all_emergencies)

#     return Response(results, status=status.HTTP_200_OK)

@api_view(['POST'])
def respond_to_emergency(self, emergency_id):
    data = self.data

    volunteer_id = get_token_user_id(self) # Use jwt to get user info
   
    #Check if volunteer exists
    try:
        volunteer = client["aida-db"]["volunteers"].find_one({"_id":ObjectId(volunteer_id)})
    except Exception as e:
        return Response({"error":"An Error occurred"}, status=status.HTTP_400_BAD_REQUEST)
    # Check if Emergency exists
    try:
        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
    except Exception as e:
        print(e)
        return Response({"error":"An Error occurred"}, status=status.HTTP_400_BAD_REQUEST)
    
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
    except Exception:
        return Response({"error":"An error occurred"}, status=status.HTTP_400_BAD_REQUEST)



#Ask AI to analyze the report
@api_view(["GET"])
def ai_response(self, emergency_id):
    try:
        report = client["aida-db"]["EmergencyReport"]

        #!!!!!!!!!!   Emergency Report from MongoDB
        the_report = report.find_one({"_id":ObjectId(emergency_id)})
        #!!!!!!!!!!   Code to analyze the_report
        pass


    except Exception as e:
        return Response({"error":"An Error Occurred."}, status=status.HTTP_400_BAD_REQUEST)


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
        print(e)
        return Response({"error":"An Error occurred"}, status=status.HTTP_400_BAD_REQUEST)

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
        totalCount = len(results) - 1
        return Response({"chat_messages":results, "totalCount":totalCount}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"error":"An error occurred"}, status=status.HTTP_400_BAD_REQUEST)

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
            print(e)
            return Response({"error":"An Error occurred"}, status=status.HTTP_400_BAD_REQUEST)



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


# Pending implementations
# ---------------- Email Verification---------------------

# ---------------- Handling Credential file upload for registration ---------------------

 
