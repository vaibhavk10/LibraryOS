import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, BarChart3, Shield, Search, Bell,
  ArrowRight, CheckCircle, Star, Zap, Globe
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FEATURES = [
  {
    icon: Search,
    title: 'Smart Catalog Search',
    description: 'Instantly search millions of books via Open Library with real-time results and advanced filters.',
    color: 'bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,55%)]',
  },
  {
    icon: Users,
    title: 'Member Management',
    description: 'Manage library members, track borrowing history, and send automated reminders.',
    color: 'bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)]',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Gain insights into borrowing trends, popular titles, and member engagement.',
    color: 'bg-[hsl(142,70%,50%)]/10 text-[hsl(142,70%,50%)]',
  },
  {
    icon: Bell,
    title: 'Due Date Alerts',
    description: 'Automated notifications for due dates, overdue books, and reservation availability.',
    color: 'bg-[hsl(280,70%,60%)]/10 text-[hsl(280,70%,60%)]',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Granular permissions for admins, librarians, and members with secure authentication.',
    color: 'bg-[hsl(0,70%,60%)]/10 text-[hsl(0,70%,60%)]',
  },
  {
    icon: Globe,
    title: 'Open Library Integration',
    description: 'Access 20M+ book records with covers, metadata, and author information instantly.',
    color: 'bg-[hsl(30,90%,55%)]/10 text-[hsl(30,90%,55%)]',
  },
];

const TESTIMONIALS = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Head Librarian, Westfield University',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
    text: 'LibraryOS transformed how we manage our 50,000-book collection. The search and borrowing system is seamless.',
    rating: 5,
  },
  {
    name: 'Robert Tanaka',
    role: 'Director, City Public Library',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    text: 'The analytics dashboard alone saved us 10 hours per week. Our staff loves the intuitive interface.',
    rating: 5,
  },
  {
    name: 'Amara Osei',
    role: 'School Librarian, Greenwood Academy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    text: 'Setting up took less than an hour. Students can now search and reserve books from their phones.',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(45,90%,55%)_0%,transparent_50%)] opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(200,80%,55%)_0%,transparent_50%)] opacity-[0.04]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(hsl(220,15%,20%) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.3 }} />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(45,90%,55%)]/10 border border-[hsl(45,90%,55%)]/20 rounded-full mb-8">
              <Zap className="w-3.5 h-3.5 text-[hsl(45,90%,55%)]" />
              <span className="text-xs font-medium text-[hsl(45,90%,65%)]">Now with Open Library integration — 20M+ books</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            The Modern Library
            <br />
            <span className="text-[hsl(45,90%,55%)]">Management Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[hsl(220,10%,60%)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            LibraryOS gives institutions a powerful, intuitive platform to manage catalogs, members, and borrowing — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] font-semibold rounded-xl hover:bg-[hsl(45,90%,62%)] hover:scale-105 transition-all duration-200 text-base"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/catalog"
              className="flex items-center gap-2 px-8 py-4 border border-[hsl(220,15%,25%)] text-[hsl(220,10%,75%)] font-medium rounded-xl hover:border-[hsl(220,15%,40%)] hover:text-white transition-all duration-200 text-base"
            >
              <BookOpen className="w-4 h-4" />
              Browse Catalog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-14 pt-10 border-t border-[hsl(220,15%,15%)]"
          >
            {[
              { value: '20M+', label: 'Books Available' },
              { value: '500+', label: 'Institutions' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold font-serif text-white">{value}</div>
                <div className="text-xs text-[hsl(220,10%,50%)] mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[hsl(220,20%,6%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Everything your library needs
            </h2>
            <p className="text-[hsl(220,10%,55%)] text-lg max-w-2xl mx-auto">
              A complete suite of tools designed for modern library management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 bg-[hsl(220,18%,9%)] border border-[hsl(220,15%,16%)] rounded-xl hover:border-[hsl(220,15%,25%)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[hsl(220,10%,55%)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[hsl(220,20%,7%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-4">Trusted by librarians worldwide</h2>
            <p className="text-[hsl(220,10%,55%)] text-lg">See what library professionals say about LibraryOS.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-[hsl(220,18%,9%)] border border-[hsl(220,15%,16%)] rounded-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[hsl(45,90%,55%)] fill-[hsl(45,90%,55%)]" />
                  ))}
                </div>
                <p className="text-sm text-[hsl(220,10%,65%)] leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-[hsl(220,15%,22%)]"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-[hsl(220,10%,50%)]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[hsl(220,20%,6%)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-12 bg-[hsl(220,18%,9%)] border border-[hsl(220,15%,18%)] rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45,90%,55%)_0%,transparent_65%)] opacity-[0.05]" />
              <div className="relative">
                <h2 className="font-serif text-4xl font-bold text-white mb-4">
                  Ready to modernize your library?
                </h2>
                <p className="text-[hsl(220,10%,60%)] text-lg mb-8 max-w-xl mx-auto">
                  Join 500+ institutions already using LibraryOS. Start your free 30-day trial today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-8 py-4 bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] font-semibold rounded-xl hover:bg-[hsl(45,90%,62%)] hover:scale-105 transition-all duration-200"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8">
                  {['No credit card required', 'Free 30-day trial', 'Cancel anytime'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[hsl(142,70%,50%)]" />
                      <span className="text-xs text-[hsl(220,10%,55%)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}