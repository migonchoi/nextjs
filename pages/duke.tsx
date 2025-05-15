import Link from 'next/link';

const departments = {
  'Mechanical Engineering and Materials Science': [
    'Dr. David Mitzi',

  ],
  'Electrical and Computer Engineering': [
    'Dr. Yiran Chen',
    'Dr. Jeffrey Glass'
  ]
};

export default function DukeLabs() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Duke Engineering Labs</h1>
      {Object.entries(departments).map(([dept, professors]) => (
        <div key={dept} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{dept}</h2>
          <ul className="list-disc list-inside">
            {professors.map((prof) => (
              <li key={prof} className="mb-1">
                <Link href={`/${prof.toLowerCase().replace(/ /g, '-')}`} className="text-blue-600 hover:underline">
                  {prof}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
