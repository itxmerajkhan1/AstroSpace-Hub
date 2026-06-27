import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Database, 
  Layers, 
  Cpu, 
  Activity, 
  Wifi, 
  RefreshCw,
  Award,
  Link,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const { profile, isLoading, error } = useRealtimeProfile(user?.uid);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  // Log dynamic sync events in local state
  useEffect(() => {
    if (profile) {
      const now = new Date().toLocaleTimeString();
      setSyncLogs(prev => [
        `[${now}] Neural matrix synchronized for @${profile.username}`,
        ...prev.slice(0, 4)
      ]);
    }
  }, [profile]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const calculateCompleteness = (): number => {
    if (!profile) return 0;
    let score = 0;
    if (profile.displayName) score += 20;
    if (profile.username) score += 20;
    if (profile.bio) score += 20;
    if (profile.skills && profile.skills.length > 0) score += 20;
    if (profile.socials?.github || profile.socials?.linkedin) score += 20;
    return score;
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white flex overflow-hidden font-sans select-none">
      
      {/* Background visual graphics */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-cyan-500/5 filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-indigo-500/5 filter blur-[140px] pointer-events-none" />

      {/* Main navigation Sidebar */}
      <Sidebar 
        activeTab="settings"
        setActiveTab={(tab) => {
          if (tab !== 'settings') {
            navigate('/dashboard', { state: { activeTab: tab } });
          }
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Stage Panel */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto">
        <Topbar onLogout={handleLogout} />

        <div className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="p-8 bg-gradient-to-r from-cyan-950/20 via-indigo-950/20 to-slate-950/20 border border-white/5 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none filter blur-2xl" />
            <div>
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-3">
                <Wifi className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> FIRESTORE REALTIME TUNING
              </span>
              <h1 className="text-3xl font-black text-white tracking-tight">Synaptic Identity Hub</h1>
              <p className="text-gray-400 text-sm mt-2 max-w-xl font-mono text-xs">
                Real-time snapshot synchronization active. All alterations propagate downstream to peripheral sectors instantaneously.
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsEditing(prev => !prev);
              }}
              className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-cyan-400 font-mono text-xs font-bold tracking-wider transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>{isEditing ? 'VIEW_MODE' : 'CALIBRATE_MODE'}</span>
            </button>
          </div>

          {/* Loading state indicator */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10" />
                <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin" />
              </div>
              <p className="text-xs font-mono tracking-widest text-cyan-400 animate-pulse">
                SYNCING SECURE PROFILE MATRIX...
              </p>
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl backdrop-blur-xl text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-md font-mono font-bold tracking-wide text-white">SYNC INTERFERENCE DETECTED</h3>
              <p className="text-xs text-gray-400 font-mono">
                {error.message || 'An unknown anomaly occurred while connecting to the core.'}
              </p>
            </div>
          ) : profile ? (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column: Profile Card / Edit Form */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <ProfileEditForm 
                      key="edit-form"
                      profile={profile}
                      onClose={() => setIsEditing(false)}
                    />
                  ) : (
                    <ProfileCard 
                      key="profile-card"
                      profile={profile}
                      onEditToggle={() => setIsEditing(true)}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Diagnostic & Status Widgets */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* 1. Sync Health Score */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-28 h-28 bg-indigo-500/5 rounded-full filter blur-xl pointer-events-none" />
                  
                  <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" /> IDENTITY_STATUS
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end font-mono text-xs mb-1.5">
                        <span className="text-gray-400">SYNC_COMPLETENESS</span>
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

                    <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-[11px] text-gray-400">
                      <div className="flex justify-between">
                        <span>skills_matrix:</span>
                        <span className="text-white font-bold">{profile.skills?.length || 0} loaded</span>
                      </div>
                      <div className="flex justify-between">
                        <span>active_ports:</span>
                        <span className="text-white font-bold">
                          {Object.values(profile.socials || {}).filter(Boolean).length} / 3 connected
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>database_sync:</span>
                        <span className="text-emerald-400 font-bold">ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. System Diagnostic Console */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-400" /> LIVE_PROFILE_TELEMETRY
                  </h3>

                  <div className="space-y-2.5 font-mono text-[10px] leading-relaxed max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                    {syncLogs.length > 0 ? (
                      syncLogs.map((log, index) => (
                        <div key={index} className="text-cyan-300/80 border-l border-cyan-500/20 pl-2">
                          {log}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 italic">Listening for network transactions...</div>
                    )}
                  </div>
                </div>

                {/* 3. Encryption Standard Information */}
                <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-xl rounded-3xl relative overflow-hidden flex flex-col justify-between h-44">
                  <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-cyan-500/5 filter blur-2xl pointer-events-none" />
                  <div>
                    <h3 className="text-xs font-mono font-bold tracking-widest text-gray-400 mb-2 uppercase flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400" /> Relational Invariant
                    </h3>
                    <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
                      All modifications require secure authentication. User token UIDs are matched against doc properties.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                    <span>SYS_AES_256_ACTIVE</span>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 font-mono text-xs">
              No profile session matches. Try logging in again.
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
