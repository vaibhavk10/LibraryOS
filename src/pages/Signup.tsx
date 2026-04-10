import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

export default function Signup() {
  const { signup, loading } = useAuthContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup({ name, email, phone, password });
    if (result.ok) {
      toast.success('Signup successful. Check your email for verification link.');
      navigate('/login?verify=1');
      return;
    }
    toast.error(result.message);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] flex items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[hsl(45,90%,55%)] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[hsl(220,20%,8%)]" />
            </div>
            <span className="font-serif text-2xl font-bold text-white">
              Library<span className="text-[hsl(45,90%,55%)]">OS</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-[hsl(220,10%,55%)] text-sm">Sign up and verify email to access dashboard</p>
        </div>

        <div className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full px-4 py-3 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white rounded-xl text-sm"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-3 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white rounded-xl text-sm"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full px-4 py-3 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white rounded-xl text-sm"
            />
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                minLength={6}
                className="w-full px-4 py-3 pr-12 bg-[hsl(220,18%,13%)] border border-[hsl(220,15%,22%)] text-white rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(220,10%,45%)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] font-semibold rounded-xl"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-xs text-[hsl(220,10%,45%)] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[hsl(45,90%,55%)] font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
