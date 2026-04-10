import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  const fillDemo = (role: 'admin' | 'member') => {
    if (role === 'admin') {
      setEmail('admin@libraryos.com');
      setPassword('admin123');
    } else {
      setEmail('member@libraryos.com');
      setPassword('member123');
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(45,90%,55%)_0%,transparent_50%)] opacity-[0.04]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[hsl(45,90%,55%)] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[hsl(220,20%,8%)]" />
            </div>
            <span className="font-serif text-2xl font-bold text-white">
              Library<span className="text-[hsl(45,90%,55%)]">OS</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-[hsl(220,10%,55%)] text-sm">Sign in to your library account</p>
        </div>

        <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-2xl p-8">
          {/* Demo credentials */}
          <div className="mb-6 p-4 bg-[hsl(45,90%,55%)]/5 border border-[hsl(45,90%,55%)]/15 rounded-xl">
            <p className="text-xs text-[hsl(45,90%,65%)] font-medium mb-3">Demo Accounts</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="flex-1 px-3 py-2 text-xs font-medium bg-[hsl(45,90%,55%)]/10 text-[hsl(45,90%,65%)] border border-[hsl(45,90%,55%)]/20 rounded-lg hover:bg-[hsl(45,90%,55%)]/20 transition-all duration-200"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo('member')}
                className="flex-1 px-3 py-2 text-xs font-medium bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,65%)] border border-[hsl(200,80%,55%)]/20 rounded-lg hover:bg-[hsl(200,80%,55%)]/20 transition-all duration-200"
              >
                Member Demo
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[hsl(220,10%,70%)] mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white placeholder-[hsl(220,10%,38%)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(45,90%,55%)]/40 focus:border-[hsl(45,90%,55%)]/50 transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[hsl(220,10%,70%)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white placeholder-[hsl(220,10%,38%)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(45,90%,55%)]/40 focus:border-[hsl(45,90%,55%)]/50 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[hsl(220,10%,45%)] hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[hsl(0,70%,60%)]/10 border border-[hsl(0,70%,60%)]/20 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 text-[hsl(0,70%,60%)] flex-shrink-0" />
                <p className="text-xs text-[hsl(0,70%,65%)]">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] font-semibold rounded-xl hover:bg-[hsl(45,90%,62%)] disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-200 text-sm"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-[hsl(220,10%,45%)] mt-6">
            Don't have an account?{' '}
            <Link to="/login" className="text-[hsl(45,90%,55%)] hover:text-[hsl(45,90%,65%)] font-medium transition-colors">
              Contact your administrator
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}