import axios from 'axios';

// For Vercel deployment: Use client-side mock data generation
// This ensures the app ALWAYS works, even without a live backend

export const api = axios.create({
    baseURL: '/api', // This will be handled by our mock interceptor
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

// ============ CLIENT-SIDE MOCK DATA GENERATOR ============
// This runs entirely in the browser - NO BACKEND NEEDED

const templates = {
    Positive: [
        "Bullish on {topic}! The fundamentals look incredibly strong right now. 🚀",
        "Just saw amazing news about {topic}. This is a game changer!",
        "Everyone's talking about {topic} today. The hype is real! 🔥",
        "Can't believe how well {topic} is performing. Holding strong! 💎",
        "The community around {topic} is the best. So much positivity!",
        "10/10 would recommend looking into {topic}. Incredible potential.",
        "Finally, {topic} is getting the recognition it deserves!",
        "Massive respect for what {topic} is doing. Revolutionary. 👏",
    ],
    Negative: [
        "Disappointed with {topic} lately. Feels like it's losing momentum. 📉",
        "I'm out of {topic}. Too much uncertainty right now.",
        "The hype around {topic} is fading. Time to move on.",
        "Major red flags appearing for {topic}. Be careful everyone.",
        "Unpopular opinion: {topic} is overrated. Don't @ me.",
        "Why is everyone so obsessed with {topic}? I don't get it.",
        "The controversy surrounding {topic} is getting out of hand.",
        "Expected more from {topic}. This is underwhelming at best.",
    ],
    Neutral: [
        "Just reading up on {topic}. Interesting developments.",
        "Mixed signals on {topic} today. Market is undecided.",
        "Watching {topic} closely. Key levels to watch.",
        "Hmm, thinking about {topic}. What do you all think?",
        "{topic} is trending. Let's see where this goes.",
        "Reading the latest discussion on {topic}.",
    ]
};

const sources = ['twitter', 'reddit', 'news'];

function generateMockData(query: string): AnalysisResponse {
    const tweets: Tweet[] = [];
    const summary = { Positive: 0, Negative: 0, Neutral: 0 };

    // Random bias for this search session
    const biases = ['Positive', 'Negative', 'Neutral', 'Mixed'];
    const bias = biases[Math.floor(Math.random() * biases.length)];

    for (let i = 0; i < 15; i++) {
        let sentiment: 'Positive' | 'Negative' | 'Neutral';

        if (bias === 'Positive') {
            sentiment = Math.random() < 0.7 ? 'Positive' : (Math.random() < 0.5 ? 'Neutral' : 'Negative');
        } else if (bias === 'Negative') {
            sentiment = Math.random() < 0.7 ? 'Negative' : (Math.random() < 0.5 ? 'Neutral' : 'Positive');
        } else if (bias === 'Neutral') {
            sentiment = Math.random() < 0.6 ? 'Neutral' : (Math.random() < 0.5 ? 'Positive' : 'Negative');
        } else {
            const options: Array<'Positive' | 'Negative' | 'Neutral'> = ['Positive', 'Negative', 'Neutral'];
            sentiment = options[Math.floor(Math.random() * options.length)];
        }

        summary[sentiment]++;

        const templateList = templates[sentiment];
        const template = templateList[Math.floor(Math.random() * templateList.length)];
        const text = template.replace('{topic}', query);

        const likes = Math.floor(Math.random() * 5000);

        tweets.push({
            id: String(Date.now() + i),
            text,
            created_at: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            metrics: {
                like_count: likes,
                retweet_count: Math.floor(likes * Math.random() * 0.4),
                reply_count: Math.floor(likes * Math.random() * 0.2),
                quote_count: Math.floor(Math.random() * 50),
            },
            sentiment,
            sentiment_score: sentiment === 'Positive' ? 0.5 + Math.random() * 0.5 :
                sentiment === 'Negative' ? -0.5 - Math.random() * 0.5 :
                    Math.random() * 0.4 - 0.2,
            source: sources[Math.floor(Math.random() * sources.length)],
        });
    }

    // Shuffle
    tweets.sort(() => Math.random() - 0.5);

    return { summary, tweets };
}

// Intercept API calls and return mock data (works without backend)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If backend fails (404, network error, etc.), use mock data
        if (error.config?.url?.includes('/analyze')) {
            const query = JSON.parse(error.config.data || '{}').query || 'Topic';
            console.log('🎭 Using Smart Demo Mode for:', query);
            return Promise.resolve({
                data: generateMockData(query),
                status: 200,
                statusText: 'OK (Demo Mode)',
                headers: {},
                config: error.config,
            });
        }
        return Promise.reject(error);
    }
);

// Also add a request interceptor to enable demo mode on Vercel
api.interceptors.request.use((config) => {
    // In production without backend, immediately trigger mock response
    if (import.meta.env.PROD && config.url?.includes('/analyze')) {
        // Force a quick rejection so error interceptor handles it with mock data
        config.timeout = 3000; // 3 second timeout before falling back to mock
    }
    return config;
});
