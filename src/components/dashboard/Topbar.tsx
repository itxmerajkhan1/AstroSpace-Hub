import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Clock, 
  Wifi, 
  ChevronDown, 
  Terminal, 
  Activity, 
  User, 
  LogOut, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/profile';

interface TopbarProps {
  onLogout: () => void;
  profile?: UserProfile | null;
}

interface NotificationItem {
  id: string;
  type: 'info' | 'warn' | 'crit';
  title: string;
  time: string;
  read: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onLogout, profile }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [ping, setPing] = useState(14);

  // Set up real-time system clock and simulate ping fluctuation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const pingTimer = setInterval(() => {
      setPing(prev => Math.max(8, Math.min(65, Math.floor(prev + (Math.random() - 0.5) * 8))));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(pingTimer);
    };
  }, []);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', type: 'crit', title: 'Subspace leak in Block-19', time: '1m ago', read: false },
    { id: '2', type: 'warn', title: 'Neural Load exceeded 90%', time: '8m ago', read: false },
    { id: '3', type: 'info', title: 'Warp factor synced at 4.82', time: '15m ago', read: true },
    { id: '4', type: 'info', title: 'Telemetry stream secure', time: '1h ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-20 w-full flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/25 backdrop-blur-xl">
      
      {/* Search Bar Block with Command Shortcuts */}
      <div className="relative max-w-md w-full hidden sm:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="SEARCH TELEMETRY DATA..." 
          className="w-full pl-11 pr-16 py-2 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/35 focus:ring-1 focus:ring-cyan-500/35 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono text-[9px] text-gray-400">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Right Toolbar Controls */}
      <div className="flex items-center gap-6 ml-auto">
        
        {/* Real-time Telemetry Ping / Latency Metrics */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 hidden md:flex bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
          <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>SYS_PING:</span>
          <span className="font-bold text-white">{ping}ms</span>
        </div>

        {/* Real-time System ISO Clock */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 hidden lg:flex bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>{timeStr}</span>
        </div>

        {/* Dynamic Notification Center Dropdown Toggle */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
            )}
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="text-xs font-mono font-bold tracking-wider text-white">SYS_NOTIFICATIONS</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] font-mono text-cyan-400 hover:underline">
                    MARK READ
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`p-2.5 rounded-xl border transition-colors ${
                      n.read ? 'bg-transparent border-transparent' : 'bg-cyan-500/5 border-cyan-500/10'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {n.type === 'crit' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                        {n.type === 'warn' && <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />}
                        {n.type === 'info' && <Activity className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs truncate ${n.read ? 'text-gray-400' : 'text-white font-medium'}`}>
                          {n.title}
                        </p>
                        <span className="text-[9px] font-mono text-gray-500 block mt-0.5">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Component */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 p-1.5 pr-3.5 rounded-xl transition-all"
          >
            {/* Avatar image container with live neon status ring */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-black overflow-hidden">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user?.email?.slice(0, 2).toUpperCase() || 'QA'
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-black shadow-[0_0_6px_rgba(6,182,212,1)]" />
            </div>
            
            <div className="hidden md:block text-left">
              <span className="block text-xs font-mono font-bold text-white max-w-28 truncate">
                {profile?.displayName || user?.email?.split('@')[0].toUpperCase() || 'QA_ADMIN'}
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-cyan-400 uppercase">
                {profile?.username ? `@${profile.username.toUpperCase()}` : 'QUANTUM ARCHITECT'}
              </span>
            </div>
            
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Profile Dropdown Items */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-900/90 border border-white/10 rounded-2xl p-2 backdrop-blur-xl shadow-2xl z-50">
              <div className="px-3.5 py-2.5 border-b border-white/5 mb-1.5">
                <span className="block text-[10px] font-mono text-cyan-400">SESSION IDENTIFIER</span>
                <span className="block text-xs font-semibold text-white truncate font-mono mt-0.5">{user?.email}</span>
              </div>
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-cyan-400 hover:bg-white/[0.02] rounded-xl font-mono"
                >
                  <User className="w-4 h-4 text-gray-400" /> PROFILE_SETTINGS
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-cyan-400 hover:bg-white/[0.02] rounded-xl font-mono">
                  <Terminal className="w-4 h-4 text-gray-400" /> DIAGNOSTICS
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-cyan-400 hover:bg-white/[0.02] rounded-xl font-mono">
                  <HelpCircle className="w-4 h-4 text-gray-400" /> SUPPORT_PORTAL
                </button>
                <div className="border-t border-white/5 my-1.5" />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl font-mono"
                >
                  <LogOut className="w-4 h-4 text-red-400" /> SYS_LOGOUT
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
