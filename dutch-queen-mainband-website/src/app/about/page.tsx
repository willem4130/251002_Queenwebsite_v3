"use client";

import Image from "next/image";
import { useBandContent } from "@/hooks/useConfig";

export default function AboutPage() {
  const content = useBandContent();
  const paragraphs = content.description.long.split("\n\n");

  return (
    <div className="min-h-screen bg-black pt-16">
      <section className="relative py-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/about-bg-1920.webp"
            alt="About background"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient overlay for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90 md:hidden" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <h1 className="mb-8 text-4xl font-thin uppercase tracking-widest text-white/80 md:text-6xl">
              About
            </h1>
          </div>

          <div className="bg-black/70 backdrop-blur-sm px-6 py-3.5 rounded-lg md:px-8 md:py-5 lg:px-10 lg:py-6">
            <div className="space-y-6 text-center md:text-left lg:text-center">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-xl font-medium leading-relaxed text-white"
                      : "text-lg font-normal leading-relaxed text-white"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
