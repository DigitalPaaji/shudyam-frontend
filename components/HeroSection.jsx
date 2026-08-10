"use client";

import React, { useState, useEffect } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const IMAGES = [
{ src: "/images/banner/masalabox.png", title: "Masala Box" },
{ src: "/images/banner/wokpan.webp", title: "Classic Wok Pan" },
{ src: "/images/banner/tadkapan.webp", title: "Tadka Pan" },
{ src: "/images/banner/saucepan.png", title: "Sauce Pan" },
{ src: "/images/banner/rotitawa.png", title: "Roti Tawa" },
{ src: "/images/banner/glass.webp", title: "Drinking Glass" },
{ src: "/images/banner/patila.webp", title: "Cooking Patila" },
{ src: "/images/banner/kadhri.webp", title: "Cooking Kadhai" },
{ src: "/images/banner/pudding.webp", title: "Pudding Bowl" },
];

export default function ToonHubCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth continuous autoplay marquee effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // 4 seconds per slide for a smooth, slow pace

    return () => clearInterval(interval);
  }, []);

  const navigate = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  // Extended array to create a seamless infinite marquee loop feel
  const extendedImages = [...IMAGES, ...IMAGES, ...IMAGES];
  // Shift index so the active item is centered nicely in the virtual track
  const offsetIndex = currentIndex + IMAGES.length;

  // Smaller dimensions for items
  const itemWidth = isMobile ? 180 : 300;
  const itemHeight = isMobile ? 180 : 300;

  return (
    <section className="relative w-full overflow-hidden bg-[#150102]">
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
        className="relative w-full h-screen bg-linear-to-r from-[#150102] via-[#570207] to-[#150102] overflow-hidden flex flex-col justify-between px-4 md:px-12 lg:px-24 xl:px-40"
      >
        
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-50 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Background logo text matching the theme reference */}
        <img
          src="/logo.webp"
          alt="Brand logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 invert pointer-events-none select-none z-2 h-[40vh] sm:h-[60vh] object-contain"
        />

        {/* Smooth Marquee Track Container */}
        <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden flex items-center justify-center">
          <div
            className="flex items-center absolute transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(calc(50% - ${offsetIndex * itemWidth}px - ${itemWidth / 2}px))`,
              willChange: "transform",
            }}
          >
            {extendedImages.map((img, index) => {
              const distance = Math.abs(index - offsetIndex);
              const isCenter = distance === 0;
              const isAdjacent = distance === 1;

              // Scaled down dimensions and smaller scale factors (No blur applied)
              let scale = isCenter ? (isMobile ? 1.1 : 1.25) : isAdjacent ? 0.75 : 0.5;
              let opacity = isCenter ? 1 : isAdjacent ? 0.65 : 0.3;

              return (
                <div
                  key={index}
                  className="shrink-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    filter: `drop-shadow(0 28px 20px rgba(20,0,0,1))`,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <img
                    src={img.src}
                    alt={`Product ${index + 1}`}
                    draggable={false}
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Control Row with fully responsive, readable typography scaling */}
        <div className="absolute bottom-14 w-full left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-4 sm:gap-6 px-4 text-center">
          <h3
            className="
              relative inline-block
              text-[28px]
              lg:text-[34px]
              2xl:text-[40px]
              leading-tight
              bg-gradient-to-r
              from-[#F8E7A1]
              via-[#E0A328]
              to-[#FFD56A]
              bg-clip-text
              text-transparent
              animate-[shine_3s_linear_infinite]
              drop-shadow-md
              tracking-[0.6px]
              roboto-slab
            "
          >
            {IMAGES[currentIndex].title}
          </h3>

          <div className="flex items-center gap-4 sm:gap-5 opacity-60">
            <button
              onClick={() => navigate("prev")}
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-200 hover:scale-110 hover:bg-white/15 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
              aria-label="Previous Item"
            >
              <BsArrowLeft size={22} />
            </button>

            <button
              onClick={() => navigate("next")}
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-200 hover:scale-110 hover:bg-white/15 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
              aria-label="Next Item"
            >
              <BsArrowRight size={22} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}