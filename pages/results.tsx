import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality',
];

export default function Results() {
  const [scores, setScores] = useState<number[]>([]);
  const professor = 'Dr. bong bong bong'; // 일단 하드코딩

  useEffect(() => {
    const stored = localStorage.getItem('evaluations');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[professor]) {
        setScores(parsed[professor]);
      }
    }
  }, []);

  const data = categories.map((subject, i) => ({
    subject,
    A: scores[i] || 0,
  }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluation Results: {professor}</h1>
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </main>
  );
}
