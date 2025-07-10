from fastapi.testclient import TestClient
from genai.app.main import app

client = TestClient(app)


def test_example():
    assert True
