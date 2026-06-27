import { motion } from 'framer-motion';

export const Community = () => {
  return (
    <section id="community" className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-4xl mx-auto text-center p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
        <h2 className="text-4xl font-bold text-white mb-6">Join the Cosmic Network</h2>
        <p className="text-gray-400 mb-10">Connect with pioneers across the galaxy and contribute to the collective knowledge of deep space operations.</p>
        <button className="bg-cyan-500 text-black px-10 py-4 rounded-full font-semibold hover:bg-white transition-all">
          Request Access Token
        </button>
      </div>
    </section>
  );
};
