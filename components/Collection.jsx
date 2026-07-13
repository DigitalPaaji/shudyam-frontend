"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import UnderlineText from "./UnderlineText";
import HeadLine from "./HeadLine";
import { img_url } from "./utile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const INITIAL_COUNT = 4;
const LOAD_COUNT = 4;

const Collection = () => {
  const [catCount, setCatCount] = useState(INITIAL_COUNT);

  /*
    Expected Redux state:

    state.categories = {
      categories: [],
      loading: false,
      error: null
    }
  */
  const {
    categories: categoryState = [],
    error,
    loading,
  } = useSelector((state) => state.categories);

  /*
    Supports both response formats:

    1. categories: [...]
    2. categories: { category: [...] }
  */
  const categories = useMemo(() => {
    if (Array.isArray(categoryState)) {
      return categoryState;
    }

    if (Array.isArray(categoryState?.category)) {
      return categoryState.category;
    }

    return [];
  }, [categoryState]);

  const sectionRef = useRef(null);
  const underlineRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonRef = useRef(null);

  const cardRefs = useRef([]);
  const previousCountRef = useRef(INITIAL_COUNT);

  const visibleCategories = categories.slice(0, catCount);

  const allCategoriesVisible =
    categories.length > 0 && catCount >= categories.length;



  // Animate heading and initially visible category cards
  useGSAP(
    () => {
      if (loading || categories.length === 0) return;

      const initialCards = cardRefs.current
        .slice(0, INITIAL_COUNT)
        .filter(Boolean);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from(underlineRef.current, {
          y: 25,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
        })
        .from(
          headlineRef.current,
          {
            y: 45,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25"
        );

      if (initialCards.length > 0) {
        timeline.from(
          initialCards,
          {
            x: (index) => (index % 2 === 0 ? -60 : 60),
            y: 70,
            opacity: 0,
            scale: 0.88,
            rotate: (index) => (index % 2 === 0 ? -3 : 3),
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.3"
        );
      }

      if (buttonRef.current) {
        timeline.from(
          buttonRef.current,
          {
            y: 25,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.25"
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [loading, categories.length],
      revertOnUpdate: true,
    }
  );

  // Animate only newly loaded cards
  useGSAP(
    () => {
      const previousCount = previousCountRef.current;

      if (catCount > previousCount) {
        const newCards = cardRefs.current
          .slice(previousCount, catCount)
          .filter(Boolean);

        if (newCards.length > 0) {
          gsap.fromTo(
            newCards,
            {
              y: 80,
              opacity: 0,
              scale: 0.88,
              rotate: (index) => (index % 2 === 0 ? -3 : 3),
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform",
              onComplete: () => {
                ScrollTrigger.refresh();
              },
            }
          );
        }
      }

      previousCountRef.current = catCount;
    },
    {
      scope: sectionRef,
      dependencies: [catCount],
    }
  );

  const handleViewMore = () => {
    if (allCategoriesVisible) {
      setCatCount(INITIAL_COUNT);

      window.requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      return;
    }

    setCatCount((previousCount) =>
      Math.min(previousCount + LOAD_COUNT, categories.length)
    );
  };

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="overflow-hidden px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24 xl:px-40"
    >
      {/* Heading */}
      <div ref={underlineRef} className="mb-5 flex justify-center">
        <UnderlineText text="Collections" />
      </div>

      <div ref={headlineRef} className="mb-10 flex justify-center md:mb-14">
        <HeadLine text="Traditional Indian Craftsmanship" />
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: INITIAL_COUNT }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-[#f1e9e5]" />

              <div className="flex justify-center py-5">
                <div className="h-5 w-28 rounded-full bg-[#f1e9e5]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
          <p className="font-p text-base font-medium text-red-600">
            {typeof error === "string"
              ? error
              : "Failed to load collections."}
          </p>
        </div>
      )}

      {/* Empty Categories */}
      {!loading && !error && categories.length === 0 && (
        <div className="rounded-2xl bg-[#f8f4f1] px-6 py-14 text-center">
          <p className="font-p text-lg font-medium text-p">
            No collections are available.
          </p>
        </div>
      )}

      {/* Category Grid */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCategories.map((item, index) => (
            <Link
              key={item._id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              href={`/products?category=${item.slug}`}
              className="group block will-change-transform"
            >
              <div className="relative aspect-square overflow-hidden bg-[#f8f4f1]">
                <img
                  src={`${img_url}${item.image}`}
                  width={400}
                  height={400}
                  alt={item.name || "Category"}
                  className="h-full w-full object-cover "
                 
                />

 
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#530509]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="relative overflow-hidden py-4 text-center">
                <p className="font-p text-base font-medium text-p transition-transform duration-300 group-hover:-translate-y-1 sm:text-lg">
                  {item.name}
                </p>

                <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-p transition-all duration-500 group-hover:w-16" />
              </div>
            </Link>
          ))}
        </div>
      )}
      {!loading && !error && categories.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center md:mt-14">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleViewMore}
            className="group relative min-w-[160px] cursor-pointer overflow-hidden rounded-full bg-p px-10 py-3.5 font-medium text-white transition-transform duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            <span className="absolute inset-0 translate-y-full bg-[#320204] transition-transform duration-300 group-hover:translate-y-0" />

            <span className="relative z-10">
              {allCategoriesVisible ? "View Less" : "View More"}
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Collection;