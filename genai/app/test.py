from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()


def test_completion():
    payload = {"user_text": ["This is a test input."]}
    response = client.post("/completion", json=payload)
    assert response.status_code == 200
    assert "llm_response" in response.json()


def test_summarization():
    payload = {"user_text": ["This is a long sentence that needs summarizing."]}
    response = client.post("/summarization", json=payload)
    assert response.status_code == 200
    assert "llm_response" in response.json()


def test_rephrase():
    payload = {"user_text": ["This is a sample sentence."]}
    response = client.post("/rephrase", json=payload)
    assert response.status_code == 200
    assert "llm_response" in response.json()
