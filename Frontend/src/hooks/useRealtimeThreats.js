import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Node.js Backend

export const useRealtimeThreats = () => {
    const [activeThreats, setActiveThreats] = useState([]);

    useEffect(() => {
        socket.on('connect', () => console.log("🟢 Connected to A.R.E.S. Nervous System"));

        socket.on('NEW_THREAT', (threat) => {
            console.log("⚠️ REAL THREAT RECEIVED:", threat);

            // Optional: Play Sound
            const audio = new Audio('/sounds/alert.mp3');
            audio.play().catch(e => console.log("Audio play failed", e));

            setActiveThreats(prev => {
                // Avoid duplicates based on ID if present, otherwise just append
                if (threat.id && prev.find(t => t.id === threat.id)) return prev;
                return [threat, ...prev];
            });
        });

        return () => { socket.off('NEW_THREAT'); };
    }, []);

    return { activeThreats };
};
