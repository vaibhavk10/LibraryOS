import { useCallback, useEffect, useState } from 'react';
import type { Member } from '../types';
import {
  getCurrentUser,
  getRoleFromEmail,
  getSession,
  onAuthStateChange,
  signIn,
  signOut,
  signUp,
  upsertStudentProfile,
  verifySignupCode,
} from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);

  const mapSupabaseUser = useCallback((incoming: {
    id: string;
    email?: string;
    fullName?: string;
    phone?: string;
    emailConfirmedAt?: string | null;
  }) => {
    const mapped: Member = {
      id: incoming.id,
      name: incoming.fullName || incoming.email?.split('@')[0] || 'Library User',
      email: incoming.email || '',
      role: getRoleFromEmail(incoming.email),
      joinedDate: new Date().toISOString().slice(0, 10),
      borrowedCount: 0,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
        incoming.fullName || incoming.email || incoming.id
      )}`,
      phone: incoming.phone,
      emailVerified: Boolean(incoming.emailConfirmedAt),
    };
    return mapped;
  }, []);

  const syncStudentProfile = useCallback(async (member: Member) => {
    if (!isSupabaseConfigured || member.role === 'member') return;
    try {
      await upsertStudentProfile({
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone,
      });
    } catch {
      // Non-blocking: auth should still succeed even if profile sync fails.
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured) {
        const { user: signedIn } = await signIn(email, password);
        if (!signedIn) throw new Error('Unable to authenticate.');

        const mapped = mapSupabaseUser({
          id: signedIn.id,
          email: signedIn.email,
          fullName: signedIn.user_metadata?.full_name as string | undefined,
          phone: signedIn.user_metadata?.phone as string | undefined,
          emailConfirmedAt: signedIn.email_confirmed_at,
        });
        setUser(mapped);
        setEmailVerified(Boolean(signedIn.email_confirmed_at));
        await syncStudentProfile(mapped);
        return mapped;
      }

      await new Promise((r) => setTimeout(r, 800));
      const found = MOCK_USERS.find((u) => u.email === email);
      if (found && password.length >= 6) {
        setUser(found);
        setEmailVerified(true);
        return found;
      }
      setError('Invalid email or password.');
      return null;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unable to sign in.';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [mapSupabaseUser, syncStudentProfile]);

  const signup = useCallback(
    async (payload: { name: string; email: string; password: string; phone?: string }) => {
      setLoading(true);
      setError(null);
      try {
        if (!isSupabaseConfigured) {
          throw new Error('Supabase is not configured. Add env keys first.');
        }
        await signUp({
          email: payload.email,
          password: payload.password,
          fullName: payload.name,
          phone: payload.phone,
        });

        return { ok: true as const };
      } catch (e) {
        let message = e instanceof Error ? e.message : 'Unable to sign up.';
        if (message.toLowerCase().includes('too many requests')) {
          message = 'Too many signup attempts. Please wait a minute and try again.';
        }
        setError(message);
        return { ok: false as const, message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      await signOut();
    }
    setUser(null);
    setEmailVerified(false);
  }, []);

  const verifyCode = useCallback(async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      await verifySignupCode(email, code);
      return { ok: true as const };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unable to verify code.';
      setError(message);
      return { ok: false as const, message };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const session = await getSession();
        const activeUser = session?.user ?? (await getCurrentUser());
        if (activeUser && mounted) {
          const mapped = mapSupabaseUser({
            id: activeUser.id,
            email: activeUser.email,
            fullName: activeUser.user_metadata?.full_name as string | undefined,
            phone: activeUser.user_metadata?.phone as string | undefined,
            emailConfirmedAt: activeUser.email_confirmed_at,
          });
          setUser(mapped);
          setEmailVerified(Boolean(activeUser.email_confirmed_at));
          await syncStudentProfile(mapped);
        }
      } catch (e) {
        if (mounted) {
          const message = e instanceof Error ? e.message : 'Unable to restore session.';
          setError(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    bootstrap();
    const { data } = onAuthStateChange((_event, session) => {
      const changed = session?.user;
      if (!changed) {
        setUser(null);
        setEmailVerified(false);
        return;
      }
      const mapped = mapSupabaseUser({
        id: changed.id,
        email: changed.email,
        fullName: changed.user_metadata?.full_name as string | undefined,
        phone: changed.user_metadata?.phone as string | undefined,
        emailConfirmedAt: changed.email_confirmed_at,
      });
      setUser(mapped);
      setEmailVerified(Boolean(changed.email_confirmed_at));
      void syncStudentProfile(mapped);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [mapSupabaseUser, syncStudentProfile]);

  return { user, loading, error, emailVerified, login, signup, verifyCode, logout };
}