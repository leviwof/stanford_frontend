import { useState, useEffect, useRef, useCallback } from 'react';
import { conversationScript } from '../data/conversationScript.js';

const WS_URL = `wss://stanford-ai-backend.onrender.com/voice`;

const GREETING = "Hello! I'm Ivy, your Stanford essay brainstorming partner. Today we'll explore your goals and connection to Stanford. Let's start — what are your short-term academic goals for your first two years?";

export function useConversation() {
    const [messages, setMessages] = useState([]);
    const [isAiSpeaking, setIsAiSpeaking] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const wsRef = useRef(null);
    const wsConnected = useRef(false);
    const userMsgCount = useRef(0);
    const scriptIndex = useRef(0); // for fallback scripted responses

    // Pre-built AI fallback responses (used if WS/API is down)
    const fallbackAiResponses = conversationScript
        .filter(m => m.role === 'ai')
        .map(m => m.content);

    // Connect WebSocket (best-effort, not required)
    useEffect(() => {
        let ws;
        try {
            ws = new WebSocket(WS_URL);

            ws.onopen = () => {
                wsConnected.current = true;
                console.log('✅ WS connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'AI_TEXT') {
                        setIsAiSpeaking(false);
                        setMessages(prev => [
                            ...prev,
                            { id: Date.now() + 1, role: 'ai', content: data.text }
                        ]);
                    }
                } catch (e) { /* ignore parse errors */ }
            };

            ws.onclose = () => { wsConnected.current = false; };
            ws.onerror = () => { wsConnected.current = false; };

            wsRef.current = ws;
        } catch (e) {
            wsConnected.current = false;
        }

        return () => { try { ws?.close(); } catch (e) { /* */ } };
    }, []);

    // Show initial greeting
    useEffect(() => {
        setMessages([{ id: 1, role: 'ai', content: GREETING }]);
    }, []);

    // Auto-show summary sidebar after 5 user messages
    useEffect(() => {
        const userCount = messages.filter(m => m.role === 'user').length;
        if (userCount >= 5 && !showSummary) {
            setShowSummary(true);
        }
    }, [messages, showSummary]);

    const sendUserMessage = useCallback((text) => {
        if (!text?.trim()) return;
        const trimmed = text.trim();

        // Add user message to UI immediately
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: trimmed }]);
        setIsAiSpeaking(true);
        userMsgCount.current += 1;

        // Try WebSocket first
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'USER_TEXT', text: trimmed }));

            // Safety timeout: if WS doesn't respond in 12s, use fallback
            setTimeout(() => {
                setIsAiSpeaking(prev => {
                    if (prev) {
                        // Still speaking means no response came — use fallback
                        const idx = scriptIndex.current % fallbackAiResponses.length;
                        scriptIndex.current++;
                        setMessages(prev2 => [
                            ...prev2,
                            { id: Date.now() + 2, role: 'ai', content: fallbackAiResponses[idx] }
                        ]);
                        return false;
                    }
                    return prev;
                });
            }, 12000);
        } else {
            // No WS connection — use fallback immediately with natural delay
            const delay = 1200 + Math.random() * 800;
            setTimeout(() => {
                const idx = scriptIndex.current % fallbackAiResponses.length;
                scriptIndex.current++;
                setIsAiSpeaking(false);
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, role: 'ai', content: fallbackAiResponses[idx] }
                ]);
            }, delay);
        }

        // Check if conversation is complete (after 5 exchanges)
        if (userMsgCount.current >= 5) {
            setTimeout(() => setIsComplete(true), 3000);
        }
    }, [fallbackAiResponses]);

    const resetConversation = useCallback(() => {
        setMessages([{ id: Date.now(), role: 'ai', content: GREETING }]);
        setIsAiSpeaking(false);
        setIsComplete(false);
        setShowSummary(false);
        userMsgCount.current = 0;
        scriptIndex.current = 0;
    }, []);

    const toggleSummary = useCallback(() => {
        setShowSummary(prev => !prev);
    }, []);

    return {
        messages,
        isAiSpeaking,
        isComplete,
        showSummary,
        sendUserMessage,
        resetConversation,
        toggleSummary
    };
}
