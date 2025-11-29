from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import cv2
from ultralytics import YOLO
import time
from messages import ThreatReport

# Configuration
# REPLACE THIS with the address printed by system_bureau.py
COMMAND_AGENT_ADDRESS = "agent1q2kxet3vh0scsf0sm7y2erzz33cve6tv5uk63x64upw5g68kj0zcat7824" 

sentry = Agent(name="sentry", seed="sentry_seed_recovery_phrase", port=8002, endpoint=["http://127.0.0.1:8002/submit"])

fund_agent_if_low(sentry.wallet.address())

# Load Model
model = YOLO('yolov8n.pt') 
cap = cv2.VideoCapture(0)
last_sent = 0

print(f"👁️ Sentry Active. Address: {sentry.address}")

@sentry.on_interval(period=2.0)
async def scan_for_threats(ctx: Context):
    global last_sent
    ret, frame = cap.read()
    if not ret: return

    # Run AI Detection
    results = model(frame, verbose=False)
    
    for r in results:
        for box in r.boxes:
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = model.names[cls]

            if conf > 0.6 and (time.time() - last_sent > 5):
                threat_type = "UNKNOWN"
                if label == "person": threat_type = "INFANTRY"
                elif label == "cell phone": threat_type = "DRONE_CONTROLLER"
                elif label == "bottle": threat_type = "BIO_HAZARD"

                if threat_type != "UNKNOWN":
                    ctx.logger.info(f"🚨 Detected {threat_type}. Sending report...")
                    
                    await ctx.send(COMMAND_AGENT_ADDRESS, ThreatReport(
                        type=threat_type,
                        sector="Sector-4",
                        confidence=conf,
                        timestamp=time.time()
                    ))
                    last_sent = time.time()

    # Optional: Show feed (might block loop if not careful, but cv2.waitKey(1) is fast)
    cv2.imshow('A.R.E.S. Sentry Feed', frame)
    cv2.waitKey(1)

if __name__ == "__main__":
    sentry.run()
