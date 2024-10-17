from http import client
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# Rest imports 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

# dependency imports
from . mongo_client import create_client
from .models import UserProfileSchema
from .tokens import generate_user_token, get_token_user_id
from .auth.user import authenticate_user, IsAuthenticated
from werkzeug.security import generate_password_hash
from bson import ObjectId


@api_view(['GET'])
def index(self):
    if not IsAuthenticated(self):
        return Response({"error":"Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        user_id = get_token_user_id(self)
    except:
        return Response({"error":"Token not found"}, status=status.HTTP_401_UNAUTHORIZED)
    client = create_client()
    vol_collection = client["aida-db"]["volunteers"]
    user = vol_collection.find_one({"_id":ObjectId(user_id)})
    data = {
            "message":"Welcome to Aida",
            "profile": user
            }
    return Response(data, status=status.HTTP_200_OK)



@api_view(['POST'])
def register(self):
    #Initialization
    client = create_client() 
    mongo_db = client["aida-db"]
    vol_collection = mongo_db["volunteers"]


    data = self.data
    hashed_password = generate_password_hash(data.get("password"))
    new_user = UserProfileSchema(
        username = data.get("username"),
        email = data.get("email"),
        password = hashed_password,
        first_name=data.get("first_name"),
        last_name=data.get("last_name", ""),
        phone_number=data.get("phone_number", ""),
        medical_qualifications=data.get("medical_qualifications", []),
        longitude=data.get("longitude", None),
        latitude
        =data.get("latitude", None)
    )
    # Checks
    if vol_collection.count_documents({"username":data.get("username")}) != 0:
        return Response({"error":"Username already exists"}, status=status.HTTP_409_CONFLICT)
    elif vol_collection.count_documents({"email":data.get("email")}) != 0:
        return Response({"error":"email already exists"}, status=status.HTTP_409_CONFLICT)

    try:
        vol_id= vol_collection.insert_one(new_user.to_dict()).inserted_id
        client.close()
        return Response({"message":"Registered Successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        client.close()
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
    return Response(token_data, status=status.HTTP_200_OK)
