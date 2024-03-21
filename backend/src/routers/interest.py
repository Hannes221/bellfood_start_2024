from fastapi import APIRouter
from backend.src.database.schemas import UserBase

router = APIRouter()

@router.post("/user")
def post_message(user: UserBase):
    return user