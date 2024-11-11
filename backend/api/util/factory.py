import random
import string

def generate_username(name):
    name_part = name[:8].lower()
    random_part = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
    username = f"{name_part}-{random_part}"
    return username
