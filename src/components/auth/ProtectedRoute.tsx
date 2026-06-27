import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Cpu, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center z-50 overflow-hidden select-none">
        {/* Subtle Cyberpunk grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Backdrop neon lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 filter blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 filter blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Scanline visual sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-12 w-full animate-[bounce_6s_infinite_linear] pointer-events-none filter blur-sm" />

        {/* Glassmorphic Central Processing Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 rounded-3xl bg-slate-950/40 border border-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)] flex flex-col items-center max-w-sm w-full mx-4 text-center space-y-6"
        >
          {/* Pulsing neon CPU center ring */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-md animate-ping" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse">
              <Cpu className="w-8 h-8 text-black" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-sm font-bold tracking-[0.2em] text-white uppercase">
              SECURE_HANDSHAKE
            </h3>
            <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-cyan-400">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>TUNING NEURAL INTERFACE</span>
            </div>
          </div>

          {/* Simulated scanning lines */}
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="relative h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
            />
          </div>

          {/* Core system message */}
          <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 border-t border-white/5 pt-4 w-full justify-center">
            <Terminal className="w-3.5 h-3.5 text-gray-500" />
            <span>ASTRO_OS COMPILER: LOAD_STAGE</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
