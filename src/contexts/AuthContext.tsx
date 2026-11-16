'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '@/types';
import { initAuth, googleSignIn, logoutGoogle } from '@/services/googleAuth';
import { getEnvConfiguredSpreadsheetUrl } from '@/services/publicSheet';

interface AuthContextValue {
  firebaseUser: User | null;
  accessToken: string | null;
  userProfile: UserProfile | null;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updatePersonalSheetUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = sessionStorage.getItem('exam_logged_in_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setFirebaseUser(user);
        setAccessToken(token);
      },
      () => {
        setFirebaseUser(null);
        setAccessToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signIn = async () => {
    const res = await googleSignIn();
    if (res) {
      setFirebaseUser(res.user);
      setAccessToken(res.accessToken);
    }
  };

  const signOut = async () => {
    await logoutGoogle();
    setFirebaseUser(null);
    setAccessToken(null);
  };

  const updatePersonalSheetUrl = (url: string) => {
    setUserProfile((prev) => (prev ? { ...prev, google_sheet_URL: url } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        accessToken,
        userProfile,
        user: userProfile,
        setUser: setUserProfile,
        signIn,
        signOut,
        updatePersonalSheetUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
