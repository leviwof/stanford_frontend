const API_BASE = 'https://stanford-ai-backend.onrender.com/api';

export async function submitForm(data) {
    try {
        const res = await fetch(`${API_BASE}/submit-form/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.error || 'Submission failed');
        }

        return json;
    } catch (err) {
        throw new Error(err.message || 'Network error. Please try again.');
    }
}

export async function getFormEntries() {
    try {
        const res = await fetch(`${API_BASE}/form-entries/`);
        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.error || 'Failed to fetch entries');
        }

        return json;
    } catch (err) {
        console.error('API error:', err);
        return { data: [] }; // Return empty array on error so UI doesn't break
    }
}