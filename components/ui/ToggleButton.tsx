"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  children: React.ReactNode;
}

export function ToggleButton({
  isSelected,
  children,
  className,
  ...props
}: ToggleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex-1 px-4 py-3 rounded-lg border-2 transition-all",
        isSelected
          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

