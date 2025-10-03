"use client";

import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
}

export function Hero({ onScrollToSection }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Handle React bug with muted attribute (open since 2017)
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;

      // Play immediately (Supabase pattern - call play multiple times)
      const promise = videoRef.current.play();

      if (promise !== undefined) {
        promise
          .then(() => {
            // Call play again to ensure it works (Supabase pattern)
            videoRef.current?.play();
          })
          .catch((error) => {
            console.warn("⚠ Autoplay blocked. Video will play on user interaction:", error);
            // Add click listener to play on first interaction
            const playOnInteraction = () => {
              videoRef.current?.play();
            };
            document.addEventListener("click", playOnInteraction, { once: true });
          });
      }

      // Log errors
      videoRef.current.addEventListener("error", (e) => {
        console.error("✗ Video error:", e);
        const video = videoRef.current;
        if (video?.error) {
          console.error(`Error code: ${video.error.code} - ${video.error.message}`);
        }
      });
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;

      // Ensure volume is 1 when unmuting (critical for audio playback)
      if (!newMutedState) {
        videoRef.current.volume = 1;
      }

      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // Check if video actually has audio
      if (!newMutedState && videoRef.current.volume === 0) {
        console.warn('⚠️ Volume is 0 - audio will not play!');
      }
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source
            src={isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4"}
            type="video/mp4"
          />
        </video>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        {/* Mute toggle button */}
        <motion.button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 rounded-full bg-black/30 p-3 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-amber-900/40 hover:text-white hover:shadow-lg hover:shadow-amber-900/30 md:bottom-8 md:right-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 drop-shadow-lg" />
          ) : (
            <Volume2 className="h-5 w-5 drop-shadow-lg" />
          )}
        </motion.button>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection("shows")}
          className="absolute bottom-8 rounded-full p-2 text-white/60 transition-all duration-500 hover:bg-amber-900/20 hover:text-white/90 hover:shadow-lg hover:shadow-amber-900/30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 drop-shadow-lg" />
        </motion.button>
      </div>
    </section>
  );
}
