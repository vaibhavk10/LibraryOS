import { supabase } from '../lib/supabaseClient';
import type { SupabaseIssue } from '../types';

export async function issueBook(input: {
  studentId: string;
  bookId: string;
  issueDate: string;
}) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('issues')
    .insert({
      student_id: input.studentId,
      book_id: input.bookId,
      issue_date: input.issueDate,
      return_date: null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as SupabaseIssue;
}

export async function requestIssue(input: {
  studentId: string;
  bookId: string;
}) {
  return issueBook({
    studentId: input.studentId,
    bookId: input.bookId,
    issueDate: new Date().toISOString().slice(0, 10),
  });
}

export async function markReturned(issueId: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('issues')
    .update({ return_date: new Date().toISOString().slice(0, 10) })
    .eq('id', issueId)
    .select()
    .single();
  if (error) throw error;
  return data as SupabaseIssue;
}

export async function listIssuesForAdmin() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('issues')
    .select(
      `
      *,
      student:students(*),
      book:books(*)
    `
    )
    .order('issue_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SupabaseIssue[];
}

export async function listIssuesForStudent(studentId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('issues')
    .select(
      `
      *,
      student:students(*),
      book:books(*)
    `
    )
    .eq('student_id', studentId)
    .order('issue_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SupabaseIssue[];
}
