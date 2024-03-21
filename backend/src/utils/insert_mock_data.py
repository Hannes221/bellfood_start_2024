from fastapi import Depends
from sqlalchemy.orm import Session
from backend.src.database.models import User
from backend.src.database.database import engine
from random import choice
from uuid import uuid4

def create_fake_user():
    return User(
        email=uuid4 + "@gmail.com",
        food=choice([True, False]),
        languages=choice([True, False]),
        travel=choice([True, False]),
        technology=choice([True, False]),
        music=choice([True, False]),
        art=choice([True, False]),
        sports=choice([True, False]),
        origin=choice([True, False]),
        health=choice([True, False]),
        freetime=choice([True, False]),
        culture=choice([True, False]),
        nature=choice([True, False])
    )

def populate_db(n_users: int):
    with Session(engine) as session:
        if session.query(User).count() > 0:
            print("Entries already exist in the database. Script won't be executed.")
            return

        for _ in range(n_users):
            user = create_fake_user()
            session.add(user)
        session.commit()
