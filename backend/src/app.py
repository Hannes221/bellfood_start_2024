from fastapi import FastAPI
from backend.src.routers import llm

app = FastAPI()

app.include_router(llm.router)