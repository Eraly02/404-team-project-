from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    aqi: int = None
    co2: int = None
    traffic: str = None



def query_local_ai(prompt):
    import requests

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "num_predict": 150   
                }
            },
            timeout=60
        )

        data = response.json()

        return data.get("response", "Нет ответа")

    except Exception as e:
        return f"Ошибка: {str(e)}"


@app.post("/chat")
async def chat(req: ChatRequest):

    prompt = f"""
You are an AI system for analyzing city complaints in Almaty.

You are NOT a chatbot.
You must NOT add extra text.
You must strictly follow the format.

Answer ONLY in this format:

Problem: (short)
Category: (ecology / transport / infrastructure / other)
Urgency: (low / medium / high)
Solution:
- step 1
- step 2
- step 3

Data:
AQI: {req.aqi}
CO2: {req.co2}
Traffic: {req.traffic}

Complaint:
{req.message}
"""

    result = query_local_ai(prompt)

    return {
        "reply": result.strip()
    }