// pages/labs.tsx
import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import professorHierarchy from '../data/professors_fake';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality',
];

export default function Labs() {
  const [selection, setSelection] = useState({
    university: '',
    school: '',
    department: '',
    professor: ''
  });
  const [averages, setAverages] = useState<number[]>([]);

  const getSchools = () => {
    const uni = professorHierarchy.find(u => u.university === selection.university);
    return uni ? uni.schools : [];
  };

  const getDepartments = () => {
    const school = getSchools().find(s => s.school === selection.school);
    return school ? school.departments : [];
  };

  const getProfessors = () => {
    const dept = getDepartments().find(d => d.department === selection.department);
    return dept ? dept.professors : [];
  };

  useEffect(() => {
    if (!selection.professor) return;
    const stored = localStorage.getItem('evaluations');
    if (stored) {
      const parsed = JSON.parse(stored);
      const allScores = parsed[selection.professor] || [];
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
  }, [selection.professor]);

  const data = categories.map((subject, i) => ({
    subject,
    score: averages[i] || 0
  }));

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluation Results</h1>

      <select
        value={selection.university}
        onChange={(e) => setSelection({ university: e.target.value, school: '', department: '', professor: '' })}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">-- Select University --</option>
        {professorHierarchy.map((u) => (
          <option key={u.university} value={u.university}>{u.university}</option>
        ))}
      </select>

      {selection.university && (
        <select
          value={selection.school}
          onChange={(e) => setSelection({ ...selection, school: e.target.value, department: '', professor: '' })}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Select School --</option>
          {getSchools().map((s) => (
            <option key={s.school} value={s.school}>{s.school}</option>
          ))}
        </select>
      )}

      {selection.school && (
        <select
          value={selection.department}
          onChange={(e) => setSelection({ ...selection, department: e.target.value, professor: '' })}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Select Department --</option>
          {getDepartments().map((d) => (
            <option key={d.department} value={d.department}>{d.department}</option>
          ))}
        </select>
      )}

      {selection.department && (
        <select
          value={selection.professor}
          onChange={(e) => setSelection({ ...selection, professor: e.target.value })}
          className="w-full p-2 mb-6 border rounded"
        >
          <option value="">-- Select Professor --</option>
          {getProfessors().map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </select>
      )}

      {selection.professor && averages.length > 0 && (
        <div className="mt-8 flex justify-center">
          <RadarChart cx="50%" cy="50%" outerRadius={120} width={500} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[0, 5]} />
            <Radar name="Avg Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </div>
      )}
    </main>
  );
}
