export type UserRole = 'admin' | 'member' | 'student';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  borrowedCount: number;
  avatar: string;
  phone?: string;
  emailVerified?: boolean;
}

export interface BorrowedBook {
  id: string;
  bookKey: string;
  title: string;
  author: string;
  coverUrl: string;
  borrowedDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'returned';
  memberId: string;
  memberName: string;
}

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  isbn?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface OpenLibraryResponse {
  docs: Book[];
  numFound: number;
}

export interface SupabaseBook {
  id: string;
  title: string;
  image: string | null;
  created_at: string;
}

export interface SupabaseStudent {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
}

export interface SupabaseIssue {
  id: string;
  student_id: string;
  book_id: string;
  issue_date: string;
  return_date: string | null;
  created_at?: string;
  student?: SupabaseStudent;
  book?: SupabaseBook;
}
