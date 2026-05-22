"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "cyan" | "violet" | "emerald";
  glow?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className,
  glow = true,
  ...props
}: ButtonProps) {
  const baseStyles = "relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-md outline-none flex items-center justify-center gap-2 overflow-hidden border";
  
  const variants = {
    primary: "bg-slate-900 text-white border-slate-900 hover:bg-transparent hover:text-slate-900 hover:shadow-[0_4px_20px_rgba(15,23,42,0.15)]",
    secondary: "bg-slate-900/5 text-slate-700 border-slate-200 hover:bg-slate-900/10 hover:border-slate-300 hover:text-slate-900",
    cyan: "bg-transparent text-cyan-600 border-cyan-500/30 hover:bg-cyan-50 hover:border-cyan-500 hover:shadow-[0_4px_15px_rgba(6,182,212,0.15)]",
    violet: "bg-transparent text-violet-600 border-violet-500/30 hover:bg-violet-50 hover:border-violet-500 hover:shadow-[0_4px_15px_rgba(139,92,246,0.15)]",
    emerald: "bg-transparent text-emerald-600 border-emerald-500/30 hover:bg-emerald-50 hover:border-emerald-500 hover:shadow-[0_4px_15px_rgba(16,185,129,0.15)]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {/* Background glow overlay */}
      {glow && (variant !== "primary" && variant !== "secondary") ? (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      ) : null}
      {children}
    </motion.button>
  );
}
