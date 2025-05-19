// pages/evaluate.tsx
import { useState } from 'react';
import professorHierarchy from '../data/professors_fake.json';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality'
];

export default function Evaluate() {
  const [selection, setSelection] = useState({
    university: '',
    school: '',
    department: '',
    professor: ''
  });

  const [scores, setScores] = useState(Array(6).fill(3));

  const handleScoreChange = (index: number, value: number) => {
    const updated = [...scores];
    updated[index] = value;
    setScores(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selection.professor) {
      alert('Please select a professor.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('evaluations') || '{}');
    const prev = existing[selection.professor] || [];
    existing[selection.professor] = [...prev, scores];
    localStorage.setItem('evaluations', JSON.stringify(existing));

    alert('Thank you for your evaluation!');
    window.location.href = '/labs';
  };

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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluate a Professor</h1>

      {/* University */}
      <label className="block mb-4">
        <span className="block mb-2">Select University</span>
        <select
          value={selection.university}
          onChange={(e) =>
            setSelection({ university: e.target.value, school: '', department: '', professor: '' })
          }
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose --</option>
          {professorHierarchy.map((u) => (
            <option key={u.university} value={u.university}>{u.university}</option>
          ))}
        </select>
      </label>

      {/* School */}
      {selection.university && (
        <label className="block mb-4">
          <span className="block mb-2">Select School</span>
          <select
            value={selection.school}
            onChange={(e) =>
              setSelection({ ...selection, school: e.target.value, department: '', professor: '' })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose --</option>
            {getSchools().map((s) => (
              <option key={s.school} value={s.school}>{s.school}</option>
            ))}
          </select>
        </label>
      )}

      {/* Department */}
      {selection.school && (
        <label className="block mb-4">
          <span className="block mb-2">Select Department</span>
          <select
            value={selection.department}
            onChange={(e) =>
              setSelection({ ...selection, department: e.target.value, professor: '' })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose --</option>
            {getDepartments().map((d) => (
              <option key={d.department} value={d.department}>{d.department}</option>
            ))}
          </select>
        </label>
      )}

      {/* Professor */}
      {selection.department && (
        <label className="block mb-6">
          <span className="block mb-2">Select Professor</span>
          <select
            value={selection.professor}
            onChange={(e) => setSelection({ ...selection, professor: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose --</option>
            {getProfessors().map((prof) => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>
        </label>
      )}

      {/* Rating */}
      {selection.professor && (
        <>
          {categories.map((cat, i) => (
            <div key={cat} className="mb-4">
              <label className="block mb-1">{cat}</label>
              <input
                type="range"
                min={1}
                max={5}
                value={scores[i]}
                onChange={(e) => handleScoreChange(i, parseInt(e.target.value))}
                className="w-full"
              />
              <span>{scores[i]}</span>
            </div>
          ))}

          <button type="submit" className="mt-6 px-4 py-2 bg-black text-white rounded">
            Submit
          </button>
        </>
      )}
    </form>
  );
}
