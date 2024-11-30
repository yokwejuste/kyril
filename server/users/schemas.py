from datetime import date

from ninja import Schema
from pydantic import EmailStr
from pydantic import Field


from datetime import datetime
from pydantic import BaseModel, field_validator

class SubmissionResponseSchema(BaseModel):
    id: int
    name: str
    email: str
    date_of_birth: datetime
    department: str
    comments: str
    created_at: datetime

    @field_validator("date_of_birth")
    def format_created_at(cls, v):
        return v.date()


class SubmissionSchema(Schema):
    name: str = Field(..., min_length=1, max_length=100, description="User's full name")
    email: EmailStr = Field(..., description="Valid email address")
    date_of_birth: date = Field(..., description="Date of birth in YYYY-MM-DD format")
    department: str = Field(..., min_length=1, max_length=100, description="User's department")
    comments: str = Field(..., min_length=1, description="Additional comments or feedback")
