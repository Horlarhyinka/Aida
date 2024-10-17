from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import exceptions
from bson import ObjectId
from rest_framework.exceptions import AuthenticationFailed
from api.mongo_client import create_client

class MongoDBJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        """
        Override the get_user method to find a user based on MongoDB's ObjectId.
        """
        # Get the user_id from the token
        user_id = validated_token.get('user_id')
        volunteers_collection = create_client()["aida-db"]["volunteers"]

        if not user_id:
            raise AuthenticationFailed("Token contained no user_id")

        try:
            # Convert the user_id to an ObjectId
            user_object_id = ObjectId(user_id)
            
            # Query the MongoDB for the user
            user = volunteers_collection.find_one({"_id": user_object_id})

            if not user:
                raise AuthenticationFailed("User not found")

            # Convert the user document to a dictionary, excluding the password
            user_dict = {
                "id": str(user["_id"]),
                "username": user["username"],
                "email": user.get("email"),
                # Add other fields if necessary
            }

            return str(user["_id"])
        except Exception as e:
            raise AuthenticationFailed(f"Invalid token: {str(e)}")

# Get user from access token
def get_token_user_id(request) -> str:
    jwt_auth = MongoDBJWTAuthentication()

    # Extract the token from the request
    # Authorization header should be in the format: "Bearer <token>"
    header = request.headers.get("Authorization")

    if header is None:
        raise ValueError("Authorization header is missing")
    try:
        token = extract_access_token(request)
        # Validate and decode the token
        validated_token = jwt_auth.get_validated_token(token)
        user_id = jwt_auth.get_user(validated_token)
        # user_id = validated_token.get('user_id')
        user_id = ""
        return user_id
    except exceptions.InvalidToken:
        raise ValueError("Invalid token")
# ------------------------------------------------------------


# Extract access token from request
def extract_access_token(request):
    """
    Extracts the access token from the Authorization header of the request.
    Assumes the format is 'Bearer <token>'.
    """
    auth_header = request.headers.get("Authorization", "")

    # Check if header is in the expected format
    if auth_header.startswith("Bearer "):
        # Extract the token part
        token = auth_header[len("Bearer ") :]
        return token
    else:
        raise ValueError('Authorization header must start with "Bearer ".')
# ---------------------------------------------------------------------------


def generate_user_token(user_id: str):
    refresh = RefreshToken()
    refresh['user_id'] = user_id
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
    }



