from fastapi import FastAPI
from app.db.client import init_client
from app.routes import root

app = FastAPI()


@app.on_event("startup")
def startup_event():
    init_client()
    print("Weaviate client initialized")


app.include_router(root.router)
