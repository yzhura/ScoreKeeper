"use client";

import { ReactNode } from "react";
import { Card } from "./Card";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <Card className={`p-6 ${className || ""}`}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      {children}
    </Card>
  );
}

