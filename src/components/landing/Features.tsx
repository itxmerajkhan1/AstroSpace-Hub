import { motion } from 'framer-motion';
import { Zap, Compass, BarChart3 } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Quantum Data Link', desc: 'Secure, instantaneous communication across light-years.' },
  { icon: Compass, title: 'Stellar Navigation', desc: 'AI-driven pathfinding for complex space maneuvers.' },
  { icon: BarChart3, title: 'Deep Space Analytics', desc: 'Real-time telemetry and resource management metrics.' },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Core Infrastructure</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md"
            >
              <f.icon className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
