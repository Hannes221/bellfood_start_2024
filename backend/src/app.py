from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.routers import llm, interest
from backend.src.utils.insert_mock_data import populate_db
from backend.src.database.database import SessionLocal

app = FastAPI()

origins = [
    "http://localhost:8082"
]

app.include_router(llm.router)
app.include_router(interest.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

populate_db(100)