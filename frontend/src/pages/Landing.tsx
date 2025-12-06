import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const Landing = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/dashboard?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl w-full"
            >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 mb-6 tracking-tight">
                    Global Sentiment Tracker
                </h1>
                <p className="text-xl text-gray-400 mb-12">
                    Analyze the world's opinion on any topic. From Markets to Movies.
                </p>

                <form onSubmit={handleSearch} className="relative w-full max-w-lg mx-auto">
                    <input
                        type="text"
                        placeholder="Search anything (e.g. Bitcoin, Marvel, elections)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full py-4 pl-14 pr-6 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all backdrop-blur-sm text-lg"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-primary hover:bg-primary/80 text-white font-medium transition-colors"
                    >
                        Analyze
                    </button>
                </form>

                <div className="mt-12 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span>Popular:</span>
                    {['Bitcoin', 'Apple', 'Election', 'AI'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => navigate(`/dashboard?q=${tag}`)}
                            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
