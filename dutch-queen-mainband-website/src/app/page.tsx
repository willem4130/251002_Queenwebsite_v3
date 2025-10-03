"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Configuration hooks
  const content = useBandContent();
  const media = useMediaPaths();

  // Detect desktop for bento grid patterns and check motion preferences
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    const checkMotion = () => setPrefersReducedMotion(
      window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    checkDesktop();
    checkMotion();
    window.addEventListener('resize', () => {
      checkDesktop();
      checkMotion();
    });
    return () => window.removeEventListener('resize', () => {
      checkDesktop();
      checkMotion();
    });
  }, []);

  // Scroll animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const showsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  // Hero section scroll animations - OPTIMIZED: zoom + tilt exit (blur removed for performance)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 1.2]);
  const heroRotate = useTransform(heroProgress, [0, 0.6], [0, -5]);

  // Shows section - OPTIMIZED: reduced parallax + simplified transforms
  const { scrollYProgress: showsProgress } = useScroll({
    target: showsRef,
    offset: ["start end", "end start"],
  });
  const showsBgY = useTransform(showsProgress, [0, 1], [50, -50]);
  const showsOpacity = useTransform(showsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.95]);
  const showsScale = useTransform(showsProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1.02]);

  // Gallery section - OPTIMIZED: smooth reveal without spring overhead
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galleryOpacity = useTransform(galleryProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.9]);
  const galleryY = useTransform(galleryProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -40]);
  const galleryScale = useTransform(galleryProgress, [0, 0.25], [0.95, 1]);

  // About section - OPTIMIZED: reduced parallax for smooth performance
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutBgY = useTransform(aboutProgress, [0, 1], [80, -80]);
  const aboutOpacity = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const aboutScale = useTransform(aboutProgress, [0, 0.4], [0.95, 1]);

  // Gallery images from configuration (must be declared before navigateImage/useEffect)
  const galleryImages = media.gallery.map((path) =>
    path.replace("/gallery/", "")
  );

  const getBentoPattern = (index: number) => {
    return bentoPatterns[index % bentoPatterns.length];
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(`/gallery/${image}`);
    setSelectedIndex(index);
  };

  const navigateImage = useCallback((dir: "prev" | "next") => {
    setDirection(dir);
    const newIndex =
      dir === "next"
        ? (selectedIndex + 1) % galleryImages.length
        : (selectedIndex - 1 + galleryImages.length) % galleryImages.length;

    setSelectedIndex(newIndex);
    setSelectedImage(`/gallery/${galleryImages[newIndex]}`);
  }, [selectedIndex, galleryImages]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="relative bg-black overflow-x-hidden w-full max-w-full">
      {/* Hero Section - OPTIMIZED: zoom + tilt (will-change for GPU) */}
      <motion.div
        ref={heroRef}
        className="overflow-x-hidden w-full max-w-full"
        style={{
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : heroOpacity,
          scale: prefersReducedMotion ? 1 : heroScale,
          rotate: prefersReducedMotion ? 0 : heroRotate,
          willChange: prefersReducedMotion ? "auto" : "transform, opacity",
        }}
      >
        <Hero onScrollToSection={scrollToSection} />
      </motion.div>

      {/* Shows Section - OPTIMIZED: reduced parallax for smooth scrolling */}
      <motion.section
        ref={showsRef}
        id="shows"
        className="flex min-h-screen items-center justify-center overflow-hidden overflow-x-hidden w-full max-w-full py-20"
        style={{
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : showsOpacity,
          scale: prefersReducedMotion ? 1 : showsScale,
          willChange: prefersReducedMotion ? "auto" : "transform, opacity",
        }}
      >
        {/* Parallax background image (moves slower than content) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: prefersReducedMotion ? 0 : showsBgY,
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        >
          <Image
            src="/shows-bg-1920.webp"
            alt="Shows background"
            fill
            priority
            quality={isDesktop ? 85 : 70}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-6 sm:mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest text-white"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Shows
            </h2>

            {/* Scrollable Grid Container - Responsive layout */}
            <div
              className="overflow-y-auto max-h-[70vh] sm:max-h-[75vh] lg:max-h-[78vh] pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-[165px] gap-y-4 sm:gap-y-5">
                {tourDates.map((show, index) => (
                  <motion.div
                    key={index}
                    className="group relative block cursor-pointer overflow-hidden border border-white/20 p-4 sm:p-5 bg-black/50 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-emerald-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <div className="relative z-10 flex flex-col gap-2">
                      {/* Date - Large and Bold */}
                      <div className="flex items-baseline gap-3">
                        <span
                          className="text-xl md:text-2xl font-bold text-white"
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
                        className="text-base md:text-lg font-semibold text-white uppercase tracking-wide"
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
                          className="px-4 sm:px-6 py-3 sm:py-2.5 bg-emerald-600 text-white hover:bg-white hover:text-black text-sm sm:text-base font-semibold rounded transition-all duration-200 ease-in-out min-h-[44px] flex items-center justify-center"
                          onClick={(e) => e.stopPropagation()}
                          style={{ textShadow: 'none' }}
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

          {/* Scroll indicator */}
          <motion.button
            onClick={() => scrollToSection("gallery")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/60 transition-all duration-500 hover:bg-amber-900/20 hover:text-white/90 hover:shadow-lg hover:shadow-amber-900/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 drop-shadow-lg" />
          </motion.button>
        </div>
      </motion.section>

      {/* Gallery Section - OPTIMIZED: smooth reveal */}
      <motion.section
        ref={galleryRef}
        id="gallery"
        className="min-h-screen overflow-hidden overflow-x-hidden w-full max-w-full py-16"
        style={{
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : galleryOpacity,
          y: prefersReducedMotion ? 0 : galleryY,
          scale: prefersReducedMotion ? 1 : galleryScale,
          willChange: prefersReducedMotion ? "auto" : "transform, opacity",
        }}
      >
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="mb-8 sm:mb-12 md:mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest text-white"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Gallery
            </h2>

            {/* Bento Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                style={{
                  gridAutoRows: "200px",
                }}
              >
                {galleryImages.map((image, i) => {
                  const pattern = getBentoPattern(i);
                  return (
                    <motion.div
                      key={`gallery-${i}`}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl"
                      style={{
                        gridRow: isDesktop ? pattern.row : 'auto',
                        gridColumn: isDesktop ? pattern.col : 'auto',
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.4,
                          delay: i * 0.03,
                          ease: "easeOut",
                        },
                      }}
                      viewport={{ once: true, amount: 0.1 }}
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
                          loading={i < 4 ? "eager" : "lazy"}
                          quality={isDesktop ? 85 : 75}
                          className="scale-125 object-cover transition-transform duration-500 group-hover:scale-100"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          draggable={false}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - OPTIMIZED: smooth parallax */}
      <motion.section
        ref={aboutRef}
        id="about"
        className="flex min-h-screen items-center justify-center overflow-hidden overflow-x-hidden w-full max-w-full py-20"
        style={{
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : aboutOpacity,
          scale: prefersReducedMotion ? 1 : aboutScale,
          willChange: prefersReducedMotion ? "auto" : "transform, opacity",
        }}
      >
        {/* Parallax background image (slower scroll) */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: prefersReducedMotion ? 0 : aboutBgY,
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        >
          {/* Mobile-only gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent lg:hidden z-10" />

          <Image
            src={isDesktop ? "/about-bg-1920.webp" : "/about-bg-1280.webp"}
            alt="About background"
            fill
            priority
            quality={isDesktop ? 85 : 70}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="relative z-10 w-full px-6">
          <motion.h2
            className="mb-8 sm:mb-10 md:mb-12 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest text-white"
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

          {/* Flex container for responsive layout */}
          <div className="w-full flex justify-center lg:justify-start">
            {/* Text content - centered on mobile, left-aligned on desktop */}
            <div className="w-full max-w-3xl lg:max-w-none lg:w-1/2 px-4 sm:px-6 lg:px-[30px]">
              <div
                className="space-y-4 sm:space-y-6 text-white text-left"
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
                        ? "text-lg sm:text-xl font-medium leading-relaxed"
                        : "text-base sm:text-lg font-normal leading-relaxed"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right section - empty for background visibility on desktop */}
            <div className="hidden lg:block lg:w-1/2"></div>
          </div>
        </div>
      </motion.section>

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
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedImage}
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe > 10000) {
                      navigateImage(offset.x > 0 ? "prev" : "next");
                    } else if (Math.abs(offset.x) > 100) {
                      navigateImage(offset.x > 0 ? "prev" : "next");
                    }
                  }}
                  initial={{
                    x: direction === "next" ? "100%" : direction === "prev" ? "-100%" : 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: direction === "next" ? "-100%" : direction === "prev" ? "100%" : 0,
                    opacity: 0,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                    opacity: { duration: 0.5, ease: "easeOut" },
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Image
                    src={selectedImage}
                    alt="Gallery image"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Close button */}
              <button
                className="absolute -top-12 right-0 p-2 text-white transition-colors hover:text-amber-400"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Previous arrow */}
              <motion.button
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 sm:p-4 text-white backdrop-blur-sm transition-colors hover:bg-amber-500/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => navigateImage("prev")}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </motion.button>

              {/* Next arrow */}
              <motion.button
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 sm:p-4 text-white backdrop-blur-sm transition-colors hover:bg-amber-500/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => navigateImage("next")}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </motion.button>

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
