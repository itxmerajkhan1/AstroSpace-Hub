import { Timestamp } from 'firebase/firestore';

export interface Socials {
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  skills: string[];
  socials: Socials;
  updatedAt: Timestamp | any;
}
