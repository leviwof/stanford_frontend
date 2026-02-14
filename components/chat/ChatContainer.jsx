import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useConversation } from '../../hooks/useConversation.js';
import Message from './Message.jsx';
import AIAvatar from './AIAvatar.jsx';
import VoiceButton from '../Voice/VoiceButton.jsx';
import ChatInput from './ChatInput.jsx';
import EssaySummary from './EssaySummary.jsx';
import styles from './ChatContainer.module.css';

const INSTRUCTIONS_TEXT = `This is a short, focused, voice session with Ivy, your AI assistant. 
This session will take your stories and shape them into a strong essay structure with Ivy's support. 
You'll be asked about your short-term and long-term goals, and why Stanford is the right fit for you. 
Speak naturally and share your authentic experiences. Ivy will guide you through crafting a compelling 350-word essay.`;

function ChatContainer() {
    const {
        messages,
        isAiSpeaking,
        isComplete,
        showSummary,
        resetConversation,
        sendUserMessage,
        toggleSummary,
    } = useConversation();

    const messagesEndRef = useRef(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const speechRef = useRef(null);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => setElapsedTime(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Clean up speech on unmount
    useEffect(() => {
        return () => {
            if (speechRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    // ─── Listen Button Handler ───
    const handleListen = useCallback(() => {
        if (!('speechSynthesis' in window)) {
            alert('Text-to-speech is not supported in this browser.');
            return;
        }

        // If already speaking, stop it
        if (isListening) {
            window.speechSynthesis.cancel();
            setIsListening(false);
            return;
        }

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(INSTRUCTIONS_TEXT);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to pick a nice English voice
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v =>
            v.name.includes('Google') && v.lang.startsWith('en')
        ) || voices.find(v =>
            v.lang.startsWith('en') && v.name.includes('Female')
        ) || voices.find(v =>
            v.lang.startsWith('en')
        );
        if (preferred) utterance.voice = preferred;

        utterance.onstart = () => setIsListening(true);
        utterance.onend = () => setIsListening(false);
        utterance.onerror = () => setIsListening(false);

        speechRef.current = utterance;
        window.speechSynthesis.cancel(); // Cancel any pending
        window.speechSynthesis.speak(utterance);
    }, [isListening]);

    const hasStarted = messages.length > 0;
    const userCount = messages.filter(m => m.role === 'user').length;

    return (
        <div className={styles.wrapper}>
            {/* ─── Instructions Card ─── */}
            <div className={styles.instructionsCard}>
                <h2 className={styles.instructionsTitle}>Instructions</h2>
                <ol className={styles.instructionsList}>
                    <li>This is a short, focused, voice session with Ivy (AI assistant).</li>
                    <li>This session will take your stories and shape them into a strong essay structure with Ivy's support...</li>
                    <li>Speak naturally about your goals and why Stanford is the right fit.</li>
                    <li>After 5 exchanges, you'll see your essay structure summary.</li>
                </ol>
                <div className={styles.instructionsFooter}>
                    <button className={styles.readMoreBtn}>
                        Read more
                        <span className="material-icons-round" style={{ fontSize: '16px' }}>expand_more</span>
                    </button>
                    <button
                        className={`${styles.listenBtn} ${isListening ? styles.listenBtnActive : ''}`}
                        onClick={handleListen}
                        id="listen-btn"
                    >
                        <span className="material-icons-round" style={{ fontSize: '18px' }}>
                            {isListening ? 'stop_circle' : 'headphones'}
                        </span>
                        {isListening ? 'Stop' : 'Listen'}
                    </button>
                </div>
            </div>

            {/* ─── Main Content Area ─── */}
            <div className={`${styles.mainArea} ${showSummary ? styles.withSidebar : ''}`}>
                {/* ─── Chat Session Card ─── */}
                <div className={styles.sessionCard}>
                    {/* Session Header */}
                    <div className={styles.sessionHeader}>
                        <div className={styles.sessionHeaderLeft}>
                            <h3 className={styles.sessionTitle}>
                                {showSummary ? "Let's build the essay structure" : "Information Capture"}
                            </h3>
                            <span className={styles.sessionMeta}>{userCount}/5 questions answered</span>
                        </div>
                        <div className={styles.sessionHeaderRight}>
                            <span className="material-icons-round" style={{ fontSize: '18px', color: 'var(--text-muted)' }}>timer</span>
                            <span className={styles.timerText}>{formatTime(elapsedTime)} mins</span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className={styles.messagesArea}>
                        {!hasStarted ? (
                            <div className={styles.welcomeState}>
                                <AIAvatar isSpeaking={false} size={56} />
                                <p className={styles.welcomeText}>Hey! Let's start brainstorming your essay.</p>
                            </div>
                        ) : (
                            <div className={styles.messagesList}>
                                {messages.map((msg) => (
                                    <Message key={msg.id} role={msg.role} content={msg.content} />
                                ))}

                                {isAiSpeaking && (
                                    <div className={styles.typingRow}>
                                        <AIAvatar isSpeaking={true} size={32} />
                                        <div className={styles.typingBubble}>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Bar */}
                    <div className={styles.inputBar}>
                        <ChatInput
                            onSend={sendUserMessage}
                            disabled={isAiSpeaking || isComplete}
                        />
                        <VoiceButton onTranscript={sendUserMessage} />
                    </div>
                </div>

                {/* ─── Essay Summary Sidebar ─── */}
                {showSummary && (
                    <div className={styles.sidebarCard}>
                        <EssaySummary messages={messages} />
                    </div>
                )}
            </div>

            {/* ─── Bottom Action Bar ─── */}
            <div className={styles.bottomBar}>
                {hasStarted && (
                    <button className={styles.resetBtn} onClick={resetConversation} id="reset-btn">
                        <span className="material-icons-round" style={{ fontSize: '18px' }}>refresh</span>
                        Reset Session
                    </button>
                )}
                <div style={{ flex: 1 }} />
                {isComplete && (
                    <div className={styles.completeTag}>
                        <span className="material-icons-round" style={{ fontSize: '18px' }}>check_circle</span>
                        Conversation Complete!
                    </div>
                )}
                <button
                    className={`${styles.previewBtn} ${showSummary ? styles.previewBtnActive : ''}`}
                    onClick={toggleSummary}
                    id="preview-btn"
                >
                    {showSummary ? 'Review & Edit Structure' : 'Preview Answers'}
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>
                        {showSummary ? 'edit_note' : 'arrow_forward'}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ChatContainer;
