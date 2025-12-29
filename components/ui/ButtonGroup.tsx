"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  children,
  className,
  orientation = "horizontal",
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-2",
        orientation === "vertical" && "flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

