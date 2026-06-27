import { motion } from 'framer-motion';

export const Explore = () => {
  return (
    <section id="explore" className="py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <div className="w-full h-96 bg-gradient-to-br from-cyan-900 to-purple-900 rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/20" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-8">Visualize the Unknown</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Our advanced imaging arrays process nebular data into actionable intelligence, allowing for unprecedented insight into uncharted galactic sectors.
          </p>
          <button className="text-cyan-400 font-semibold hover:underline">Explore Modules &rarr;</button>
        </div>
      </div>
    </section>
  );
};
