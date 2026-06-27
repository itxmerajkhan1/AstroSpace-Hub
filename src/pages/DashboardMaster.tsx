import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Database, 
  Layers, 
  Cpu, 
  Activity, 
  Wifi, 
  RefreshCw,
  Award,
  Terminal,
  Signal,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardMaster: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Load real-time synced profile data + telemetry from our custom hook
  const { profileData, isDataLoading, syncError, telemetry } = useDashboardData(user?.uid);

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  // Capture real-time updates into the terminal logs
  useEffect(() => {
    if (profileData) {
      const now = new Date().toLocaleTimeString();
      setTelemetryLogs(prev => [
        `[${now}] Handshake verified. Synced profile for @${profileData.username}`,
        `[${now}] Telemetry status: ${telemetry.connectionStatus} | Ping: ${telemetry.pingMs}ms`,
        ...prev.slice(0, 5)
      ]);
    }
  }, [profileData, telemetry.connectionStatus]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Session destroyed successfully.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const calculateCompleteness = (): number => {
    if (!profileData) return 0;
    let score = 0;
    if (profileData.displayName) score += 20;
    if (profileData.username) score += 20;
    if (profileData.bio) score += 20;
    if (profileData.skills && profileData.skills.length > 0) score += 20;
    if (profileData.socials?.github || profileData.socials?.linkedin) score += 20;
    return score;
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white flex overflow-hidden font-sans select-none">
      {/* Visual Background Glow Filters */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 filter blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Docked Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'settings') {
            setIsEditing(true);
          } else {
            setIsEditing(false);
          }
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Primary Content Stage */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10">
        
        {/* Pass user profile data down to the Topbar */}
        <Topbar onLogout={handleLogout} profile={profileData} />

        {/* Sync Fault Alert Strip */}
        {syncError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 md:mx-8 mt-4 p-4 bg-rose-500/10 border border-rose-500/35 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 animate-pulse">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-rose-300">CORE_TELEMETRY_SYNC_FAULT</h4>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">{syncError}</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-lg text-[9px] font-mono text-rose-400">
              DISRUPTED
            </div>
          </motion.div>
        )}

        {/* Dashboard Workspace Grid */}
        <div className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Welcome Dashboard Hub Header */}
          <div className="p-8 bg-gradient-to-r from-cyan-950/20 via-indigo-950/20 to-slate-950/20 border border-white/5 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none filter blur-2xl" />
            <div>
              <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-3">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Live Telemetry Synced
              </span>
              <h1 className="text-3xl font-black text-white tracking-tight">Enterprise Synaptic Control</h1>
              <p className="text-gray-400 text-sm mt-2 max-w-xl font-mono text-xs leading-relaxed">
                Welcome back, operator. The secure routing matrix is successfully bound to Firestore. All state transitions propagate dynamically.
              </p>
            </div>
            
            <button
              onClick={() => setIsEditing(prev => !prev)}
              disabled={isDataLoading}
              className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-cyan-400 font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>{isEditing ? 'VIEW_DASHBOARD' : 'EDIT_PROFILE_INLINE'}</span>
            </button>
          </div>

          {/* Skeleton Framework / Real-time Grid */}
          {isDataLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8 animate-pulse">
                <div className="h-64 bg-white/[0.02] border border-white/5 rounded-3xl" />
                <div className="h-44 bg-white/[0.02] border border-white/5 rounded-3xl" />
              </div>
              <div className="lg:col-span-1 space-y-6 animate-pulse">
                <div className="h-48 bg-white/[0.02] border border-white/5 rounded-3xl" />
                <div className="h-48 bg-white/[0.02] border border-white/5 rounded-3xl" />
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Stage Container */}
              <div className="lg:col-span-2 space-y-8">
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="profile-edit-form"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProfileEditForm 
                        profile={profileData || {
                          uid: user?.uid || '',
                          username: '',
                          displayName: '',
                          bio: '',
                          avatarUrl: '',
                          bannerUrl: '',
                          skills: [],
                          socials: { github: '', linkedin: '' },
                          updatedAt: new Date()
                        }}
                        onClose={() => setIsEditing(false)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="profile-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* Mount ProfileCard inside the dashboard grid */}
                      <ProfileCard 
                        profile={profileData || {
                          uid: user?.uid || '',
                          username: 'ghost',
                          displayName: 'NEURAL USER',
                          bio: '',
                          avatarUrl: '',
                          bannerUrl: '',
                          skills: [],
                          socials: { github: '', linkedin: '' },
                          updatedAt: new Date()
                        }}
                        onEditToggle={() => setIsEditing(true)}
                      />
                      
                      {/* Stats and telemetry metrics */}
                      <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl">
                        <span className="block font-mono text-[10px] tracking-widest text-cyan-400 uppercase mb-4">
                          PERFORMANCE_METRICS_GRID
                        </span>
                        <StatsGrid />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Stage Diagnostics */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Real-time sync completeness & port tracking */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-xl pointer-events-none" />
                  
                  <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" /> RESIDENCY_METRIC
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end font-mono text-xs mb-2">
                        <span className="text-gray-400">SYNC_MATRIX_INTEGRITY</span>
                        <span className="text-cyan-400 font-bold">{calculateCompleteness()}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateCompleteness()}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/5 font-mono text-[11px] text-gray-400">
                      <div className="flex justify-between">
                        <span>active_port_latency:</span>
                        <span className="text-white font-bold">{telemetry.pingMs} ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>telemetry_bandwidth:</span>
                        <span className="text-white font-bold">{telemetry.bandwidthUsage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>system_state:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> SECURED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Diagnostic Shell Console */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-mono font-bold tracking-widest text-indigo-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400 animate-pulse" /> LIVE TELEMETRY SHELL
                    </h3>
                    <Signal className="w-4 h-4 text-cyan-400" />
                  </div>

                  <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-56 overflow-y-auto pr-2 scrollbar-thin">
                    {telemetryLogs.map((log, index) => (
                      <div key={index} className="text-gray-400 border-l-2 border-indigo-500/25 pl-2 py-0.5">
                        {log}
                      </div>
                    ))}
                    <div className="text-cyan-500 animate-pulse">&gt; Waiting for next event...</div>
                  </div>
                </div>

                {/* Subsystem core values */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
                  <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-cyan-500/5 filter blur-2xl pointer-events-none" />
                  <div>
                    <h3 className="text-xs font-mono font-bold tracking-widest text-gray-400 mb-2 uppercase flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400" /> Synaptic Anchor
                    </h3>
                    <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                      All transaction payloads verified with cryptographic integrity before writing into the Firestore system.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-1.5 text-cyan-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>UPTIME: {telemetry.uptimeSeconds}s</span>
                    </div>
                    <span className="text-indigo-400">AES_256_ACTIVE</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
