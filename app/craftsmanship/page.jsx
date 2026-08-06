import Image from "next/image";
import Link from "next/link";
import {
  FiArrowDown,
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiCircle,
  FiFeather,
  FiHeart,
  FiLayers,
  FiPackage,
  FiShield,
  FiStar,
  FiTool,
} from "react-icons/fi";

export const metadata = {
  title: "Our Craftsmanship | Shudyam",
  description:
    "Discover the materials, skilled hands and thoughtful processes behind every Shudyam brass creation.",
};

const processSteps = [
  {
    number: "01",
    label: "Selection",
    title: "Choosing the Brass",
    description:
      "Our process begins with carefully selected brass sheets chosen for their finish, consistency and suitability for each design.",
    image: "/images/craftsmanship/selecting-brass.jpeg",
    points: [
      "Material inspection",
      "Thickness verification",
      "Surface quality review",
    ],
  },
  {
    number: "02",
    label: "Shaping",
    title: "Formed by Skilled Hands",
    description:
      "The metal is gradually shaped into its intended form through controlled pressure, traditional tools and experienced craftsmanship.",
    image: "/images/craftsmanship/shaping-brass.jpeg",
    points: [
      "Measured proportions",
      "Balanced construction",
      "Careful edge formation",
    ],
  },
  {
    number: "03",
    label: "Hammering",
    title: "A Rhythm in Every Mark",
    description:
      "Each hammer impression contributes to the vessel’s character, creating subtle patterns that make every handcrafted piece distinct.",
    image: "/images/craftsmanship/hammering-brass.jpeg",
    points: [
      "Hand-applied texture",
      "Individual character",
      "Detailed surface work",
    ],
  },
  {
    number: "04",
    label: "Finishing",
    title: "Polished with Patience",
    description:
      "The shaped product is refined, cleaned and polished to reveal the warm, luminous appearance associated with brass.",
    image: "/images/craftsmanship/polishing-brass.webp",
    points: [
      "Surface refinement",
      "Edge smoothing",
      "Final hand polishing",
    ],
  },
  {
    number: "05",
    label: "Inspection",
    title: "Checked Before It Reaches You",
    description:
      "Every completed product is reviewed for construction, balance, finish and overall presentation before being carefully packed.",
    image: "/images/craftsmanship/quality-check.jpeg",
    points: [
      "Finish inspection",
      "Construction review",
      "Secure packaging",
    ],
  },
];

const values = [
  {
    icon: FiTool,
    number: "01",
    title: "Made with Skill",
    description:
      "Experienced hands guide every stage, from forming the raw sheet to refining the smallest detail.",
  },
  {
    icon: FiFeather,
    number: "02",
    title: "Thoughtfully Finished",
    description:
      "Edges, handles, surfaces and proportions are carefully considered for beauty and everyday usability.",
  },
  {
    icon: FiLayers,
    number: "03",
    title: "Material Honesty",
    description:
      "We celebrate the natural warmth and evolving character of brass instead of hiding its individuality.",
  },
  {
    icon: FiShield,
    number: "04",
    title: "Quality Reviewed",
    description:
      "Products are inspected before packing so that each Shudyam piece arrives ready to become part of your home.",
  },
];

const details = [
  {
    title: "Texture",
    description:
      "Small variations and hammer marks preserve the unmistakable character of work shaped by hand.",
    image: "/images/craftsmanship/detail-texture.webp",
  },
  {
    title: "Form",
    description:
      "Curves, walls and bases are developed to create a balanced relationship between function and beauty.",
    image: "/images/craftsmanship/detail-form.webp",
  },
  {
    title: "Finish",
    description:
      "Every surface is carefully refined to reveal brass’s rich, warm and naturally reflective appearance.",
    image: "/images/craftsmanship/detail-finish.webp",
  },
];

const gallery = [
  {
    image: "/images/craftsmanship/gallery-1.webp",
    title: "The Artisan",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    image: "/images/craftsmanship/gallery-2.jpg",
    title: "Hammered Texture",
    className: "md:col-span-5",
  },
  {
    image: "/images/craftsmanship/gallery-3.jpg",
    title: "Final Polish",
    className: "md:col-span-5",
  },
  {
    image: "/images/craftsmanship/gallery-4.jpeg",
    title: "Finished Form",
    className: "md:col-span-4",
  },
  {
    image: "/images/craftsmanship/gallery-5.jpg",
    title: "Crafted Collection",
    className: "md:col-span-8",
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[10px] font-medium uppercase  ${
        light ? "text-[#e4b888]" : "text-[#9d5428]"
      }`}
    >
      <span
        className={`h-px w-6 ${
          light ? "bg-[#e4b888]/70" : "bg-[#9d5428]/70"
        }`}
      />
      {children}
    </div>
  );
}

export default function CraftsmanshipPage() {
  return (
    <main className="overflow-hidden bg-[#FFF9E6] text-[#25150f]">
      {/* HERO SECTION */}
      <section className="  relative overflow-hidden bg-[#160b07d8] text-white ">
        <Image
          src="/images/craftsmanship/hero-artisan.webp"
          alt="Artisan crafting a Shudyam brass vessel"
          fill
          priority
          sizes="100vw"
          className="h-[72vh] opacity-45 object-cover"
        />

<div className="absolute top-0 left-0 w-screen h-full bg-black/80" />

        <div className="relative z-10 mx-auto flex  px-4 sm:px-6 md:px-12  lg:px-24  xl:px-40   flex-col  pb-10 pt-28 ">
          {/* <div className="flex items-center gap-2 text-xs font-light tracking-wide text-[#dbb28c]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <FiChevronRight className="text-[10px]" />
            <span className="text-white">Craftsmanship</span>
          </div> */}

          <div className="my-auto max-w-3xl py-16">
            <SectionLabel light>The art behind Shudyam</SectionLabel>

            <h1 className="mt-6 font-serif text-4xl font-normal leading-tight tracking-wide sm:text-5xl md:text-6xl ">
              Crafted by Hand.
              <span className="mt-2 block bg-gradient-to-r from-[#F8E7A1] via-[#E0A328] to-[#FFD56A] bg-clip-text italic text-transparent">
                Made with Soul.
              </span>
            </h1>

            {/* <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-stone-300 sm:text-base">
              Behind every Shudyam creation is a journey of metal, fire,
              patience and skilled hands—bringing traditional brass craft into
              contemporary homes.
            </p> */}

            {/* <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#our-process"
                className="group inline-flex items-center gap-3 rounded-full bg-[#b87333] px-6 py-3.5 text-[13px] font-medium text-white transition duration-300 hover:bg-[#d1894b]"
              >
                Explore Our Process
                <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[13px] font-medium text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
              >
                Discover the Collection
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div> */}
          </div>

          <div className=" hidden  md:grid gap-4 border-t border-white/15 pt-7 sm:grid-cols-3">
            {[
              ["Hand Finished", "Attention in every detail"],
              ["Naturally Unique", "No two pieces feel identical"],
              ["Quality Checked", "Reviewed before dispatch"],
            ].map(([title, text]) => (
              <div key={title} className="flex items-start gap-3">
                <FiCircle className="mt-1.5 text-[6px] text-[#d89658]" />
                <div>
                  <p className="font-serif text-base tracking-wide">{title}</p>
                  <p className="mt-1 text-xs font-light text-stone-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/45 xl:flex">
          Scroll to discover
          <span className="h-px w-12 bg-white/30" />
        </div>
      </section>

     
      <section className="relative px-5 py-20 sm:px-8 md:px-12 lg:px-24 xl:px-40 lg:py-28">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#b87333]/10 blur-[100px]" />

        <div className="relative mx-auto grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[480px] sm:min-h-[580px] ">
            <div className="absolute bottom-0 left-0 h-[82%] w-[94%] overflow-hidden rounded-3xl">
              <Image
                src="/images/craftsmanship/artisan-at-work.jpg"
                alt="Shudyam artisan working on a brass product"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="absolute right-0 top-0 h-[48%] w-[58%] overflow-hidden rounded-3xl border-[6px] border-[#FFF9E6] shadow-xl">
              <Image
                src="/images/craftsmanship/brass-detail.webp"
                alt="Close-up of handcrafted brass texture"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-6 right-0 max-w-[220px] rounded-2xl border border-[#b87333]/20 bg-[#fffaf4]/95 p-5 shadow-2xl backdrop-blur">
              <FiHeart className="text-xl text-[#a75a2c]" />
              <p className="mt-3 font-serif text-lg leading-snug text-[#2e180e]">
                Not merely made.
                <span className="block italic text-[#9d5428]">
                  Thoughtfully created.
                </span>
              </p>
            </div>
          </div>

          <div>
            <SectionLabel>Our philosophy</SectionLabel>

            <h2 className="mt-6 font-serif text-3xl font-normal leading-tight md:text-4xl ">
              Where traditional skill meets
              <span className="italic text-[#a75a2c]"> modern living.</span>
            </h2>

            <div className="my-3 space-y-5 text-sm font-light leading-relaxed text-stone-600 sm:text-base">
              <p>
                Craftsmanship is more than the final appearance of an object. It
                is found in the decisions made before the first cut, the control
                behind every strike and the patience required to refine a piece
                until it feels complete.
              </p>
              <p>
                At Shudyam, we value the natural character of brass. Its warm
                tone, subtle variations and evolving surface make every piece
                personal rather than perfectly identical.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-[#b87333]/60 pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-[#442417] sm:text-2xl">
                “A beautiful object carries the memory of the hands that shaped it.”
              </p>
            </blockquote>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "Considered proportions",
                "Individual character",
                "Refined by hand",
                "Designed for everyday rituals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#a55a2d]/15 bg-white/65 px-4 py-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b87333]/10 text-[#9d5428]">
                    <FiCheck className="text-xs" />
                  </span>
                  <span className="text-[13px] font-medium text-stone-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-[#23120c] px-5 py-20 text-white sm:px-8 md:px-12 lg:px-24 xl:px-40 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel light>What defines our work</SectionLabel>
              <h2 className="mt-6 font-serif text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">
                The Shudyam
                <span className="block italic text-[#d99759]">standard.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm font-light leading-relaxed text-stone-400 lg:justify-self-end">
              Our products are guided by four simple principles: respect for the
              material, respect for skill, attention to detail and a commitment
              to quality. 
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className={`group relative px-0 py-10 md:p-6 xl:min-h-[320px] ${
                    index !== values.length - 1
                      ? "border-b border-white/10 md:border-r xl:border-b-0"
                      : ""
                  } ${index === 1 ? "md:border-r-0 xl:border-r" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#b87333]/0 to-[#b87333]/5 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d6965b]/25 bg-[#d6965b]/10 text-xl text-[#dfa46e]">
                        <Icon />
                      </div>
                      <span className="font-serif text-2xl font-light text-white/20">
                        {value.number}
                      </span>
                    </div>

                    <h3 className="mt-14 font-serif text-xl tracking-wide text-stone-100">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[13px] font-light leading-relaxed text-stone-400">
                      {value.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/*  SECTION */}
      <section id="our-process" className="scroll-mt-20">
        <div className="mx-auto px-5 py-20 sm:px-8 md:px-12 lg:px-24 xl:px-40 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>From material to masterpiece</SectionLabel>

            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
              The journey behind
              <span className="italic text-[#a75a2c]"> every piece.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-stone-600 sm:text-base">
              Each stage adds purpose, character and refinement—from the first
              material inspection to the final quality check.
            </p>
          </div>

          <div className="mt-16 space-y-20 lg:space-y-28">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14"
              >
                <div
                  className={`relative ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-stone-200 sm:aspect-[5/4] lg:aspect-[4/5]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      {step.label}
                    </div>
                  </div>

                  <div
                    className={`absolute -bottom-6 ${
                      index % 2 === 1 ? "-left-3" : "-right-3"
                    } flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#f7f2eb] bg-[#b87333] font-serif text-2xl text-white shadow-lg sm:h-24 sm:w-24 sm:text-3xl`}
                  >
                    {step.number}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1 " : ""}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a75a2c]">
                    Step {step.number}
                  </p>

                  <h3 className="mt-4 font-serif text-2xl font-normal leading-tight sm:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>

                  <p className="mt-5 text-sm font-light leading-relaxed text-stone-600 sm:text-base">
                    {step.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 border-b border-[#a55a2d]/15 py-2.5"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b87333]/10 text-[#995026]">
                          <FiCheck className="text-[10px]" />
                        </span>
                        <span className="text-[13px] font-medium text-stone-600">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL SECTION */}
      <section className=" px-5 py-20 sm:px-8 md:px-12 lg:px-24 xl:px-40 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>A closer look</SectionLabel>
              <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl lg:text-5xl">
                Beauty lives in
                <span className="block italic text-[#a75a2c]">the details.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm font-light leading-relaxed text-stone-600 lg:justify-self-end sm:text-base">
              Look closely and you will find the visual language of
              craftsmanship—natural texture, carefully considered forms and a
              finish that changes beautifully with light.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {details.map((detail, index) => (
              <article
                key={detail.title}
                className={`group relative overflow-hidden rounded-3xl ${
                  index === 1 ? "lg:translate-y-10" : ""
                }`}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={detail.image}
                    alt={detail.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160a05]/90 via-[#160a05]/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#e1a66e]">
                    Detail 0{index + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl tracking-wide">{detail.title}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed text-stone-300">
                    {detail.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

     

      

   
  
     

 
    </main>
  );
}