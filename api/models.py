from datetime import datetime
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
        return self.model_dump()




class EmergencyReport(BaseModel):
    victim_name: Optional[str] = None
    reporter_name: Optional[str]
    description: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    remark: str
    is_active: bool
    diagnosis: Optional[str] = None
    created_at: datetime = datetime.now()

    class Config:
        arbitrary_types_allowed = True

    def to_dict(self):
        """
        Convert the schema instance to a dictionary for MongoDB insertion.
        """
        return self.model_dump()


class ChatMessage(BaseModel):
    user_id: str
    message: str
    timestamp: Optional[datetime] = datetime.now()
    sender_name: Optional[str] = None

    def to_dict(self):
        """
        Convert the schema instance to a dictionary for MongoDB insertion.
        """
        return self.model_dump()
