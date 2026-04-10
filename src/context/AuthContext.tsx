import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { Member } from '../types';

interface AuthContextValue {
  user: Member | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<Member | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}