import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[hsl(220,20%,6%)] border-t border-[hsl(220,15%,15%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[hsl(45,90%,55%)] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[hsl(220,20%,8%)]" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Library<span className="text-[hsl(45,90%,55%)]">OS</span>
              </span>
            </Link>
            <p className="text-sm text-[hsl(220,10%,55%)] leading-relaxed mb-6">
              The modern library management platform for institutions that value knowledge and efficiency.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[hsl(220,15%,20%)] flex items-center justify-center text-[hsl(220,10%,55%)] hover:text-white hover:border-[hsl(220,15%,35%)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {['Catalog', 'Features', 'Pricing', 'Changelog'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm text-[hsl(220,10%,55%)] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[hsl(220,10%,55%)] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[hsl(220,10%,55%)] hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(220,15%,12%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[hsl(220,10%,40%)]">
            © 2026 LibraryOS, Inc. All rights reserved.
          </p>
          <p className="text-xs text-[hsl(220,10%,40%)]">
            Built with care for libraries worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}