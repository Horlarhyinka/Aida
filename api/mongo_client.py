from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from django.conf import settings



# Create a new client and connect to the server
def create_client():
    uri = settings.MONGO_URI
    try:
        client = MongoClient(uri, tls=True ,server_api=ServerApi('1'))
        print('connected to mongo client...')
        return client
    except Exception as err:
        print(err)
        raise err

mongodb_client = create_client()
aida_db = mongodb_client['aida-db']
