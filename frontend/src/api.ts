import axios from 'axios';

// In production (Vercel), we rely on the rewrite /api -> backend
// In dev (Vite), we rely on the proxy /api -> localhost:8000
const API_URL = import.meta.env.PROD ? '/api' : '/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Tweet {
    id: string;
    text: string;
    created_at: string;
    metrics: {
        retweet_count: number;
        reply_count: number;
        like_count: number;
        quote_count: number;
    } | null;
    sentiment: "Positive" | "Negative" | "Neutral";
    sentiment_score: number;
    source?: string;
}

export interface AnalysisResponse {
    summary: {
        Positive: number;
        Negative: number;
        Neutral: number;
    };
    tweets: Tweet[];
}
