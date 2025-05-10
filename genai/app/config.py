import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv


class Settings(BaseSettings):
    load_dotenv()

    db_host: str = os.getenv("DB_HOST")
    db_port: int = int(os.getenv("DB_PORT") or 0)
    db_grpc_port: int = int(os.getenv("DB_GRPC_PORT") or 0)


settings = Settings()
