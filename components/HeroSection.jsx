"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: "/images/banner/bannerD1.webp",
    mobileImage: "/images/banner/bannerM1.webp",
    alt: "Shudyam New Launch",
  },
  {
    id: 2,
    image: "/images/banner/bannerD2.webp",
    mobileImage: "/images/banner/bannerM2.webp",
    alt: "Shudyam Traditional Collection",
  },
  {
    id: 3,
    image: "/images/banner/bannerD3.webp",
    mobileImage: "/images/banner/bannerM3.webp",
    alt: "Shudyam New Launch",
  },
  {
    id: 4,
    image: "/images/banner/bannerD4.webp",
    mobileImage: "/images/banner/bannerM4.webp",
    alt: "Shudyam Traditional Collection",
  },
];

// Clone last slide at beginning and first slide at end
const sliderSlides = [
  slides[slides.length - 1],
  ...slides,
  slides[0],
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);

  const sliderRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isAnimating = useRef(false);

  // -----------------------------------
  // AUTOPLAY
  // -----------------------------------
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // -----------------------------------
  // NEXT SLIDE
  // -----------------------------------
  const nextSlide = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentSlide((prev) => prev + 1);
  };

  // -----------------------------------
  // PREVIOUS SLIDE
  // -----------------------------------
  const prevSlide = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentSlide((prev) => prev - 1);
  };

  // -----------------------------------
  // GO TO SLIDE
  // -----------------------------------
  const goToSlide = (index) => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);
    setCurrentSlide(index + 1);
  };

  // -----------------------------------
  // AFTER TRANSITION
  // -----------------------------------
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;

    isAnimating.current = false;

    // Reached cloned FIRST slide
    if (currentSlide === slides.length + 1) {
      setTransitionEnabled(false);
      setCurrentSlide(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }

    // Reached cloned LAST slide
    if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(slides.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  // -----------------------------------
  // DRAG START
  // -----------------------------------
  const handlePointerDown = (e) => {
    if (isAnimating.current) return;

    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }

    setIsDragging(true);
    setTransitionEnabled(false);

    startX.current = e.clientX;
    currentX.current = e.clientX;

    sliderRef.current?.setPointerCapture?.(e.pointerId);
  };

  // -----------------------------------
  // DRAG MOVE
  // -----------------------------------
  const handlePointerMove = (e) => {
    if (!isDragging) return;

    currentX.current = e.clientX;

    const diff = currentX.current - startX.current;

    setDragOffset(diff);
  };

  // -----------------------------------
  // DRAG END
  // -----------------------------------
  const handlePointerUp = (e) => {
    if (!isDragging) return;

    const diff = currentX.current - startX.current;
    const containerWidth =
      sliderRef.current?.offsetWidth || window.innerWidth;

    const swipeThreshold = containerWidth * 0.15;

    setIsDragging(false);
    setDragOffset(0);
    setTransitionEnabled(true);

    if (Math.abs(diff) > swipeThreshold) {
      isAnimating.current = true;

      if (diff < 0) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        setCurrentSlide((prev) => prev - 1);
      }
    }

    try {
      sliderRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
    setTransitionEnabled(true);
  };

  // -----------------------------------
  // REAL ACTIVE SLIDE FOR DOTS
  // -----------------------------------
  const realSlide =
    currentSlide === 0
      ? slides.length
      : currentSlide === slides.length + 1
      ? 1
      : currentSlide;

  return (
    <section className="relative w-full overflow-hidden">
      <div
        ref={sliderRef}
        className={`relative w-full overflow-hidden select-none touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* SLIDER */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex w-full ${
            transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : "transition-none"
          }`}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          }}
        >
          {sliderSlides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="w-full shrink-0"
            >
              {/* Desktop */}
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={600}
                priority={index === 1}
                sizes="100vw"
                draggable={false}
                className="hidden h-auto w-full pointer-events-none md:block"
              />

              {/* Mobile */}
              <Image
                src={slide.mobileImage || slide.image}
                alt={slide.alt}
                width={750}
                height={1000}
                priority={index === 1}
                sizes="100vw"
                draggable={false}
                className="block h-auto w-full pointer-events-none md:hidden"
              />
            </div>
          ))}
        </div>

        {/* PREVIOUS */}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous banner"
          className="
            absolute left-4 bottom-4 z-20
            flex h-10 w-10 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-white/40
            text-[#250103cb]
            shadow-md
            backdrop-blur-xl
            transition-all
            active:scale-95
            sm:left-5 sm:h-11 sm:w-11
            md:left-6 md:h-12 md:w-12
          "
        >
          <FiChevronLeft className="text-xl md:text-2xl" />
        </button>

        {/* NEXT */}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next banner"
          className="
            absolute right-4 bottom-4 z-20
            flex h-10 w-10 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-white/40
            text-[#250103cb]
            shadow-md
            backdrop-blur-xl
            transition-all
            active:scale-95
            sm:right-5 sm:h-11 sm:w-11
            md:right-6 md:h-12 md:w-12
          "
        >
          <FiChevronRight className="text-xl md:text-2xl" />
        </button>

        {/* DOTS */}
        <div
          className="
            absolute bottom-3 left-1/2 z-20
            flex -translate-x-1/2
            items-center gap-2
            md:bottom-5
          "
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to banner ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                realSlide === index + 1
                  ? "w-4 bg-[#250103]"
                  : "w-2 bg-[#cfbcbd]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const slides = [
//   {
//     id: 1,
//     image: "/images/finalbanners/1.webp",
//     mobileImage: "/images/banner2.webp",
//     alt: "Shudyam New Launch",
//   },
//   {
//     id: 2,
//     image: "/images/finalbanners/2.webp",
//     mobileImage: "/images/banner2.webp",
//     alt: "Shudyam Traditional Collection",
//   },
//     {
//     id: 3,
//     image: "/images/finalbanners/3.webp",
//     mobileImage: "/images/banner2.webp",
//     alt: "Shudyam New Launch",
//   },
//   {
//     id: 4,
//     image: "/images/banner2.webp",
//     mobileImage: "/images/banner2.webp",
//     alt: "Shudyam Traditional Collection",
//   },
// ];

// function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);

//   const sliderRef = useRef(null);
//   const startX = useRef(0);
//   const currentX = useRef(0);

//   // ---------------------------------------
//   // AUTOPLAY
//   // ---------------------------------------
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isDragging) {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isDragging]);

//   // ---------------------------------------
//   // NEXT SLIDE
//   // ---------------------------------------
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   // ---------------------------------------
//   // PREVIOUS SLIDE
//   // ---------------------------------------
//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + slides.length) % slides.length
//     );
//   };

//   // ---------------------------------------
//   // DOT CLICK
//   // ---------------------------------------
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // ---------------------------------------
//   // DRAG START
//   // ---------------------------------------
//   const handlePointerDown = (e) => {
//     // Only allow left mouse button
//     if (e.pointerType === "mouse" && e.button !== 0) return;

//     setIsDragging(true);

//     startX.current = e.clientX;
//     currentX.current = e.clientX;

//     sliderRef.current?.setPointerCapture(e.pointerId);
//   };

//   // ---------------------------------------
//   // DRAG MOVE
//   // ---------------------------------------
//   const handlePointerMove = (e) => {
//     if (!isDragging) return;

//     currentX.current = e.clientX;
//   };

//   // ---------------------------------------
//   // DRAG END
//   // ---------------------------------------
//   const handlePointerUp = (e) => {
//     if (!isDragging) return;

//     const diff = startX.current - currentX.current;

//     setIsDragging(false);

//     // Minimum swipe distance
//     const swipeThreshold = 60;

//     if (Math.abs(diff) > swipeThreshold) {
//       if (diff > 0) {
//         // Dragged left → next
//         nextSlide();
//       } else {
//         // Dragged right → previous
//         prevSlide();
//       }
//     }

//     sliderRef.current?.releasePointerCapture?.(e.pointerId);
//   };

//   const handlePointerCancel = () => {
//     setIsDragging(false);
//   };

//   return (
//     <section className="relative -z-10 w-full  bg-white">
//       {/* Slider */}
//       <div
//         ref={sliderRef}
//         className={`relative  w-full overflow-hidden select-none touch-pan-y  ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={handlePointerCancel}
//         onPointerLeave={(e) => {
//           if (isDragging) {
//             handlePointerUp(e);
//           }
//         }}
//       >
//         {/* Slides */}
//         <div
//           className={`flex w-full ${
//             isDragging
//               ? "transition-none"
//               : "transition-transform duration-700 ease-in-out"
//           }`}
//           style={{
//             transform: `translateX(-${currentSlide * 100}%)`,
//           }}
//         >
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className="relative  w-full shrink-0 aspect-[1920/600] h-[600px] "
//             >
//               {/* Desktop */}
//               <Image
//                 src={slide.image}
//                 alt={slide.alt}
//                 fill
//                 priority={index === 0}
//                 sizes="100vw"
//                 draggable={false}
//                 className="hidden object-fill h-auto md:block   "
//               />

//               {/* Mobile */}
//               <Image
//                 src={slide.mobileImage || slide.image}
//                 alt={slide.alt}
//                 fill
//                 priority={index === 0}
//                 sizes="100vw"
//                 draggable={false}
//                 className="block object-cover md:hidden "
//               />
//             </div>
//           ))}
//         </div>

//         {/* -------------------------------- */}
//         {/* PREVIOUS ARROW */}
//         {/* -------------------------------- */}
// <button
//   type="button"
//   onPointerDown={(e) => e.stopPropagation()}
//   onClick={(e) => {
//     e.stopPropagation();
//     prevSlide();
//   }}
//   aria-label="Previous banner"
//   className="
//     absolute left-4 top-1/2 z-20
//     flex h-10 w-10 -translate-y-1/2
//     items-center justify-center
//     rounded-full
//     text-[#250103cb]
//     bg-gray-100/40
//     shadow-md
//     backdrop-blur-3xl
//     transition-all duration-300
//     active:scale-95
//     sm:left-5
//     sm:h-11 sm:w-11
//     md:left-6
//     md:h-12 md:w-12
//   "
// >
//   <FiChevronLeft className="text-xl md:text-2xl" />
// </button>

//         {/* -------------------------------- */}
//         {/* NEXT ARROW */}
//         {/* -------------------------------- */}
//   <button
//   type="button"
//   onPointerDown={(e) => e.stopPropagation()}
//   onClick={(e) => {
//     e.stopPropagation();
//     nextSlide();
//   }}
//   aria-label="Next banner"
//   className="
//     absolute right-4 top-1/2 z-20
//     flex h-10 w-10 -translate-y-1/2
//     items-center justify-center
//     rounded-full
//     text-[#250103cb]
//     bg-gray-100/40
//     shadow-md
//     backdrop-blur-3xl
//     transition-all duration-300
//     active:scale-95
//     sm:right-5
//     sm:h-11 sm:w-11
//     md:right-6
//     md:h-12 md:w-12
//   "
// >
//   <FiChevronRight className="text-xl md:text-2xl" />
// </button>

//         {/* -------------------------------- */}
//         {/* DOTS */}
//         {/* -------------------------------- */}
//         <div
//           className="
//             absolute bottom-3 left-1/2 z-20
//             flex -translate-x-1/2
//             items-center gap-2
//             md:bottom-5
//           "
//         >
//           {slides.map((slide, index) => (
//           <button
//   key={`${slide.id}-${index}`}
//   type="button"
//   onPointerDown={(e) => e.stopPropagation()}
//   onClick={(e) => {
//     e.stopPropagation();
//     goToSlide(index);
//   }}
//   aria-label={`Go to banner ${index + 1}`}
//   className={`h-1.5 rounded-full transition-all duration-300 ${
//     index === currentSlide
//       ? "w-4 bg-[#250103]"
//       : "w-2 bg-[#cfbcbd]"
//   }`}
// />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;

// "use client"
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules'; // Added missing import
// import Image from 'next/image';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// const HeroSection = () => {
//   const slider = [
//     {
//       id: 1,
//       image: "/images/finalbanners/1.webp",
//       mobileImage: "/images/banner2.webp",
//       alt: "Shudyam New Launch",
//     },
//     {
//       id: 2,
//       image: "/images/finalbanners/2.webp",
//       mobileImage: "/images/banner2.webp",
//       alt: "Shudyam Traditional Collection",
//     },
//     {
//       id: 3,
//       image: "/images/finalbanners/3.webp",
//       mobileImage: "/images/banner2.webp",
//       alt: "Shudyam New Launch",
//     },
//     {
//       id: 4,
//       image: "/images/banner2.webp",
//       mobileImage: "/images/banner2.webp",
//       alt: "Shudyam Traditional Collection",
//     },
//   ];

//   return (
//     <div className="w-full relative overflow-hidden">

//  <button className="best-hero-prev absolute p-2 left-3 top-[50%] z-10 flex  items-center justify-center rounded-full bg-white/60 text-[#760209] shadow-lg transition-all hover:bg-[#760209] hover:text-white ">
        
//           <IoIosArrowBack className="text-xl" /> 
//         </button>

//         <button className="best-hero-next p-2  absolute right-3 top-[50%] z-10  flex  items-center justify-center rounded-full bg-white/60 text-[#760209] shadow-lg transition-all hover:bg-[#760209] hover:text-white ">
        
//           <IoIosArrowForward  className="text-xl"  />
//         </button>

//       <Swiper
      
//       loop={true}
//       navigation={{
//             nextEl: ".best-hero-next",
//             prevEl: ".best-hero-prev",
//           }} modules={[Navigation]} className="mySwiper">
//         {slider.map((slide, index) => (
//           // Added missing key prop
//           <SwiperSlide key={slide.id}>
            
//             {/* Added relative wrapper with height for Next.js Image 'fill' to work properly */}
//             <div className="relative w-full     ">
              
//               {/* Desktop Image */}
//               <Image
//                 src={slide.image}
//                 alt={slide.alt}
//                 height={600}
//                 width={1920}
//                 priority={index === 0}
//                 sizes="100vw"
//                 draggable={false}
//                 className="hidden md:block h-[600px]"
//               />

//               {/* Mobile Image */}
//               <Image
//                 src={slide.mobileImage || slide.image}
//                 alt={slide.alt}
//                  height={675}
//                 width={540}
//                 priority={index === 0}
//                 sizes="100vw"
//                 draggable={false}
//                 className="block md:hidden h-[675px] "
//               />
//             </div>
            
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroSection;