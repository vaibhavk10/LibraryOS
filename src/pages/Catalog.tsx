import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useOpenLibrary } from '../hooks/useOpenLibrary';
import { CATEGORIES } from '../data/mockData';
import type { Book } from '../types';

export default function Catalog() {
  const { books, loading, error, total, searchBooks, fetchFeatured } = useOpenLibrary();
  const [activeCategory, setActiveCategory] = useState('fiction');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchFeatured('fiction');
  }, [fetchFeatured]);

  const handleSearch = (query: string) => {
    setHasSearched(true);
    setActiveCategory('');
    searchBooks(query);
  };

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    setHasSearched(false);
    fetchFeatured(value);
  };

  const handleBorrow = (book: Book) => {
    toast.success(`"${book.title}" added to your borrow list!`);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-[hsl(220,20%,6%)] border-b border-[hsl(220,15%,13%)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Book Catalog
              </h1>
              <p className="text-[hsl(220,10%,55%)] text-lg mb-8">
                Search and discover from over 20 million books powered by Open Library.
              </p>
              <SearchBar onSearch={handleSearch} loading={loading} />
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-[hsl(220,15%,13%)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-1.5 text-[hsl(220,10%,50%)] flex-shrink-0 mr-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Browse:</span>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategory(cat.value)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    activeCategory === cat.value
                      ? 'bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] border-[hsl(45,90%,55%)]'
                      : 'bg-[hsl(220,18%,10%)] text-[hsl(220,10%,60%)] border-[hsl(220,15%,18%)] hover:border-[hsl(220,15%,30%)] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {!loading && books.length > 0 && (
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-[hsl(220,10%,50%)]">
                  {hasSearched
                    ? `Found ${total.toLocaleString()} results`
                    : `Showing ${activeCategory} books`}
                </p>
                <span className="text-xs text-[hsl(220,10%,40%)] bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] px-3 py-1.5 rounded-lg">
                  Powered by Open Library
                </span>
              </div>
            )}

            {loading && <LoadingSpinner message="Fetching books from Open Library…" />}

            {error && !loading && (
              <EmptyState
                title="Unable to load books"
                description={error}
                action={
                  <button
                    onClick={() => fetchFeatured(activeCategory || 'fiction')}
                    className="px-5 py-2.5 text-sm font-medium bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] transition-all duration-200"
                  >
                    Try Again
                  </button>
                }
              />
            )}

            {!loading && !error && books.length === 0 && (
              <EmptyState
                title="No books found"
                description="Try a different search term or browse by category."
              />
            )}

            {!loading && !error && books.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book, i) => (
                  <BookCard key={book.key + i} book={book} onBorrow={handleBorrow} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}