import React from 'react';
import styles from './AIAvatar.module.css';

function AIAvatar({ isSpeaking }) {
    return (
        <div className={`${styles.avatar} ${isSpeaking ? styles.speaking : ''}`}>
            <div className={styles.inner}>
                <div className={styles.face}>
                    <div className={styles.eyes}>
                        <span className={styles.eye}></span>
                        <span className={styles.eye}></span>
                    </div>
                    <div className={styles.mouth}></div>
                </div>
            </div>

            {/* Animated rings when speaking */}
            {isSpeaking && (
                <>
                    <div className={`${styles.ring} ${styles.ring1}`}></div>
                    <div className={`${styles.ring} ${styles.ring2}`}></div>
                    <div className={`${styles.ring} ${styles.ring3}`}></div>
                </>
            )}
        </div>
    );
}
export default AIAvatar;