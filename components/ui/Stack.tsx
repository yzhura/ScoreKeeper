"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackProps {
  children: ReactNode;
  className?: string;
  gap?: number | string;
  direction?: "row" | "column";
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "wrap" | "nowrap";
}

export function Stack({
  children,
  className,
  gap = 0,
  direction = "column",
  alignItems,
  justifyContent,
  flexWrap,
}: StackProps) {
  const gapValue = typeof gap === "number" ? `${gap * 0.25}rem` : gap;

  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        alignItems === "start" && "items-start",
        alignItems === "center" && "items-center",
        alignItems === "end" && "items-end",
        alignItems === "stretch" && "items-stretch",
        justifyContent === "start" && "justify-start",
        justifyContent === "center" && "justify-center",
        justifyContent === "end" && "justify-end",
        justifyContent === "space-between" && "justify-between",
        justifyContent === "space-around" && "justify-around",
        justifyContent === "space-evenly" && "justify-evenly",
        flexWrap === "wrap" && "flex-wrap",
        flexWrap === "nowrap" && "flex-nowrap",
        className
      )}
      style={{ gap: gapValue }}
    >
      {children}
    </div>
  );
}

export function YStack({ children, ...props }: Omit<StackProps, "direction">) {
  return (
    <Stack direction="column" {...props}>
      {children}
    </Stack>
  );
}

export function XStack({ children, ...props }: Omit<StackProps, "direction">) {
  return (
    <Stack direction="row" {...props}>
      {children}
    </Stack>
  );
}
