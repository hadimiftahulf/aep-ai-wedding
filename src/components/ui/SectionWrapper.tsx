"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  withOrnament?: boolean;
  variant?: "default" | "alternate";
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const fadeUpVariant: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100, 
    scale: 0.85, 
    rotateX: 12, 
    filter: "blur(20px)" 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      bounce: 0.45, 
      damping: 18,
      mass: 0.8
    } 
  },
};

export const lineVariant: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
  },
};

export function SectionWrapper({
  className,
  children,
  withOrnament = false, // Deprecated, kept for backward compatibility to prevent TS errors
  variant = "default",
  ...props
}: SectionWrapperProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "relative py-24 px-6 md:py-40 overflow-hidden w-full",
        variant === "alternate" && "bg-navy-900/[0.03] border-y border-navy-900/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.02)]",
        className
      )}
      data-ornament={withOrnament}
      {...props}
    >
      <div className="max-w-5xl mx-auto w-full relative z-10" style={{ perspective: "1000px" }}>
        {children as React.ReactNode}
      </div>
    </motion.section>
  );
}
