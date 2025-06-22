import os
import json
import requests
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel, Field
from langchain.llms.base import LLM
from langchain_core.prompts import PromptTemplate
from langchain.callbacks.manager import CallbackManagerForLLMRun
import logging
from fastapi.middleware.cors import CORSMiddleware

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Environment configuration
CHAIR_API_KEY = "sk-a4370d697e294dac819c95ba5ffe0740"
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
        if not self.api_key:
            raise ValueError("CHAIR_API_KEY environment variable is required")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        
        # Updated payload format
        payload = {
            "model": self.model_name,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        try:
            logger.info(f"Sending request to OpenWebUI API: {payload}")
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                logger.error(f"API error: {response.status_code} - {response.text}")
                raise requests.RequestException(f"API returned {response.status_code}: {response.text}")
            
            result = response.json()
            logger.info(f"Received response: {result}")
            
            # Extract content from choices array
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0]["message"]["content"]
                return content.strip()
            else:
                logger.error(f"Unexpected response format: {result}")
                raise ValueError(f"Unexpected response format: {result}")
                
        except requests.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")
# Initialize FastAPI app
app = FastAPI(
    title="LLM Service",
    description="OpenWebUI powered LLM service for text operations",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:8000/api/llm"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM
llm = OpenWebUILLM()

class TextRequest(BaseModel):
    user_text: List[str]

class TextResponse(BaseModel):
    llm_response: str

@router.post("/completion", response_model=TextResponse)
async def complete_text(request: TextRequest):
    try:
        prompt = f"""Complete the following text naturally:
        {' '.join(request.user_text)}
        
        Provide a natural continuation that maintains the style and context in one or two sentences.
        """
        logger.info(f"Processing completion request for text: {request.user_text}")
        result = llm(prompt)
        logger.info(f"Generated completion: {result}")
        return TextResponse(llm_response=result)
    except Exception as e:
        logger.error(f"Completion error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarization", response_model=TextResponse)
async def summarize_text(request: TextRequest):
    try:
        prompt = f"""Summarize the following text concisely:
        {' '.join(request.user_text)}
        """
        result = llm(prompt)
        return TextResponse(llm_response=result)
    except Exception as e:
        logger.error(f"Summarization error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/rephrase", response_model=TextResponse)
async def rephrase_text(request: TextRequest):
    try:
        logger.info(f"Received rephrase request: {request}")
        prompt = f"""Rephrase the following text while maintaining its meaning in one or two sentences:
        {' '.join(request.user_text)}
        """
        result = llm(prompt)
        return TextResponse(llm_response=result)
    except Exception as e:
        logger.error(f"Rephrase error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model": llm.model_name,
        "api_url": llm.api_url
    }

app.include_router(router)