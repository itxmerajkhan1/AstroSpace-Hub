import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Rocket, 
  Cpu, 
  Layers, 
  Terminal, 
  ShieldAlert, 
  Globe, 
  Wifi, 
  Database,
  Lock,
  Compass,
  Zap,
  Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // Custom Interactive States for other tabs
  const [gravityShield, setGravityShield] = useState(true);
  const [warpFactor, setWarpFactor] = useState(4.82);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'LOCKED'>('LOCKED');

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const handleSyncInitiation = () => {
    setSyncStatus('SYNCING');
    toast.success('Sync handshake in progress...');
    setTimeout(() => {
      setSyncStatus('LOCKED');
      toast.success('Quantum resonance synced perfectly!');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white flex overflow-hidden font-sans select-none">
      
      {/* Abstract Glowing Nebula Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none" />

      {/* Vertical Navigation Docking Panel */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Topbar onLogout={handleLogout} />

        {/* Dynamic Tab Workspace Container */}
        <div className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Visual Banner Block */}
                <div className="p-8 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-950/40 border border-white/5 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none filter blur-2xl" />
                  <div>
                    <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-3">
                      <Wifi className="w-3.5 h-3.5 text-cyan-400" /> SYNCED SECURE_GRID
                    </span>
                    <h1 className="text-3xl font-black text-white tracking-tight">Welcome to AstroSpace Hub</h1>
                    <p className="text-gray-400 text-sm mt-2 max-w-xl">
                      Quantum Telemetry active for <span className="text-cyan-400 font-mono">{user?.email}</span>. System stability is reporting optimal across all galaxy links.
                    </p>
                  </div>
                  <button 
                    onClick={handleSyncInitiation}
                    disabled={syncStatus === 'SYNCING'}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider px-6 py-3.5 rounded-xl font-mono shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" /> 
                    {syncStatus === 'SYNCING' ? 'SYNCING...' : 'INITIATE QUANTUM SYNC'}
                  </button>
                </div>

                {/* Performance Analytics Grid */}
                <StatsGrid />

                {/* Subsections: Active Grid Mapping & System Logs */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <ActivityFeed />
                  </div>
                  
                  {/* Visual Diagnostic Quick Panel */}
                  <div className="lg:col-span-1 p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl flex flex-col justify-between h-full min-h-[300px]">
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                        <Database className="w-4 h-4" /> SECURE SPACE DATABASE
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-mono">
                        LOCAL CACHE: ACTIVE<br />
                        ENCRYPTION: 2048-QBIT AES<br />
                        INTEGRITY PROOF: GENERATED<br />
                        DB STATUS: ONLINE
                      </p>
                    </div>

                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">SECTOR LINK:</span>
                        <span className="text-cyan-400 font-bold">L4_PROXIMA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">SYNCHRONY:</span>
                        <span className="text-indigo-400 font-bold">100.00%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TELEMETRY VIEW TAB */}
            {activeTab === 'telemetry' && (
              <motion.div
                key="telemetry-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="bg-slate-950/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl space-y-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <Layers className="text-cyan-400" /> SYSTEM TELEMETRY CONTROL PANEL
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Manually balance subspace warp factor harmonics to calibrate deep space telemetry reception arrays.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 items-center pt-4">
                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-6">
                      <div className="flex justify-between font-mono text-sm">
                        <span className="text-gray-400">WARP ENGINE HARMONICS</span>
                        <span className="text-cyan-400 font-bold">{warpFactor} GHz</span>
                      </div>
                      <input 
                        type="range" 
                        min="1.0" 
                        max="8.0" 
                        step="0.01"
                        value={warpFactor}
                        onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-gray-500">
                        <span>MIN: 1.0 GHz</span>
                        <span>TARGET: 4.82 GHz</span>
                        <span>MAX: 8.0 GHz</span>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4">
                      <h4 className="font-mono text-xs text-gray-400 uppercase">TELEMETRY DIAGNOSIS REPORT</h4>
                      <p className="text-xs font-mono text-gray-400 leading-relaxed">
                        WARP CALIBRATION: {warpFactor === 4.82 ? 'PERFECTLY ALIGNED' : 'DRIFTING FROM TARGET'}<br />
                        LATENCY ESTIMATE: {+(0.004 * (4.82 / warpFactor)).toFixed(4)} ms<br />
                        ENERGY DRAIN: {+(82 * (warpFactor / 4.82)).toFixed(1)} MW
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* QUANTUM NODES VIEW TAB */}
            {activeTab === 'nodes' && (
              <motion.div
                key="nodes-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {['ALPHA', 'BETA', 'GAMMA'].map((node, i) => (
                  <div key={node} className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl flex flex-col justify-between h-64 shadow-lg shadow-indigo-500/[0.02]">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-cyan-400">NODE_{node}_GRID</span>
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-mono">Quantum Node {i + 1}</h3>
                      <p className="text-xs text-gray-400 mt-2 font-mono">
                        COHERENCE: {98 + i * 0.5}%<br />
                        LINK INDEX: PROXIMA_SEC_{100 + i * 14}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between text-xs font-mono">
                      <span className="text-gray-500">STATE:</span>
                      <span className="text-cyan-400 font-bold">LOCKED_SYNC</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* SYSTEM TERMINAL VIEW TAB */}
            {activeTab === 'terminal' && (
              <motion.div
                key="terminal-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <Terminal className="text-cyan-400 w-6 h-6" />
                  <h3 className="text-md font-mono font-bold tracking-wider text-white">SYS_DIAGNOSTIC_TERMINAL</h3>
                </div>
                <div className="bg-black/60 p-6 rounded-2xl font-mono text-xs text-cyan-300 border border-white/5 min-h-[250px] leading-relaxed">
                  <p className="text-gray-500">// AstroSpace Hub Terminal Client v3.8</p>
                  <p className="text-gray-500">// Connected as: {user?.email}</p>
                  <p className="mt-4 text-emerald-400">&gt; astro-cli status --all</p>
                  <p className="text-white ml-4">NODE_ALPHA: ONLINE (Latency: 0.0042ms)</p>
                  <p className="text-white ml-4">NODE_BETA: ONLINE (Latency: 0.0045ms)</p>
                  <p className="text-white ml-4">NODE_GAMMA: ONLINE (Latency: 0.0050ms)</p>
                  <p className="mt-2 text-emerald-400">&gt; astro-cli firewall --check</p>
                  <p className="text-white ml-4">FIREWALL_MESH: ACTIVE (2048-QBIT ENCRYPTED)</p>
                  <p className="text-white ml-4">INTRUSION_LOG: 0 ATTEMPTS DETECTED IN LAST 24H</p>
                  <p className="mt-4 animate-pulse text-cyan-400">&gt;_</p>
                </div>
              </motion.div>
            )}

            {/* SECURITY GRID TAB */}
            {activeTab === 'security' && (
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl space-y-6"
              >
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Lock className="text-cyan-400" /> DEFENSIVE FIREWALL SECURITY SHIELDS
                </h2>
                <p className="text-gray-400 text-sm">
                  Toggle planetary gravitational defense shields to redirect subspace probe interference.
                </p>

                <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between gap-6">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">PLANETARY GRAVITY SHIELD DEFENSER</h4>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      Redirection angle: 142.8 degrees // Current load: 100% stable.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setGravityShield(!gravityShield);
                      toast.success(`Gravity Shield ${!gravityShield ? 'ENABLED' : 'DISABLED'}`);
                    }}
                    className={`px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all border ${
                      gravityShield 
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    {gravityShield ? 'SHIELD_ACTIVE' : 'SHIELD_OFFLINE'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SETTINGS VIEW TAB */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl space-y-6"
              >
                <h2 className="text-xl font-bold text-white">SYSTEM SETTINGS</h2>
                <p className="text-gray-400 text-sm">Configure system preferences and administrator telemetry sync values.</p>
                <div className="border-t border-white/5 pt-6 space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.03]">
                    <span className="text-gray-400">ADMINISTRATOR_EMAIL</span>
                    <span className="text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/[0.03]">
                    <span className="text-gray-400">ENCRYPTION_STANDARD</span>
                    <span className="text-white">AES-256 (QUANTUM HARDENED)</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">SYSTEM_COMPILER_BUILD</span>
                    <span className="text-cyan-400">v3.8.42 - FINALIZED</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};
