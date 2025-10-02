"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Hero } from "@/components/Hero";
import { useBandContent, useMediaPaths } from "@/hooks/useConfig";

function HomeContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Configuration hooks
  const content = useBandContent();
  const media = useMediaPaths();

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(`/gallery/${image}`);
    setSelectedIndex(index);
  };

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % galleryImages.length
        : (selectedIndex - 1 + galleryImages.length) % galleryImages.length;

    setSelectedIndex(newIndex);
    setSelectedImage(`/gallery/${galleryImages[newIndex]}`);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Gallery images from configuration
  const galleryImages = media.gallery.map((path) =>
    path.replace("/gallery/", "")
  );

  // All tour dates
  const tourDates = [
    { date: "DEC 4", year: "2025", venue: "Vorstin", city: "Hilversum", time: "20:30", price: "€30.50", url: "https://vorstin.stager.co/shop/default/events/111493445" },
    { date: "DEC 6", year: "2025", venue: "Boerderij", city: "Zoetermeer", time: "20:30", price: "€32.00", url: "https://poppodiumboerderij.nl/programma/thedutchqueen2025/" },
    { date: "DEC 11", year: "2025", venue: "Victorie", city: "Alkmaar", time: "20:30", price: "€33.90", url: "https://www.podiumvictorie.nl/programma/the-dutch-queen-2025" },
    { date: "DEC 12", year: "2025", venue: "Vereeniging", city: "Nijmegen", time: "20:15", price: "€29.50", url: "https://www.stadsschouwburgendevereeniging.nl/programma/8266/50-jahr-bohemian-rhapsody/the-dutch-queen" },
    { date: "DEC 13", year: "2025", venue: "Dru fabriek", city: "Ulft", time: "20:15", price: "€28.50", url: "https://www.dru-industriepark.nl/agenda/pop/2025/12/the-dutch-queen" },
    { date: "DEC 18", year: "2025", venue: "Metropool", city: "Enschede", time: "20:15", price: "€30.00", url: "https://metropool.nl/agenda/the-dutch-queen-18-dec" },
    { date: "DEC 19", year: "2025", venue: "Lantaarn", city: "Hellendoorn", time: "20:15", price: "€25.60", url: "https://mijnetickets.shop/de-lantaarn-exploitatie/67acf1f2dfc06" },
    { date: "DEC 20", year: "2025", venue: "Hedon", city: "Zwolle", time: "19:30", price: "€29.50", url: "https://hedon-zwolle.nl/voorstelling/32447/the-dutch-queen" },
    { date: "DEC 28", year: "2025", venue: "Effenaar", city: "Eindhoven", time: "20:30", price: "€29.50", url: "https://www.effenaar.nl/agenda/dutch-queen-50-jaar-bohemian-rhapsody" },
    { date: "DEC 29", year: "2025", venue: "Oosterpoort", city: "Groningen", time: "20:30", price: "€29.50", url: "https://www.spotgroningen.nl/programma/the-dutch-queen-3/" },
    { date: "DEC 30", year: "2025", venue: "Mezz", city: "Breda", time: "20:30", price: "€29.50", url: "https://www.mezz.nl/programma/the-dutch-queen/" },
    { date: "JAN 2", year: "2026", venue: "Groene Engel", city: "Oss", time: "20:30", price: "€29.50", url: "https://groene-engel.stager.co/web/tickets/111471691" },
    { date: "JAN 3", year: "2026", venue: "Grenswerk", city: "Venlo", time: "20:30", price: "€29.50", url: "https://www.grenswerk.nl/agenda/the-dutch-queen///" },
    { date: "JAN 9", year: "2026", venue: "Gigant", city: "Apeldoorn", time: "20:30", price: "€29.50", url: "https://www.gigant.nl/concert/the-dutch-queen" },
    { date: "JAN 10", year: "2026", venue: "Bibelot", city: "Dordrecht", time: "20:30", price: "€29.00", url: "https://bibelot.stager.co/web/tickets/111500178" },
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <Hero onScrollToSection={scrollToSection} />

      {/* Shows Section */}
      <section
        id="shows"
        className="relative flex min-h-screen items-center justify-center overflow-hidden py-20"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/shows-bg-1920.jpg"
            alt="Shows background"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-8 text-4xl font-light uppercase tracking-widest text-white md:text-6xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Shows
            </h2>

            {/* Scrollable Grid Container - Optimized for 2x4 layout */}
            <div
              className="overflow-y-auto max-h-[78vh] pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                {tourDates.map((show, index) => (
                  <motion.div
                    key={index}
                    className="group relative block cursor-pointer overflow-hidden border border-white/20 p-5 bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#cd7f32]/0 via-[#cd7f32]/20 to-[#cd7f32]/0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="relative z-10 flex flex-col gap-2">
                      {/* Date - Large and Bold */}
                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-xl md:text-2xl font-bold text-white transition-all duration-500 group-hover:text-[#e9b870]"
                          style={{
                            textShadow:
                              "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          {show.date}
                        </span>
                        <span
                          className="text-lg text-white/60"
                          style={{
                            textShadow:
                              "0 2px 4px rgba(0, 0, 0, 0.9)",
                          }}
                        >
                          {show.year}
                        </span>
                      </div>

                      {/* Venue - Prominent */}
                      <div
                        className="text-base md:text-lg font-semibold text-white uppercase tracking-wide transition-all duration-500 group-hover:text-[#d4a76a]"
                        style={{
                          textShadow:
                            "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {show.venue}
                      </div>

                      {/* City and Time */}
                      <div
                        className="flex items-center gap-2 text-base text-white/80"
                        style={{
                          textShadow:
                            "0 2px 4px rgba(0, 0, 0, 0.9)",
                        }}
                      >
                        <span>{show.city}</span>
                        <span className="text-white/40">•</span>
                        <span>{show.time}</span>
                      </div>

                      {/* Price and CTA Button */}
                      <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/10">
                        <span
                          className="text-lg font-bold text-white"
                          style={{
                            textShadow:
                              "0 2px 4px rgba(0, 0, 0, 0.9)",
                          }}
                        >
                          {show.price}
                        </span>
                        <a
                          href={show.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-[#cd7f32] hover:bg-[#b87333] text-white font-semibold rounded transition-all duration-300 shadow-lg hover:shadow-[#cd7f32]/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Get Tickets
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="relative h-screen max-h-screen overflow-hidden pt-8"
      >
        <div className="relative z-10 flex h-full flex-col justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-12 text-center text-4xl font-light uppercase tracking-widest text-white md:text-6xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Gallery
            </h2>

            {/* Simple 2x2 Grid Layout */}
            <div className="mx-auto max-w-5xl px-8">
              <motion.div
                className="grid grid-cols-2 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.2,
                      duration: 0.6,
                    },
                  },
                }}
                layout
              >
                {galleryImages.map((image, i) => (
                  <motion.div
                    key={`gallery-${i}`}
                    className="group relative cursor-pointer overflow-hidden"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 60,
                        rotateX: 15,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                          damping: 12,
                          duration: 0.8,
                        },
                      },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleImageClick(image, i)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Multiple enhanced glow effects */}
                    <motion.div
                      className="absolute -inset-6 -z-10 rounded-xl"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)`,
                        filter: "blur(25px)",
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.3,
                        transition: { duration: 0.4, ease: "easeOut" },
                      }}
                    />

                    {/* Rotating glow ring */}
                    <motion.div
                      className="-z-5 absolute -inset-4 rounded-xl"
                      style={{
                        background: `conic-gradient(from 0deg, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.6))`,
                        filter: "blur(15px)",
                      }}
                      initial={{ opacity: 0, rotate: 0 }}
                      whileHover={{
                        opacity: 1,
                        rotate: 360,
                        transition: {
                          duration: 3,
                          ease: "linear",
                          repeat: Infinity,
                        },
                      }}
                    />

                    {/* Large viewable images */}
                    <motion.div
                      className="relative aspect-video overflow-hidden rounded-lg"
                      whileHover={{
                        borderRadius: "20px",
                        transition: { duration: 0.4 },
                      }}
                    >
                      <Image
                        src={`/gallery/${image}`}
                        alt={`Gallery image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      {/* Multiple animated shimmer effects */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{
                          x: "100%",
                          opacity: 1,
                          transition: { duration: 0.8, ease: "easeInOut" },
                        }}
                      />

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{
                          x: "100%",
                          opacity: 1,
                          transition: {
                            duration: 1,
                            ease: "easeInOut",
                            delay: 0.2,
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative flex min-h-screen items-center justify-center overflow-hidden py-20"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/about-bg-1920.jpg"
            alt="About background"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-12 text-4xl font-light uppercase tracking-widest text-white md:text-6xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              About
            </h2>
            <div
              className="space-y-6 text-white"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              {content.description.long.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-xl font-medium leading-relaxed"
                      : "text-lg font-normal leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Clean Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Simple image container */}
            <div
              className="relative h-full max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />

              {/* Simple close button */}
              <button
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Previous arrow */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-gray-300"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              {/* Next arrow */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-gray-300"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}
