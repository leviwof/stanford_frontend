import React, { useMemo } from 'react';
import styles from './EssaySummary.module.css';

function EssaySummary({ messages }) {
    // Extract user messages to build the summary
    const userMessages = useMemo(
        () => messages.filter(m => m.role === 'user').map(m => m.content),
        [messages]
    );

    // Count total words from user messages
    const totalWords = useMemo(
        () => userMessages.join(' ').split(/\s+/).filter(Boolean).length,
        [userMessages]
    );

    const sections = [
        {
            title: 'Intro: 50 words',
            description: 'Think about the beginning of your story — what made it feel important or special? Try starting with a memory or feeling that captures the essence of your journey.',
            icon: 'auto_stories'
        },
        {
            title: 'Short-term Goals: 100 words',
            description: 'Focus on your first two years at Stanford. What courses, programs, or experiences do you want to pursue? Be specific about Symbolic Systems, CS, or other programs.',
            icon: 'flag'
        },
        {
            title: 'Long-term Vision: 100 words',
            description: 'What impact do you want to make in 5-10 years? Connect your personal story to your broader mission of making technology accessible to all.',
            icon: 'rocket_launch'
        },
        {
            title: 'Why Stanford: 100 words',
            description: "Connect to Stanford's unique offerings — HAI, d.school, Silicon Valley proximity, specific faculty like Fei-Fei Li. Show why only Stanford can help you achieve your goals.",
            icon: 'school'
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className="material-icons-round" style={{ fontSize: '20px', color: 'var(--brand-primary)' }}>
                    description
                </span>
                <h3 className={styles.title}>Essay Structure</h3>
                <span className={styles.wordCount}>{totalWords} / 350 words</span>
            </div>

            {/* Progress bar */}
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${Math.min((totalWords / 350) * 100, 100)}%` }}
                ></div>
            </div>

            {/* Sections */}
            <div className={styles.sections}>
                {sections.map((section, i) => (
                    <div
                        key={i}
                        className={`${styles.section} ${i < userMessages.length ? styles.sectionFilled : ''}`}
                    >
                        <div className={styles.sectionHeader}>
                            <span className="material-icons-round" style={{ fontSize: '18px' }}>
                                {section.icon}
                            </span>
                            <span className={styles.sectionTitle}>{section.title}</span>
                            {i < userMessages.length && (
                                <span className={styles.checkmark}>
                                    <span className="material-icons-round" style={{ fontSize: '16px' }}>check_circle</span>
                                </span>
                            )}
                        </div>
                        <p className={styles.sectionDesc}>{section.description}</p>
                        {i < userMessages.length && (
                            <div className={styles.userExcerpt}>
                                <span className={styles.excerptLabel}>Your input:</span>
                                <span className={styles.excerptText}>
                                    {userMessages[i].length > 120
                                        ? userMessages[i].substring(0, 120) + '...'
                                        : userMessages[i]
                                    }
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tip */}
            <div className={styles.tip}>
                <span className="material-icons-round" style={{ fontSize: '16px', color: '#f59e0b' }}>lightbulb</span>
                <span>Keep it warm and nostalgic, even if the story ends differently.</span>
            </div>
        </div>
    );
}

export default EssaySummary;
