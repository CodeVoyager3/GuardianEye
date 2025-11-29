from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
import os

app = FastAPI()

# Input Model
class ThreatInput(BaseModel):
    threat_type: str
    sector: str

# Initialize OpenAI (Ensure OPENAI_API_KEY is set in environment)
# os.environ["OPENAI_API_KEY"] = "sk-..." 
llm = ChatOpenAI(model_name="gpt-4", temperature=0.7)

@app.post("/generate_debate")
async def generate_debate(input: ThreatInput):
    try:
        threat = input.threat_type
        sector = input.sector

        # 1. Aggressor Agent
        aggressor_prompt = f"You are ARES-AGGRESSOR. A {threat} has been detected in {sector}. Advocate for immediate, overwhelming force. Be brief and aggressive."
        aggressor_res = llm([SystemMessage(content=aggressor_prompt), HumanMessage(content="Status report?")])
        
        # 2. Guardian Agent
        guardian_prompt = f"You are ARES-GUARDIAN. The Aggressor just proposed force against a {threat}. Rebut this based on civilian safety and rules of engagement. Be protective and cautious."
        guardian_res = llm([SystemMessage(content=guardian_prompt), HumanMessage(content=f"Aggressor said: {aggressor_res.content}")])

        # 3. Logistican Agent
        logistican_prompt = f"You are ARES-LOGISTICAN. Analyze the cost and feasibility of the proposed actions for a {threat}. Be pragmatic and calculating."
        logistican_res = llm([SystemMessage(content=logistican_prompt), HumanMessage(content=f"Situation: {threat}. Aggressor: {aggressor_res.content}. Guardian: {guardian_res.content}")])

        return [
            {"agent": "Aggressor", "message": aggressor_res.content, "status": "engaging"},
            {"agent": "Guardian", "message": guardian_res.content, "status": "caution"},
            {"agent": "Logistican", "message": logistican_res.content, "status": "calculating"}
        ]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
