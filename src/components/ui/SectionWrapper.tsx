"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  withOrnament?: boolean;
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
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } 
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
  withOrnament = false,
  ...props
}: SectionWrapperProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "relative py-32 px-6 md:py-40 overflow-hidden w-full",
        className
      )}
      {...props}
    >
      {/* Hyper-detailed botanical wash in background */}
      {withOrnament && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute inset-0 pointer-events-none -z-10 bg-luxury-floral bg-cover bg-center bg-no-repeat mix-blend-multiply"
        />
      )}
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {children as React.ReactNode}
      </div>
    </motion.section>
  );
}
