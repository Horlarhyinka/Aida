# from rest_framework.permissions import IsAuthenticated
from werkzeug.security import generate_password_hash, check_password_hash
from api.mongo_client import client
from api.util.token import get_token_user_id
from bson import ObjectId


def authenticate_user(username, password) -> str | None:
    # Fetch the user from MongoDB
    volunteers_collection = client["aida-db"]["volunteers"] 
    user = volunteers_collection.find_one({"username": username})
    print(user)
    if not user or not check_password_hash(user["password"], password):
        return None
    
    user_id = str(user["_id"])
    return user_id

def IsAuthenticated(request) -> bool:
   user_id = get_token_user_id(request) 
   volunteers_collection = client["aida-db"]["volunteers"]
   return volunteers_collection.find_one({"_id":ObjectId(user_id)}) is not None


#removes redundancies in MongoDB
def run_checks(email=None, username=None):
    increment=1
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

