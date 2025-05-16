// pages/labs.tsx
import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import professorHierarchy from '../data/professor_hierarchy';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality',
];

export default function Labs() {
  const [selectedProf, setSelectedProf] = useState('');
  const [averages, setAverages] = useState<number[]>([]);
  const [allProfessors, setAllProfessors] = useState<string[]>([]);

  // Flatten all professor names from the hierarchy for the dropdown
  useEffect(() => {
    const flatList: string[] = [];
    professorHierarchy.forEach((u) => {
      u.schools.forEach((s) => {
        s.departments.forEach((d) => {
          d.professors.forEach((p) => flatList.push(p));
        });
      });
    });
    setAllProfessors(flatList);
  }, []);

  useEffect(() => {
    if (!selectedProf) return;
    const stored = localStorage.getItem('evaluations');
    if (stored) {
      const parsed = JSON.parse(stored);
      const allScores = parsed[selectedProf] || [];
      if (allScores.length > 0) {
        const avg = Array(6).fill(0);
        allScores.forEach((scores: number[]) => {
          scores.forEach((val, i) => {
            avg[i] += val;
          });
        });
        const final = avg.map((v) => parseFloat((v / allScores.length).toFixed(2)));
        setAverages(final);
      } else {
        setAverages([]);
      }
    }
  }, [selectedProf]);

  const data = categories.map((subject, i) => ({
    subject,
    A: averages[i] || 0,
  }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluation Results</h1>

      <label className="block mb-6 max-w-sm">
        <span className="block mb-2">Select Professor</span>
        <select
          value={selectedProf}
          onChange={(e) => setSelectedProf(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose --</option>
          {allProfessors.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>

      {averages.length > 0 ? (
        <div className="flex justify-center">
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Average Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </div>
      ) : selectedProf ? (
        <p className="text-gray-500">No evaluation data available for {selectedProf}.</p>
      ) : null}
    </main>
  );
}