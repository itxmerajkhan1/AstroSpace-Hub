import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { authService } from '@/firebase/auth.service';

/**
 * Auth Context for handling authentication state and actions.
 */
interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  isLoading: boolean; // Keep for compatibility with existing files
  loginWithEmail: (email: string, password: string) => Promise<any>;
  signupWithEmail: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoading: true,
  isLoading: true,
  loginWithEmail: async () => {},
  signupWithEmail: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Strictly set persistence to browser local persistence
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = authService.onAuthStateChange((currentUser) => {
          setUser(currentUser);
          setAuthLoading(false);
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error('Failed to set browser local persistence:', error);
        // Fallback to onAuthStateChange directly
        const unsubscribe = authService.onAuthStateChange((currentUser) => {
          setUser(currentUser);
          setAuthLoading(false);
        });
        return unsubscribe;
      });
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    return await authService.signIn(email, password);
  };

  const signupWithEmail = async (email: string, password: string) => {
    return await authService.signUp(email, password);
  };

  const loginWithGoogle = async () => {
    return await authService.signInWithGoogle();
  };

  const logout = async () => {
    await authService.signOut();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        authLoading, 
        isLoading: authLoading, // Keep for backward compatibility
        loginWithEmail, 
        signupWithEmail, 
        loginWithGoogle, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

