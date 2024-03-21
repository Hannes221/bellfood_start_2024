from fastapi import APIRouter
from llm.llm_setup import get_response

router = APIRouter()

@router.post("/message")
async def post_message(input_str: str):
    return await get_response(input_str)