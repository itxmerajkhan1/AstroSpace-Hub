import React from 'react';
import { 
  Compass, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Settings, 
  Cpu, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onLogout
}) => {
  const menuItems = [
    { id: 'overview', name: 'OVERVIEW', icon: Compass },
    { id: 'telemetry', name: 'TELEMETRY', icon: Activity },
    { id: 'nodes', name: 'QUANTUM NODES', icon: Layers },
    { id: 'terminal', name: 'SYS_TERMINAL', icon: Terminal },
    { id: 'security', name: 'SECURITY_GRID', icon: ShieldCheck },
  ];

  return (
    <div 
      className={cn(
        "relative h-screen flex flex-col justify-between border-r border-white/5 bg-slate-950/40 backdrop-blur-xl transition-all duration-300 z-30",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Glow Effect behind sidebar top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      {/* Brand & Toggle Header */}
      <div>
        <div className={cn("flex items-center justify-between p-6", isCollapsed && "justify-center px-4")}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Cpu className="w-4.5 h-4.5 text-black font-bold" />
              </div>
              <div>
                <span className="block text-sm font-black tracking-widest text-white">ASTRO_OS</span>
                <span className="block text-[9px] font-mono tracking-wider text-cyan-400">SECTOR.L4</span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Cpu className="w-5 h-5 text-black font-bold" />
            </div>
          )}

          {/* Desktop Collapse Arrow Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="px-3 space-y-1.5 mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 group",
                  isActive 
                    ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                    : "border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                {/* Active left indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                )}

                <Icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-300")} />
                
                {!isCollapsed && (
                  <span className="font-semibold transition-opacity duration-200 truncate">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Menu */}
      <div className="p-3 border-t border-white/5">
        {/* Settings button */}
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/[0.02]",
            activeTab === 'settings' && "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
          )}
        >
          <Settings className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          {!isCollapsed && <span className="font-semibold truncate">SETTINGS</span>}
        </button>

        {/* Logout button */}
        <button 
          onClick={onLogout}
          className="relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-red-500/5 mt-1"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          {!isCollapsed && <span className="font-semibold truncate">LOG OUT</span>}
        </button>
      </div>
    </div>
  );
};
