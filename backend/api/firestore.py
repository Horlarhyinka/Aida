import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('aida-439112-230ad3ca38fe.json')

app = firebase_admin.initialize_app(cred)

firestore_db = firestore.client()
