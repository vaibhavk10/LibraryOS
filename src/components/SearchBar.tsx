import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export default function SearchBar({ onSearch, placeholder = 'Search books, authors, subjects…', loading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-[hsl(220,10%,45%)] pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search books"
          className="w-full pl-12 pr-24 py-3.5 bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,20%)] text-white placeholder-[hsl(220,10%,40%)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(45,90%,55%)]/40 focus:border-[hsl(45,90%,55%)]/50 transition-all duration-200 text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 p-1 text-[hsl(220,10%,45%)] hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="absolute right-2 px-4 py-2 text-sm font-semibold bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>
    </form>
  );
}