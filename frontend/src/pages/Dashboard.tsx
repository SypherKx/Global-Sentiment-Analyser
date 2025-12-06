import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { api, type AnalysisResponse } from '../api';
import { SentimentGauge } from '../components/SentimentGauge';
import { TrendChart } from '../components/TrendChart';
import { TweetFeed } from '../components/TweetFeed';

export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AnalysisResponse | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                // Hardcoded limit for now, could be made adjustable
                const res = await api.post('/analyze', { query, limit: 50 });
                setData(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    if (!query) {
        return <div className="text-center p-20">Please enter a search term.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <Link to="/" className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Analysis for <span className="text-primary">"{query}"</span></h1>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="animate-spin text-primary mb-4" size={48} />
                    <p className="text-gray-400">Scanning the networks...</p>
                </div>
            ) : error ? (
                <div className="p-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">
                    {error}
                </div>
            ) : data && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                >
                    {/* Top Row: Key Metrics & Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. Gauge */}
                        <div className="h-full">
                            <SentimentGauge summary={data.summary} />
                        </div>

                        {/* 2. Stats Breakdown */}
                        <div className="glass-card p-6 rounded-2xl flex flex-col justify-center h-full">
                            <h3 className="text-lg font-medium text-gray-300 mb-6">Sentiment Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-gray-300">Positive</span>
                                    </div>
                                    <span className="text-xl font-bold text-green-500">{data.summary.Positive}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                        <span className="text-gray-300">Neutral</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-400">{data.summary.Neutral}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <span className="text-gray-300">Negative</span>
                                    </div>
                                    <span className="text-xl font-bold text-red-500">{data.summary.Negative}</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Donut Chart */}
                        <div className="h-full">
                            <TrendChart summary={data.summary} />
                        </div>
                    </div>

                    {/* Bottom Row: Feed */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            Live Feed
                            <span className="text-xs font-normal px-2 py-1 rounded-full bg-white/10 text-gray-400 border border-white/5">{data.tweets.length} posts</span>
                        </h2>
                        <TweetFeed tweets={data.tweets} />
                    </div>
                </motion.div>
            )}
        </div>
    );
};
