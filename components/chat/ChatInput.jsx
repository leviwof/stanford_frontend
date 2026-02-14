import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText('');
    };

    return (
        <div className="ivy-chat-input">
            <input
                className="ivy-chat-field"
                value={text}
                disabled={disabled}
                placeholder="Write your response here..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                }}
                id="chat-input-field"
            />
            <button
                className="ivy-send-btn"
                disabled={disabled || !text.trim()}
                onClick={handleSend}
                id="chat-send-btn"
            >
                <span className="material-icons-round" style={{ fontSize: '20px' }}>send</span>
            </button>
        </div>
    );
}
