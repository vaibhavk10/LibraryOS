import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, AlertTriangle, TrendingUp,
  Search, MoreVertical, CheckCircle, Clock, RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { MOCK_BORROWED, MOCK_MEMBERS } from '../data/mockData';
import { toast } from 'react-toastify';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

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

const STATUS_CONFIG = {
  active: { label: 'Active', color: 'text-[hsl(200,80%,60%)] bg-[hsl(200,80%,60%)]/10 border-[hsl(200,80%,60%)]/20' },
  overdue: { label: 'Overdue', color: 'text-[hsl(0,70%,60%)] bg-[hsl(0,70%,60%)]/10 border-[hsl(0,70%,60%)]/20' },
  returned: { label: 'Returned', color: 'text-[hsl(142,70%,50%)] bg-[hsl(142,70%,50%)]/10 border-[hsl(142,70%,50%)]/20' },
};

type TabType = 'overview' | 'books' | 'members';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [memberSearch, setMemberSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');

  const stats = {
    totalBooks: 12847,
    activeMembers: MOCK_MEMBERS.length,
    borrowedBooks: MOCK_BORROWED.filter((b) => b.status === 'active').length,
    overdueBooks: MOCK_BORROWED.filter((b) => b.status === 'overdue').length,
  };

  const filteredMembers = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const filteredBooks = MOCK_BORROWED.filter(
    (b) =>
      b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.memberName.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const handleMarkReturned = (id: string, title: string) => {
    toast.success(`"${title}" marked as returned.`);
  };

  const TABS: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'books', label: 'Borrowed Books' },
    { id: 'members', label: 'Members' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-[hsl(220,10%,50%)] text-sm">
              Manage your library — books, members, and borrowing activity.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Books"
              value={stats.totalBooks.toLocaleString()}
              icon={BookOpen}
              trend="12%"
              trendUp
              color="bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,55%)]"
              index={0}
            />
            <StatCard
              label="Active Members"
              value={stats.activeMembers}
              icon={Users}
              trend="8%"
              trendUp
              color="bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)]"
              index={1}
            />
            <StatCard
              label="Books Borrowed"
              value={stats.borrowedBooks}
              icon={Clock}
              color="bg-[hsl(142,70%,50%)]/10 text-[hsl(142,70%,50%)]"
              index={2}
            />
            <StatCard
              label="Overdue Books"
              value={stats.overdueBooks}
              icon={AlertTriangle}
              trend="2"
              trendUp={false}
              color="bg-[hsl(0,70%,60%)]/10 text-[hsl(0,70%,60%)]"
              index={3}
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-8 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)]'
                    : 'text-[hsl(220,10%,55%)] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
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
              </div>

              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-4 h-4 text-[hsl(200,80%,55%)]" />
                  <h2 className="font-serif text-base font-semibold text-white">Member Growth</h2>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={MEMBER_GROWTH}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,18%)" />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'hsl(220,10%,50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'hsl(220,18%,12%)', border: '1px solid hsl(220,15%,22%)', borderRadius: '8px', color: 'white' }}
                    />
                    <Line type="monotone" dataKey="members" stroke="hsl(200,80%,55%)" strokeWidth={2.5} dot={{ fill: 'hsl(200,80%,55%)', r: 4 }} name="Members" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-6">
                <h2 className="font-serif text-base font-semibold text-white mb-5">Recent Borrowing Activity</h2>
                <div className="space-y-3">
                  {MOCK_BORROWED.slice(0, 4).map((book) => {
                    const cfg = STATUS_CONFIG[book.status];
                    return (
                      <div key={book.id} className="flex items-center gap-4 p-3 bg-[hsl(220,18%,12%)] rounded-lg">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          width={36}
                          height={48}
                          className="w-9 h-12 object-cover rounded border border-[hsl(220,15%,20%)] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{book.title}</p>
                          <p className="text-xs text-[hsl(220,10%,50%)]">{book.memberName} · Due {format(new Date(book.dueDate), 'MMM d')}</p>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Books Tab */}
          {activeTab === 'books' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden">
                <div className="p-5 border-b border-[hsl(220,15%,16%)] flex items-center gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,10%,40%)]" />
                    <input
                      type="text"
                      value={bookSearch}
                      onChange={(e) => setBookSearch(e.target.value)}
                      placeholder="Search books or members…"
                      className="w-full pl-9 pr-4 py-2.5 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white placeholder-[hsl(220,10%,38%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(45,90%,55%)]/30 text-sm transition-all duration-200"
                    />
                  </div>
                  <span className="text-xs text-[hsl(220,10%,45%)] bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,20%)] px-3 py-2 rounded-lg">
                    {filteredBooks.length} records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[hsl(220,15%,16%)]">
                        {['Book', 'Member', 'Borrowed', 'Due Date', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-[hsl(220,10%,45%)] uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(220,15%,14%)]">
                      {filteredBooks.map((book) => {
                        const cfg = STATUS_CONFIG[book.status];
                        return (
                          <tr key={book.id} className="hover:bg-[hsl(220,18%,12%)] transition-colors duration-150">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={book.coverUrl}
                                  alt={book.title}
                                  width={32}
                                  height={42}
                                  className="w-8 h-10 object-cover rounded border border-[hsl(220,15%,20%)] flex-shrink-0"
                                />
                                <div>
                                  <p className="text-sm font-medium text-white">{book.title}</p>
                                  <p className="text-xs text-[hsl(220,10%,45%)]">{book.author}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-[hsl(220,10%,65%)]">{book.memberName}</td>
                            <td className="px-5 py-4 text-sm text-[hsl(220,10%,55%)]">
                              {format(new Date(book.borrowedDate), 'MMM d, yyyy')}
                            </td>
                            <td className="px-5 py-4 text-sm text-[hsl(220,10%,55%)]">
                              {format(new Date(book.dueDate), 'MMM d, yyyy')}
                            </td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${cfg.color}`}>
                                {cfg.label}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {book.status !== 'returned' && (
                                <button
                                  onClick={() => handleMarkReturned(book.id, book.title)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[hsl(142,70%,50%)] border border-[hsl(142,70%,50%)]/20 rounded-lg hover:bg-[hsl(142,70%,50%)]/10 transition-all duration-200"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Return
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden">
                <div className="p-5 border-b border-[hsl(220,15%,16%)] flex items-center gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,10%,40%)]" />
                    <input
                      type="text"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search members…"
                      className="w-full pl-9 pr-4 py-2.5 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white placeholder-[hsl(220,10%,38%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(45,90%,55%)]/30 text-sm transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={() => toast.info('Member invite feature coming soon.')}
                    className="px-4 py-2.5 text-sm font-medium bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] transition-all duration-200"
                  >
                    + Invite Member
                  </button>
                </div>

                <div className="divide-y divide-[hsl(220,15%,14%)]">
                  {filteredMembers.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-[hsl(220,18%,12%)] transition-colors duration-150"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-[hsl(220,15%,22%)] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{member.name}</p>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            member.role === 'admin'
                              ? 'bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,65%)] border border-[hsl(45,90%,55%)]/20'
                              : 'bg-[hsl(220,15%,18%)] text-[hsl(220,10%,55%)] border border-[hsl(220,15%,22%)]'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                        <p className="text-xs text-[hsl(220,10%,45%)] mt-0.5">{member.email}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-6 text-right">
                        <div>
                          <p className="text-sm font-semibold text-white">{member.borrowedCount}</p>
                          <p className="text-xs text-[hsl(220,10%,45%)]">Borrowed</p>
                        </div>
                        <div>
                          <p className="text-sm text-[hsl(220,10%,55%)]">
                            {format(new Date(member.joinedDate), 'MMM yyyy')}
                          </p>
                          <p className="text-xs text-[hsl(220,10%,45%)]">Joined</p>
                        </div>
                      </div>
                      <button
                        aria-label="More options"
                        className="p-2 text-[hsl(220,10%,40%)] hover:text-white rounded-lg hover:bg-[hsl(220,15%,18%)] transition-all duration-200"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}