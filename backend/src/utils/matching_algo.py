from fnmatch import fnmatch
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.src.database.models import User
from backend.src.database.database import engine

def calculate_match(user: User, criteria: User) -> bool:
    match_count = 0

    for attr, value in user.__dict__.items():
        if attr != 'id' and attr != 'email' and value == getattr(criteria, attr):
            match_count+= 1

    return match_count

def get_best_matches(user_id: Optional[str] = None, email: Optional[str] = None, limit: int = 10) -> List[User]:
    with Session(engine) as session:
        users = session.query(User).all()

        criteria = {'user_id': user_id or '*', 
                    'email': email or '*'}

        users_with_scores = []
        for user in users:

            if not fnmatch(user.__dict__['user_id'], criteria['user_id']) or not fnmatch(user.__dict__['email'], criteria['email']):
                continue

            score = calculate_match(user, criteria)
            users_with_scores.append({"user": user, "score": score})

        users_with_scores.sort(key=lambda x: x['score'], reverse=True)

        filtered_users = [x['user'] for x in users_with_scores if x['score'] > 0][:limit]

        return filtered_users