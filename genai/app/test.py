import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import patch, Mock
from app.main import app

transport = ASGITransport(app=app)

# Test fixtures
@pytest.fixture
def mock_llm_response():
    return {
        "choices": [{
            "message": {
                "content": "Mocked response content"
            }
        }]
    }

@pytest.fixture
def mock_failed_response():
    mock = Mock(status_code=500)
    mock.text = "Internal Server Error"
    return mock

# Health check tests
@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()

# Completion endpoint tests
@pytest.mark.asyncio
@patch("app.main.requests.post")
async def test_completion(mock_post, mock_llm_response):
    mock_post.return_value = Mock(status_code=200)
    mock_post.return_value.json.return_value = mock_llm_response

    payload = {"user_text": ["This is a test input."]}
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/completion", json=payload)

    assert response.status_code == 200
    assert "llm_response" in response.json()

@pytest.mark.asyncio
@patch("app.main.requests.post")
async def test_completion_error(mock_post, mock_failed_response):
    mock_post.return_value = mock_failed_response

    payload = {"user_text": ["This is a test input."]}
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/completion", json=payload)

    assert response.status_code == 500

# Summarization endpoint tests
@pytest.mark.asyncio
@patch("app.main.requests.post")
async def test_summarization(mock_post, mock_llm_response):
    mock_post.return_value = Mock(status_code=200)
    mock_post.return_value.json.return_value = mock_llm_response

    payload = {"user_text": ["This is a long sentence that needs summarizing."]}
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/summarization", json=payload)

    assert response.status_code == 200
    assert "llm_response" in response.json()

# Rephrase endpoint tests
@pytest.mark.asyncio
@patch("app.main.requests.post")
async def test_rephrase(mock_post, mock_llm_response):
    mock_post.return_value = Mock(status_code=200)
    mock_post.return_value.json.return_value = mock_llm_response

    payload = {"user_text": ["This is a sample sentence."]}
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/rephrase", json=payload)

    assert response.status_code == 200
    assert "llm_response" in response.json()

# Invalid request tests
@pytest.mark.asyncio
async def test_invalid_request_format():
    payload = {"wrong_key": ["This should fail."]}
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/completion", json=payload)
    assert response.status_code == 422
