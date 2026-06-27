import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthTransitionStore } from '@/store/authTransitionStore';
import { SpaceScene } from '@/components/3d/SpaceScene';
import { CameraDirector } from '@/components/3d/CameraDirector';
import { Navbar } from '@/components/landing/Navbar';
import { 
  Rocket, 
  Cpu, 
  Terminal, 
  ShieldAlert, 
  Radio, 
  Activity, 
  RefreshCw, 
  ChevronRight, 
  LineChart, 
  Globe, 
  Power,
  Database
} from 'lucide-react';

/**
 * MainContainer - Coordinates the WebGL background scene and smooth GSAP UI states.
 */
export const MainContainer = () => {
  const { view, triggerTransition, setView } = useAuthTransitionStore();
  const [activeLog, setActiveLog] = useState<string[]>([]);
  const [telemetryValues, setTelemetryValues] = useState({
    warpFactor: 4.82,
    shieldIntegrity: 98.4,
    cpuLoad: 32.1,
    quantumSync: 100,
  });

  // Simulate real-time log streaming for high-tech dashboard immersion
  useEffect(() => {
    if (view !== 'DASHBOARD') return;

    const initialLogs = [
      'SYS_INIT: Decrypting subspace payload...',
      'SECURE_SYNC: Quantum handshake established.',
      'NODE_ACTIVE: Core telemetry linked to L-4 cluster.',
      'SHIELD_STATE: Quantum mesh active.',
    ];
    setActiveLog(initialLogs);

    const logInterval = setInterval(() => {
      const logs = [
        'TELEMETRY_STREAM: Received vector batch from Proxima b.',
        'WARP_CORE: Sync frequency corrected to 4.82GHz.',
        'ANTENNA_ARRAY: Relaying deep-space diagnostic packets.',
        'MEMORY_GRID: Flushed buffer pool at block index 9204A.',
        'THERMAL_REG: Stabilized coolant cycle at 14 Kelvin.',
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setActiveLog((prev) => [randomLog, ...prev.slice(0, 4)]);

      // Subtly fluctuate metrics for live-data illusion
      setTelemetryValues((prev) => ({
        warpFactor: +(prev.warpFactor + (Math.random() - 0.5) * 0.05).toFixed(2),
        shieldIntegrity: +(Math.min(100, prev.shieldIntegrity + (Math.random() - 0.5) * 0.2)).toFixed(1),
        cpuLoad: +(Math.max(10, Math.min(100, prev.cpuLoad + (Math.random() - 0.5) * 4.5))).toFixed(1),
        quantumSync: Math.random() > 0.95 ? 99 : 100,
      }));
    }, 1500);

    return () => clearInterval(logInterval);
  }, [view]);

  return (
    <div className="relative w-full min-h-screen bg-[#020205] text-white overflow-x-hidden font-sans select-none">
      
      {/* Fixed Fullscreen 3D WebGL Canvas Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas gl={{ antialias: true, alpha: false }}>
            <color attach="background" args={['#020205']} />
            <SpaceScene />
            <CameraDirector />
            <EffectComposer>
              <Bloom intensity={1.5} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </div>

      {/* Conditionally render header menu */}
      {view !== 'DASHBOARD' && <Navbar />}

      {/* Floating UI Containers Overlay */}
      <AnimatePresence mode="wait">
        
        {/* LANDING & TRANSITIONING VIEW STATE OVERLAYS */}
        {(view === 'LANDING' || view === 'TRANSITIONING') && (
          <motion.div
            key="landing-ui"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-6 pt-24"
          >
            {/* Cinematic Landing Typography Overlay */}
            <div className="max-w-4xl text-center space-y-8 mt-12 md:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
              >
                <Radio className="w-4 h-4 animate-pulse text-cyan-400" /> Deep Space Telemetry Terminal v3.8
              </motion.div>

              <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 py-4">
                ASTROSPACE
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Connect directly to cosmic telemetry feeds. Access instantaneous cross-lightyear calculation streams and monitor live galaxy navigation cores.
              </p>

              {/* Master Trigger Button with Cinematic GSAP & R3F Transition Handshake */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <button
                  onClick={triggerTransition}
                  disabled={view === 'TRANSITIONING'}
                  className="relative group bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-black font-black text-lg px-12 py-5 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] overflow-hidden flex items-center gap-3 disabled:opacity-50"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {view === 'TRANSITIONING' ? 'COSMIC TRANSIT IN PROGRESS...' : 'ENTER TELEMETRY PORTAL'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full mt-24 mb-12">
              {[
                { label: 'CORES OPERATIONAL', val: '1,842 / 1,842' },
                { label: 'SUBSPACE BANDWIDTH', val: '48.2 TiB/s' },
                { label: 'ACTIVE PROXIMA LINKS', val: '86 Nodes' },
                { label: 'QUANTUM ENCRYPTION', val: '2048-QBIT' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl text-center">
                  <span className="block text-[10px] font-mono tracking-widest text-gray-500 mb-1">{item.label}</span>
                  <span className="block text-md font-bold text-cyan-400 font-mono">{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* METRICS & TELEMETRY ENTERPRISE DASHBOARD OVERLAY */}
        {view === 'DASHBOARD' && (
          <motion.div
            key="dashboard-ui"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 w-full min-h-screen px-6 py-8 flex flex-col justify-between"
          >
            {/* Dashboard Upper Toolbar */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-3xl mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Rocket className="w-5 h-5 text-black font-bold" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white">ASTROSPACE TELEMETRY CORE</h1>
                  <p className="text-xs text-cyan-400 font-mono">SECTOR CORRIDOR ACTIVE // NODE L-4</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3.5 py-1.5 rounded-lg text-xs font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" /> LIVE STREAMING
                </div>
                
                {/* Outward Animation: Return back to Landing Phase */}
                <button
                  onClick={() => setView('LANDING')}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <Power className="w-4 h-4" /> RETURN TO ORBIT
                </button>
              </div>
            </header>

            {/* Dashboard Primary Grid Matrix */}
            <main className="grid lg:grid-cols-4 gap-6 items-stretch flex-grow mb-8">
              
              {/* Column 1: Core System Diagnostics */}
              <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Processor Array
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-400">
                        <span>CPU COMPUTE LOAD</span>
                        <span>{telemetryValues.cpuLoad}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${telemetryValues.cpuLoad}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="bg-cyan-400 h-full rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-400">
                        <span>WARP CORE STABILITY</span>
                        <span>{telemetryValues.shieldIntegrity}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${telemetryValues.shieldIntegrity}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="bg-indigo-500 h-full rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2.5 font-mono text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>COSMIC COMPUTES:</span>
                    <span className="text-white">OPTIMIZED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SECTOR STABILIZERS:</span>
                    <span className="text-white">LOCKED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ANTENNA COHERENCE:</span>
                    <span className="text-white">99.82%</span>
                  </div>
                </div>
              </div>

              {/* Column 2 & 3: Central High-Density Chart Data & Visualizer Map */}
              <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
                    <LineChart className="w-4 h-4" /> SUBSPACE TELEMETRY INDEX
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">2026-06-26 16:11:00 UTC</span>
                </div>

                {/* Simulated Chart Container */}
                <div className="h-44 w-full border border-white/5 bg-black/30 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
                  <div className="flex gap-1.5 items-end justify-between h-28 pt-2">
                    {[30, 45, 62, 55, 75, 40, 85, 95, 70, 60, 80, 72, 90, 100, 88].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-sm"
                          style={{ height: `${val}%` }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.8 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-white/5">
                    <span>T-30MIN</span>
                    <span>T-15MIN</span>
                    <span>CURRENT TIME</span>
                  </div>
                </div>

                {/* Subsystem grid info */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'WARP FREQ', val: `${telemetryValues.warpFactor} GHz`, change: '+0.02' },
                    { label: 'SHIELD Integrity', val: `${telemetryValues.shieldIntegrity}%`, change: 'Optimal' },
                    { label: 'QUANTUM SYNC', val: `${telemetryValues.quantumSync}%`, change: 'Locked' },
                  ].map((stat, i) => (
                    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">{stat.label}</span>
                      <span className="block text-md font-bold text-white font-mono my-0.5">{stat.val}</span>
                      <span className="block text-[9px] font-mono text-cyan-400">{stat.change}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Streaming Terminal Logs and Real-time Activity Output */}
              <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-mono tracking-widest text-cyan-400 uppercase mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Live Terminal Feed
                  </h3>
                  
                  {/* Streaming Terminal window */}
                  <div className="space-y-3 font-mono text-[10px] text-gray-400 leading-relaxed bg-black/40 border border-white/5 p-4 rounded-2xl h-56 overflow-hidden">
                    {activeLog.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`truncate border-l-2 pl-2 ${
                          index === 0 ? 'text-cyan-400 border-cyan-400 font-semibold' : 'border-white/5'
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-2xl flex items-center gap-3 text-xs">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  <p className="font-mono leading-tight">SYSTEM: Core temperatures rising but fully within tolerance threshold.</p>
                </div>
              </div>

            </main>

            {/* Dashboard Lower Footer Map Information */}
            <footer className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02] border border-white/5 backdrop-blur-xl p-4 rounded-2xl text-xs font-mono text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-cyan-400" /> SECURE GRID ACTIVE</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">NODE KEY: ASTRO-SYNC-482L</span>
              </div>
              <div>
                <span>COSMIC TRANSIT TIMELINE COMPLETED</span>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
