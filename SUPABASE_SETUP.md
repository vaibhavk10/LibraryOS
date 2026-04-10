# Supabase Setup Guide

## 1) Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Copy:
   - Project URL
   - `anon` public key
3. In app root `.env`, set:
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
   - `ADMIN_EMAIL=admin@gmail.com`

## 2) Enable Authentication
1. Open **Authentication -> Providers -> Email**.
2. Enable Email provider.
3. Enable **Confirm email** (email verification required).
4. Add redirect URL:
   - `http://localhost:5173/login`

## 3) Create Tables (SQL Editor)
Run this SQL:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key,
  name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  issue_date date not null default current_date,
  return_date date,
  created_at timestamptz not null default now()
);
```

## 4) Enable Row Level Security (RLS)
Run:

```sql
alter table public.books enable row level security;
alter table public.students enable row level security;
alter table public.issues enable row level security;
```

## 5) Create Policies
Replace `admin@gmail.com` if needed.

```sql
-- BOOKS
create policy "books_select_authenticated"
on public.books
for select
to authenticated
using (true);

create policy "books_admin_insert"
on public.books
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "books_admin_update"
on public.books
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@gmail.com')
with check ((auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "books_admin_delete"
on public.books
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@gmail.com');

-- STUDENTS
create policy "students_self_select"
on public.students
for select
to authenticated
using (id = auth.uid() or (auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "students_self_insert"
on public.students
for insert
to authenticated
with check (id = auth.uid());

create policy "students_self_update"
on public.students
for update
to authenticated
using (id = auth.uid() or (auth.jwt() ->> 'email') = 'admin@gmail.com')
with check (id = auth.uid() or (auth.jwt() ->> 'email') = 'admin@gmail.com');

-- ISSUES
create policy "issues_admin_all"
on public.issues
for all
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@gmail.com')
with check ((auth.jwt() ->> 'email') = 'admin@gmail.com');

create policy "issues_student_select_own"
on public.issues
for select
to authenticated
using (student_id = auth.uid());

create policy "issues_student_insert_own"
on public.issues
for insert
to authenticated
with check (student_id = auth.uid());
```

## 6) Sample Queries
```sql
select * from public.books order by created_at desc;
select * from public.students order by created_at desc;
select * from public.issues where return_date is null order by issue_date desc;
```

## 7) Notes
- Keep existing dummy data in UI as fallback; Supabase data is merged alongside it.
- If `VITE_SUPABASE_URL` or key is missing, app continues with existing dummy behavior.
- Admin role in app is derived from `.env` value `ADMIN_EMAIL`.
