from fastapi import FastAPI
from backend.src.routers import llm, interest
from backend.src.utils.insert_mock_data import populate_db
from backend.src.database.database import SessionLocal

app = FastAPI()

app.include_router(llm.router)
app.include_router(interest.router)

populate_db(100)