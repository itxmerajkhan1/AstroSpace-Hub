import React from 'react';
import { 
  Zap, 
  Layers, 
  Gauge, 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  progress: number;
  sparkline: number[];
  color: 'cyan' | 'purple' | 'amber' | 'emerald';
}

const colorMap = {
  cyan: {
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    border: 'border-cyan-500/20',
  },
  purple: {
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    border: 'border-purple-500/20',
  },
  amber: {
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    border: 'border-amber-500/20',
  },
  emerald: {
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500/20',
  },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  progress,
  sparkline,
  color,
}) => {
  const currentColors = colorMap[color];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`p-6 rounded-3xl bg-slate-950/40 border border-white/5 backdrop-blur-xl ${currentColors.glow} flex flex-col justify-between h-56 relative overflow-hidden`}
    >
      {/* Background radial gradient spotlight */}
      <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full filter blur-[60px] opacity-10 ${currentColors.bg}`} />

      <div className="flex items-start justify-between">
        <div>
          <span className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase">{title}</span>
          <span className="block text-3xl font-black text-white font-mono mt-2 tracking-tight">{value}</span>
        </div>
        <div className={`p-3 rounded-2xl bg-white/[0.02] border border-white/5 ${currentColors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Mini Visualizer Sparkline */}
      <div className="h-10 flex items-end gap-1.5 pt-4">
        {sparkline.map((val, idx) => (
          <div key={idx} className="flex-1 bg-white/5 h-full rounded-sm overflow-hidden flex items-end">
            <div 
              className={`w-full ${currentColors.bg} opacity-40 hover:opacity-100 transition-opacity`} 
              style={{ height: `${val}%` }} 
            />
          </div>
        ))}
      </div>

      {/* Progress metrics and trend indicator */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${currentColors.bg}`} style={{ width: `${progress}%` }} />
          </div>
          <span className="text-gray-500 text-[10px]">{progress}%</span>
        </div>

        <div className={`flex items-center gap-0.5 font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{change}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const StatsGrid = () => {
  const statsData: StatCardProps[] = [
    {
      title: 'Core Energy Flux',
      value: '4.82 GHz',
      change: '+1.4%',
      isPositive: true,
      icon: Zap,
      progress: 82,
      sparkline: [30, 45, 62, 55, 75, 40, 85, 95, 70, 60, 80, 82],
      color: 'cyan',
    },
    {
      title: 'Quantum Nodes throughput',
      value: '14,842 TX/s',
      change: '+12.8%',
      isPositive: true,
      icon: Layers,
      progress: 74,
      sparkline: [40, 50, 48, 65, 80, 55, 70, 90, 85, 60, 75, 74],
      color: 'purple',
    },
    {
      title: 'Subspace Latency',
      value: '0.004 ms',
      change: '-18.4%',
      isPositive: true,
      icon: Gauge,
      progress: 96,
      sparkline: [90, 80, 75, 85, 60, 50, 40, 35, 30, 25, 20, 15],
      color: 'emerald',
    },
    {
      title: 'Neural Engine Load',
      value: '32.14%',
      change: '+2.4%',
      isPositive: false,
      icon: Cpu,
      progress: 32,
      sparkline: [10, 20, 15, 35, 40, 25, 30, 45, 32, 28, 30, 32],
      color: 'amber',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};
