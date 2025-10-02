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
  { name: "About", href: "#about" },
  { name: "Shows", href: "#shows" },
  { name: "Gallery", href: "#gallery" },
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
          {/* Logo - Far Left */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="text-2xl font-semibold uppercase tracking-wide text-white/90"
            >
              {content.bandName}
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
                  className="rounded-lg px-3 py-1 text-base uppercase tracking-wider text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
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
              className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href={content.social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href={content.social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
            >
              <Youtube className="h-7 w-7" />
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href={`tel:${content.contact.phone}`}
              className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:shadow-lg hover:shadow-amber-900/20 hover:backdrop-blur-sm"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white/60 transition-opacity duration-300 hover:text-white/80"
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
                className="block rounded-lg px-3 py-2 text-base uppercase tracking-wider text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
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
                className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
              >
                <Facebook className="h-7 w-7" />
              </a>
              <a
                href={content.social.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href={content.social.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
              >
                <Youtube className="h-7 w-7" />
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
              >
                <Mail className="h-7 w-7" />
              </a>
              <a
                href={`tel:${content.contact.phone}`}
                className="rounded-lg p-2 text-white/80 transition-all duration-500 hover:bg-amber-900/20 hover:text-white hover:backdrop-blur-sm"
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
