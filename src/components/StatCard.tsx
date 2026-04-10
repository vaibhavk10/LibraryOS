import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: string;
  index?: number;
}

export default function StatCard({ label, value, icon: Icon, trend, trendUp, color, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-[hsl(220,18%,10%)] border border-[hsl(220,15%,18%)] rounded-xl p-6 hover:border-[hsl(220,15%,25%)] hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trendUp
              ? 'text-[hsl(142,70%,55%)] bg-[hsl(142,70%,55%)]/10'
              : 'text-[hsl(0,70%,60%)] bg-[hsl(0,70%,60%)]/10'
          }`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1 font-serif">{value}</div>
      <div className="text-sm text-[hsl(220,10%,50%)]">{label}</div>
    </motion.div>
  );
}