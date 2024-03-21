from fastapi import FastAPI
from backend.src.routers import llm, interest, chat
from fastapi.middleware.cors import CORSMiddleware
from backend.src.routers import llm, interest, matchmaking
from backend.src.utils.insert_mock_data import populate_db

app = FastAPI()

origins = [
    "http://localhost:8081"
]

app.include_router(llm.router)
app.include_router(interest.router)
app.include_router(matchmaking.router)
app.include_router(chat.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

populate_db(100)
