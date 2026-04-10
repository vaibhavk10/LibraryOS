import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, AlertTriangle, ArrowRight, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthContext } from '../context/AuthContext';
import { MOCK_BORROWED } from '../data/mockData';
import { format } from 'date-fns';
import type { SupabaseIssue } from '../types';
import { listIssuesForStudent } from '../services/issueService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

const STATUS_CONFIG = {
  active: { label: 'Active', color: 'text-[hsl(200,80%,60%)] bg-[hsl(200,80%,60%)]/10 border-[hsl(200,80%,60%)]/20' },
  overdue: { label: 'Overdue', color: 'text-[hsl(0,70%,60%)] bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/20' },
  returned: { label: 'Returned', color: 'text-[hsl(142,70%,50%)] bg-[hsl(142,70%,50%)]/10 border-[hsl(142,70%,50%)]/20' },
};

export default function Dashboard() {
  const { user } = useAuthContext();
  const myBooks = MOCK_BORROWED.filter((b) => b.memberId === user?.id);
  const allBooks = MOCK_BORROWED;
  const [studentIssues, setStudentIssues] = useState<SupabaseIssue[]>([]);

  useEffect(() => {
    const loadIssues = async () => {
      if (!isSupabaseConfigured || !user?.id || user.role === 'member') return;
      try {
        const data = await listIssuesForStudent(user.id);
        setStudentIssues(data);
      } catch {
        setStudentIssues([]);
      }
    };
    loadIssues();
  }, [user?.id, user?.role]);

  const active = allBooks.filter((b) => b.status === 'active').length;
  const overdue = allBooks.filter((b) => b.status === 'overdue').length;
  const returned = allBooks.filter((b) => b.status === 'returned').length;

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-[hsl(45,90%,55%)]/30"
              />
              <div>
                <h1 className="font-serif text-3xl font-bold text-white">
                  Welcome back, {user?.name.split(' ')[0]}
                </h1>
                <p className="text-[hsl(220,10%,50%)] text-sm">
                  Member since {user?.joinedDate ? format(new Date(user.joinedDate), 'MMMM yyyy') : ''}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Currently Borrowed', value: active, icon: BookOpen, color: 'bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)]' },
              { label: 'Overdue Books', value: overdue, icon: AlertTriangle, color: 'bg-[hsl(0,70%,60%)]/10 text-[hsl(0,70%,60%)]' },
              { label: 'Books Returned', value: returned, icon: CheckCircle, color: 'bg-[hsl(142,70%,50%)]/10 text-[hsl(142,70%,50%)]' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-6"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold font-serif text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[hsl(220,10%,50%)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Borrowed Books */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-semibold text-white">My Borrowed Books</h2>
                <Link
                  to="/catalog"
                  className="flex items-center gap-1.5 text-sm text-[hsl(45,90%,55%)] hover:text-[hsl(45,90%,65%)] transition-colors"
                >
                  Browse more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {studentIssues.map((issue) => (
                  <div
                    key={`supabase-${issue.id}`}
                    className="flex items-center gap-4 p-4 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl"
                  >
                    <img
                      src={issue.book?.image || 'https://via.placeholder.com/44x60?text=Book'}
                      alt={issue.book?.title || 'Book cover'}
                      width={44}
                      height={60}
                      className="w-11 h-14 object-cover rounded-lg border border-[hsl(220,15%,20%)] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{issue.book?.title || 'Untitled book'}</h3>
                      <p className="text-xs text-[hsl(220,10%,50%)] mt-0.5">Supabase issue record</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Calendar className="w-3 h-3 text-[hsl(220,10%,40%)]" />
                        <span className="text-xs text-[hsl(220,10%,45%)]">
                          Issued {format(new Date(issue.issue_date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full border text-[hsl(200,80%,60%)] bg-[hsl(200,80%,60%)]/10 border-[hsl(200,80%,60%)]/20">
                      {issue.return_date ? 'Returned' : 'Active'}
                    </span>
                  </div>
                ))}
                {myBooks.length === 0 && studentIssues.length === 0 ? (
                  <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-8 text-center">
                    <BookOpen className="w-8 h-8 text-[hsl(220,10%,35%)] mx-auto mb-3" />
                    <p className="text-sm text-[hsl(220,10%,50%)]">No books borrowed yet.</p>
                    <Link
                      to="/catalog"
                      className="inline-block mt-3 px-4 py-2 text-xs font-medium bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] transition-all duration-200"
                    >
                      Browse Catalog
                    </Link>
                  </div>
                ) : (
                  myBooks.map((book, i) => {
                    const cfg = STATUS_CONFIG[book.status];
                    return (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        className="flex items-center gap-4 p-4 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl hover:border-[hsl(220,15%,25%)] transition-all duration-200"
                      >
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          width={44}
                          height={60}
                          className="w-11 h-14 object-cover rounded-lg border border-[hsl(220,15%,20%)] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">{book.title}</h3>
                          <p className="text-xs text-[hsl(220,10%,50%)] mt-0.5">{book.author}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Calendar className="w-3 h-3 text-[hsl(220,10%,40%)]" />
                            <span className="text-xs text-[hsl(220,10%,45%)]">
                              Due {format(new Date(book.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${cfg.color} flex-shrink-0`}>
                          {cfg.label}
                        </span>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-white mb-5">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { label: 'Browse Catalog', desc: 'Search 20M+ books', href: '/catalog', icon: BookOpen, color: 'text-[hsl(45,90%,55%)]' },
                  { label: 'View Due Dates', desc: 'Check your schedule', href: '/dashboard', icon: Clock, color: 'text-[hsl(200,80%,55%)]' },
                  { label: 'Borrowing History', desc: 'Past checkouts', href: '/dashboard', icon: CheckCircle, color: 'text-[hsl(142,70%,50%)]' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="flex items-center gap-4 p-4 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl hover:border-[hsl(220,15%,28%)] hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-[hsl(220,18%,14%)] flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[hsl(45,90%,65%)] transition-colors">{action.label}</div>
                      <div className="text-xs text-[hsl(220,10%,45%)]">{action.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[hsl(220,10%,35%)] ml-auto group-hover:text-[hsl(220,10%,55%)] transition-colors" />
                  </Link>
                ))}
              </div>

              {/* Overdue Alert */}
              {overdue > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-6 p-4 bg-[hsl(0,70%,60%)]/8 border border-[hsl(0,70%,60%)]/20 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-[hsl(0,70%,60%)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[hsl(0,70%,65%)]">Overdue Notice</p>
                      <p className="text-xs text-[hsl(0,70%,55%)] mt-0.5">
                        You have {overdue} overdue book{overdue > 1 ? 's' : ''}. Please return them to avoid fines.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}