"use client";

import Image from "next/image";
import React, { useRef } from "react";
import UnderlineText from "./UnderlineText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BestProduct = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop animation
      mm.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 0%",
            scrub: 1,
            // markers: true,
          },
        });

        timeline
          // Content comes from right
          .from(
            contentRef.current,
            {
              xPercent: 100,
              opacity: 0,
              scale: 0.9,
              rotate: 3,
              ease: "power3.out",
            },
            0
          )

          // Image comes from left
          .from(
            imageRef.current,
            {
              xPercent: -100,
              opacity: 0,
              scale: 0.8,
              rotate: -8,
              ease: "power3.out",
            },
            0
          );
      });

      // Mobile and tablet animation
      mm.add("(max-width: 1023px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
            // markers: true,
          },
        });

        timeline
          .from(imageRef.current, {
            xPercent: -35,
            opacity: 0,
            scale: 0.85,
            rotate: -5,
            ease: "power3.out",
          })
          .from(
            contentRef.current,
            {
              xPercent: 35,
              opacity: 0,
              y: 30,
              ease: "power3.out",
            },
            "-=0.5"
          );
      });

      return () => mm.revert();
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-24 lg:py-24 xl:px-40"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Product Content */}
        <div
          ref={contentRef}
          className="order-2 w-full will-change-transform lg:order-1 lg:col-span-5"
        >
          <div className="text-center">
            <UnderlineText text="Featured" />
          </div>

          <div className="my-5 md:my-7">
            <h3 className="text-center font-p text-2xl font-medium leading-tight text-p sm:text-3xl lg:text-4xl">
              Copper Frying Pan
              <span className="mt-2 block text-lg font-normal sm:text-xl lg:text-2xl">
                Frypan with Insulated Handle — Sauté Pan
              </span>
            </h3>
          </div>

          <p className="text-center font-p text-2xl font-semibold text-p sm:text-3xl">
            Rs. 15,400
          </p>

          <div className="mt-6 text-center md:mt-8">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-p px-10 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 sm:px-12"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div
          ref={imageRef}
          className="order-1 w-full will-change-transform lg:order-2 lg:col-span-7"
        >
          <div className="relative mx-auto w-full max-w-[650px] lg:max-w-none">
            <Image
              src="/images/featured1.png"
              width={900}
              height={700}
              alt="Copper frying pan with insulated handle"
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProduct;