import { auth } from './config';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';

/**
 * Auth service for handling user authentication.
 */
const googleProvider = new GoogleAuthProvider();

export const authService = {
  signIn: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
  signUp: (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password),
  signInWithGoogle: () => signInWithPopup(auth, googleProvider),
  signOut: () => signOut(auth),
  onAuthStateChange: (callback: (user: any) => void) => onAuthStateChanged(auth, callback),
  resetPassword: (email: string) => sendPasswordResetEmail(auth, email),
  verifyEmail: (user: any) => sendEmailVerification(user),
};
