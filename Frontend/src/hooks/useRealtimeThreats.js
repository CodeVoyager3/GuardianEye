import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Initialize socket outside component to prevent multiple connections
const socket = io('http://localhost:3000');

const useRealtimeThreats = () => {
    const [activeThreats, setActiveThreats] = useState([]);

    useEffect(() => {
        // Handler for new threats
        const handleNewThreat = (threat) => {
            console.log("🚨 New Threat Received:", threat);

            // Play Alert Sound
            const audio = new Audio('/sounds/alert.mp3');
            audio.play().catch(e => console.error("Audio play failed:", e));

            // Update State
            setActiveThreats(prev => [...prev, threat]);
        };

        // Listen for event
        socket.on('NEW_THREAT', handleNewThreat);

        // Cleanup
        return () => {
            socket.off('NEW_THREAT', handleNewThreat);
        };
    }, []);

    return { activeThreats };
};

export default useRealtimeThreats;
