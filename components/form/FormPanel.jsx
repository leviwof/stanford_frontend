import React, { useState, useEffect } from 'react';
import { submitForm, getFormEntries } from '../../services/api.js';
import EntryList from './EntryList.jsx';
import styles from './FormPanel.module.css';

function FormPanel() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const result = await getFormEntries();
            setEntries(result.data || []);
        } catch (err) {
            console.error('Failed to fetch entries:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await submitForm(formData);
            setSuccess('Form submitted successfully!');
            setFormData({ name: '', email: '', message: '' });
            fetchEntries();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Form Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: 'var(--brand-primary)' }}>
                        mail
                    </span>
                    <h2 className={styles.cardTitle}>Contact Form</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Write your message here..."
                            rows={4}
                        />
                    </div>

                    {error && (
                        <div className={styles.alert + ' ' + styles.alertError}>
                            <span className="material-icons-round" style={{ fontSize: '18px' }}>error_outline</span>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className={styles.alert + ' ' + styles.alertSuccess}>
                            <span className="material-icons-round" style={{ fontSize: '18px' }}>check_circle</span>
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                        id="submit-form-btn"
                    >
                        {loading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit
                                <span className="material-icons-round" style={{ fontSize: '18px' }}>send</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Entries Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: 'var(--brand-secondary)' }}>
                        list_alt
                    </span>
                    <h2 className={styles.cardTitle}>Submitted Entries</h2>
                    <span className={styles.countBadge}>{entries.length}</span>
                </div>
                <EntryList entries={entries} />
            </div>
        </div>
    );
}

export default FormPanel;