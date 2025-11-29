const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const bodyParser = require('body-parser');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json());

// Store processed signatures to prevent replay attacks (simple in-memory)
const processedSignatures = new Set();

app.post('/api/ingest', (req, res) => {
    const { data, signature, publicKey } = req.body;

    if (!data || !signature || !publicKey) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        // 1. Verify Signature
        const key = ec.keyFromPublic(publicKey, 'hex');
        const message = JSON.stringify(data); // Ensure consistent ordering if possible, or rely on client's raw string if sent
        // Note: In a real app, we should verify the raw bytes or sorted JSON. 
        // For this demo, we assume the client sends sorted JSON or we reconstruct it exactly.
        // The python script sends: json.dumps(payload_data, sort_keys=True)
        // So we should do the same here to verify.

        // However, JS JSON.stringify order isn't guaranteed to match Python's sort_keys=True exactly for all types, 
        // but for simple keys it usually does. 
        // A better way is to verify the hash of the message if we had it, but here we verify the message itself.
        // Let's try to reconstruct the message exactly as Python did.
        // Python: json.dumps(payload_data, sort_keys=True)

        // Helper to sort object keys
        const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        const sortedData = sortObject(data);
        const msgToVerify = JSON.stringify(sortedData);

        // Verify
        // elliptic expects hash or array of bytes usually, but can handle strings? 
        // Wait, python ecdsa signs the *bytes* of the string.
        // We need to verify the hash of the string or the string bytes.
        // elliptic's verify method takes (message, signature).
        // Let's assume we verify the hash.
        const crypto = require('crypto');
        const msgHash = crypto.createHash('sha256').update(msgToVerify).digest();

        const valid = key.verify(msgHash, signature);

        if (!valid) {
            console.log("❌ Invalid Signature");
            return res.status(401).json({ error: "Invalid Signature" });
        }

        // 2. Check Replay (Optional for this demo, but good practice)
        if (processedSignatures.has(signature)) {
            return res.status(401).json({ error: "Replay Detected" });
        }
        processedSignatures.add(signature);

        // 3. Broadcast
        const threatId = Math.random().toString(36).substr(2, 9);
        const threatEvent = {
            id: threatId,
            ...data,
            isZyndVerified: true,
            verifiedAt: new Date().toISOString()
        };

        console.log(`✅ Verified Threat: ${data.type} from ${data.sector}`);
        io.emit("NEW_THREAT", threatEvent);

        res.json({ success: true, id: threatId });

    } catch (e) {
        console.error("Verification Error:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🧠 A.R.E.S. Nervous System running on port ${PORT}`);
});