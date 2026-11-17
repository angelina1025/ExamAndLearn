import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

// Configure Google Auth Provider with Google Sheets & Drive scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');

// In-memory token storage (DO NOT store in localStorage or sessionStorage per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

/**
 * Initialize Firebase Auth state listener.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) {
        onAuthSuccess(user, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) {
        onAuthFailure();
      }
    }
  });
};

/**
 * Sign in with Google using popup and obtain access token
 * 支援 Firebase signInWithPopup 以及 Google Identity Services (GIS) 雙重自動容錯，
 * 解決在 localhost 或非授權網域下觸發的 auth/unauthorized-domain 錯誤。
 */
export const googleSignIn = async (): Promise<{ user: User | null; accessToken: string } | null> => {
  try {
    isSigningIn = true;

    // 1. 優先嘗試 Firebase Auth
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        cachedAccessToken = credential.accessToken;
        return { user: result.user, accessToken: cachedAccessToken };
      }
    } catch (fbErr: any) {
      // 若為 unauthorized-domain 或 popup-blocked，切換至 Google Identity Services (GIS)
      console.warn('Firebase Auth popup failed, attempting Google Identity Services (GIS):', fbErr?.code || fbErr?.message);
      if (fbErr?.code === 'auth/unauthorized-domain' || fbErr?.code === 'auth/popup-blocked' || fbErr?.code === 'auth/operation-not-allowed') {
        const gisToken = await requestAccessTokenViaGis();
        if (gisToken) {
          cachedAccessToken = gisToken;
          return { user: auth.currentUser, accessToken: gisToken };
        }
      }
      throw fbErr;
    }

    return null;
  } catch (error: any) {
    console.error('Google Sign-in failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * 透過 Google Identity Services (GIS) 直接向 Google 取得 OAuth2 Access Token
 * 繞過 Firebase 控制台的 Authorized Domains 限制
 */
export const requestAccessTokenViaGis = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;

  const clientId = firebaseConfig.oAuthClientId;
  if (!clientId) {
    throw new Error('未配置 Google oAuthClientId');
  }

  // 動態加載 GIS SDK
  if (typeof (window as any).google?.accounts?.oauth2 === 'undefined') {
    await new Promise<void>((resolve, reject) => {
      const existing = document.getElementById('google-gis-sdk');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('無法載入 Google 驗證 SDK')));
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-gis-sdk';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('無法載入 Google 驗證 SDK (accounts.google.com/gsi/client)'));
      document.head.appendChild(script);
    });
  }

  return new Promise((resolve, reject) => {
    try {
      const google = (window as any).google;
      const client = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
        callback: (resp: any) => {
          if (resp.error) {
            reject(new Error(resp.error_description || resp.error));
          } else if (resp.access_token) {
            resolve(resp.access_token);
          } else {
            reject(new Error('未取得有效 Google Access Token'));
          }
        },
        error_callback: (err: any) => {
          reject(new Error(err?.message || 'Google 授權視窗已被關閉或取消'));
        },
      });
      client.requestAccessToken();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Get current in-memory access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Set in-memory access token manually if refreshed
 */
export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Log out
 */
export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};
