import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Dr. Aris Vahn', role: 'Chief Navigator', text: 'AstroSpace Hub revolutionized our sector transit times.' },
  { name: 'Kaelen Thorne', role: 'Deep Space Analyst', text: 'Telemetry precision is unmatched in the outer rim.' },
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Pioneer Feedback</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-white text-lg mb-6">"{t.text}"</p>
              <div className="text-sm">
                <p className="font-semibold text-cyan-400">{t.name}</p>
                <p className="text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
