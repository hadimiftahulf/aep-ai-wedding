import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { glass?: boolean }
>(({ className, glass = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all duration-700",
      glass 
        ? "bg-white/80 backdrop-blur-md border border-white/50 shadow-[0_15px_40px_-10px_rgba(21,54,51,0.08)]" 
        : "bg-white border border-sage-200 shadow-sm",
      className
    )}
    {...props}
  >
    {/* Subtle inner gold frame border simulating thick stationery paper */}
    <div className="absolute top-2 bottom-2 left-2 right-2 border border-gold-400/20 rounded-[1.25rem] pointer-events-none" />
    <div className="relative z-10">{props.children}</div>
  </div>
));
Card.displayName = "Card";

export { Card };
