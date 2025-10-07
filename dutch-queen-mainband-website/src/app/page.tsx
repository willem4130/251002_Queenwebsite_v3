"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, X, MapPin, Clock, Ticket } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Hero } from "@/components/Hero";
import { useBandContent, useMediaPaths } from "@/hooks/useConfig";
import { throttle } from "@/lib/performance-utils";

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

    const handleResize = () => {
      checkDesktop();
      checkMotion();
    };

    const throttledHandleResize = throttle(handleResize, 150);
    window.addEventListener('resize', throttledHandleResize, { passive: true });
    return () => window.removeEventListener('resize', throttledHandleResize);
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

  // About section - Enhanced dramatic entrance with increased parallax and scale
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutBgY = useTransform(aboutProgress, [0, 1], [150, -150]);
  const aboutOpacity = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const aboutScale = useTransform(aboutProgress, [0, 0.4], [0.95, 1.0]);

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
  const upcomingShows = [
    { date: "Dec 4, 2025", time: "20:30", venue: "Vorstin", city: "Hilversum", status: "tickets", ticketUrl: "https://vorstin.stager.co/shop/default/events/111493445" },
    { date: "Dec 6, 2025", time: "20:30", venue: "Boerderij", city: "Zoetermeer", status: "tickets", ticketUrl: "https://poppodiumboerderij.nl/programma/thedutchqueen2025/" },
    { date: "Dec 11, 2025", time: "20:30", venue: "Victorie", city: "Alkmaar", status: "tickets", ticketUrl: "https://www.podiumvictorie.nl/programma/the-dutch-queen-2025" },
    { date: "Dec 12, 2025", time: "20:15", venue: "Vereeniging", city: "Nijmegen", status: "tickets", ticketUrl: "https://www.stadsschouwburgendevereeniging.nl/programma/8266/50-jahr-bohemian-rhapsody/the-dutch-queen" },
    { date: "Dec 13, 2025", time: "20:15", venue: "Dru fabriek", city: "Ulft", status: "tickets", ticketUrl: "https://www.dru-industriepark.nl/agenda/pop/2025/12/the-dutch-queen" },
    { date: "Dec 18, 2025", time: "20:15", venue: "Metropool", city: "Enschede", status: "tickets", ticketUrl: "https://metropool.nl/agenda/the-dutch-queen-18-dec" },
    { date: "Dec 19, 2025", time: "20:15", venue: "Lantaarn", city: "Hellendoorn", status: "tickets", ticketUrl: "https://mijnetickets.shop/de-lantaarn-exploitatie/67acf1f2dfc06" },
    { date: "Dec 20, 2025", time: "19:30", venue: "Hedon", city: "Zwolle", status: "tickets", ticketUrl: "https://hedon-zwolle.nl/voorstelling/32447/the-dutch-queen" },
    { date: "Dec 28, 2025", time: "20:30", venue: "Effenaar", city: "Eindhoven", status: "tickets", ticketUrl: "https://www.effenaar.nl/agenda/dutch-queen-50-jaar-bohemian-rhapsody" },
    { date: "Dec 29, 2025", time: "20:30", venue: "Oosterpoort", city: "Groningen", status: "tickets", ticketUrl: "https://www.spotgroningen.nl/programma/the-dutch-queen-3/" },
    { date: "Dec 30, 2025", time: "20:30", venue: "Mezz", city: "Breda", status: "tickets", ticketUrl: "https://www.mezz.nl/programma/the-dutch-queen/" },
    { date: "Jan 2, 2026", time: "20:30", venue: "Groene Engel", city: "Oss", status: "tickets", ticketUrl: "https://groene-engel.stager.co/web/tickets/111471691" },
    { date: "Jan 3, 2026", time: "20:30", venue: "Grenswerk", city: "Venlo", status: "tickets", ticketUrl: "https://www.grenswerk.nl/agenda/the-dutch-queen///" },
    { date: "Jan 9, 2026", time: "20:30", venue: "Gigant", city: "Apeldoorn", status: "tickets", ticketUrl: "https://www.gigant.nl/concert/the-dutch-queen" },
    { date: "Jan 10, 2026", time: "20:30", venue: "Bibelot", city: "Dordrecht", status: "tickets", ticketUrl: "https://bibelot.stager.co/web/tickets/111500178" },
  ];

  return (
    <div className="relative bg-black w-full">
      {/* Hero Section - OPTIMIZED: zoom + tilt exit */}
      <motion.div
        ref={heroRef}
        className="relative w-full overflow-x-hidden"
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

      {/* Spacer for smooth scroll animations */}
      <div className="h-[20vh]"></div>

      {/* Shows Section - OPTIMIZED: reduced parallax for smooth scrolling */}
      <motion.section
        ref={showsRef}
        id="shows"
        className="relative flex h-screen overflow-hidden w-full"
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full h-full flex flex-col pt-12 pb-8">
          {/* Title Section - Fixed at top */}
          <div className="flex-shrink-0">
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
            </motion.div>
          </div>

          {/* Shows List - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
            <div className="space-y-4 max-w-6xl mx-auto pb-24">
              {upcomingShows.map((show, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {show.status === "sold-out" ? (
                    <div className="rounded-lg border border-white/10 bg-black/70 p-6 backdrop-blur-md opacity-60">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="text-center md:text-left">
                              <div className="text-2xl font-bold text-white">
                                {show.date.split(",")[0]}
                              </div>
                              <div className="text-sm text-gray-400">
                                {show.date.split(",")[1]}
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white">
                                {show.venue}
                              </h3>
                              <div className="flex items-center space-x-2 text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>{show.city}</span>
                                <span>•</span>
                                <Clock className="h-4 w-4" />
                                <span>{show.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="inline-flex items-center space-x-2 rounded-full bg-gray-600 px-6 py-2 font-medium text-gray-300">
                            <Ticket className="h-4 w-4" />
                            <span>Sold Out</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-white/10 bg-black/70 p-6 backdrop-blur-md transition-all duration-200 ease-in-out hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-black/80 active:border-emerald-500/60 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="text-center md:text-left">
                              <div className="text-2xl font-bold text-white">
                                {show.date.split(",")[0]}
                              </div>
                              <div className="text-sm text-gray-400">
                                {show.date.split(",")[1]}
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white">
                                {show.venue}
                              </h3>
                              <div className="flex items-center space-x-2 text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>{show.city}</span>
                                <span>•</span>
                                <Clock className="h-4 w-4" />
                                <span>{show.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rounded-full bg-white px-6 py-2 font-medium text-black group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 ease-in-out">
                          <Ticket className="h-4 w-4" />
                          <span>Tickets</span>
                        </div>
                      </div>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator - Fixed at bottom */}
          <div className="flex-shrink-0 relative h-16">
            <motion.button
              onClick={() => scrollToSection("gallery")}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/60 transition-all duration-300 hover:bg-amber-900/20 hover:text-white/90 hover:shadow-lg hover:shadow-amber-900/30 hover:scale-110"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 drop-shadow-lg" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Spacer for smooth scroll animations */}
      <div className="h-[20vh]"></div>

      {/* Gallery Section - OPTIMIZED: smooth reveal */}
      <motion.section
        ref={galleryRef}
        id="gallery"
        className="relative min-h-screen overflow-hidden w-full py-16"
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

      {/* Spacer for smooth scroll animations */}
      <div className="h-[20vh]"></div>

      {/* About Section - OPTIMIZED: smooth parallax */}
      <motion.section
        ref={aboutRef}
        id="about"
        className="relative flex min-h-screen items-center justify-center overflow-hidden w-full py-20"
        style={{
          position: 'relative',
          opacity: prefersReducedMotion ? 1 : aboutOpacity,
          scale: prefersReducedMotion ? 1 : aboutScale,
          willChange: prefersReducedMotion ? "auto" : "transform, opacity",
        }}
      >
        {/* Parallax background image (slower scroll) */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            y: prefersReducedMotion ? 0 : aboutBgY,
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        >
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
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
            <div className="w-full max-w-3xl lg:max-w-none lg:w-1/2">
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
