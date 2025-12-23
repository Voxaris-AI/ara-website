"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="relative h-10 sm:h-12 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/ara.png"
              alt="Ara Logo"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("#features")}
            className="text-sm text-neutral-300 hover:text-foreground transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className="text-sm text-neutral-300 hover:text-foreground transition-colors"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-neutral-300 hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
          <div className="px-4 py-6 flex flex-col gap-4">
            <button
              onClick={() => handleNavClick("#features")}
              className="text-left py-3 px-4 text-base text-neutral-300 hover:text-foreground hover:bg-neutral-800/50 rounded-lg transition-all"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-left py-3 px-4 text-base text-neutral-300 hover:text-foreground hover:bg-neutral-800/50 rounded-lg transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
