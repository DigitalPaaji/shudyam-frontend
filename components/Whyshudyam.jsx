import Image from "next/image";
import React from "react";
import HeadLine from "./HeadLine";
import { LuHeater, LuMessagesSquare } from "react-icons/lu";
import { PiSunDimDuotone } from "react-icons/pi";
import { BiLogoReact } from "react-icons/bi";
import { GiAnvilImpact } from "react-icons/gi";

const Whyshudyam = () => {
  return (
    <section className="px-4 py-16 md:px-12 lg:px-24 xl:px-40">

      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

        {/* IMAGE */}
        <div className="relative">
          <Image
            src="/images/craft.webp"
            alt="Traditional Shudyam craftsmanship"
            width={500}
            height={500}
            className="h-auto w-full rounded-md object-contain md:h-[30rem] md:object-cover"
          />

          {/* Since 1942 badge */}
          <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm">
            <GiAnvilImpact className="text-xl text-p" />

            <div>
              <p className="font-p text-lg font-medium text-p">
                Since 1942
              </p>

              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                Four generations
              </p>
            </div>
          </div>
        </div>


        {/* CONTENT */}
        <div className="flex flex-col justify-center gap-4">

          {/* Heading */}
          <div className="flex items-center gap-2 text-3xl text-p font-p">
            Why

            <Image
              src="/logo.webp"
              alt="Shudyam"
              width={100}
              height={100}
              className="w-24"
            />
          </div>


          {/* Main heading */}
          <p className="font-p text-xl leading-tight text-p md:text-3xl lg:text-4xl">
            Crafted for Better Cooking,
            <br className="hidden md:block" />
            Designed for Generations
          </p>


          {/* Main description */}
          <p className="text-justify font-p text-sm leading-relaxed text-p">
            Shudyam combines generations of traditional Indian metal
            craftsmanship with thoughtful designs for modern homes. Our
            journey began in 1942 and has been carried forward through four
            generations, preserving the values of craftsmanship, authenticity,
            quality, and tradition.
          </p>

          {/* <p className="text-justify font-p text-sm leading-relaxed text-p">
            From the utensils used in generations of Indian homes to the
            products we create today, every piece reflects our respect for
            traditional brass and copper craftsmanship while bringing that
            timeless character into contemporary living.
          </p> */}


          {/* Small heritage highlight */}
          <div className="my-2 grid grid-cols-2 gap-4 border-y border-gray-200 py-5">

            <div>
              <p className="font-p text-2xl text-p">
                1942
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                Our Beginning
              </p>
            </div>

            <div>
              <p className="font-p text-2xl text-p">
                4
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                Generations
              </p>
            </div>

          </div>


          {/* Features */}
          <div className="mt-1 space-y-3">

            {[
              {
                icon: LuMessagesSquare,
                text: "Rooted in traditional Indian craftsmanship.",
              },
              {
                icon: LuHeater,
                text: "Designed with everyday functionality in mind.",
              },
              {
                icon: PiSunDimDuotone,
                text: "Inspired by brass and copper traditions passed down through generations.",
              },
              {
                icon: BiLogoReact,
                text: "Made to carry heritage into modern homes.",
              },
            ].map((item, ind) => {
              const Icon = item.icon;

              return (
                <div
                  key={ind}
                  className="flex items-center gap-3 text-sm text-p"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4ece3]">
                    <Icon className="text-base" />
                  </span>

                  <p className="font-p">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </div>

    </section>
  );
};

export default Whyshudyam;