"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMediaPaths } from "@/hooks/useConfig";

const sizePatterns = [
  { width: 250, aspectRatio: 0.7 },
  { width: 400, aspectRatio: 1.4 },
  { width: 350, aspectRatio: 0.8 },
  { width: 300, aspectRatio: 1.5 },
  { width: 380, aspectRatio: 1.0 },
  { width: 320, aspectRatio: 1.2 },
];

const yPositions = ["5%", "28%", "52%", "15%", "38%", "60%"];
const rotations = [-2, 1, -3, 2, 0, -1];

const getSmartObjectPosition = (aspectRatio: number, index: number): string => {
  if (aspectRatio < 0.8) {
    return "center 20%";
  }
  if (aspectRatio > 1.5) {
    return "center center";
  }
  const centerVariations = ["center center", "center 40%", "center 60%"];
  return centerVariations[index % 3];
};

export default function GalleryFashionCollagePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<number, number>>({});
  const constraintsRef = useRef<HTMLDivElement>(null);

  const media = useMediaPaths();
  const galleryImages = media.gallery.map((path) =>
    path.replace("/gallery/", "")
  );

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const usableWidth = viewportWidth * 0.9;
  const imageSpacing = galleryImages.length > 1
    ? usableWidth / (galleryImages.length - 1)
    : usableWidth / 2;
  const totalWidth = usableWidth;

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

  return (
    <div className="bg-black">
      <section className="relative h-screen overflow-hidden">
        <div className="relative z-10 flex h-full flex-col">
          {/* Title */}
          <motion.div
            className="py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="text-center text-3xl font-light uppercase tracking-widest text-white md:text-4xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              GALLERY
            </h2>
          </motion.div>

          {/* Horizontal Scroll Container */}
          <div className="relative flex-1">
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                if (constraintsRef.current) {
                  constraintsRef.current.scrollBy({
                    left: -600,
                    behavior: "smooth",
                  });
                }
              }}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => {
                if (constraintsRef.current) {
                  constraintsRef.current.scrollBy({
                    left: 600,
                    behavior: "smooth",
                  });
                }
              }}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={constraintsRef}
              className="scrollbar-hide h-full overflow-x-auto overflow-y-hidden px-12"
            >
              <motion.div
                style={{ width: totalWidth }}
                className="relative h-full"
              >
                {galleryImages.map((image, i) => {
                  const pattern = sizePatterns[i % sizePatterns.length];
                  const height = Math.round(pattern.width / pattern.aspectRatio);
                  const topPosition = yPositions[i % yPositions.length];
                  const rotation = rotations[i % rotations.length];
                  const leftPosition = i * imageSpacing;

                  const detectedAspectRatio = imageAspectRatios[i] || pattern.aspectRatio;
                  const objectPosition = getSmartObjectPosition(detectedAspectRatio, i);

                  return (
                    <motion.div
                      key={`gallery-${i}`}
                      className="magazine-frame magazine-frame-hover group absolute cursor-pointer"
                      style={{
                        width: pattern.width,
                        height: height,
                        left: leftPosition,
                        top: topPosition,
                        zIndex: i,
                      }}
                      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: rotation,
                        transition: {
                          duration: 0.6,
                          delay: i * 0.08,
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        rotate: rotation + 2,
                        zIndex: 100,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleImageClick(image, i)}
                    >
                      {/* Ambient glow */}
                      <motion.div
                        className="absolute -inset-6 -z-10 rounded-xl opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)`,
                          filter: "blur(25px)",
                        }}
                        initial={{ scale: 0.8 }}
                        whileHover={{
                          scale: 1.3,
                          transition: { duration: 0.4 },
                        }}
                      />

                      {/* Image */}
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={`/gallery/${image}`}
                          alt={`Gallery image ${i + 1}`}
                          fill
                          className="transition-transform duration-300 group-hover:scale-105"
                          style={{
                            objectFit: "cover",
                            objectPosition: objectPosition,
                          }}
                          sizes="(max-width: 768px) 100vw, 600px"
                          draggable={false}
                          onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            const { naturalWidth, naturalHeight } = e.currentTarget;
                            const aspectRatio = naturalWidth / naturalHeight;
                            setImageAspectRatios(prev => ({
                              ...prev,
                              [i]: aspectRatio
                            }));
                          }}
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Photo number */}
                      <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-light tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        {i + 1}/{galleryImages.length}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="py-6">
            <div className="mx-auto flex items-center justify-center gap-2">
              <ChevronLeft className="h-4 w-4 text-amber-500/50" />
              <p className="text-sm font-light uppercase tracking-widest text-amber-500/70">
                Drag or scroll to explore
              </p>
              <ChevronRight className="h-4 w-4 text-amber-500/50" />
            </div>
          </div>
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
