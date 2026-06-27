import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Storage service for handling file uploads/downloads.
 */
export const storageService = {
  uploadFile: (path: string, file: File) => uploadBytes(ref(storage, path), file),
  getDownloadUrl: (path: string) => getDownloadURL(ref(storage, path)),
};
