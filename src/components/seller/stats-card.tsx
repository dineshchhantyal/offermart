"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtext?: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  subtext,
  icon,
  title,
  value,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="group relative p-4 rounded-lg bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h3>
      </div>
      <div className="space-y-0.5">
        <p className="font-semibold tracking-tight text-gray-900 dark:text-white">
          {value}
        </p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.div>
  );
};

export default StatsCard;
