"use client";

import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { throttle } from "@/lib/performance-utils";

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
  enableVideo?: boolean;
}

export function Hero({ onScrollToSection, enableVideo = false }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    const throttledCheckDevice = throttle(checkDevice, 150);
    window.addEventListener("resize", throttledCheckDevice, { passive: true });
    return () => window.removeEventListener("resize", throttledCheckDevice);
  }, []);

  useEffect(() => {
    if (videoRef.current && enableVideo) {
      // Handle React bug with muted attribute (open since 2017)
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;

      // Defer video playback to next frame to prevent scroll lock
      requestAnimationFrame(() => {
        const promise = videoRef.current?.play();

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
      });

      // Log errors
      videoRef.current.addEventListener("error", (e) => {
        console.error("✗ Video error:", e);
        const video = videoRef.current;
        if (video?.error) {
          console.error(`Error code: ${video.error.code} - ${video.error.message}`);
        }
      });
    }
  }, [enableVideo]);

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
    <section id="home" className="relative h-screen w-full max-w-full">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={deviceType === 'mobile' ? "/videos/poster-mobile.jpg" : "/videos/poster-desktop.jpg"}
          className="h-full w-full object-cover"
        >
          {/* Modern browsers: WebM VP9 (50% smaller, best compression) */}
          <source
            src={deviceType === 'mobile' ? "/videos/hero-mobile.webm" : "/videos/hero-desktop.webm"}
            type='video/webm; codecs="vp9, opus"'
          />
          {/* Fallback: MP4 H.264 for Safari and older browsers */}
          <source
            src={deviceType === 'mobile' ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4"}
            type='video/mp4; codecs="avc1.640028, mp4a.40.2"'
          />
        </video>
        </motion.div>
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
          transition={{ duration: 1.5, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut" },
            y: { duration: 2, repeat: Infinity }
          }}
        >
          <ChevronDown className="h-8 w-8 drop-shadow-lg" />
        </motion.button>
      </div>
    </section>
  );
}
