"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 shadow-[0_0_40px_var(--accent-glow)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
