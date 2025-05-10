import weaviate
from app.config import settings


class WeaviateClientSingleton:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = weaviate.connect_to_local(
                host=settings.db_host,
                port=settings.db_port,
                grpc_port=settings.db_grpc_port,
            )
        return cls._instance
