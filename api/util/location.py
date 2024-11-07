import requests
from django.conf import settings

def get_location_from_ip(ip_address):
    access_key = settings.IPSTACK_API_KEY
    url = f"http://api.ipstack.com/{ip_address}?access_key={access_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # {'country_name': ..., 'region_name': ..., 'city': ..., 'latitude': ..., 'longitude': ...}
    return None



