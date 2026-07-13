"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);


useGSAP(()=>{
const tl = gsap.timeline();

tl.to(img1Ref.current,{
  
})



})




  return (
    <section
    
      className=""
    >
<div    ref={sectionRef} className="relative h-screen bg-gradient-to-r from-[#150102] via-[#570207] to-[#150102]">





 <img
       
        src="/logo.webp"
        alt="Brand logo"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   opacity-10 invert "
      />

<img  ref={img1Ref} src="/images/products/1.png" alt=""  className="absolute top-2/5 left-1/3 -translate-x-1/2 -translate-y-1/2  h-64   [filter:drop-shadow(0_28px_20px_rgba(20,0,0,1))]"/>
<img  ref={img2Ref} src="/images/products/3.png" alt=""  className="absolute top-2/5 left-3/5 -translate-x-1/2 -translate-y-1/2  h-72   [filter:drop-shadow(0_28px_20px_rgba(20,0,0,1))]"/>
<img  ref={img3Ref} src="/images/products/2.png" alt=""  className="absolute top-3/4  left-3/5 -translate-x-4/5 -translate-y-1/2  h-52   [filter:drop-shadow(0_28px_20px_rgba(20,0,0,1))]"/>







</div>

    
    
    
    
     
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1440 180"
  preserveAspectRatio="none"
  className="block h-[85px] w-full rotate-180 sm:h-[110px] lg:h-[135px]"
>
  <defs>
    <linearGradient
      id="footerWaveGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#150102" />
      <stop offset="50%" stopColor="#570207" />
      <stop offset="100%" stopColor="#150102" />
    </linearGradient>
  </defs>

  <path
    fill="url(#footerWaveGradient)"
    d="
      M0 180
      V105
      C290 25, 500 0, 720 0
      C940 0, 1150 25, 1440 105
      V180
      H0
      Z
    "
  />
</svg>
     
    </section>
  );
};

export default HeroSection;