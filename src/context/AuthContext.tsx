import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Member } from '../types';

interface AuthContextValue {
  user: Member | null;
  loading: boolean;
  error: string | null;
  emailVerified: boolean;
  login: (email: string, password: string) => Promise<Member | null>;
  signup: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<{ ok: true } | { ok: false; message: string }>;
  verifyCode: (email: string, code: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}