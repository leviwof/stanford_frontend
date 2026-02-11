import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': 'https://stanford-ai-backend-1.onrender.com',
            '/voice': {
                target: 'wss://stanford-ai-backend-1.onrender.com',
                ws: true
            }
        }
    }
});