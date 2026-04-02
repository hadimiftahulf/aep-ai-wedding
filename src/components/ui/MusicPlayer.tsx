"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const PLAYLIST = [
  "/1.SatuShaf.mp3",
  "/2.LaguPernkhnKt.mp3",
  "/3.Kmygkutunggu.mp3",
  "/4.BIW.mp3",
  "/5.kojo.mp3",
];

export function MusicPlayer({ isPlaying: forcePlay }: { isPlaying?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (forcePlay && !hasPlayed.current && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      hasPlayed.current = true;
    }
  }, [forcePlay]);

  // Handle manual play/pause
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

  // Next Track Logic
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
  }, []);

  // Previous Track Logic
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
  }, []);

  // Auto-play when track index changes Manually
  useEffect(() => {
    if (hasPlayed.current && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [currentIndex]);

  return (
    <>
      <audio
        ref={audioRef}
        src={PLAYLIST[currentIndex]}
        onEnded={handleNext}
        preload="auto"
      />
      
      {/* Floating Slim Pill UI */}
      <div 
        className={cn(
          "fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-full border border-gold-300 shadow-2xl transition-all",
          "bg-white/85 backdrop-blur-md",
          !isPlaying && "opacity-80 hover:opacity-100"
        )}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="p-2 md:p-2.5 rounded-full hover:bg-navy-900/10 text-navy-800 transition-colors focus:outline-none"
          aria-label="Previous Track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-navy-950 text-gold-400 shadow-md transition-transform hover:scale-105 focus:outline-none"
          aria-label="Play/Pause Music"
        >
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-[1.5px] border-gold-400 border-t-transparent border-l-transparent animate-spin" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 transition-transform"
          >
            {isPlaying ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            ) : (
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            )}
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2 md:p-2.5 rounded-full hover:bg-navy-900/10 text-navy-800 transition-colors focus:outline-none"
          aria-label="Next Track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </>
  );
}
