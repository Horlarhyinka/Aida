from typing import List


class UserProfileSchema:
    """
    Schema representation for a user profile in MongoDB.
    """

    def __init__(self, username:str, email:str, first_name:str, last_name:str, password:str, phone_number:str, medical_qualifications:List, longitude:float, latitude:float):
        self.username = username
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.medical_qualifications = medical_qualifications
        self.longitude = longitude
        self.latitude = latitude
        self.admin_verification = True


    def to_dict(self):
        """
        Convert the schema instance to a dictionary for MongoDB insertion.
        """

        return {
            "username": self.username,
            "email": self.email,
            "password": self.password, 
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "medical_qualifications":self.medical_qualifications,
            "admin-verification":self.admin_verification,
            "location": {"longitude": self.longitude, "latitude": self.latitude}
        }

    @staticmethod
    def validate(data):
        """
        Validate the data before inserting into the database.
        """
        if not isinstance(data.get("username"), str):
            raise ValueError("Username must be a string.")
        if not isinstance(data.get("email"), str):
            raise ValueError("Email must be a string.")
        # Additional validation can be added here

        return True

