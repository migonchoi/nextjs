// pages/evaluate.tsx
import { useState } from 'react';
import professors from '../data/professors';

const categories = [
  'Personal Character',
  'Lab Environment',
  'Manuscript Guidance',
  'Research Direction Setting',
  'Career Support & Networking',
  'Recommendation Letter Quality'
];

export default function Evaluate() {
  const [form, setForm] = useState({ professor: '', scores: Array(6).fill(3) });

  const handleChange = (index: number, value: number) => {
    const updated = [...form.scores];
    updated[index] = value;
    setForm({ ...form, scores: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.professor) {
      alert('Please select a professor.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('evaluations') || '{}');
    const prev = existing[form.professor] || [];
    existing[form.professor] = [...prev, form.scores];
    localStorage.setItem('evaluations', JSON.stringify(existing));

    alert('Thank you for your evaluation!');
    window.location.href = '/labs';
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluate a Professor</h1>
      <label className="block mb-4">
        <span className="block mb-2">Select Professor</span>
        <select
          value={form.professor}
          onChange={(e) => setForm({ ...form, professor: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose --</option>
          {professors.map((prof) => (
            <option key={prof.name} value={prof.name}>{prof.name}</option>
          ))}
        </select>
      </label>

      {categories.map((cat, i) => (
        <div key={cat} className="mb-4">
          <label className="block mb-1">{cat}</label>
          <input
            type="range"
            min={1}
            max={5}
            value={form.scores[i]}
            onChange={(e) => handleChange(i, parseInt(e.target.value))}
            className="w-full"
          />
          <span>{form.scores[i]}</span>
        </div>
      ))}

      <button type="submit" className="mt-6 px-4 py-2 bg-black text-white rounded">Submit</button>
    </form>
  );
}
