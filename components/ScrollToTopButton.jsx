// components/ScrollToTopButton.jsx
"use client";

import React, { useState, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollTop) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#150102] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#570207] active:scale-95"
      >
        <BsArrowUp size={20} strokeWidth={0.5} />
      </button>

      {/* WhatsApp GIF */}
      <a
        href="https://wa.me/9050334488"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="block transition-transform duration-300 hover:scale-110"
      >
        <img
          src="/images/whatsapp.gif"
          alt="WhatsApp"
          className="h-14 w-14 object-contain"
        />
      </a>
    </div>
  );
}