from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from backend.src.database.models import User
from backend.src.database.schemas import UserRead, UserBase
from backend.src.database.database import get_db

router = APIRouter()

@router.post("/user")
def add_user(user: UserBase, db: Session = Depends(get_db)):
    existing_user = db.execute(
        select(User).filter_by(email=user.email)
    ).one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=409, detail="User exists already")
    
    db_user = User(**user.dict())
    db.add(db_user) 
    db.flush()

    db.refresh(db_user)

    return db_user.id