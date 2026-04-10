import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-2 border-[hsl(220,15%,25%)] border-t-[hsl(45,90%,55%)] rounded-full"
      />
      <p className="text-sm text-[hsl(220,10%,50%)]">{message}</p>
    </div>
  );
}