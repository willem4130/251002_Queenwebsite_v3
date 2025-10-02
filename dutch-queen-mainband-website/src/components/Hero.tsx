"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { heroConfig } from "../../config/hero.config";
import { LogoHero } from "./LogoHero";
import { TextHero } from "./TextHero";
import { useMediaPaths } from "@/hooks/useConfig";

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
}

export function Hero({ onScrollToSection }: HeroProps) {
  const media = useMediaPaths();

  const scrollToSection = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={media.hero.background}
          alt="Hero background"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        {/* Conditional rendering: Logo or Text */}
        {heroConfig.displayMode === "logo" ? <LogoHero /> : <TextHero />}

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection("about")}
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
