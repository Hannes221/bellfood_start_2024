from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.src.utils.matching_algo import get_best_matches

router = APIRouter()


class MatchingBody (BaseModel):
    user_id: Optional[str]
    email: Optional[str]

@router.post("/matching")
async def get_matching(body: MatchingBody):
    try:
        assert body.user_id or body.email 
    except AssertionError:
        raise HTTPException(
            status_code=400,
            detail="At least one of user_id or email should be provided"
        )
    return await get_best_matches(body.user_id, body.email)