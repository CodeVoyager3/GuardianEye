import cv2
from ultralytics import YOLO
import requests
import json
import time
from ecdsa import SigningKey, SECP256k1
import binascii

# 1. Generate Identity (Private/Public Key)
# We generate a new identity on every startup for this demo.
# In production, you'd load this from a secure file.
sk = SigningKey.generate(curve=SECP256k1)
vk = sk.verifying_key
public_key_hex = binascii.hexlify(vk.to_string()).decode()

print(f"🔑 SENSOR IDENTITY GENERATED: {public_key_hex[:16]}...")

# 2. Load Model & Camera
model = YOLO('yolov8n.pt') 
cap = cv2.VideoCapture(0)
API_URL = "http://localhost:3000/api/ingest"
last_sent = 0

print("👁️ A.R.E.S. SENSOR FEED ACTIVE - Press 'Q' to quit")

while True:
    ret, frame = cap.read()
    if not ret: break

    # Run AI Detection
    results = model(frame, verbose=False)
    
    for r in results:
        for box in r.boxes:
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            label = model.names[cls]

            # Logic: If we see a Person or Phone, trigger a "Threat"
            if conf > 0.6 and (time.time() - last_sent > 5):
                threat_type = "UNKNOWN"
                
                if label == "person":
                    threat_type = "INFANTRY"
                elif label == "cell phone":
                    threat_type = "DRONE_CONTROLLER"

                if threat_type != "UNKNOWN":
                    # Construct Payload
                    timestamp = int(time.time() * 1000)
                    payload_data = {
                        "type": threat_type,
                        "sector": "Sector-4",
                        "timestamp": timestamp
                    }
                    
                    # Crypto: Sign the payload
                    # We sign the sorted JSON string to ensure consistency
                    message = json.dumps(payload_data, sort_keys=True).encode()
                    signature = sk.sign(message)
                    signature_hex = binascii.hexlify(signature).decode()

                    # Prepare final packet
                    packet = {
                        "data": payload_data,
                        "signature": signature_hex,
                        "publicKey": public_key_hex
                    }

                    print(f"🚨 THREAT DETECTED: {threat_type} (Signed)")
                    try:
                        # Send to Node.js Backend
                        requests.post(API_URL, json=packet)
                        last_sent = time.time()
                    except Exception as e:
                        print(f"❌ Backend Offline: {e}")

    cv2.imshow('A.R.E.S. Sensor Feed', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv2.destroyAllWindows()
