"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaCheck,
  FaHeart,
  FaLeaf,
  FaShieldHalved,
  FaHandsHoldingCircle,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa6";
import { GiAnvilImpact, GiIndiaGate, GiSparkles } from "react-icons/gi";

// Custom easing for that "luxury" buttery smooth feel
const premiumEase = [0.25, 0.1, 0.25, 1];

const AboutUsPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Subtle parallax for the hero image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const values = [
    {
      id: 1,
      title: "Pure Materials",
      description:
        "We carefully select high-quality copper and dependable materials to create products made for everyday use.",
      icon: FaShieldHalved,
    },
    {
      id: 2,
      title: "Traditional Craftsmanship",
      description:
        "Our products carry the character of Indian metal craftsmanship, shaped with patience, experience and care.",
      icon: GiAnvilImpact,
    },
    {
      id: 3,
      title: "Thoughtful Design",
      description:
        "Every utensil is designed to look elegant while remaining practical, comfortable and easy to use.",
      icon: GiSparkles,
    },
    {
      id: 4,
      title: "Made With Responsibility",
      description:
        "We believe in durable products, mindful production and meaningful choices that reduce unnecessary waste.",
      icon: FaLeaf,
    },
  ];

  const promises = [
    "Premium-quality copper products",
    "Traditional Indian craftsmanship",
    "Modern and functional designs",
    "Carefully checked before dispatch",
    "Reliable customer support",
    "Products designed for everyday living",
  ];

  const stats = [
    { value: "100%", label: "Quality Focused" },
    { value: "Indian", label: "Craft Heritage" },
    { value: "Pure", label: "Copper Experience" },
    { value: "Made", label: "With Care" },
  ];

  const process = [
    {
      number: "01",
      title: "Material Selection",
      description:
        "The journey begins with carefully selected copper and supporting materials chosen for quality and durability.",
    },
    {
      number: "02",
      title: "Skilled Crafting",
      description:
        "Experienced craftspeople shape, join and finish every product using trusted techniques and careful attention.",
    },
    {
      number: "03",
      title: "Detailed Finishing",
      description:
        "Every surface, handle and edge is refined to deliver a balanced combination of beauty and functionality.",
    },
    {
      number: "04",
      title: "Quality Inspection",
      description:
        "Before reaching your home, every Shudhyam product is inspected for finish, form and overall quality.",
    },
  ];

  return (
    <main className="overflow-hidden bg-[#FFF9E6] text-[#211714]">
      
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden bg-[#1a110e]">
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 h-full w-full origin-center"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/craft1.png"
            alt="Traditional Shudhyam copper utensils"
            fill
            priority
            className="object-cover opacity-70"
          />
        </motion.div>

        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#faf8f5]" /> */}

        <div className="relative  mx-auto flex min-h-[70vh]  items-center px-4 md:px-12 lg:px-24 xl:px-40 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: premiumEase, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#d79461]" />
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-[#d79461]">
                The Story of Shudhyam
              </span>
            </div>

            <h1 className="font-serif text-4xl font-light leading-[1.1] text-white md:text-6xl ">
              Purity shaped <br />
              <span className="italic text-[#d79461]">into tradition.</span>
            </h1>

            {/* <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/90 md:text-lg">
              Shudhyam brings the warmth of traditional Indian copperware into modern homes through thoughtful design, skilled craftsmanship, and a deep respect for purity.
            </p> */}

            {/* <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/products"
                className="group relative overflow-hidden bg-[#b76a3e] px-9 py-4 text-sm font-medium tracking-wide text-white transition-all hover:bg-[#9d5733]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Collection
                  <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
                </span>
              </Link>

             
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Brand introduction */}
      <section className="relative px-4 md:px-12 lg:px-24 xl:px-40 py-24">
        <div className="mx-auto grid gap-16  lg:grid-cols-[0.9fr_1.1fr] lg:items-center ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#e8dfd3]">
              <Image
                src="/images/giftsection.png"
                alt="Shudhyam copper craftsmanship"
                fill
                className="object-cover transition duration-1000 hover:scale-105"
              />
            </div>

            {/* Floating glass/premium box */}
            <div className="absolute -bottom-10 -right-4 w-[85%] border border-white/40 bg-white/95 p-8 shadow-[0_20px_50px_-12px_rgba(82,7,10,0.1)] backdrop-blur-md md:-right-12 md:p-10">
              <GiIndiaGate className="mb-5 text-4xl text-[#b76a3e]" />
              <p className="font-serif text-xl italic leading-relaxed text-[#231612] md:text-2xl">
                Inspired by Indian kitchens, traditions and generations of metal craftsmanship.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
            className="pt-16 lg:pl-12 lg:pt-0"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              Who We Are
            </p>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl font-light leading-tight text-[#231612] md:text-5xl lg:text-[3.5rem]">
              Timeless copperware for the <span className="italic text-[#52070a]">modern home.</span>
            </h2>

            <div className="mt-8 space-y-6 text-[15px] font-light leading-relaxed text-[#655851] md:text-lg">
              <p>
                Shudhyam was created with a simple belief: everyday utensils should be useful, beautiful and connected to the traditions that shaped them.
              </p>
              <p>
                Copperware has been part of Indian homes for generations. Beyond its distinctive shine, it represents care, hospitality, purity and a thoughtful way of living.
              </p>
              <p>
                At Shudhyam, we preserve this heritage while adapting it for contemporary kitchens. Our products combine traditional character with clean forms, practical details and dependable quality.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#e5ddd4] pt-8">
              <div>
                <p className="font-serif text-3xl text-[#52070a]">Heritage</p>
                <p className="mt-2 text-sm font-light text-[#75665e]">Rooted in Indian tradition</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#52070a]">Modernity</p>
                <p className="mt-2 text-sm font-light text-[#75665e]">Designed for life today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#170e0b] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[800px] bg-[#d79461]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto grid  grid-cols-2  lg:grid-cols-4 px-4 md:px-12 lg:px-24 xl:px-40 ">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex min-h-[220px] flex-col items-center justify-center px-4 py-12 text-center ${
                index !== stats.length - 1 ? "border-r border-white/[0.05]" : ""
              } ${index % 2 === 0 ? "border-b lg:border-b-0 border-white/[0.05]" : "border-b lg:border-b-0 border-white/[0.05]"}`}
            >
              <p className="font-serif text-4xl font-light text-[#d79461] md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FFF9E6] py-24">
        <div className="mx-auto px-4 md:px-12 lg:px-24 xl:px-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              What Defines Us
            </p>
            <h2 className="mt-6 font-serif text-4xl font-light text-[#231612] md:text-5xl">
              The values behind every <br className="hidden md:block"/> <span className="italic">Shudhyam creation.</span>
            </h2>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: premiumEase, delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white/40 py-10 px-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(183,106,62,0.1)] border border-[#e5ddd4] hover:border-[#b76a3e]/30"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4ece3] text-xl text-[#a75d36] transition-colors duration-500 group-hover:bg-[#52070a] group-hover:text-white">
                    <Icon />
                  </div>
                  <h3 className="font-serif text-2xl text-[#281916]">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-[15px] font-light leading-relaxed text-[#74665f]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="border-t border-[#e5ddd4] bg-[#FFF9E6] py-24">
        <div className="mx-auto grid ] gap-16  lg:grid-cols-2 lg:items-center  px-4 md:px-12 lg:px-24 xl:px-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: premiumEase }}
            className="order-2 lg:order-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              Our Craftsmanship
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#231612] md:text-5xl">
              Made by hands that <br />
              <span className="italic text-[#b76a3e]">understand the material.</span>
            </h2>

            <p className="mt-8 max-w-lg text-[15px] font-light leading-relaxed text-[#695c55] md:text-lg">
              Copper requires patience. Its form, finish, and balance depend on skilled hands and careful decisions at every stage. Our approach respects this material deeply.
            </p>

            <div className="mt-12 space-y-0 border-t border-[#e5ddd4]">
              {process.map((item, index) => (
                <div
                  key={item.number}
                  className="group flex flex-col sm:flex-row gap-6 border-b border-[#e5ddd4] py-8 transition-colors hover:bg-[#faf8f5]"
                >
                  <span className="font-serif text-xl text-[#b76a3e]/60 transition-colors group-hover:text-[#b76a3e]">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-[#2a1c18]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-[#75675f]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative order-1 min-h-[600px] lg:order-2 lg:min-h-[800px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: premiumEase }}
              className="absolute left-0 top-0 h-[75%] w-[80%] overflow-hidden"
            >
              <Image
                src="/images/cat3.png"
                alt="Crafting copper utensils"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: premiumEase, delay: 0.3 }}
              className="absolute bottom-0 right-0 h-[55%] w-[65%] overflow-hidden border-[12px] border-white shadow-2xl"
            >
              <Image
                src="/images/cat2.png"
                alt="Finished copper utensils"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="absolute right-8 top-20 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#52070a] text-center text-white shadow-xl md:h-40 md:w-40">
              <GiSparkles className="text-xl text-[#d79461]" />
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] leading-relaxed">
                Crafted <br /> With Care
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand promise */}
      <section className="bg-[#FFF9E6] py-24">
        <div className="mx-auto gap-10 grid px-4 md:px-12 lg:px-24 xl:px-40  overflow-hidden bg-[#FFF9E6] shadow-[0_20px_60px_-15px_rgba(35,22,18,0.05)] lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-[700px]">
            <Image
              src="/images/cat1.png"
              alt="Shudhyam copper collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
              <div className="inline-flex items-center gap-4 bg-black/40 px-6 py-4 text-white backdrop-blur-md border border-white/10">
                <FaHeart className="text-[#d79461]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                  For meaningful homes
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center ">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              Our Promise
            </p>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#231612] md:text-5xl">
              Products you will be proud to <span className="italic text-[#52070a]">use and share.</span>
            </h2>
            <p className="mt-8 text-[15px] font-light leading-relaxed text-[#71635c] md:text-lg">
              We want every Shudhyam product to feel special from the moment you receive it. That means thoughtful packaging, careful quality checking, and support that remains available long after your purchase.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {promises.map((promise, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={promise}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4ece3] text-[10px] text-[#52070a]">
                    <FaCheck />
                  </span>
                  <span className="text-[15px] font-light leading-relaxed text-[#4f423c]">
                    {promise}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="bg-[#FFF9E6] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
          <FaQuoteLeft className="mx-auto text-4xl text-[#e5ddd4]" />
          
          <blockquote className="mt-10 font-serif text-3xl font-light leading-relaxed text-[#2b1d18] md:text-5xl">
            “We are not simply creating utensils. We are preserving the warmth, care, and beauty that have always made Indian kitchens feel like home.”
          </blockquote>
          
          <div className="mx-auto mt-12 h-px w-20 bg-[#b76a3e]" />
          
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#a75d36]">
            A Note from Team Shudhyam
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFF9E6] px-5 pb-24 md:px-10 md:pb-32 lg:px-16">
        <div className="relative mx-auto max-w-[1450px] overflow-hidden bg-[#1a110e] px-6 py-20 text-center text-white md:px-12 md:py-28">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#b76a3e]/20 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#52070a]/30 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d79461]">
              Discover Shudhyam
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              Bring the beauty of copper into your <span className="italic text-[#d79461]">everyday rituals.</span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-[15px] font-light leading-relaxed text-white/70 md:text-lg">
              Explore thoughtfully designed copper utensils created to add warmth, tradition, and timeless elegance to your home.
            </p>

            <Link
              href="/products"
              className="group mt-12 inline-flex items-center gap-4 border border-[#d79461] bg-transparent px-10 py-4 text-sm font-medium tracking-wider text-[#d79461] transition-all hover:bg-[#d79461] hover:text-[#1a110e]"
            >
              Shop The Collection
              <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;

// Note: Ensure you import FaQuoteLeft from react-icons/fa6 at the top of your file:
// import { FaCheck, FaHeart, FaLeaf, FaShieldHalved, FaHandsHoldingCircle, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";