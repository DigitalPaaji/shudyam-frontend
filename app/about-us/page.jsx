"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaHeart } from "react-icons/fa6";
import {
  GiAnvilImpact,
  GiIndiaGate,
  GiSparkles,
} from "react-icons/gi";

const premiumEase = [0.25, 0.1, 0.25, 1];

const generations = [
  {
    number: "01",
    year: "1942",
    generation: "1st Generation",
    name: "Mehtab Singh",
    title: "The beginning of a family legacy.",
    description:
      "In 1942, Mehtab Singh laid the foundation of our family business, beginning a journey rooted in quality, trust and timeless craftsmanship.",
  },
  {
    number: "02",
    year: "After 1942",
    generation: "2nd Generation",
    name: "Raghunandan Lal",
    title: "Building trust through dedication.",
    description:
      "Raghunandan Lal carried the family legacy forward, strengthening its commitment to hard work, honesty, authentic brass and copper utensils, and uncompromising quality.",
  },
  {
    number: "03",
    year: "3rd Generation",
    generation: "3rd Generation",
    name: "Achru Ram",
    title: "Preserving tradition while embracing change.",
    description:
      "Achru Ram continued to protect traditional knowledge, craftsmanship and the careful selection of authentic brass and copper utensils while adapting to the changing needs of a new era.",
  },
  {
    number: "04",
    year: "Today",
    generation: "4th Generation",
    name: "SHUDYAM",
    title: "Bringing timeless craftsmanship into modern homes.",
    description:
      "Today, SHUDYAM proudly represents the fourth generation — carrying forward the family tradition while bringing the beauty of traditional metalware into contemporary homes.",
  },
];

const values = [
  {
    icon: GiAnvilImpact,
    title: "Craftsmanship",
    description:
      "Every brass and copper utensil carries generations of knowledge, traditional techniques and the care of skilled hands.",
  },
  {
    icon: GiIndiaGate,
    title: "Authenticity",
    description:
      "Our journey is deeply connected to authentic Indian metalware and the traditional utensils that have been part of Indian homes for generations.",
  },
  {
    icon: GiSparkles,
    title: "Quality",
    description:
      "Quality and trust have remained central to our family journey since the beginning in 1942.",
  },
  {
    icon: FaHeart,
    title: "Tradition",
    description:
      "We believe traditions should not be left behind. They should be carried forward, celebrated and shared with future generations.",
  },
];

const promises = [
  "Traditional Indian craftsmanship",
  "Authentic brass and copper heritage",
  "Generations of experience",
  "Timeless and functional designs",
  "Respect for India's rich heritage",
  "A family legacy since 1942",
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const AboutUsPage = () => {
  return (
    <main className="overflow-hidden bg-[#fbf7ed] text-[#211714]">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[#180f0c]">

        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/banner1.webp"
            alt="Traditional Shudyam brass utensils"
            fill
            priority
            className="object-cover opacity-65"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#130b09] via-[#180f0c]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#180f0c] via-transparent to-black/20" />

        <div className="relative mx-auto flex min-h-[90vh] max-w-[1600px] items-end px-5 pb-24 pt-32 md:px-12 lg:px-24 xl:px-36">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: premiumEase,
              delay: 0.2,
            }}
            className="max-w-5xl"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-14 bg-[#d79a68]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d79a68]">
                The Story of SHUDYAM
              </span>
            </div>

            <h1 className="font-serif text-5xl font-light leading-[0.98] text-white md:text-7xl lg:text-[7rem]">
              A legacy
              <br />
              <span className="italic text-[#d79a68]">
                since 1942.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/75 md:text-lg">
              Four generations. One enduring connection to traditional
              Indian metal craftsmanship, quality, trust and timeless
              tradition.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <span className="font-serif text-4xl text-[#d79a68]">
                1942
              </span>

              <span className="h-px w-16 bg-white/20" />

              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                Four Generations
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 hidden text-[10px] uppercase tracking-[0.35em] text-white/40 md:block">
          Scroll to discover our story
        </div>
      </section>


      {/* =========================================================
          INTRODUCTION
      ========================================================== */}
      <section className="relative px-5 py-24 md:px-12 lg:px-24 xl:px-36 lg:py-32">

        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

          <motion.div
            {...fadeUp}
            transition={{ duration: 1, ease: premiumEase }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/giftsection.png"
                alt="Traditional Shudyam metal craftsmanship"
                fill
                className="object-cover transition duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#180f0c]/50 to-transparent" />
            </div>

            <div className="absolute -bottom-8 -right-3 w-[80%] bg-[#fffdf7] p-7 shadow-[0_25px_70px_-25px_rgba(50,20,10,0.2)] md:-right-10 md:p-10">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e8da] text-xl text-[#8d4f32]">
                <GiIndiaGate />
              </div>

              <p className="font-serif text-xl italic leading-relaxed text-[#291a15] md:text-2xl">
                “For us, brass and copper are more than just metals. They
                represent our culture, our traditions, and the memories
                created around every meal shared with family.”
              </p>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1,
              ease: premiumEase,
              delay: 0.15,
            }}
            className="lg:pl-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a55e38]">
              Our Story
            </p>

            <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-[#241612] md:text-5xl lg:text-6xl">
              Four generations of tradition,
              <span className="italic text-[#650c0c]">
                {" "}crafted since 1942.
              </span>
            </h2>

            <div className="mt-9 space-y-6 text-[15px] font-light leading-8 text-[#695b53]">

              <p>
                Some stories are not written in books. They are passed down
                through families, carried through generations, and preserved
                through the work of skilled hands.
              </p>

              <p>
                Our story began in 1942, when Mehtab Singh, the first
                generation of our family, started a humble journey in the
                world of traditional metalware.
              </p>

              <p>
                At a time when brass and copper utensils were an essential
                part of Indian households, he dedicated himself to preserving
                craftsmanship that had been trusted for centuries.
              </p>

              <p>
                Today, we proudly stand as the fourth generation behind
                SHUDYAM — continuing that same connection between traditional
                craftsmanship and modern living.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#ddd2c5] pt-8">
              <div>
                <p className="font-serif text-4xl text-[#650c0c]">
                  1942
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#82736a]">
                  Our Beginning
                </p>
              </div>

              <div>
                <p className="font-serif text-4xl text-[#650c0c]">
                  4
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#82736a]">
                  Generations
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* =========================================================
          FULL-WIDTH HERITAGE STATEMENT
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#1a100d] px-5 py-28 text-white md:px-12 lg:px-24 lg:py-36">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b66d45]/10 blur-[130px]" />

        <motion.div
          {...fadeUp}
          transition={{ duration: 1 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d79a68]">
            More Than Metal
          </p>

          <h2 className="mt-7 font-serif text-4xl font-light leading-tight md:text-6xl">
            A utensil can hold more than a meal.
            <br />
            <span className="italic text-[#d79a68]">
              It can hold a memory.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-8 text-white/60">
            Many of the utensils we offer today are inspired by the very same
            pieces our grandparents and great-grandparents used in their
            homes. Every product reflects generations of experience,
            traditional craftsmanship and a deep respect for India's rich
            heritage.
          </p>
        </motion.div>
      </section>


      {/* =========================================================
          FOUR GENERATION TIMELINE
      ========================================================== */}
      <section className="bg-[#f5eee3] px-5 py-24 md:px-12 lg:px-24 xl:px-36 lg:py-32">

        <div className="mx-auto max-w-[1450px]">

          <motion.div
            {...fadeUp}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a55e38]">
              Our Journey
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#241612] md:text-6xl">
              Four generations.
              <br />
              <span className="italic text-[#650c0c]">
                One enduring legacy.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-[#6d5f56]">
              From a humble family business in 1942 to SHUDYAM today, each
              generation has carried the story forward while protecting the
              values at its heart.
            </p>
          </motion.div>


          <div className="relative mt-20">

            {/* Timeline vertical line */}
            <div className="absolute left-[25px] top-0 hidden h-full w-px bg-[#d7c8b8] md:block" />

            <div className="space-y-10 md:space-y-0">

              {generations.map((generation, index) => (
                <motion.div
                  key={generation.number}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-70px",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: premiumEase,
                    delay: index * 0.1,
                  }}
                  className="relative md:grid md:grid-cols-[80px_1fr] md:gap-10"
                >

                  {/* Timeline node */}
                  <div className="relative z-10 hidden md:flex md:h-14 md:w-14 md:items-center md:justify-center md:rounded-full md:border md:border-[#c9b6a2] md:bg-[#f5eee3]">

                    <div className="h-3 w-3 rounded-full bg-[#8d4f32]" />
                  </div>


                  {/* Card */}
                  <div className="group border border-[#dfd3c5] bg-[#fffdf8] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(60,25,10,0.25)] md:mb-10 md:p-10">

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">

                      <div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-4xl text-[#c48a63]">
                            {generation.year}
                          </span>

                          <span className="h-px w-10 bg-[#d8c9bb]" />

                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9a8577]">
                            {generation.generation}
                          </span>
                        </div>

                        <h3 className="mt-5 font-serif text-3xl text-[#261713] md:text-4xl">
                          {generation.name}
                        </h3>
                      </div>

                      <span className="font-serif text-5xl font-light text-[#e3d7ca]">
                        {generation.number}
                      </span>

                    </div>

                    <h4 className="mt-7 font-serif text-xl italic text-[#8d4f32]">
                      {generation.title}
                    </h4>

                    <p className="mt-4 max-w-3xl text-[15px] font-light leading-8 text-[#6e6058]">
                      {generation.description}
                    </p>

                  </div>

                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          VALUES
      ========================================================== */}
      <section className="bg-[#fbf7ed] px-5 py-24 md:px-12 lg:px-24 xl:px-36 lg:py-32">

        <div className="mx-auto max-w-[1450px]">

          <motion.div
            {...fadeUp}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a55e38]">
              What Defines Us
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light text-[#241612] md:text-6xl">
              Values carried
              <br />
              <span className="italic text-[#650c0c]">
                through generations.
              </span>
            </h2>
          </motion.div>


          <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: premiumEase,
                    delay: index * 0.1,
                  }}
                  className="group border border-[#e2d7ca] bg-white/50 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#b16b45]/40 hover:bg-white hover:shadow-[0_25px_60px_-30px_rgba(60,25,10,0.2)] md:p-10"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e5d8] text-xl text-[#8d4f32] transition-all duration-500 group-hover:bg-[#650c0c] group-hover:text-white">
                    <Icon />
                  </div>

                  <h3 className="mt-8 font-serif text-2xl text-[#291a15]">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm font-light leading-7 text-[#70625a]">
                    {value.description}
                  </p>

                </motion.div>
              );
            })}

          </div>
        </div>
      </section>


      {/* =========================================================
          CRAFTSMANSHIP IMAGE SECTION
      ========================================================== */}
      <section className="border-y border-[#e1d6c8] bg-[#f6eee2] px-5 py-24 md:px-12 lg:px-24 xl:px-36 lg:py-32">

        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-2 lg:items-center">

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: premiumEase,
            }}
            className="relative min-h-[600px]"
          >

            <div className="absolute left-0 top-0 h-[75%] w-[78%] overflow-hidden">
              <Image
                src="/images/about1.webp"
                alt="Traditional brass craftsmanship"
                fill
                className="object-cover transition duration-1000 hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 right-0 h-[52%] w-[62%] overflow-hidden border-[10px] border-[#f6eee2] shadow-2xl">
              <Image
                src="/images/about3.webp"
                alt="Finished Shudyam brass utensils"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute right-8 top-16 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#650c0c] text-center text-white shadow-xl md:h-40 md:w-40">

              <GiSparkles className="text-xl text-[#d79a68]" />

              <span className="mt-3 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.25em]">
                Crafted
                <br />
                With Care
              </span>

            </div>

          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: premiumEase,
            }}
          >

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a55e38]">
              The Craft
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#241612] md:text-5xl">
              Preserving knowledge
              <br />
              <span className="italic text-[#650c0c]">
                through skilled hands.
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-[15px] font-light leading-8 text-[#6c5e56]">

              <p>
                The third generation continued to protect the traditional
                knowledge of crafting and selecting authentic brass and copper
                utensils while adapting to the changing needs of a new era.
              </p>

              <p>
                Today, that experience remains at the heart of SHUDYAM. Our
                products are inspired by the utensils that have been part of
                Indian homes for generations.
              </p>

              <p>
                Every piece reflects generations of experience, traditional
                craftsmanship and a deep respect for India's rich heritage.
              </p>

            </div>

            <div className="mt-10 border-t border-[#ddd0c1] pt-8">

              <div className="flex items-center gap-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#650c0c] text-white">
                  <GiAnvilImpact />
                </div>

                <div>
                  <p className="font-serif text-xl text-[#291a15]">
                    Traditional craftsmanship
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8a796d]">
                    Preserved since 1942
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </section>


      {/* =========================================================
          PROMISE
      ========================================================== */}
      <section className="bg-[#fbf7ed] px-5 py-24 md:px-12 lg:px-24 xl:px-36 lg:py-32">

        <div className="mx-auto grid max-w-[1450px] overflow-hidden bg-[#fffdf8] shadow-[0_25px_80px_-40px_rgba(50,20,10,0.25)] lg:grid-cols-2">

          <div className="relative min-h-[550px] lg:min-h-[700px]">

            <Image
              src="/images/about2.webp"
              alt="Shudyam brass collection"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            <div className="absolute bottom-10 left-8 md:left-10">

              <div className="inline-flex items-center gap-4 border border-white/10 bg-black/40 px-6 py-4 text-white backdrop-blur-md">

                <FaHeart className="text-[#d79a68]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                  For generations to come
                </span>

              </div>

            </div>
          </div>


          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a55e38]">
              Our Promise
            </p>

            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-[#241612] md:text-5xl">
              Carrying the past
              <br />
              <span className="italic text-[#650c0c]">
                into the future.
              </span>
            </h2>

            <p className="mt-7 text-[15px] font-light leading-8 text-[#6e6058]">
              At SHUDYAM, we don't believe that traditions should be left
              behind. We believe they should be carried forward, celebrated,
              and shared with future generations.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {promises.map((promise, index) => (
                <motion.div
                  key={promise}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="flex items-start gap-3"
                >

                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f0e5d8] text-[10px] text-[#650c0c]">
                    <FaCheck />
                  </span>

                  <span className="text-sm font-light leading-6 text-[#51453e]">
                    {promise}
                  </span>

                </motion.div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL HERITAGE QUOTE
      ========================================================== */}
      <section className="bg-[#1a100d] px-5 py-28 text-center text-white md:px-12 lg:py-36">

        <motion.div
          {...fadeUp}
          transition={{ duration: 1 }}
          className="mx-auto max-w-5xl"
        >

          <div className="mx-auto mb-8 h-px w-16 bg-[#d79a68]" />

          <p className="font-serif text-3xl font-light leading-relaxed md:text-5xl">
            “Some things never go out of style—
            <br className="hidden md:block" />
            especially when they are built on
            <span className="italic text-[#d79a68]">
              {" "}heritage, craftsmanship and legacy.
            </span>
            ”
          </p>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            SHUDYAM · Since 1942
          </p>

        </motion.div>

      </section>


      {/* =========================================================
          CTA
      ========================================================== */}
      <section className="bg-[#fbf7ed] px-5 py-24 md:px-12 lg:px-24 lg:py-32">

        <div className="relative mx-auto max-w-[1450px] overflow-hidden bg-[#1a100d] px-6 py-20 text-center text-white md:px-12 md:py-28">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#b76a3e]/20 blur-[120px]" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#650c0c]/40 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d79a68]">
              Discover SHUDYAM
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              Bring a piece of
              <br />
              <span className="italic text-[#d79a68]">
                timeless tradition
              </span>
              {" "}home.
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-base font-light leading-8 text-white/60">
              Explore traditional brass and copper craftsmanship inspired by
              generations of Indian heritage and created for modern homes.
            </p>

            <Link
              href="/products"
              className="group mt-10 inline-flex items-center gap-4 border border-[#d79a68] px-9 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#d79a68] transition-all duration-500 hover:bg-[#d79a68] hover:text-[#1a100d]"
            >
              Explore Collection

              <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUsPage;