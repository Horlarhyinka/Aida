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
from .models import UserProfileSchema, EmergencyReport
from api.util.token import generate_user_token, get_token_user_id
from api.auth.user import authenticate_user, IsAuthenticated
from werkzeug.security import generate_password_hash
from bson import ObjectId
from api.firestore import firestore_db, firestore 

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
        return Response(response, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def respond_to_emergency(self):
    data = self.data

    volunteer_id = data["volunteer_id"]
    emergency_id = data["emergency_id"]
    
    try:
        volunteer = client["aida-db"]["volunteers"].find_one({"_id":ObjectId(volunteer_id)})
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)


    try:
        emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
        if emergency_ref.get().exists:
            return Response({"error": "Emergency report not found"}, status=status.HTTP_404_NOT_FOUND))
    except Exception as e:
        return Response({"error":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

    emergency_ref.collection('responders').add(volunteer) 
    return Response({"message":"Emergency responded successfully"}, status=status.HTTP_200_OK)


def create_chat(emergency_id):
    report = client["aida-db"]["EmergencyReport"]
    if not report.find_one({"_id":ObjectId(emergency_id)}):
        return None
    
    emergency_ref = firestore_db.collection("emergency_collection").document(emergency_id)
    emergency_ref.collection('chat_messages').add({"message": "Emergency Reported!"})
    emergency_ref.collection('responders')
