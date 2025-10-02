"use client";

import { motion } from "framer-motion";

const releases = [
  { title: "Forest Echoes", year: "2024", type: "Album" },
  { title: "Amber Nights", year: "2023", type: "EP" },
  { title: "Shadow Walker", year: "2021", type: "Album" },
];

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black"></div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-8 text-4xl font-thin uppercase tracking-widest text-white/80 md:text-6xl">
              Music
            </h1>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {releases.map((release) => (
              <div
                key={release.title}
                className="border-b border-white/10 pb-8 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 text-xl font-thin uppercase tracking-wider text-white/80">
                      {release.title}
                    </h3>
                    <p className="text-sm uppercase tracking-wider text-white/40">
                      {release.type}
                    </p>
                  </div>
                  <span className="text-sm text-white/40">{release.year}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="text-sm uppercase tracking-wider text-white/40">
              Available on all streaming platforms
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
