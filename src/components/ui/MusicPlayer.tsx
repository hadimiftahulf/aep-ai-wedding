"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MusicPlayer({ isPlaying: forcePlay }: { isPlaying?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const hasPlayed = useRef(false);
  
  useEffect(() => {
    if (forcePlay && !hasPlayed.current && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      hasPlayed.current = true;
    }
  }, [forcePlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/lagu.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className={cn(
          "fixed bottom-8 left-8 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-gold-300 text-teal-800 shadow-xl transition-all hover:scale-110 focus:outline-none",
          isPlaying ? "animate-pulse-slow" : "opacity-80"
        )}
        aria-label="Play/Pause Music"
      >
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-gold-500 border-t-transparent animate-spin" />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 transition-transform"
        >
          {isPlaying ? (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          ) : (
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          )}
        </svg>
      </button>
    </>
  );
}
