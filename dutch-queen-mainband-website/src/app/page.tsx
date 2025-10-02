"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Hero } from "@/components/Hero";
import { useBandContent, useMediaPaths } from "@/hooks/useConfig";

const bentoPatterns = [
  { row: "span 2", col: "span 2" },
  { row: "span 1", col: "span 1" },
  { row: "span 1", col: "span 2" },
  { row: "span 2", col: "span 1" },
  { row: "span 1", col: "span 1" },
  { row: "span 2", col: "span 2" },
  { row: "span 1", col: "span 2" },
  { row: "span 1", col: "span 1" },
];

function HomeContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Configuration hooks
  const content = useBandContent();
  const media = useMediaPaths();

  const getBentoPattern = (index: number) => {
    return bentoPatterns[index % bentoPatterns.length];
  };

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
              <div className="grid md:grid-cols-2 gap-x-[165px] gap-y-5">
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
      <section id="gallery" className="relative min-h-screen overflow-hidden py-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="mb-16 text-center text-4xl font-light uppercase tracking-widest text-white md:text-6xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Gallery
            </h2>

            {/* Bento Grid */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div
                className="grid gap-4 md:gap-6"
                style={{
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridAutoRows: "160px",
                  gridAutoFlow: "dense",
                }}
              >
                {galleryImages.map((image, i) => {
                  const pattern = getBentoPattern(i);
                  return (
                    <motion.div
                      key={`gallery-${i}`}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl"
                      style={{
                        gridRow: pattern.row,
                        gridColumn: pattern.col,
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: i * 0.05,
                        },
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleImageClick(image, i)}
                    >
                      {/* Ambient glow effect */}
                      <motion.div
                        className="absolute -inset-2 -z-10 rounded-2xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)`,
                          filter: "blur(20px)",
                        }}
                        initial={{ scale: 0.9 }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.4 },
                        }}
                      />

                      {/* Image */}
                      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-900">
                        <Image
                          src={`/gallery/${image}`}
                          alt={`Gallery image ${i + 1}`}
                          fill
                          className="scale-125 object-cover transition-transform duration-500 group-hover:scale-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          draggable={false}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-light tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          {i + 1}/{galleryImages.length}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Info text */}
            <p className="mt-16 text-center text-sm font-light uppercase tracking-widest text-amber-500/70">
              Click any image to view
            </p>
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
          <motion.h2
            className="mb-12 text-4xl font-light uppercase tracking-widest text-white md:text-6xl"
            style={{
              textShadow:
                "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
              WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            About
          </motion.h2>
          <motion.div
            className="bg-black/70 backdrop-blur-sm px-6 py-3.5 md:px-10 md:py-6 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-8"
            onClick={() => setSelectedImage(null)}
          >
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

              {/* Close button */}
              <button
                className="absolute -top-12 right-0 p-2 text-white transition-colors hover:text-amber-400"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Previous arrow */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-amber-500/20"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              {/* Next arrow */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-amber-500/20"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image counter */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm font-light tracking-wider text-white/70">
                {selectedIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </motion.div>
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
