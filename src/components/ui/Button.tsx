import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-body text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 overflow-hidden rounded-full font-medium",
          {
            "bg-navy-800 text-white hover:bg-navy-700 shadow-md hover:shadow-xl hover:-translate-y-1":
              variant === "primary",
            "bg-transparent border border-navy-800/20 text-navy-900 hover:border-gold-500 hover:text-gold-600":
              variant === "outline",
            "hover:bg-slate-100 text-navy-800/80 hover:text-navy-900": variant === "ghost",
            "h-10 px-6": size === "sm",
            "h-12 px-8": size === "md",
            "h-14 px-10": size === "lg",
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">{props.children}</span>
        {variant === "primary" && (
          <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
