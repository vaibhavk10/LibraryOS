import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[hsl(220,18%,12%)] border border-[hsl(220,15%,20%)] flex items-center justify-center">
        <BookOpen className="w-7 h-7 text-[hsl(220,10%,40%)]" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-[hsl(220,10%,50%)] max-w-xs">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}