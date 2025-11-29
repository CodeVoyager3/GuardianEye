from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
import uvicorn
from messages import ThreatReport, TribunalDecision
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
import os

# --- Configuration ---
# Ensure OPENAI_API_KEY is set in your environment or .env file
# os.environ["OPENAI_API_KEY"] = "sk-..." 

# --- FastAPI & Socket.IO Setup ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio, app)

# --- Agents ---
commander = Agent(name="commander", seed="commander_seed_recovery_phrase")
aggressor = Agent(name="aggressor", seed="aggressor_seed_recovery_phrase")
guardian = Agent(name="guardian", seed="guardian_seed_recovery_phrase")
logistican = Agent(name="logistican", seed="logistican_seed_recovery_phrase")

print(f"🤖 Commander Address: {commander.address}")

# --- AI Logic (Mocked or Real) ---
# For speed/reliability in this demo, we can use a simple mock or the real one if key exists.
# We'll use a simplified version for the "Tribunal" to ensure it runs without an API key if needed,
# but the user asked for LangChain. We'll wrap it in a try-except.

async def get_agent_opinion(agent_name, threat_type, sector):
    try:
        llm = ChatOpenAI(model_name="gpt-4", temperature=0.7)
        if agent_name == "Aggressor":
            prompt = f"You are ARES-AGGRESSOR. A {threat_type} detected in {sector}. Advocate force. Brief."
        elif agent_name == "Guardian":
            prompt = f"You are ARES-GUARDIAN. A {threat_type} detected in {sector}. Advocate safety. Brief."
        else:
            prompt = f"You are ARES-LOGISTICAN. A {threat_type} detected in {sector}. Analyze cost. Brief."
        
        res = await llm.apredict_messages([SystemMessage(content=prompt), HumanMessage(content="Report?")])
        return res.content
    except Exception as e:
        # Fallback if no API key or error
        if agent_name == "Aggressor": return f"Eliminate {threat_type} immediately."
        if agent_name == "Guardian": return f"Evacuate civilians near {sector} first."
        return f"Allocating resources for {threat_type} intervention."

# --- Commander Logic ---
@commander.on_message(model=ThreatReport)
async def handle_threat(ctx: Context, sender: str, msg: ThreatReport):
    ctx.logger.info(f"Received threat: {msg.type} from {sender}")
    
    # 1. Notify Frontend of Initial Detection
    await sio.emit('NEW_THREAT', {
        "id": str(msg.timestamp),
        "type": msg.type,
        "sector": msg.sector,
        "confidence": msg.confidence,
        "timestamp": msg.timestamp,
        "status": "ANALYZING",
        "isZyndVerified": True
    })

    # 2. Consult Tribunal (Simulated async calls)
    aggressor_msg = await get_agent_opinion("Aggressor", msg.type, msg.sector)
    guardian_msg = await get_agent_opinion("Guardian", msg.type, msg.sector)
    logistican_msg = await get_agent_opinion("Logistican", msg.type, msg.sector)

    # 3. Form Consensus
    consensus = "ENGAGE" if msg.type in ["INFANTRY", "DRONE_CONTROLLER"] else "MONITOR"
    
    # 4. Notify Frontend of Decision
    await sio.emit('TRIBUNAL_UPDATE', {
        "threatId": str(msg.timestamp),
        "consensus": consensus,
        "logs": [
            {"agent": "Aggressor", "message": aggressor_msg},
            {"agent": "Guardian", "message": guardian_msg},
            {"agent": "Logistican", "message": logistican_msg}
        ]
    })

# --- Bureau Setup ---
bureau = Bureau(endpoint="http://127.0.0.1:8001/submit", port=8001)
bureau.add(commander)
bureau.add(aggressor)
bureau.add(guardian)
bureau.add(logistican)

# --- Main Execution ---
if __name__ == "__main__":
    # Run Bureau and FastAPI together
    # We use a trick: run FastAPI in a separate thread or loop, but uAgents blocks.
    # Actually, uAgents Bureau.run() blocks. 
    # We can run uvicorn in a separate process or thread.
    import threading
    
    def run_api():
        uvicorn.run(socket_app, host="0.0.0.0", port=8000)

    t = threading.Thread(target=run_api, daemon=True)
    t.start()

    print("🚀 System Bureau & Web Server Started")
    bureau.run()
