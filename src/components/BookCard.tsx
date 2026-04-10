import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Star } from 'lucide-react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBorrow?: (book: Book) => void;
  index?: number;
}

export default function BookCard({ book, onBorrow, index = 0 }: BookCardProps) {
  const [imgError, setImgError] = useState(false);
  const coverUrl = book.cover_i && !imgError
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const author = book.author_name?.[0] ?? 'Unknown Author';
  const year = book.first_publish_year;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl overflow-hidden hover:border-[hsl(45,90%,55%)]/40 hover:shadow-xl hover:shadow-[hsl(45,90%,55%)]/5 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-52 bg-[hsl(220,18%,13%)] overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            width={200}
            height={208}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <BookOpen className="w-12 h-12 text-[hsl(220,15%,30%)]" />
            <span className="text-xs text-[hsl(220,10%,40%)] text-center px-4 line-clamp-2">{book.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,18%,10%)] via-transparent to-transparent opacity-60" />
        {year && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-[hsl(220,20%,8%)]/80 backdrop-blur-sm rounded-md border border-[hsl(220,15%,20%)]">
            <span className="text-xs text-[hsl(220,10%,60%)] font-medium">{year}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-base font-semibold text-white line-clamp-2 mb-2 group-hover:text-[hsl(45,90%,65%)] transition-colors duration-200">
          {book.title}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <User className="w-3.5 h-3.5 text-[hsl(220,10%,45%)] flex-shrink-0" />
          <span className="text-xs text-[hsl(220,10%,55%)] truncate">{author}</span>
        </div>

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {book.subject.slice(0, 2).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-xs bg-[hsl(220,15%,15%)] text-[hsl(220,10%,55%)] rounded-md border border-[hsl(220,15%,22%)]"
              >
                {s.length > 20 ? s.slice(0, 20) + '…' : s}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[hsl(220,15%,16%)]">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= 4 ? 'text-[hsl(45,90%,55%)] fill-[hsl(45,90%,55%)]' : 'text-[hsl(220,15%,25%)]'}`}
              />
            ))}
          </div>
          {onBorrow && (
            <button
              onClick={() => onBorrow(book)}
              className="px-3 py-1.5 text-xs font-semibold bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-lg hover:bg-[hsl(45,90%,62%)] hover:scale-105 transition-all duration-200"
            >
              Borrow
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}