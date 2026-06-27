import React, { useState } from 'react';
import { UserProfile } from '@/types/profile';
import { profileService } from '@/services/profileService';
import { 
  X, 
  Check, 
  Terminal, 
  AlertTriangle, 
  Layers, 
  Plus, 
  RefreshCw,
  Image,
  User,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface ProfileEditFormProps {
  profile: UserProfile;
  onClose: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  
  // Controlled fields
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [username, setUsername] = useState(profile.username || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [bannerUrl, setBannerUrl] = useState(profile.bannerUrl || '');
  
  // Skills tracking
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(profile.skills || []);
  
  // Social networks
  const [github, setGithub] = useState(profile.socials?.github || '');
  const [linkedin, setLinkedin] = useState(profile.socials?.linkedin || '');
  const [twitter, setTwitter] = useState(profile.socials?.twitter || '');

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Preset Premium Backgrounds
  const bannerPresets = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
  ];

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  ];

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!displayName.trim()) {
      newErrors.displayName = 'Display Name cannot be empty';
    }

    if (!username.trim()) {
      newErrors.username = 'Username cannot be empty';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username = 'Username must be 3-20 characters, alphanumeric & underscores only';
    }

    // Dynamic URL validations
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    
    if (github && !urlPattern.test(github)) {
      newErrors.github = 'Enter a valid URL (e.g. https://github.com/username)';
    }

    if (linkedin && !urlPattern.test(linkedin)) {
      newErrors.linkedin = 'Enter a valid URL (e.g. https://linkedin.com/in/username)';
    }

    if (twitter && !urlPattern.test(twitter)) {
      newErrors.twitter = 'Enter a valid URL';
    }

    if (avatarUrl && !urlPattern.test(avatarUrl)) {
      newErrors.avatarUrl = 'Enter a valid image URL';
    }

    if (bannerUrl && !urlPattern.test(bannerUrl)) {
      newErrors.bannerUrl = 'Enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkill = () => {
    if (!skillsInput.trim()) return;
    
    // Parse comma separated values or clean direct string
    const newSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !skillsList.includes(s));

    if (newSkills.length > 0) {
      setSkillsList([...skillsList, ...newSkills]);
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Validation diagnostics failed. Correct errors before saving.');
      return;
    }

    setIsSaving(true);
    try {
      const updatedProfileData: Partial<UserProfile> = {
        displayName: displayName.trim(),
        username: username.trim().toLowerCase(),
        bio: bio.trim(),
        avatarUrl: avatarUrl.trim(),
        bannerUrl: bannerUrl.trim(),
        skills: skillsList,
        socials: {
          github: github.trim(),
          linkedin: linkedin.trim(),
          twitter: twitter.trim(),
        }
      };

      await profileService.updateProfile(profile.uid, updatedProfileData);
      toast.success('Neural profile synchronized to Firestore core.');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Error uploading profile parameters');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="relative w-full rounded-3xl bg-slate-950/45 border border-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.05)] overflow-hidden p-6 md:p-8"
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-purple-400 animate-pulse" />
          <h2 className="text-md font-mono font-bold tracking-widest text-white uppercase">
            CALIBRATE_PROFILE_CORE
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Banner Preset Customization */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-cyan-400" />
            <span>SELECT PRESET BANNER</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {bannerPresets.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBannerUrl(url)}
                className={`relative h-12 rounded-lg overflow-hidden border transition-all duration-300 ${
                  bannerUrl === url ? 'border-cyan-400 ring-2 ring-cyan-500/20' : 'border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={url} alt="Preset banner" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <input
            type="text"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            placeholder="CUSTOM_BANNER_URL"
            className="w-full mt-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 focus:ring-1 focus:ring-cyan-500/35 transition-all"
          />
          {errors.bannerUrl && (
            <p className="text-[10px] text-rose-400 font-mono flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.bannerUrl}</p>
          )}
        </div>

        {/* Avatar Preset Customization */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>SELECT PRESET AVATAR</span>
          </label>
          <div className="flex gap-4">
            {avatarPresets.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAvatarUrl(url)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all duration-300 ${
                  avatarUrl === url ? 'border-indigo-400 ring-2 ring-indigo-500/20' : 'border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={url} alt="Preset avatar" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="CUSTOM_AVATAR_URL"
            className="w-full mt-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 focus:ring-1 focus:ring-cyan-500/35 transition-all"
          />
          {errors.avatarUrl && (
            <p className="text-[10px] text-rose-400 font-mono flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.avatarUrl}</p>
          )}
        </div>

        {/* Identity Inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              DISPLAY_NAME
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`w-full px-4 py-3 bg-white/[0.02] border rounded-xl font-mono text-xs text-white focus:outline-none transition-all ${
                errors.displayName ? 'border-rose-500/30' : 'border-white/5 focus:border-cyan-500/35'
              }`}
              placeholder="e.g. Major Motoko"
            />
            {errors.displayName && (
              <p className="text-[10px] text-rose-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {errors.displayName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              CYBER_HANDLE
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 bg-white/[0.02] border rounded-xl font-mono text-xs text-white focus:outline-none transition-all ${
                errors.username ? 'border-rose-500/30' : 'border-white/5 focus:border-cyan-500/35'
              }`}
              placeholder="e.g. cyber_ninja"
            />
            {errors.username && (
              <p className="text-[10px] text-rose-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {errors.username}
              </p>
            )}
          </div>
        </div>

        {/* Bio Textarea */}
        <div className="space-y-2">
          <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            SYNAPTIC_BIO_DATA
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 transition-all resize-none"
            placeholder="Introduce your nodes, warp parameters, and mission parameters."
          />
        </div>

        {/* Comma-Separated Skills Area */}
        <div className="space-y-3">
          <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
            NEURAL_SKILLS_ARRAY (COMMA SEPARATED)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-grow px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 transition-all"
              placeholder="e.g. React-D3, Quantum-Assembly, Astro-Nav"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 bg-white/[0.02] hover:bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Active Skills Tag List */}
          <div className="flex flex-wrap gap-2 pt-1">
            <AnimatePresence>
              {skillsList.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-md text-[10px] font-mono text-cyan-400"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Links inputs */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              GITHUB_LINK
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 transition-all"
              placeholder="https://github.com/username"
            />
            {errors.github && (
              <p className="text-[10px] text-rose-400 font-mono">{errors.github}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              LINKEDIN_LINK
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 transition-all"
              placeholder="https://linkedin.com/in/username"
            />
            {errors.linkedin && (
              <p className="text-[10px] text-rose-400 font-mono">{errors.linkedin}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              TWITTER_LINK
            </label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-cyan-500/35 transition-all"
              placeholder="https://twitter.com/username"
            />
            {errors.twitter && (
              <p className="text-[10px] text-rose-400 font-mono">{errors.twitter}</p>
            )}
          </div>
        </div>

        {/* Action button row */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 text-gray-400 hover:text-white font-mono text-xs font-bold tracking-wider transition-colors"
          >
            CANCEL_DIAGNOSTICS
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-black font-mono text-xs font-black tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>SAVING_SYNC...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>WRITE_PARAMETERS</span>
              </>
            )}
          </button>
        </div>

      </form>
    </motion.div>
  );
};
