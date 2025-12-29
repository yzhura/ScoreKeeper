"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  elevate?: boolean;
  bordered?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  elevate = false,
  bordered = false,
  onClick,
}: CardProps) {
  const baseStyles = "bg-white dark:bg-gray-800 rounded-2xl transition-all duration-200";
  
  const styles = cn(
    baseStyles,
    elevate && "shadow-xl shadow-black/10 dark:shadow-black/30",
    bordered && "border border-gray-200 dark:border-gray-700",
    onClick && "cursor-pointer hover:shadow-2xl",
    className
  );

  const content = (
    <div className={styles}>
      {children}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

