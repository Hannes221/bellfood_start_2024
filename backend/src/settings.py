from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    llm_key: str = os.getenv("llm_key")
    sql_alchemy_url: str = os.getenv("sql_alchemy_url")
