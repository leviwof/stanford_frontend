import React from 'react';
import styles from './FormPanel.module.css';

function EntryList({ entries }) {
    if (entries.length === 0) {
        return (
            <div className={styles.emptyState}>
                No entries yet. Submit the form to see entries here.
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {entries.map((entry) => (
                <div key={entry.id} className={styles.entry}>
                    <div className={styles.entryHeader}>
                        <strong>{entry.name}</strong>
                        <span>{entry.email}</span>
                    </div>
                    <p className={styles.entryMessage}>{entry.message}</p>
                    <div className={styles.entryDate}>
                        {new Date(entry.created_at).toLocaleString()}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default EntryList;