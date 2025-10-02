"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import { useBandContent } from "@/hooks/useConfig";

const navigation = [
  { name: "Shows", href: "#shows" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = useBandContent();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Website Toggle - Far Left */}
          <div className="flex items-center gap-2 pl-2">
            <a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="text-lg font-semibold uppercase tracking-wide text-white/90 transition-transform duration-200 will-change-transform hover:scale-110 md:text-xl"
            >
              full show
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://thedutchqueenunplugged.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold uppercase tracking-wide text-white/60 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white/80 md:text-xl"
            >
              unplugged
            </a>
          </div>

          {/* Centered Navigation - Desktop */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="rounded-lg px-3 py-1 text-base uppercase tracking-wider text-white/80 transition-all duration-300 will-change-transform hover:scale-105 hover:font-semibold hover:text-white hover:bg-[#cd7f32]/20"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons - Far Right Desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <a
              href={content.social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href={content.social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href={content.social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
            >
              <Youtube className="h-7 w-7" />
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href={`tel:${content.contact.phone}`}
              className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white/60 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white/80"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="bg-black/90 backdrop-blur-sm md:hidden">
          <div className="space-y-4 px-6 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block rounded-lg px-3 py-2 text-base uppercase tracking-wider text-white/80 transition-all duration-300 will-change-transform hover:font-semibold hover:text-white hover:bg-[#cd7f32]/20"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center space-x-6 border-t border-white/10 pt-4">
              <a
                href={content.social.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
              >
                <Facebook className="h-7 w-7" />
              </a>
              <a
                href={content.social.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href={content.social.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
              >
                <Youtube className="h-7 w-7" />
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
              >
                <Mail className="h-7 w-7" />
              </a>
              <a
                href={`tel:${content.contact.phone}`}
                className="rounded-lg p-2 text-white/80 transition-transform duration-200 will-change-transform hover:scale-110 hover:text-white"
              >
                <Phone className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
