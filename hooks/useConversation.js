import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = 'wss://stanford-ai-backend-1.onrender.com/voice';


export function useConversation() {
    const [messages, setMessages] = useState([]);
    const [isAiSpeaking, setIsAiSpeaking] = useState(false);

    const wsRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log("WebSocket connected");

            const greeting =
                "Hello! I am your Stanford AI Assistant. I will help you reflect on your academic goals and how Stanford fits into your future plans. Let us begin. What are your short-term goals during your first few years at Stanford?";

            setMessages([
                {
                    id: Date.now(),
                    role: "ai",
                    content: greeting
                }
            ]);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "USER_TEXT") {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now(), role: "user", content: data.text }
                ]);
            }

            if (data.type === "AI_TEXT") {
                setIsAiSpeaking(false);
                setMessages(prev => [
                    ...prev,
                    { id: Date.now(), role: "ai", content: data.text }
                ]);
            }
        };

        wsRef.current = ws;
        return () => ws.close();
    }, []);

    const sendUserMessage = useCallback((text) => {
        if (!text?.trim()) return;

        setIsAiSpeaking(true);

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: "USER_TEXT",
                text
            }));
        }
    }, []);

    const resetConversation = useCallback(() => {
        setMessages([]);
        setIsAiSpeaking(false);

        // optional: show greeting again
        const greeting =
            "Hello! I am your Stanford AI Assistant. Let us begin again. What are your short-term goals during your first few years at Stanford?";

        setTimeout(() => {
            setMessages([
                {
                    id: Date.now(),
                    role: "ai",
                    content: greeting
                }
            ]);
        }, 200);
    }, []);


    return { messages, isAiSpeaking, sendUserMessage, resetConversation };
}
