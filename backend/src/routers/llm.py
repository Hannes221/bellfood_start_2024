from fastapi import APIRouter
from backend.src.utils.llm_setup import get_response

router = APIRouter()

@router.post("/message")
def post_message(input_str: str):
    return get_response(input_str)