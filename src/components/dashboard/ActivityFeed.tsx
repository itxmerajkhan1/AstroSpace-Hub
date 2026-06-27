import React, { useState } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  XOctagon, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEvent {
  id: string;
  type: 'success' | 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: string;
  node: string;
}

export const ActivityFeed = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [logs, setLogs] = useState<LogEvent[]>([
    { 
      id: 'log-1', 
      type: 'success', 
      title: 'Quantum Node-7 Synchronization', 
      message: 'Full handshake protocol finalized on L-4. Quantum state drift compensated at -0.0004ns.', 
      timestamp: '16:14:02 UTC', 
      node: 'NODE_007' 
    },
    { 
      id: 'log-2', 
      type: 'warning', 
      title: 'Shield Harmonic Discrepancy', 
      message: 'Minor resonance shift detected at 14.2 GHz. Automated feedback dampeners active.', 
      timestamp: '16:12:45 UTC', 
      node: 'SHIELD_SYS' 
    },
    { 
      id: 'log-3', 
      type: 'critical', 
      title: 'Intrusion Vector Shielded', 
      message: 'Subspace probe attempt blocked from unknown celestial coordinate. IP logged to firewall grid.', 
      timestamp: '16:09:12 UTC', 
      node: 'SECURE_GRID' 
    },
    { 
      id: 'log-4', 
      type: 'info', 
      title: 'Warp Core Calibration Complete', 
      message: 'Frequency corrected to 4.82GHz. Stabilizers report 100% coherence metrics.', 
      timestamp: '15:58:30 UTC', 
      node: 'WARP_CORE' 
    },
    { 
      id: 'log-5', 
      type: 'success', 
      title: 'Database Sync: Proxima Sector', 
      message: 'Telemetry transaction data pool updated. Merkle proof generated at index 9204A.', 
      timestamp: '15:45:11 UTC', 
      node: 'DB_SEC_PROX' 
    }
  ]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'critical': return <XOctagon className="w-4 h-4 text-rose-400" />;
      default: return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getStatusBadgeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'critical': return 'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
      default: return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]';
    }
  };

  return (
    <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-white">LIVE_SYSTEM_TELEMETRY_LOG</h2>
        </div>
        <button 
          onClick={() => {
            // Simulated reload
            const reloadLog: LogEvent = {
              id: `log-${Date.now()}`,
              type: 'info',
              title: 'Diagnostics check initialized',
              message: 'Self-monitoring subsystem triggered. All feedback loops fully operational.',
              timestamp: new Date().toISOString().replace('T', ' ').slice(11, 19) + ' UTC',
              node: 'SYS_DIAG'
            };
            setLogs(prev => [reloadLog, ...prev.slice(0, 4)]);
          }}
          className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 font-mono">
        {logs.map((log) => {
          const isExpanded = expandedId === log.id;

          return (
            <div 
              key={log.id} 
              className="border border-white/[0.03] hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] rounded-2xl transition-all duration-300"
            >
              {/* Row Header */}
              <div 
                onClick={() => toggleExpand(log.id)}
                className="flex items-center justify-between p-4 cursor-pointer select-none text-xs gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex-shrink-0">
                    {getStatusIcon(log.type)}
                  </div>
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${getStatusBadgeStyles(log.type)}`}>
                      {log.node}
                    </span>
                    <span className="text-white font-medium truncate">{log.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-[10px] text-gray-500 hidden sm:inline">{log.timestamp}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </div>

              {/* Collapsible Details Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="p-4 bg-black/25 text-xs text-gray-400 leading-relaxed space-y-3">
                      <p>{log.message}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-white/5 font-mono">
                        <span>TRANSACTION_HASH: SHA256_{log.id.toUpperCase()}_LINK</span>
                        <span>STATUS: COMPLETED</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
