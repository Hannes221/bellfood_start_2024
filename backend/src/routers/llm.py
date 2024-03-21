from fastapi import APIRouter
from backend.src.utils.llm_setup import get_response
from pydantic import BaseModel

router = APIRouter()

class MessageBody(BaseModel):
    input_str: str

@router.post("/message")
def post_message(body: MessageBody):
    return get_response(body.input_str)