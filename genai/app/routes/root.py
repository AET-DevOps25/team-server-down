from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import logging
import requests
from langchain.llms.base import LLM
from langchain_core.prompts import PromptTemplate
from langchain.callbacks.manager import CallbackManagerForLLMRun
from typing import Optional, Any

router = APIRouter()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
CHAIR_API_KEY = "add api"
API_URL = "https://gpu.aet.cit.tum.de/api/chat/completions"

class OpenWebUILLM(LLM):
    api_url: str = API_URL
    api_key: str = CHAIR_API_KEY
    model_name: str = "llama3.3:latest"

    @property
    def _llm_type(self) -> str:
        return "open_webui"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        payload = {
            "model": self.model_name,
            "messages": [{"role": "user", "content": prompt}]
        }

        try:
            logger.info(f"Sending request: {payload}")
            response = requests.post(self.api_url, headers=headers, json=payload, timeout=30)
            response.raise_for_status()
            result = response.json()
            content = result["choices"][0]["message"]["content"]
            return content.strip()
        except Exception as e:
            logger.error(f"LLM call failed: {e}")
            raise

# LLM Instance
llm = OpenWebUILLM()

# Request/Response models
class TextRequest(BaseModel):
    user_text: List[str]

class TextResponse(BaseModel):
    llm_response: str

# Routes
@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.post("/completion", response_model=TextResponse)
async def complete_text(request: TextRequest):
    prompt = f"Complete the following text naturally:\n{' '.join(request.user_text)}"
    try:
        result = llm(prompt)
        return TextResponse(llm_response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarization", response_model=TextResponse)
async def summarize_text(request: TextRequest):
    prompt = f"Summarize the following text concisely:\n{' '.join(request.user_text)}"
    try:
        result = llm(prompt)
        return TextResponse(llm_response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/rephrase", response_model=TextResponse)
async def rephrase_text(request: TextRequest):
    prompt = f"Rephrase the following text while maintaining its meaning:\n{' '.join(request.user_text)}"
    try:
        result = llm(prompt)
        return TextResponse(llm_response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model": llm.model_name,
        "api_url": llm.api_url
    }
