from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId



class UserProfileSchema(BaseModel):
    """
    Schema representation for a user profile in MongoDB, with validation.
    """

    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    phone_number: str
    medical_qualifications: List[str]
    longitude: float
    latitude: float
    admin_verification: bool = True

    class Config:
        """
        Configuration settings for Pydantic model.
        """
        arbitrary_types_allowed = True

    def to_dict(self):
        """
        Convert the schema instance to a dictionary for MongoDB insertion.
        """
        return self.dict()



class Location(BaseModel):
    latitude: float
    longitude: float

class EmergencyReport(BaseModel):
    victim_name: Optional[str] = None
    description: str
    latitude: float
    longitude: float
    remark: str
    is_active: bool
    diagnosis: Optional[str] = None
    chat_id: str

    class Config:
        arbitrary_types_allowed = True

    def to_dict(self):
        """
        Convert the schema instance to a dictionary for MongoDB insertion.
        """
        return self.dict()

