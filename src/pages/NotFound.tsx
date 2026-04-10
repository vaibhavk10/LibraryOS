import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-[hsl(220,18%,12%)] border border-[hsl(220,15%,20%)] flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-9 h-9 text-[hsl(45,90%,55%)]" />
        </div>
        <h1 className="font-serif text-6xl font-bold text-white mb-3">404</h1>
        <h2 className="font-serif text-2xl font-semibold text-white mb-3">Page not found</h2>
        <p className="text-[hsl(220,10%,55%)] text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] font-semibold rounded-xl hover:bg-[hsl(45,90%,62%)] hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}