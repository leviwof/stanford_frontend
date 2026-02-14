import React, { useRef, useState } from 'react';
import styles from './VoiceButton.module.css';

function VoiceButton({ onTranscript }) {
    const [isRecording, setIsRecording] = useState(false);
    const recRef = useRef(null);

    const getSR = () => {
        if (typeof window === 'undefined') return null;
        return window.SpeechRecognition || window.webkitSpeechRecognition || null;
    };

    const start = () => {
        const SR = getSR();
        if (!SR) {
            // Fallback: prompt user to type instead
            const text = prompt('Voice input is not supported in this browser. Type your response:');
            if (text?.trim()) onTranscript(text.trim());
            return;
        }

        try {
            const rec = new SR();
            rec.lang = 'en-US';
            rec.continuous = false;
            rec.interimResults = false;
            rec.maxAlternatives = 1;

            rec.onresult = (e) => {
                const text = e.results[0]?.[0]?.transcript || '';
                if (text.trim()) onTranscript(text.trim());
            };

            rec.onstart = () => setIsRecording(true);
            rec.onend = () => setIsRecording(false);
            rec.onerror = () => setIsRecording(false);

            recRef.current = rec;
            rec.start();
        } catch (err) {
            console.error('Speech recognition error:', err);
            setIsRecording(false);
        }
    };

    const stop = () => {
        try { recRef.current?.stop(); } catch (e) { /* ignore */ }
        setIsRecording(false);
    };

    return (
        <button
            className={`${styles.voiceBtn} ${isRecording ? styles.recording : ''}`}
            onClick={() => (isRecording ? stop() : start())}
            title={isRecording ? 'Stop recording' : 'Start voice input'}
            id="voice-btn"
        >
            <span className="material-icons-round" style={{ fontSize: '20px' }}>
                {isRecording ? 'mic_off' : 'mic'}
            </span>

            {isRecording && (
                <>
                    <span className={styles.pulse}></span>
                    <span className={`${styles.pulse} ${styles.pulse2}`}></span>
                </>
            )}
        </button>
    );
}

export default VoiceButton;
