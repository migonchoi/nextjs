// pages/evaluate.tsx
import { useState } from 'react';
import professorHierarchy from '../data/professor_hierarchy';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality',
];

export default function Evaluate() {
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedProf, setSelectedProf] = useState('');
  const [scores, setScores] = useState(Array(6).fill(3));

  const handleChange = (index: number, value: number) => {
    const updated = [...scores];
    updated[index] = value;
    setScores(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProf) {
      alert('Please select a professor.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('evaluations') || '{}');
    const prev = existing[selectedProf] || [];
    existing[selectedProf] = [...prev, scores];
    localStorage.setItem('evaluations', JSON.stringify(existing));

    alert('Thank you for your evaluation!');
    window.location.href = '/labs';
  };

  const schools = professorHierarchy.find(u => u.university === selectedUni)?.schools || [];
  const departments = schools.find(s => s.school === selectedSchool)?.departments || [];
  const professors = departments.find(d => d.department === selectedDept)?.professors || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluate a Professor</h1>

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

      {selectedDept && (
        <label className="block mb-4">
          <span className="block mb-2">Select Professor</span>
          <select value={selectedProf} onChange={(e) => setSelectedProf(e.target.value)} className="w-full p-2 border rounded">
            <option value="">-- Choose --</option>
            {professors.map((prof) => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>
        </label>
      )}

      {selectedProf && categories.map((cat, i) => (
        <div key={cat} className="mb-4">
          <label className="block mb-1">{cat}</label>
          <input
            type="range"
            min={1}
            max={5}
            value={scores[i]}
            onChange={(e) => handleChange(i, parseInt(e.target.value))}
            className="w-full"
          />
          <span>{scores[i]}</span>
        </div>
      ))}

      <button type="submit" className="mt-6 px-4 py-2 bg-black text-white rounded">Submit</button>
    </form>
  );
}
