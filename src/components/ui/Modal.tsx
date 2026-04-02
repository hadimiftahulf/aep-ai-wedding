"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, children, className, hideCloseButton = false }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-900/40 backdrop-blur-sm transition-opacity duration-700 animate-fade-in">
      <div
        className={cn(
          "w-[90%] max-w-lg bg-paper rounded-3xl p-10 relative overflow-hidden animate-fade-up border border-slate-200 shadow-2xl",
          className
        )}
      >
        <div className="absolute top-2 bottom-2 left-2 right-2 border border-gold-400/20 rounded-[1.25rem] pointer-events-none" />

        {!hideCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-navy-800/40 hover:text-navy-800 transition-colors z-10 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 font-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
