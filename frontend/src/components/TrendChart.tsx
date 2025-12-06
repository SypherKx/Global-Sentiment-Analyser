import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TrendChartProps {
    summary: {
        Positive: number;
        Negative: number;
        Neutral: number;
    };
}

export const TrendChart = ({ summary }: TrendChartProps) => {
    const data = [
        { name: 'Positive', value: summary.Positive, color: '#22c55e' },
        { name: 'Neutral', value: summary.Neutral, color: '#9ca3af' },
        { name: 'Negative', value: summary.Negative, color: '#ef4444' },
    ];

    return (
        <div className="p-6 glass-card rounded-2xl w-full h-full min-h-[300px] flex flex-col">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Sentiment Distribution</h3>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
