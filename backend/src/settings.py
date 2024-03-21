from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    llm_key: str = os.getenv("PREDICTIONGUARD_LLM_KEY")
    sql_alchemy_url: str = os.getenv("SQL_ALCHEMY_DB_URL")
    chatengine_project_id: str = os.getenv("CHATENGINE_PROJECT_ID")
    chatengine_private_key: str = os.getenv("CHATENGINE_PRIVATE_KEY")
