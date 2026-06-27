import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CosmicScene } from './3d/CosmicScene';
import { Loader2, Compass, Shield, Orbit } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Hero3D component integrating R3F Canvas with postprocessing effects and HTML overlay.
 */
export const Hero3D = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030303] flex items-center justify-center">
      {/* Three.js R3F Canvas Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#030303] text-cyan-400">
              <Loader2 className="animate-spin mr-2 h-8 w-8" />
              Loading Hyperdrive...
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={['#030303']} />
            
            <CosmicScene />

            {/* Post-Processing Effects */}
            <EffectComposer>
              <Bloom
                intensity={1.2}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>

      {/* Cyberpunk Floating Technical Specs Overlay */}
      <div className="absolute top-24 left-6 md:left-12 z-10 hidden lg:block pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/10 rounded-2xl p-6 w-72 text-left space-y-4">
          <div className="text-cyan-400 font-mono text-xs flex items-center gap-2">
            <Orbit className="w-4 h-4 animate-spin" /> SYSTEM OK // L-4 SECTOR
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            GRAVITY SHIELD: 100%<br />
            STABILIZERS: ACTIVE<br />
            COMM-LINK: QUANTUM SECURE<br />
            LATENCY: 0.000001ms
          </p>
        </div>
      </div>

      {/* Main Glassmorphic Text & Form Overlay */}
      <div className="relative z-10 max-w-4xl text-center px-6 pointer-events-auto mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mx-auto">
            <Shield className="w-3.5 h-3.5" /> Next-Gen Space Infrastructure
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 py-2">
            ASTROSPACE HUB
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Architecting the future of galactic exploration. Instantaneous cross-lightyear calculations, secure telemetry pipelines, and orbital data synchronization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="relative group bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-md px-8 py-4 rounded-full shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-400/35 overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Launch Console
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white font-semibold text-md px-8 py-4 rounded-full border border-white/15 transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5" /> View Galaxy Map
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
