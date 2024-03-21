from sqlalchemy.orm import Session
from typing import List

from backend.src.database.models import User
from backend.src.database.database import engine

def calculate_match(user1: User, user2: User) -> int:
    shared_attrs = ('food', 'languages', 'travel', 'technology', 'music', 'art',
                    'sports', 'origin', 'health', 'freetime', 'culture', 'nature')
    return sum(getattr(user1, attr) == getattr(user2, attr) for attr in shared_attrs)

def get_best_matches(email: str, limit: int = 10) -> List[User]:
    with Session(engine) as session:
        all_users = session.query(User).all()
        target_user = session.query(User).filter(User.email == email).first()

        if not target_user:
            return []

        users_with_scores = []
        for user in all_users:
            if user.email != email:
                match_count = calculate_match(target_user, user)
                users_with_scores.append((user, match_count))

        users_with_scores.sort(key=lambda x: x[1], reverse=True)
        top_matching_users = [user for user, score in users_with_scores][:limit]

    return top_matching_users