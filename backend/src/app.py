from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.routers import llm, interest

app = FastAPI()

origins = [
    "http://localhost:8081"
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