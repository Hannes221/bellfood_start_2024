from fastapi import APIRouter
from pydantic import BaseModel
import requests
from backend.src.settings import Settings

settings = Settings()

router = APIRouter()

class User(BaseModel):
    username: str

@router.post('/authenticate')
async def authenticate(user: User):
    response = requests.put('https://api.chatengine.io/users/',
        data={
            "username": user.username,
            "secret": user.username,
            "first_name": user.username,
        },
        headers={ "Project-ID": settings.chatengine_project_id,
                  "Private-Key": settings.chatengine_private_key}
    )
    return response.json()

