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
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#150102] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#570207] active:scale-95 cursor-pointer"
    >
      <BsArrowUp size={20} strokeWidth={0.5} />
    </button>
  );
}