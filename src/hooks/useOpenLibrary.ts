import { useState, useCallback } from 'react';
import type { Book, OpenLibraryResponse } from '../types';

export function useOpenLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const searchBooks = useCallback(async (query: string, page = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * 12;
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12&offset=${offset}&fields=key,title,author_name,cover_i,first_publish_year,subject,isbn,publisher,language,number_of_pages_median`
      );
      if (!res.ok) throw new Error('Failed to fetch books');
      const data: OpenLibraryResponse = await res.json();
      setBooks(data.docs);
      setTotal(data.numFound);
    } catch {
      setError('Unable to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeatured = useCallback(async (subject: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?subject=${encodeURIComponent(subject)}&limit=12&fields=key,title,author_name,cover_i,first_publish_year,subject,isbn,publisher,language,number_of_pages_median`
      );
      if (!res.ok) throw new Error('Failed to fetch books');
      const data: OpenLibraryResponse = await res.json();
      setBooks(data.docs);
      setTotal(data.numFound);
    } catch {
      setError('Unable to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, total, searchBooks, fetchFeatured };
}