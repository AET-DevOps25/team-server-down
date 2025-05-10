import weaviate

_client = None


def init_client():
    global _client
    if _client is None:
        _client = weaviate.connect_to_local(
            host="weaviate",
            port=9090,
            grpc_port=50051,
        )
    return _client


def get_client():
    if _client is None:
        raise RuntimeError("Weaviate client not initialized. Call init_client() first.")
    return _client
