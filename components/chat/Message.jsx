import React from 'react';
import styles from './Message.module.css';

function Message({ role, content }) {
    const isAi = role === 'ai';

    return (
        <div className={`${styles.message} ${isAi ? styles.ai : styles.user}`}>
            <div className={styles.avatar}>
                {isAi ? '🤖' : '👤'}
            </div>
            <div className={styles.bubble}>
                <div className={styles.role}>{isAi ? 'AI Assistant' : 'You'}</div>
                <div className={styles.content}>
                    {content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Message;