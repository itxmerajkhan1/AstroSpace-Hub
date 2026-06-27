import React from 'react';
import { UserProfile } from '@/types/profile';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Edit3, 
  Cpu, 
  Terminal, 
  ShieldAlert, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  profile: UserProfile;
  onEditToggle: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full rounded-3xl bg-slate-950/40 border border-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.05)] overflow-hidden flex flex-col h-full"
    >
      {/* Decorative cyber grid accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Cyberpunk Top Glowing Accent Sphere */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-cyan-500/10 filter blur-[80px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-purple-500/10 filter blur-[80px] pointer-events-none" />

      {/* 1. Banner Layer */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        {profile.bannerUrl ? (
          <img 
            src={profile.bannerUrl} 
            alt="Profile Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900" />
        )}
        {/* Sleek scanline and overlay filter */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030303_100%)] opacity-60" />
        
        {/* Banner metadata label */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/45 border border-white/10 rounded-full font-mono text-[9px] tracking-widest text-cyan-400">
          <Terminal className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>CYBER_IDENTITY_SECURED</span>
        </div>
      </div>

      {/* Content wrapper with precise alignment */}
      <div className="px-6 pb-8 pt-4 flex-1 flex flex-col relative z-10">
        
        {/* 2. Avatar & Identity Overlay Grid */}
        <div className="relative -mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="relative flex-shrink-0">
            {/* Avatar frame with glowing neon dual rings */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full bg-[#050508] rounded-[14px] overflow-hidden">
                <img 
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Online Indicator Badge */}
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center bg-black rounded-full p-1.5 border border-white/10">
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
              </div>
            </div>
          </div>

          {/* Action Button: Edit Profile */}
          <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto">
            <button
              onClick={onEditToggle}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              <Edit3 className="w-4 h-4 text-cyan-400" />
              <span>EDIT_PROFILE</span>
            </button>
          </div>
        </div>

        {/* User Identity Details */}
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{profile.displayName}</span>
              <Cpu className="w-5 h-5 text-indigo-400" />
            </h1>
            <span className="block font-mono text-xs tracking-widest text-cyan-400 mt-1">
              @{profile.username.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl bg-white/[0.01] border border-white/5 p-4 rounded-xl font-mono text-xs">
            {profile.bio || "No custom synaptic profile registered yet."}
          </p>
        </div>

        {/* 3. Skills Matrix Section */}
        <div className="space-y-3 mb-6">
          <span className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            NEURAL_SKILLS_GRID
          </span>
          <div className="flex flex-wrap gap-2">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-lg text-xs font-mono text-indigo-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-default"
                >
                  <span className="text-cyan-400 font-bold mr-1">&gt;</span>
                  {skill}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-500 font-mono">No skills loaded in stack.</span>
            )}
          </div>
        </div>

        {/* 4. Social Ports Section */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {profile.socials?.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-cyan-500/20 text-gray-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
                title="GitHub Neural Node"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {profile.socials?.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-indigo-500/20 text-gray-400 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all duration-300"
                title="LinkedIn Terminal Link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {profile.socials?.twitter && (
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-purple-500/20 text-gray-400 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300"
                title="Subspace Stream"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-1 font-mono text-[9px] text-gray-500 uppercase">
            <span>LAST_CALIBRATION:</span>
            <span className="text-indigo-400">
              {profile.updatedAt?.toDate 
                ? profile.updatedAt.toDate().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
                : new Date(profile.updatedAt).toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
              }
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
