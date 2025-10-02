"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMediaPaths } from "@/hooks/useConfig";

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

export default function GalleryBentoGridPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const media = useMediaPaths();
  const galleryImages = media.gallery.map((path) =>
    path.replace("/gallery/", "")
  );

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

  const getBentoPattern = (index: number) => {
    return bentoPatterns[index % bentoPatterns.length];
  };

  return (
    <div className="bg-black">
      <section className="relative min-h-screen overflow-hidden py-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2
              className="mb-16 text-center text-3xl font-light uppercase tracking-widest text-white md:text-4xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              GALLERY
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
                        scale: 0.98,
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
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
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

                      {/* Border accent on hover */}
                      <div className="absolute inset-0 rounded-2xl border border-amber-500/0 transition-all duration-300 group-hover:border-amber-500/30" />
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
