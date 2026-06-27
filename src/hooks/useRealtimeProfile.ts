import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { UserProfile } from '@/types/profile';
import { profileService, handleFirestoreError, OperationType } from '@/services/profileService';

export function useRealtimeProfile(uid: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const docPath = `profiles/${uid}`;
    const docRef = doc(db, 'profiles', uid);

    const unsubscribe = onSnapshot(
      docRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
          setIsLoading(false);
        } else {
          // Document not found: Auto-create a default fallback profile
          const currentUser = auth.currentUser;
          const userEmail = currentUser?.email || '';
          const defaultUsername = userEmail ? userEmail.split('@')[0] : `cyber_ghost_${uid.slice(0, 5)}`;
          const defaultDisplayName = userEmail ? userEmail.split('@')[0].toUpperCase() : 'NEW RECRUIT';

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
            // Write default profile to Firestore
            await profileService.createProfile(defaultProfile);
            setProfile(defaultProfile);
          } catch (err: any) {
            console.error('Failed to auto-create default profile:', err);
            setError(err instanceof Error ? err : new Error(String(err)));
          } finally {
            setIsLoading(false);
          }
        }
      },
      (err) => {
        setIsLoading(false);
        setError(err);
        try {
          handleFirestoreError(err, OperationType.GET, docPath);
        } catch (wrappedErr) {
          // Keep the wrapped error in state for diagnostics if needed
          console.error('onSnapshot Error wrapped:', wrappedErr);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return { profile, isLoading, error };
}
