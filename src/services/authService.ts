import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { SupabaseStudent } from '../types';

export const getRoleFromEmail = (email?: string | null): 'admin' | 'student' => {
  const adminEmail = import.meta.env.ADMIN_EMAIL?.toLowerCase() || 'admin@gmail.com';
  return email?.toLowerCase() === adminEmail ? 'admin' : 'student';
};

export async function signUp(payload: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: {
        full_name: payload.fullName,
        phone: payload.phone ?? null,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function upsertStudentProfile(input: {
  id: string;
  name: string;
  email: string;
  phone?: string;
}) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('students')
    .upsert(
      {
        id: input.id,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
      },
      { onConflict: 'email' }
    )
    .select()
    .single();
  if (error) throw error;
  return data as SupabaseStudent;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function verifySignupCode(email: string, code: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: 'signup',
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    if (error.message.toLowerCase().includes('auth session missing')) {
      return null;
    }
    throw error;
  }
  return data.user;
}

export async function listStudents() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SupabaseStudent[];
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  if (!supabase) return { data: { subscription: { unsubscribe() {} } } };
  return supabase.auth.onAuthStateChange(callback);
}
