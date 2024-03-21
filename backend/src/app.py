from fastapi import FastAPI
from backend.src.routers import llm, interest

app = FastAPI()

app.include_router(llm.router)
app.include_router(interest.router)