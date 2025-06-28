from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routes import root
from app.db.client import WeaviateClientSingleton
from prometheus_fastapi_instrumentator import Instrumentator


@asynccontextmanager
async def lifespan(app: FastAPI):
    WeaviateClientSingleton.get_instance()
    print("Weaviate client initialized")
    yield


app = FastAPI(lifespan=lifespan)
Instrumentator().instrument(app).expose(app)

app.include_router(root.router)
