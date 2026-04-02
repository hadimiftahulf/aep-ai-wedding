"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3DWrapper({ children, className = "", intensity = 8 }: Tilt3DWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Very loose spring for buttery smooth cinematic tilt
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-[1200px] ${className}`}
    >
      <motion.div 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} 
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
