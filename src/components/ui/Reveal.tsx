"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** Stagger index; each step adds 80ms (wraps every 5, like the reference). */
  index?: number;
  className?: string;
}

/** Fades and slides children up 36px the first time they enter the viewport. */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.9, delay: (index % 5) * 0.08, ease: [0.2, 0.8, 0.2, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
