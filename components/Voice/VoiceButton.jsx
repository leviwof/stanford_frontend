import React, { useMemo, useRef, useState } from 'react';
import styles from './VoiceButton.module.css';

function VoiceButton({ onTranscript }) {
    const [isRecording, setIsRecording] = useState(false);
    const recRef = useRef(null);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const start = () => {
        if (!SpeechRecognition) {
            alert("SpeechRecognition not supported");
            return;
        }

        const rec = new SpeechRecognition();
        rec.lang = "en-US";

        rec.onresult = (e) => {
            const text = e.results[0][0].transcript;
            onTranscript(text);   // send to chat
        };

        rec.onstart = () => setIsRecording(true);
        rec.onend = () => setIsRecording(false);

        recRef.current = rec;
        rec.start();
    };

    const stop = () => recRef.current?.stop();

    return (
        <button
            className={`${styles.button} ${isRecording ? styles.recording : ''}`}
            onClick={() => (isRecording ? stop() : start())}
        >
            🎤
            <div className={styles.waves}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>

    );
}

export default VoiceButton;
