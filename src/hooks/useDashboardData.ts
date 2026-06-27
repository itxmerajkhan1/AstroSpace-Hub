import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { UserProfile } from '@/types/profile';
import { profileService, handleFirestoreError, OperationType } from '@/services/profileService';

export interface DashboardTelemetry {
  pingMs: number;
  connectionStatus: 'SECURED' | 'CALIBRATING' | 'DISRUPTED';
  bandwidthUsage: string;
  uptimeSeconds: number;
}

export interface UseDashboardDataResult {
  profileData: UserProfile | null;
  isDataLoading: boolean;
  syncError: string | null;
  telemetry: DashboardTelemetry;
}

export function useDashboardData(uid: string | undefined): UseDashboardDataResult {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [telemetry, setTelemetry] = useState<DashboardTelemetry>({
    pingMs: 24,
    connectionStatus: 'CALIBRATING',
    bandwidthUsage: '1.24 GB/s',
    uptimeSeconds: 0
  });

  // Track uptime counter for telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        uptimeSeconds: prev.uptimeSeconds + 1,
        pingMs: Math.floor(Math.random() * 15) + 15, // dynamic neural latency
        bandwidthUsage: (Math.random() * 0.4 + 1.1).toFixed(2) + ' GB/s'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!uid) {
      setProfileData(null);
      setIsDataLoading(false);
      setTelemetry(prev => ({ ...prev, connectionStatus: 'DISRUPTED' }));
      return;
    }

    setIsDataLoading(true);
    setSyncError(null);

    const docRef = doc(db, 'profiles', uid);

    const unsubscribe = onSnapshot(
      docRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          setProfileData(snapshot.data() as UserProfile);
          setIsDataLoading(false);
          setTelemetry(prev => ({ ...prev, connectionStatus: 'SECURED' }));
        } else {
          // Auto-create default fallback profile for new registrations
          const currentUser = auth.currentUser;
          const userEmail = currentUser?.email || '';
          const defaultUsername = userEmail ? userEmail.split('@')[0] : `cyber_ghost_${uid.slice(0, 5)}`;
          const defaultDisplayName = userEmail ? userEmail.split('@')[0].toUpperCase() : 'NEW_RECRUIT';

          const defaultProfile: UserProfile = {
            uid,
            username: defaultUsername,
            displayName: defaultDisplayName,
            bio: 'Digital wanderer in the AstroSpace cyber grid. Calibrating neural interfaces...',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
            bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            skills: ['Astro-JS', 'Quantum-Core', 'Telemetry-Dampening'],
            socials: {
              github: 'https://github.com',
              linkedin: 'https://linkedin.com',
              twitter: 'https://twitter.com',
            },
            updatedAt: new Date()
          };

          try {
            await profileService.createProfile(defaultProfile);
            setProfileData(defaultProfile);
            setTelemetry(prev => ({ ...prev, connectionStatus: 'SECURED' }));
          } catch (err: any) {
            console.error('Failed to auto-create default dashboard profile:', err);
            setSyncError(err instanceof Error ? err.message : String(err));
          } finally {
            setIsDataLoading(false);
          }
        }
      },
      (err) => {
        setIsDataLoading(false);
        setSyncError(err.message || 'Firebase sync interrupted');
        setTelemetry(prev => ({ ...prev, connectionStatus: 'DISRUPTED' }));
        try {
          handleFirestoreError(err, OperationType.GET, `profiles/${uid}`);
        } catch (wrappedErr) {
          console.error('onSnapshot Error wrapped:', wrappedErr);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return { profileData, isDataLoading, syncError, telemetry };
}
