// pages/contact.tsx
export default function Contact() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg max-w-2xl mb-4">
        Questions? Feedback? Reach out to us at:
      </p>
      <ul className="list-disc list-inside">
        <li>Email: <a href="mailto:info@phdsafe.com" className="text-blue-600 underline">info@phdsafe.com</a></li>
        <li>Instagram: @phdsafe</li>
        <li>Twitter: @phdsafe</li>
      </ul>
    </main>
  );
}
