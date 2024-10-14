# Get user from access token
def get_token_user(request):
    jwt_auth = JWTAuthentication()

    # Extract the token from the request
    # Authorization header should be in the format: "Bearer <token>"
    header = request.headers.get("Authorization")

    if header is None:
        raise ValueError("Authorization header is missing")
    token = extract_access_token(request)
    try:
        # Validate and decode the token
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
        return user
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

