import { motion } from 'framer-motion';

interface SentimentGaugeProps {
    summary: {
        Positive: number;
        Negative: number;
        Neutral: number;
    };
}

export const SentimentGauge = ({ summary }: SentimentGaugeProps) => {
    const total = summary.Positive + summary.Negative + summary.Neutral;

    // Calculate a simple "Sentiment Index" from -100 to 100
    // Positive = +1, Negative = -1, Neutral = 0
    let score = 0;
    if (total > 0) {
        score = ((summary.Positive - summary.Negative) / total) * 100;
    }

    const normalizedScore = Math.max(-100, Math.min(100, score)); // clamp

    let color = "#9ca3af"; // gray
    let label = "Neutral";
    if (normalizedScore > 10) {
        color = "#22c55e"; // green
        label = "Positive";
    } else if (normalizedScore < -10) {
        color = "#ef4444"; // red
        label = "Negative";
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Overall Sentiment</h3>
            <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * (Math.abs(normalizedScore) / 100))}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * (Math.abs(normalizedScore) / 100)) }}
                        transition={{ duration: 1.5, type: "spring" }}
                    />
                </svg>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">{Math.round(normalizedScore)}</span>
                    <span className="text-sm font-medium" style={{ color }}>{label}</span>
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">Based on {total} tweets</p>
        </div>
    );
};
