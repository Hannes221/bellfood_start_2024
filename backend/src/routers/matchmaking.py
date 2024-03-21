from typing import Optional
from fastapi import APIRouter, HTTPException
from backend.src.utils.matching_algo import get_best_matches

router = APIRouter()

@router.get("/matching")
async def get_matching(user_id: Optional[str] = None, email: Optional[str] = None):
    try:
        assert user_id or email 
    except AssertionError:
        raise HTTPException(
            status_code=400,
            detail="At least one of user_id or email should be provided"
        )
    return await get_best_matches(user_id, email)