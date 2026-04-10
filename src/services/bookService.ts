import { DEFAULT_BOOK_IMAGE, supabase } from '../lib/supabaseClient';
import type { SupabaseBook } from '../types';

export async function listBooks(): Promise<SupabaseBook[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SupabaseBook[];
}

export async function addBook(input: { title: string; image?: string }) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const payload = {
    title: input.title.trim(),
    image: input.image?.trim() || DEFAULT_BOOK_IMAGE,
  };
  const { data, error } = await supabase.from('books').insert(payload).select().single();
  if (error) throw error;
  return data as SupabaseBook;
}

export async function addBookFromCatalog(input: { title: string; image?: string }) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const payload = {
    title: input.title.trim(),
    image: input.image?.trim() || DEFAULT_BOOK_IMAGE,
  };
  const { data, error } = await supabase.from('books').insert(payload).select().single();
  if (error) throw error;
  return data as SupabaseBook;
}

export async function updateBook(id: string, input: { title: string; image?: string }) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const payload = {
    title: input.title.trim(),
    image: input.image?.trim() || DEFAULT_BOOK_IMAGE,
  };
  const { data, error } = await supabase.from('books').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data as SupabaseBook;
}

export async function deleteBook(id: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) throw error;
}
