from datetime import datetime
from pydantic import BaseModel, Field
from app.schema.base_schema import MongoModel


class UserCreate(BaseModel):
    username: str = Field(min_length=3)
    password: str = Field(min_length=8)
    role: str
    email: str = Field(min_length=5)
    status: bool = True


class UserUpdate(BaseModel):
    username: str | None = Field(default=None, min_length=3)
    password: str | None = Field(default=None, min_length=8)
    role: str | None = None
    email: str | None = Field(default=None, min_length=5)
    status: bool | None = None


class UserResponse(MongoModel):
    username: str
    role: str
    email: str
    created_at: datetime
    status: bool
    must_change_credentials: bool = False
