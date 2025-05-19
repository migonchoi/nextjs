// pages/labs.tsx
import { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
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
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState(false);

  const allProfessors = professorHierarchy.flatMap(u =>
    u.schools.flatMap(s =>
      s.departments.flatMap(d =>
        d.professors.map(p => ({
          name: p,
          university: u.university,
          school: s.school,
          department: d.department
        }))
      )
    )
  );

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

  useEffect(() => {
    if (!searchText.trim()) return;
    const match = allProfessors.find(p =>
      p.name.toLowerCase() === searchText.trim().toLowerCase()
    );
    if (match) {
      setSelection({
        university: match.university,
        school: match.school,
        department: match.department,
        professor: match.name
      });
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  }, [searchText]);

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

  const data = categories.map((subject, i) => ({
    subject,
    score: averages[i] || 0
  }));

  return (
    <main className="p-8 mx-auto max-w-full">
      <h1 className="text-3xl font-bold mb-6">Evaluation Results</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Search Professor</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter professor name"
          className="w-full p-2 border rounded"
        />
        {searchText && searchError && (
          <p className="text-red-500 mt-1">No professor found.</p>
        )}
      </div>

      <div className="my-4 text-center text-gray-500 font-semibold">Or</div>

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
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 5]} />
              <Radar
                name="Avg Score"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </main>
  );
}
