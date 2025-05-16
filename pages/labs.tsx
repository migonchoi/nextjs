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
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedProf, setSelectedProf] = useState('');
  const [averages, setAverages] = useState<number[]>([]);

  const schools = professorHierarchy.find(u => u.university === selectedUni)?.schools || [];
  const departments = schools.find(s => s.school === selectedSchool)?.departments || [];
  const professors = departments.find(d => d.department === selectedDept)?.professors || [];

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

      {/* University Dropdown */}
      <label className="block mb-4">
        <span className="block mb-2">Select University</span>
        <select value={selectedUni} onChange={(e) => {
          setSelectedUni(e.target.value);
          setSelectedSchool('');
          setSelectedDept('');
          setSelectedProf('');
        }} className="w-full p-2 border rounded">
          <option value="">-- Choose --</option>
          {professorHierarchy.map((u) => (
            <option key={u.university} value={u.university}>{u.university}</option>
          ))}
        </select>
      </label>

      {/* School Dropdown */}
      {selectedUni && (
        <label className="block mb-4">
          <span className="block mb-2">Select School</span>
          <select value={selectedSchool} onChange={(e) => {
            setSelectedSchool(e.target.value);
            setSelectedDept('');
            setSelectedProf('');
          }} className="w-full p-2 border rounded">
            <option value="">-- Choose --</option>
            {schools.map((s) => (
              <option key={s.school} value={s.school}>{s.school}</option>
            ))}
          </select>
        </label>
      )}

      {/* Department Dropdown */}
      {selectedSchool && (
        <label className="block mb-4">
          <span className="block mb-2">Select Department</span>
          <select value={selectedDept} onChange={(e) => {
            setSelectedDept(e.target.value);
            setSelectedProf('');
          }} className="w-full p-2 border rounded">
            <option value="">-- Choose --</option>
            {departments.map((d) => (
              <option key={d.department} value={d.department}>{d.department}</option>
            ))}
          </select>
        </label>
      )}

      {/* Professor Dropdown */}
      {selectedDept && (
        <label className="block mb-6 max-w-sm">
          <span className="block mb-2">Select Professor</span>
          <select
            v
