"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMediaPaths } from "@/hooks/useConfig";

export default function GalleryPage() {
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

  return (
    <div className="bg-black">
      {/* Gallery Section */}
      <section className="relative h-screen max-h-screen overflow-hidden pt-8">
        <div className="relative z-10 flex h-full flex-col justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-8 text-center text-3xl font-light uppercase tracking-widest text-white md:text-4xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              GALLERY
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
