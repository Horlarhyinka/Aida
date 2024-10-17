from http import client
from django.urls.resolvers import Error
from rest_framework.permissions import IsAuthenticated
from werkzeug.security import generate_password_hash, check_password_hash
from api.mongo_client import create_client
from api.tokens import get_token_user_id
from bson import ObjectId


def authenticate_user(username, password) -> str | None:
    # Fetch the user from MongoDB
    client = create_client()
    volunteers_collection = client["aida-db"]["volunteers"] 
    user = volunteers_collection.find_one({"username": username})
    if not user:
        user = volunteers_collection.find_one({"email": username})
    if not user or not check_password_hash(user["password"], password):
        return None
    client.close()
    user_id = str(user["_id"])
    return user_id

def IsAuthenticated(request):
   user_id = get_token_user_id(request) 
   client = create_client()
   volunteers_collection = client["aida-db"]["volunteers"]
   return volunteers_collection.find_one({"_id":ObjectId(user_id)}) is not None
    
def run_checks(email=None, username=None):
    increment=1
    client = create_client()
    collection = client["aida-db"]["volunteers"]
    if not email and not username:
        print("No inputs received")
    if collection.count_documents({"email":email}) > 1:
        for _ in range(collection.count_documents({"email":email})):
            if increment==1:
                increment = 0
                pass
            else:
                collection.delete_one({"email":email})
    elif collection.count_documents({"username":username}) > 1:
        for _ in range(collection.count_documents({"username":username})):
            if increment==1:
                increment = 0
                pass
            else:
                collection.delete_one({"username":username})
    print("No redundancies found!")
    client.close()

