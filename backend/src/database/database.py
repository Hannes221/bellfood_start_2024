from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.src.settings import Settings

settings = Settings()

engine = create_engine(settings.sql_alchemy_url, echo=True, pool_size=20)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
