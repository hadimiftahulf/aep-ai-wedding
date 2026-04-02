"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HeroCover } from "@/components/sections/HeroCover";
import { BismillahVerse } from "@/components/sections/BismillahVerse";
import { CoupleProfile } from "@/components/sections/CoupleProfile";
import { EventDetails } from "@/components/sections/EventDetails";
import { Countdown } from "@/components/sections/Countdown";
import { GiftAccount } from "@/components/sections/GiftAccount";
import { RsvpWishes } from "@/components/sections/RsvpWishes";
import { Footer } from "@/components/sections/Footer";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { FallingPetals } from "@/components/ui/FallingPetals";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";
import { FloatingMascot } from "@/components/ui/FloatingMascot";
import { trackVisit } from "@/app/actions/visitor";

function HomeContent() {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || searchParams.get("guest") || "";

  const handleOpen = () => {
    setIsOpened(true);
    setShowConfetti(true);
  };

  useEffect(() => {
    // Track unique visitor automatically on load
    trackVisit();
  }, []);

  return (
    <main className="min-h-screen relative w-full overflow-x-hidden bg-[#FAFAF8]">
      
      {/* 3D Ambient Parallax Orbs (Fixed Deep Background) */}
      <div className="fixed top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-navy-900/[0.03] blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gold-400/[0.05] blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-navy-900/[0.02] blur-[80px] pointer-events-none z-0" />

      {/* Confetti on open */}
      <ConfettiBurst trigger={showConfetti} />

      {/* Falling petals (only after opened) */}
      {isOpened && <FallingPetals />}

      {/* Floating mascot (only after opened) */}
      {isOpened && <FloatingMascot />}

      {/* Hero Cover overlay */}
      <HeroCover onOpen={handleOpen} guestName={guestName} />
      
      {/* Main Content */}
      <div 
        className={`w-full flex-col items-center ${
          isOpened ? "flex" : "hidden"
        }`}
      >
        <BismillahVerse />
        <CoupleProfile />
        <EventDetails />
        <Countdown />
        <GiftAccount />
        <RsvpWishes />
        <Footer />
        <MusicPlayer isPlaying={isOpened} />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <HomeContent />
    </Suspense>
  );
}
