from django.contrib.auth.backends import BaseBackend
from api.mongo_client import client
from api.util.token import extract_access_token, get_token_user_id 
from bson import ObjectId

class MongoAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user_id=None, **kwargs):
        try:
            self.collection = client['aida-db']['volunteers']
            user_id = get_token_user_id(request)
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            token = extract_access_token(request)
            return (user, token)   # Create a user object from MongoDB data
        except Exception:
            return None

    def get_user(self, user_id):
        try:
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            return user
        except Exception:
            return None

