import React from 'react';
import AIAvatar from './AIAvatar.jsx';
import styles from './Message.module.css';

function Message({ role, content }) {
    const isAi = role === 'ai';

    return (
        <div className={`${styles.message} ${isAi ? styles.ai : styles.user}`}>
            {/* Avatar */}
            <div className={styles.avatarWrap}>
                {isAi ? (
                    <AIAvatar isSpeaking={false} size={32} />
                ) : (
                    <div className={styles.userAvatar}>
                        <span className="material-icons-round" style={{ fontSize: '16px' }}>person</span>
                    </div>
                )}
            </div>

            {/* Bubble */}
            <div className={styles.bubble}>
                {content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>
        </div>
    );
}

export default Message;