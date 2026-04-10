import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut, User, LayoutDashboard, Library } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[hsl(220,20%,8%)]/95 backdrop-blur-md shadow-lg border-b border-[hsl(220,15%,20%)]'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="LibraryOS Home">
            <div className="w-8 h-8 rounded-lg bg-[hsl(45,90%,55%)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <BookOpen className="w-4 h-4 text-[hsl(220,20%,8%)]" />
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-tight">
              Library<span className="text-[hsl(45,90%,55%)]">OS</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive(link.href)
                    ? 'text-[hsl(45,90%,55%)]'
                    : 'text-[hsl(220,10%,70%)] hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(45,90%,55%)]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white transition-colors duration-200"
                >
                  {user.role === 'admin' ? (
                    <LayoutDashboard className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {user.name.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white border border-[hsl(220,15%,25%)] rounded-lg hover:border-[hsl(220,15%,40%)] transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-[hsl(220,10%,70%)] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[hsl(220,20%,8%)]/98 backdrop-blur-md border-b border-[hsl(220,15%,20%)]"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-[hsl(45,90%,55%)] bg-[hsl(45,90%,55%)]/10'
                      : 'text-[hsl(220,10%,70%)] hover:text-white hover:bg-[hsl(220,15%,15%)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[hsl(220,15%,20%)] mt-2 pt-3 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white rounded-lg hover:bg-[hsl(220,15%,15%)] transition-all duration-200"
                    >
                      {user.role === 'admin' ? <LayoutDashboard className="w-4 h-4" /> : <Library className="w-4 h-4" />}
                      My {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white rounded-lg hover:bg-[hsl(220,15%,15%)] transition-all duration-200 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 text-sm font-medium text-[hsl(220,10%,70%)] hover:text-white rounded-lg hover:bg-[hsl(220,15%,15%)] transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-3 text-sm font-semibold bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg text-center hover:bg-[hsl(45,90%,62%)] transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}