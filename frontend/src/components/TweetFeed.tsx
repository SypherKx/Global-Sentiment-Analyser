import { motion } from 'framer-motion';
import type { Tweet } from '../api';
import { Heart, Repeat, Twitter, Newspaper } from 'lucide-react';

interface TweetFeedProps {
    tweets: Tweet[];
}

export const TweetFeed = ({ tweets }: TweetFeedProps) => {
    return (
        <div className="space-y-4">
            {tweets.map((tweet, index) => (
                <motion.div
                    key={tweet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel p-4 rounded-xl border-l-4 relative overflow-hidden"
                    style={{
                        borderLeftColor:
                            tweet.sentiment === 'Positive' ? '#22c55e' :
                                tweet.sentiment === 'Negative' ? '#ef4444' : '#9ca3af'
                    }}
                >
                    <div className="absolute top-2 right-2 opacity-50">
                        {tweet.source === 'reddit' ? (
                            <span className="text-orange-500 font-bold text-xs tracking-wider border border-orange-500/30 px-2 py-0.5 rounded-full bg-orange-500/10">REDDIT</span>
                        ) : tweet.source === 'news' ? (
                            <div className="bg-purple-500/10 p-1.5 rounded-full">
                                <Newspaper size={14} className="text-purple-400" />
                            </div>
                        ) : (
                            <div className="bg-[#1DA1F2]/10 p-1.5 rounded-full">
                                <Twitter size={14} className="text-[#1DA1F2]" />
                            </div>
                        )}
                    </div>

                    <p className="text-gray-200 text-sm leading-relaxed mb-3 pr-8">{tweet.text}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1"><Heart size={14} /> <span>{tweet.metrics?.like_count || 0}</span></span>
                            <span className="flex items-center space-x-1"><Repeat size={14} /> <span>{tweet.metrics?.retweet_count || 0}</span></span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${tweet.sentiment === 'Positive' ? 'bg-green-500/10 text-green-500' :
                                tweet.sentiment === 'Negative' ? 'bg-red-500/10 text-red-500' :
                                    'bg-gray-500/10 text-gray-500'
                                }`}>
                                {tweet.sentiment}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
