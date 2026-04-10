import { useState, useCallback } from 'react';
import type { Member } from '../types';

const MOCK_USERS: Member[] = [
  {
    id: '1',
    name: 'Alexandra Chen',
    email: 'admin@libraryos.com',
    role: 'admin',
    joinedDate: '2024-01-15',
    borrowedCount: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Marcus Webb',
    email: 'member@libraryos.com',
    role: 'member',
    joinedDate: '2024-03-20',
    borrowedCount: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
];

export function useAuth() {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));
    const found = MOCK_USERS.find((u) => u.email === email);
    if (found && password.length >= 6) {
      setUser(found);
      setLoading(false);
      return found;
    }
    setError('Invalid email or password.');
    setLoading(false);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { user, loading, error, login, logout };
}