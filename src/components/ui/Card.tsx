"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "none";
  onClick?: () => void;
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className,
  glowColor = "none",
  onClick,
  hoverEffect = true,
}: CardProps) {
  const glowClasses = {
    none: "hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5",
    cyan: "hover:border-brand-cyan/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    violet: "hover:border-brand-violet/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    emerald: "hover:border-brand-emerald/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "glass-premium rounded-2xl p-6 border border-slate-200/80 transition-all duration-300",
        onClick && "cursor-pointer",
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
