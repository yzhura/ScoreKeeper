"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="text-lg font-semibold text-gray-900 dark:text-white">
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="toggle-checkbox"
      />
    </label>
  );
}

