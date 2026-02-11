import React, { useEffect, useRef } from 'react';
import { useConversation } from '../../hooks/useConversation.js';
import Message from './Message.jsx';
import AIAvatar from './AIAvatar.jsx';
import VoiceButton from '../Voice/VoiceButton.jsx';
import styles from './ChatContainer.module.css';
import ChatInput from './ChatInput.jsx';

function ChatContainer() {
    const {
        messages,
        isAiSpeaking,
        isComplete,
        resetConversation,
        sendUserMessage,

    } = useConversation();

    const messagesEndRef = useRef(null);
    const hasStarted = messages.length > 0;

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.container}>
            {/* AI Avatar Section */}
            <div className={styles.avatarSection}>
                <AIAvatar isSpeaking={isAiSpeaking} />
                <div className={styles.avatarLabel}>
                    {isAiSpeaking ? 'AI is thinking...' : 'Stanford AI Assistant'}
                </div>
            </div>

            {/* Messages Area */}
            <div className={styles.messagesArea}>
                {!hasStarted ? (
                    <div className={styles.welcomeMessage}>
                        <h2>Welcome! 👋</h2>
                        <p>Ask anything to begin the conversation.</p>
                        <p>Type or speak to start interacting with the AI.</p>
                    </div>
                ) : (
                    <div className={styles.messagesList}>
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                role={msg.role}
                                content={msg.content}
                            />
                        ))}

                        {isAiSpeaking && (
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className={styles.controls}>
                {hasStarted && (
                    <button
                        className={styles.resetButton}
                        onClick={resetConversation}
                    >
                        ↻ Reset
                    </button>
                )}

                <ChatInput
                    onSend={sendUserMessage}
                    disabled={isAiSpeaking || isComplete}
                />

                <VoiceButton onTranscript={sendUserMessage} />

                {isComplete && (
                    <div className={styles.completeMessage}>
                        ✅ Conversation Complete!
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatContainer;
