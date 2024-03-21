from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.src.utils.matching_algo import get_best_matches

router = APIRouter()

class MatchingBody(BaseModel):
    email: str

@router.post("/matching")
def get_matching(matching: MatchingBody):
    return get_best_matches(matching.email)