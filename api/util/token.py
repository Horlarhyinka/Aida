from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import exceptions

# Get user from access token
def get_token_user_id(request) -> str|None:
    jwt_auth = JWTAuthentication()

    # Extract the token from the request
    # Authorization header should be in the format: "Bearer <token>"
    header = request.headers.get("Authorization")

    if header is None:
        return None
    try:
        token = extract_access_token(request)
        # Validate and decode the token
        validated_token = jwt_auth.get_validated_token(token)
        # user_id = get_user_from_token(validated_token)
        user_id = validated_token.get('user_id')
        return str(user_id)
    except Exception:
        return None
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
        return None
# ---------------------------------------------------------------------------



# Generate JWT tokens
def generate_user_token(user_id: str):
    refresh = RefreshToken()
    refresh['user_id'] = str(user_id)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
    }
# -----------------------------------------
