from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app
import os

os.environ["OPEN_WEB_UI_API_KEY"] = "dummy_api_key"

client = TestClient(app)

def mock_response(content):
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "choices": [{"message": {"content": content}}]
    }
    return mock_resp

@patch("app.main.requests.post")
def test_completion(mock_post):
    mock_post.return_value = mock_response("mocked response")
    payload = {"user_text": ["This is a test input."]}
    response = client.post("/completion", json=payload)
    assert response.status_code == 200
    assert response.json()["llm_response"] == "mocked response"

@patch("app.main.requests.post")
def test_summarization(mock_post):
    mock_post.return_value = mock_response("mocked summary")
    payload = {"user_text": ["This is a long sentence that needs summarizing."]}
    response = client.post("/summarization", json=payload)
    assert response.status_code == 200
    assert response.json()["llm_response"] == "mocked summary"

@patch("app.main.requests.post")
def test_rephrase(mock_post):
    mock_post.return_value = mock_response("mocked rephrased text")
    payload = {"user_text": ["This is a sample sentence."]}
    response = client.post("/rephrase", json=payload)
    assert response.status_code == 200
    assert response.json()["llm_response"] == "mocked rephrased text"