import { db } from './config';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';

/**
 * Firestore service for handling database operations.
 */
export const firestoreService = {
  getCollection: (path: string) => getDocs(collection(db, path)),
  addDocument: (path: string, data: any) => addDoc(collection(db, path), data),
  getDocument: (path: string, id: string) => getDoc(doc(db, path, id)),
};
