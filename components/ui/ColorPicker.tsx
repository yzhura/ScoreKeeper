"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onCustomColorClick: () => void;
  showCustomButton?: boolean;
}

export function ColorPicker({
  colors,
  selectedColor,
  onColorSelect,
  onCustomColorClick,
  showCustomButton = true,
}: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {colors.map((color) => (
        <motion.button
          key={color}
          type="button"
          onClick={() => onColorSelect(color)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-10 h-10 rounded-full border-2 transition-all",
            selectedColor === color
              ? "border-gray-900 dark:border-white scale-110"
              : "border-gray-300 dark:border-gray-600"
          )}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
      {showCustomButton && (
        <motion.button
          type="button"
          onClick={onCustomColorClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          aria-label="Custom color"
        >
          <Plus size={16} />
        </motion.button>
      )}
    </div>
  );
}

