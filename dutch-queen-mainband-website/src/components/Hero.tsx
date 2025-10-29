"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { throttle } from "@/lib/performance-utils";

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
  enableVideo?: boolean;
}

export function Hero({ onScrollToSection, enableVideo = false }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [hasAudio, setHasAudio] = useState(true); // Assume true, our videos have audio

  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [showPoster, setShowPoster] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect device type on mount (client-side only)
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setDeviceType("mobile");
    } else if (width < 1024) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  // Ensure scroll is never blocked on mount
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      console.log(`📱 Screen width: ${width}px`);
      if (width < 768) {
        console.log("Device: Mobile");
        setDeviceType("mobile");
      } else if (width < 1024) {
        console.log("Device: Tablet");
        setDeviceType("tablet");
      } else {
        console.log("Device: Desktop");
        setDeviceType("desktop");
      }
    };

    checkDevice();
    const throttledCheckDevice = throttle(checkDevice, 150);
    window.addEventListener("resize", throttledCheckDevice, { passive: true });
    return () => window.removeEventListener("resize", throttledCheckDevice);
  }, []);

  useEffect(() => {
    if (!enableVideo) return;

    // Show audio controls
    setHasAudio(true);

    console.log(`🎬 Device type: ${deviceType}`);

    // Only show poster on desktop and tablet, not on mobile
    if (deviceType === "mobile") {
      console.log(`📱 Mobile detected - skipping poster`);
      setShowPoster(false);
      return;
    }

    // Show poster on desktop and tablet
    const posterPath =
      deviceType === "tablet"
        ? "/videos/poster-mobile.jpg"
        : "/videos/poster-desktop.jpg";
    console.log(`🖥️ Desktop/Tablet - showing poster: ${posterPath}`);
    setShowPoster(true);

    // Hide poster after 1.5 seconds
    const timer = setTimeout(() => {
      console.log(`⏱️ 1.5s elapsed, hiding poster`);
      setShowPoster(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [enableVideo, deviceType]);

  useEffect(() => {
    if (!videoRef.current) return;
    // Set volume to 100% for when user unmutes
    videoRef.current.volume = 1.0;
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
    if (!videoRef.current) return;

    const video = videoRef.current;
    const newMutedState = !isMuted;

    video.muted = newMutedState;
    video.volume = volume;
    setIsMuted(newMutedState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full max-w-full overflow-hidden"
      style={{ position: "relative", touchAction: "pan-y" }}
    >
      {/* Background video */}
      <div
        className="absolute inset-0 min-h-screen overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        <div className="relative h-full min-h-screen w-full">
          {/* Video */}
          <video
            ref={videoRef}
            src={
              deviceType === "mobile"
                ? "/videos/hero-mobile.mp4"
                : "/videos/hero-desktop.mp4"
            }
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full min-h-full w-full min-w-full object-cover"
          />

          {/* Poster image - only show on desktop and tablet, NOT on mobile */}
          <AnimatePresence>
            {showPoster && deviceType !== "mobile" && (
              <motion.div
                key="poster"
                className="absolute inset-0 z-20"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onAnimationStart={() => {
                  console.log("🎬 Poster animation starting");
                }}
                onAnimationComplete={() => {
                  console.log("🎬 Poster animation complete");
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    deviceType === "tablet"
                      ? "/videos/poster-mobile.jpg"
                      : "/videos/poster-desktop.jpg"
                  }
                  alt="The Dutch Queen"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    console.error(
                      "❌ Failed to load hero poster image:",
                      deviceType,
                      (e.target as HTMLImageElement).src,
                      e
                    );
                  }}
                  onLoad={(e) => {
                    console.log(
                      `✅ Hero poster loaded successfully for ${deviceType}`,
                      (e.target as HTMLImageElement).src
                    );
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        {/* Audio controls - only show if video has audio */}
        {hasAudio && (
          <div className="absolute bottom-6 right-6 flex items-center gap-3 md:bottom-8 md:right-8">
            {/* Volume slider - only show when unmuted */}
            {!isMuted && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 cursor-pointer accent-amber-600 md:w-24"
                  aria-label="Volume control"
                />
                <span className="text-xs tabular-nums text-white/70">
                  {Math.round(volume * 100)}%
                </span>
              </motion.div>
            )}

            {/* Mute toggle button */}
            <motion.button
              onClick={toggleMute}
              className="rounded-full bg-black/30 p-3 text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-amber-900/40 hover:text-white hover:shadow-lg hover:shadow-amber-900/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 drop-shadow-lg" />
              ) : (
                <Volume2 className="h-5 w-5 drop-shadow-lg" />
              )}
            </motion.button>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8" style={{ position: "absolute" }}>
          <motion.button
            onClick={() => scrollToSection("shows")}
            className="rounded-full p-2 text-white/60 transition-all duration-500 hover:bg-amber-900/20 hover:text-white/90 hover:shadow-lg hover:shadow-amber-900/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 2, repeat: Infinity },
            }}
          >
            <ChevronDown className="h-8 w-8 drop-shadow-lg" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
