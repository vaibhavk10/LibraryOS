import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Bell, Shield, Globe, Search, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FEATURES_DETAIL = [
  {
    icon: Search,
    title: 'Smart Catalog Search',
    description: 'Powered by Open Library\'s 20M+ book database. Search by title, author, ISBN, or subject with instant results.',
    color: 'bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,55%)]',
    points: ['Full-text search across 20M+ titles', 'Real-time cover images and metadata', 'Advanced subject and genre filters'],
  },
  {
    icon: Users,
    title: 'Member Management',
    description: 'Complete member lifecycle management from onboarding to borrowing history and account management.',
    color: 'bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)]',
    points: ['Member profiles with borrowing history', 'Role-based access (Admin / Member)', 'Bulk import and export'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Understand your library\'s usage patterns with detailed charts and exportable reports.',
    color: 'bg-[hsl(142,70%,50%)]/10 text-[hsl(142,70%,50%)]',
    points: ['Borrowing trends over time', 'Most popular titles and authors', 'Member engagement metrics'],
  },
  {
    icon: Bell,
    title: 'Automated Notifications',
    description: 'Keep members informed with automated due date reminders, overdue alerts, and reservation updates.',
    color: 'bg-[hsl(280,70%,60%)]/10 text-[hsl(280,70%,60%)]',
    points: ['Due date reminders (3 days before)', 'Overdue book alerts', 'Reservation availability notices'],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with role-based access control and full audit logging.',
    color: 'bg-[hsl(0,70%,60%)]/10 text-[hsl(0,70%,60%)]',
    points: ['Role-based access control', 'Full audit trail', 'GDPR-compliant data handling'],
  },
  {
    icon: Globe,
    title: 'Open Library Integration',
    description: 'Seamlessly connected to the Open Library API for real-time book data, covers, and metadata.',
    color: 'bg-[hsl(30,90%,55%)]/10 text-[hsl(30,90%,55%)]',
    points: ['20M+ book records', 'High-resolution cover images', 'Author and subject metadata'],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      <main className="pt-24">
        <section className="py-20 bg-[hsl(220,20%,6%)] border-b border-[hsl(220,15%,13%)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(45,90%,55%)]/10 border border-[hsl(45,90%,55%)]/20 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5 text-[hsl(45,90%,55%)]" />
                <span className="text-xs font-medium text-[hsl(45,90%,65%)]">Everything you need</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Powerful Features for Modern Libraries
              </h1>
              <p className="text-[hsl(220,10%,55%)] text-lg max-w-2xl mx-auto">
                LibraryOS combines a beautiful interface with powerful tools to help you manage every aspect of your library.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES_DETAIL.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-8 bg-[hsl(220,18%,9%)] border border-[hsl(220,15%,16%)] rounded-xl hover:border-[hsl(220,15%,25%)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-white mb-2">{feature.title}</h2>
                  <p className="text-sm text-[hsl(220,10%,55%)] leading-relaxed mb-5">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(45,90%,55%)] mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-[hsl(220,10%,60%)]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}