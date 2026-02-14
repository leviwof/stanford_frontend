import React from 'react';
import styles from './AIAvatar.module.css';

function AIAvatar({ isSpeaking, size = 40 }) {
    return (
        <div
            className={`${styles.avatar} ${isSpeaking ? styles.speaking : ''}`}
            style={{ width: size, height: size }}
        >
            {/* Animated gradient ring */}
            <div className={styles.ring}></div>
            <div className={styles.innerRing}></div>

            {/* Core circle */}
            <div className={styles.core}>
                <div className={styles.coreInner}></div>
            </div>

            {/* Ripple rings when speaking */}
            {isSpeaking && (
                <>
                    <div className={`${styles.ripple} ${styles.ripple1}`}></div>
                    <div className={`${styles.ripple} ${styles.ripple2}`}></div>
                </>
            )}
        </div>
    );
}

export default AIAvatar;