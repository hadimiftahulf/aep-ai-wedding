import * as React from "react";
import { cn } from "@/lib/utils";
import { Tilt3DWrapper } from "./Tilt3DWrapper";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { glass?: boolean; enable3D?: boolean }
>(({ className, glass = false, enable3D = true, ...props }, ref) => {
  const Inner = (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all duration-700 w-full h-full block group-hover/tilt:shadow-[0_45px_75px_-15px_rgba(20,30,60,0.15)]",
        glass 
          ? "bg-white/40 backdrop-blur-2xl border border-gold-400/20 shadow-[0_15px_40px_-10px_rgba(10,21,36,0.1)] ring-1 ring-white/50" 
          : "bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="absolute top-2 bottom-2 left-2 right-2 border border-gold-400/20 rounded-[1.25rem] pointer-events-none" />
      
      {/* Interactive Glare / Shine Effect tracking orientation natively */}
      {enable3D && glass && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover/tilt:translate-x-[200%] pointer-events-none z-0" />
      )}
      
      <div className="relative z-10">{props.children}</div>
    </div>
  );

  return enable3D && glass ? <Tilt3DWrapper className="w-full h-full group/tilt z-20 cursor-default">{Inner}</Tilt3DWrapper> : Inner;
});
Card.displayName = "Card";

export { Card };
