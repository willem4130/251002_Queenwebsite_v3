"use client";

import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMediaPaths } from "@/hooks/useConfig";

const magazineLayout = [
  { width: 400, height: 500, offsetY: 20 },
  { width: 550, height: 350, offsetY: -10 },
  { width: 350, height: 525, offsetY: 40 },
  { width: 600, height: 400, offsetY: 0 },
  { width: 450, height: 600, offsetY: -20 },
  { width: 500, height: 350, offsetY: 30 },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dragConstraint, setDragConstraint] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const media = useMediaPaths();
  const galleryImages = media.gallery.map((path) =>
    path.replace("/gallery/", "")
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (contentRef.current && constraintsRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const containerWidth = constraintsRef.current.offsetWidth;
        setDragConstraint(-(contentWidth - containerWidth));
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [galleryImages.length]);

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
      <section className="relative min-h-screen overflow-hidden py-20">
        <div className="relative z-10 flex h-full flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-12 text-center text-3xl font-light uppercase tracking-widest text-white md:text-4xl"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              GALLERY
            </h2>

            {/* Magazine-style Horizontal Scroll */}
            <div className="relative">
              {/* Left Navigation Arrow */}
              <button
                onClick={() => {
                  if (constraintsRef.current) {
                    constraintsRef.current.scrollBy({
                      left: -500,
                      behavior: "smooth",
                    });
                  }
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={() => {
                  if (constraintsRef.current) {
                    constraintsRef.current.scrollBy({
                      left: 500,
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
                className="scrollbar-hide overflow-x-scroll px-8 py-12 md:px-20"
              >
                <motion.div
                  ref={contentRef}
                  drag="x"
                  dragConstraints={{ left: dragConstraint, right: 0 }}
                  dragElastic={0.1}
                  dragMomentum={false}
                  style={{ x: dragX }}
                  className="flex gap-8 pb-4"
                >
                  {galleryImages.map((image, i) => {
                    const layout = magazineLayout[i % magazineLayout.length];
                    return (
                      <motion.div
                        key={`gallery-${i}`}
                        className="magazine-frame magazine-frame-hover group relative flex-shrink-0 cursor-pointer"
                        style={{
                          width: layout.width,
                          marginTop: layout.offsetY,
                        }}
                        initial={{ opacity: 0, y: 60, rotateZ: -2 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          rotateZ: 0,
                          transition: {
                            duration: 0.6,
                            delay: i * 0.1,
                          },
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                        whileHover={{
                          rotateZ: Math.random() > 0.5 ? 2 : -2,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleImageClick(image, i)}
                      >
                        {/* Ambient glow effect */}
                        <motion.div
                          className="absolute -inset-6 -z-10 rounded-xl opacity-0 group-hover:opacity-100"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)`,
                            filter: "blur(20px)",
                          }}
                          initial={{ scale: 0.8 }}
                          whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.4 },
                          }}
                        />

                        {/* Image container */}
                        <div
                          className="relative overflow-hidden bg-gray-100"
                          style={{
                            height: layout.height,
                          }}
                        >
                          <Image
                            src={`/gallery/${image}`}
                            alt={`Gallery image ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                          />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* Optional: Photo number badge */}
                        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-light tracking-wider text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          {i + 1}/{galleryImages.length}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <div className="mx-auto mt-8 flex items-center justify-center gap-2">
                <ChevronLeft className="h-4 w-4 text-amber-500/50" />
                <p className="text-sm font-light uppercase tracking-widest text-amber-500/70">
                  Drag to explore
                </p>
                <ChevronRight className="h-4 w-4 text-amber-500/50" />
              </div>
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
            {/* Image container */}
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
