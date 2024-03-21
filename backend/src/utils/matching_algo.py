from sqlalchemy.orm import Session
from typing import List

from backend.src.database.models import User

def calculate_match(user: User, criteria: User) -> bool:
    match_count = 0

    for attr, value in user.__dict__.items():
        if attr != 'id' and attr != 'email' and value == getattr(criteria, attr):
            match_count+= 1

    return match_count

def get_best_matches(session: Session, criteria: User, limit: int = 10) -> List[User]:
    users = session.query(User).all()
    users_with_scores = [{"user": user, "score": calculate_match(user, criteria)} for user in users]
    users_with_scores.sort(key=lambda x: x['score'], reverse=True)
    filtered_users = [x['user'] for x in users_with_scores if x['score'] > 0][:limit]

    return filtered_users