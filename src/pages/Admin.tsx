import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { AlertTriangle, BookOpen, Clock, LayoutDashboard, Settings, TrendingUp, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { MOCK_BORROWED, MOCK_MEMBERS } from '../data/mockData';
import type { SupabaseBook, SupabaseIssue, SupabaseStudent } from '../types';
import { addBook, deleteBook, listBooks, updateBook } from '../services/bookService';
import { issueBook, listIssuesForAdmin, markReturned } from '../services/issueService';
import { listStudents } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import StatCard from '../components/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

type Section = 'dashboard' | 'books' | 'users' | 'settings';

const BORROW_DATA = [
  { month: 'Jan', borrowed: 42, returned: 38 },
  { month: 'Feb', borrowed: 58, returned: 52 },
  { month: 'Mar', borrowed: 65, returned: 60 },
  { month: 'Apr', borrowed: 71, returned: 68 },
  { month: 'May', borrowed: 55, returned: 50 },
  { month: 'Jun', borrowed: 80, returned: 72 },
];

const MEMBER_GROWTH = [
  { month: 'Jan', members: 120 },
  { month: 'Feb', members: 145 },
  { month: 'Mar', members: 162 },
  { month: 'Apr', members: 190 },
  { month: 'May', members: 215 },
  { month: 'Jun', members: 248 },
];

export default function Admin() {
  const [section, setSection] = useState<Section>('dashboard');
  const [supabaseBooks, setSupabaseBooks] = useState<SupabaseBook[]>([]);
  const [supabaseIssues, setSupabaseIssues] = useState<SupabaseIssue[]>([]);
  const [supabaseStudents, setSupabaseStudents] = useState<SupabaseStudent[]>([]);

  const [bookTitle, setBookTitle] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [issueBookId, setIssueBookId] = useState('');
  const [issueStudentId, setIssueStudentId] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));

  const loadAll = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [books, issues, students] = await Promise.all([
        listBooks(),
        listIssuesForAdmin(),
        listStudents(),
      ]);
      setSupabaseBooks(books);
      setSupabaseIssues(issues);
      setSupabaseStudents(students);
    } catch {
      toast.error('Unable to load admin data from Supabase.');
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSubmitBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;
    try {
      if (editingBookId) {
        await updateBook(editingBookId, { title: bookTitle, image: bookImage });
        toast.success('Book updated.');
      } else {
        await addBook({ title: bookTitle, image: bookImage });
        toast.success('Book added.');
      }
      setBookTitle('');
      setBookImage('');
      setEditingBookId(null);
      await loadAll();
    } catch {
      toast.error('Unable to save book.');
    }
  };

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueBookId || !issueStudentId) return;
    try {
      await issueBook({ bookId: issueBookId, studentId: issueStudentId, issueDate });
      toast.success('Book issued.');
      setIssueBookId('');
      setIssueStudentId('');
      await loadAll();
    } catch {
      toast.error('Unable to issue book.');
    }
  };

  const sidebarItems: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />
      <main className="pt-20">
        <div className="flex min-h-[calc(100vh-5rem)]">
          <aside className="w-64 border-r border-[hsl(220,15%,18%)] bg-[hsl(220,18%,9%)] px-4 py-6 hidden md:block">
            <p className="text-sm font-semibold text-[hsl(220,10%,70%)] mb-4">MENU</p>
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      section === item.id
                        ? 'bg-[hsl(220,18%,14%)] text-white border border-[hsl(220,15%,25%)]'
                        : 'text-[hsl(220,10%,55%)] hover:text-white hover:bg-[hsl(220,18%,12%)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex-1 p-4 md:p-6 overflow-x-auto">
            <h1 className="text-2xl font-semibold mb-5">Admin Panel</h1>

            {section === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatCard
                    label="Total Books"
                    value={supabaseBooks.length.toLocaleString()}
                    icon={BookOpen}
                    trend="12%"
                    trendUp
                    color="bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,55%)]"
                    index={0}
                  />
                  <StatCard
                    label="Active Members"
                    value={Math.max(MOCK_MEMBERS.length, supabaseStudents.length)}
                    icon={Users}
                    trend="8%"
                    trendUp
                    color="bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)]"
                    index={1}
                  />
                  <StatCard
                    label="Books Borrowed"
                    value={supabaseIssues.filter((i) => !i.return_date).length}
                    icon={Clock}
                    color="bg-[hsl(142,70%,50%)]/10 text-[hsl(142,70%,50%)]"
                    index={2}
                  />
                  <StatCard
                    label="Overdue Books"
                    value={MOCK_BORROWED.filter((b) => b.status === 'overdue').length}
                    icon={AlertTriangle}
                    trend="2"
                    trendUp={false}
                    color="bg-[hsl(0,70%,60%)]/10 text-[hsl(0,70%,60%)]"
                    index={3}
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-[hsl(45,90%,55%)]" />
                      <h2 className="font-serif text-base font-semibold text-white">Borrowing Activity</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={BORROW_DATA} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,18%)" />
                        <XAxis dataKey="month" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: 'hsl(220,18%,12%)', border: '1px solid hsl(220,15%,22%)', borderRadius: '8px', color: 'white' }}
                          cursor={{ fill: 'hsl(220,15%,15%)' }}
                        />
                        <Bar dataKey="borrowed" fill="hsl(45,90%,55%)" radius={[4, 4, 0, 0]} name="Borrowed" />
                        <Bar dataKey="returned" fill="hsl(200,80%,55%)" radius={[4, 4, 0, 0]} name="Returned" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-[hsl(200,80%,55%)]" />
                      <h2 className="font-serif text-base font-semibold text-white">Member Growth</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={MEMBER_GROWTH}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,18%)" />
                        <XAxis dataKey="month" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: 'hsl(220,18%,12%)', border: '1px solid hsl(220,15%,22%)', borderRadius: '8px', color: 'white' }} />
                        <Line type="monotone" dataKey="members" stroke="hsl(200,80%,55%)" strokeWidth={2.5} dot={{ fill: 'hsl(200,80%,55%)', r: 4 }} name="Members" />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-4">
                    <p className="text-sm font-semibold mb-3">Recent Borrowing Activity (Dummy)</p>
                    <div className="space-y-2">
                      {MOCK_BORROWED.slice(0, 5).map((book) => (
                        <div key={book.id} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[hsl(220,18%,12%)]">
                          <div>
                            <p className="text-sm text-white">{book.title}</p>
                            <p className="text-xs text-[hsl(220,10%,50%)]">
                              {book.memberName} · Due {format(new Date(book.dueDate), 'MMM d')}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-[hsl(220,18%,14%)] text-[hsl(220,10%,65%)]">
                            {book.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-4">
                    <p className="text-sm font-semibold mb-3">Supabase Recent Issues</p>
                    <div className="space-y-2">
                      {supabaseIssues.slice(0, 6).map((issue) => (
                        <div key={issue.id} className="p-2.5 rounded-lg bg-[hsl(220,18%,12%)]">
                          <p className="text-sm text-white">{issue.book?.title || 'Untitled book'}</p>
                          <p className="text-xs text-[hsl(220,10%,50%)]">
                            {issue.student?.name || 'Unknown user'} · {format(new Date(issue.issue_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      ))}
                      {supabaseIssues.length === 0 && (
                        <p className="text-xs text-[hsl(220,10%,50%)]">No Supabase issue records yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {section === 'books' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <form
                    onSubmit={handleSubmitBook}
                    className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-4 space-y-3"
                  >
                    <p className="text-sm font-semibold">{editingBookId ? 'Edit Book' : 'Add Book'}</p>
                    <input
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="Book title"
                      className="w-full px-3 py-2 rounded-lg bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)]"
                    />
                    <input
                      value={bookImage}
                      onChange={(e) => setBookImage(e.target.value)}
                      placeholder="Image URL (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)]"
                    />
                    <button className="px-4 py-2 rounded-lg bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] text-sm font-medium">
                      {editingBookId ? 'Update' : 'Add'}
                    </button>
                  </form>

                  <form
                    onSubmit={handleIssue}
                    className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-4 space-y-3"
                  >
                    <p className="text-sm font-semibold">Issue Book</p>
                    <select
                      value={issueStudentId}
                      onChange={(e) => setIssueStudentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)]"
                    >
                      <option value="">Select user</option>
                      {supabaseStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.email})
                        </option>
                      ))}
                    </select>
                    <select
                      value={issueBookId}
                      onChange={(e) => setIssueBookId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)]"
                    >
                      <option value="">Select book</option>
                      {supabaseBooks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)]"
                    />
                    <button className="px-4 py-2 rounded-lg bg-[hsl(200,80%,55%)] text-[hsl(220,20%,8%)] text-sm font-medium">
                      Issue
                    </button>
                  </form>
                </div>

                <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-[hsl(220,15%,18%)]">
                    <p className="text-sm font-semibold">Books Database Table</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[hsl(220,10%,50%)] border-b border-[hsl(220,15%,18%)]">
                        {['User', 'Book ID', 'Book Name', 'Issued Date', 'Return Date', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-4 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {supabaseIssues.map((issue) => (
                        <tr key={issue.id} className="border-b border-[hsl(220,15%,14%)]">
                          <td className="px-4 py-3">{issue.student?.name || 'Unknown'}</td>
                          <td className="px-4 py-3 font-mono text-xs">{issue.book_id}</td>
                          <td className="px-4 py-3">{issue.book?.title || 'Unknown'}</td>
                          <td className="px-4 py-3">{format(new Date(issue.issue_date), 'dd/MM/yy, hh:mm a')}</td>
                          <td className="px-4 py-3">
                            {issue.return_date ? format(new Date(issue.return_date), 'dd/MM/yy, hh:mm a') : '-'}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${issue.return_date ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                              {issue.return_date ? 'Returned' : 'Issued'}
                            </span>
                          </td>
                          <td className="px-4 py-3 space-x-2">
                            {!issue.return_date && (
                              <button
                                onClick={async () => {
                                  await markReturned(issue.id);
                                  toast.success('Marked as returned.');
                                  await loadAll();
                                }}
                                className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs"
                              >
                                Return
                              </button>
                            )}
                            {issue.book_id && (
                              <button
                                onClick={async () => {
                                  await deleteBook(issue.book_id);
                                  toast.success('Book deleted.');
                                  await loadAll();
                                }}
                                className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-xs"
                              >
                                Delete Book
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-[hsl(220,15%,18%)]">
                    <p className="text-sm font-semibold">Books Master Table</p>
                  </div>
                  {supabaseBooks.map((book) => (
                    <div key={book.id} className="px-4 py-3 border-b border-[hsl(220,15%,14%)] flex items-center justify-between">
                      <div>
                        <p className="text-sm">{book.title}</p>
                        <p className="text-xs text-[hsl(220,10%,50%)]">{book.id}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setEditingBookId(book.id);
                            setBookTitle(book.title);
                            setBookImage(book.image || '');
                          }}
                          className="px-2 py-1 rounded bg-[hsl(220,18%,13%)] text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            await deleteBook(book.id);
                            toast.success('Book deleted.');
                            await loadAll();
                          }}
                          className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'users' && (
              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-[hsl(220,15%,18%)]">
                  <p className="text-sm font-semibold">Users Database Table</p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[hsl(220,10%,50%)] border-b border-[hsl(220,15%,18%)]">
                      {['Name', 'Email', 'Phone', 'Created At'].map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {supabaseStudents.map((student) => (
                      <tr key={student.id} className="border-b border-[hsl(220,15%,14%)]">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{student.email}</td>
                        <td className="px-4 py-3">{student.phone || '-'}</td>
                        <td className="px-4 py-3">{format(new Date(student.created_at), 'dd/MM/yy, hh:mm a')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section === 'settings' && (
              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-5">
                <p className="text-lg font-semibold mb-2">Settings</p>
                <p className="text-sm text-[hsl(220,10%,55%)]">Settings section is routed on this same page, as requested.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}