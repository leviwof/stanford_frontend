const API_BASE = 'https://stanford-ai-backend-1.onrender.com/api';

export async function submitForm(data) {
    const response = await fetch(`${API_BASE}/submit-form/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit form');
    }

    return response.json();
}

export async function getFormEntries() {
    const response = await fetch(`${API_BASE}/form-entries/`);

    if (!response.ok) {
        throw new Error('Failed to fetch entries');
    }

    return response.json();
}