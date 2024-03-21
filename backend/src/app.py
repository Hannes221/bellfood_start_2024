from fastapi import FastAPI
from backend.src.routers import llm, interest, chat

app = FastAPI()

app.include_router(llm.router)
app.include_router(interest.router)
app.include_router(chat.router)