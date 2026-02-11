import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend, disabled }) {
    const [text, setText] = useState('');

    return (
        <div className="chatInputContainer">

            <input
                className="chatInputField"
                value={text}
                disabled={disabled}
                placeholder="Type your answer..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSend(text);
                        setText('');
                    }
                }}
            />
            <button
                className="chatSendButton"
                disabled={disabled}
                onClick={() => {
                    onSend(text);
                    setText('');
                }}
            >
                Send
            </button>
        </div>
    );
}
