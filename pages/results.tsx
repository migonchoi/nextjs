// pages/results.tsx (Radar chart view page)
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Personal Character', score: 4.2 },
  { category: 'Lab Environment', score: 3.8 },
  { category: 'Manuscript Guidance', score: 4.5 },
  { category: 'Research Direction Setting', score: 4.0 },
  { category: 'Career Support & Networking', score: 3.6 },
  { category: 'Recommendation Letter Quality', score: 4.3 },
];

export default function Results() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluation Results: Dr. bong bong bong</h1>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius="80%">
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
            <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}