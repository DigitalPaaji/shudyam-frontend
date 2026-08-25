"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UnderlineText from "./UnderlineText";
import { GoHeart, GoPlus } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import axios from "axios";
import { base_url, img_url } from "./utile";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { toggleWishlist } from "./store/wishlistslice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProductCard = ({ product ,wishlist,dispatch}) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]
  );

  const handleVariantChange = (event) => {
    const selectedSize =event.target.value;

    const variant = product.variants.find(
      (item) => item._id === selectedSize
    );

    if (variant) {
      setSelectedVariant(variant);
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="best-seller-card group h-full will-change-transform">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden border border-[#760209]/30 bg-[#fff9e7]">
     

                      <button
          type="button"
          // aria-label={`Add ${product.name} to wishlist`}
           onClick={(e)=>{ e.preventDefault(), dispatch(toggleWishlist(product._id))}}

className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full 
  
   ${wishlist.includes(product._id)
                            ? "border-[#52070a] bg-[#52070a] text-white"
                    : "border-neutral-300 bg-white/40 hover:border-[#52070a] hover:text-[#52070a]"
                       }`}
        >
          <GoHeart className="text-lg" />
        </button>
    
     
        <img
          src={`${img_url}${product.thumbnail}`}
          alt={product.name}
          className="object-contain  object-center  aspect-square w-full h-auto  "
        />

     
      </div>

      {/* Product details */}
      <div className="mt-2  rounded-md border border-[#760209] bg-[#fff9e7] p-2.5 text-[#760209] sm:p-3">
        <div className="">

 <h3 className=" text-wrap text-xs font-medium sm:text-sm">
             {product.name?.toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h3>
<div className="flex items-center justify-between gap-2">
          <div className="min-w-0 xl:max-w-[48%]">
           

            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs">
              <span className="font-semibold">
                Rs. {selectedVariant.mrp}
              </span>

              {/* <span className="text-[#760209]/50 line-through">
                Rs. {selectedVariant.basePrice}
              </span> */}
              {selectedVariant?.basePrice > 0 && (
  <span className="text-[#760209]/50 line-through">
    Rs. {selectedVariant.basePrice}
  </span>
)}
            </div>
          </div>

          <div className="flex shrink-0 items-stretch gap-1.5">
      
      {product.variants[0]?.attributes?.value ?       <select
              value={selectedVariant.size}
              onChange={handleVariantChange}
              onClick={(e)=>e.preventDefault()}
              aria-label={`Select size for ${product.title}`}
              className="min-w-0 rounded-md border border-[#760209]/30 bg-[#fff9e7] px-2 py-2 text-[11px] text-[#760209] outline-none transition focus:border-[#760209]"
            >
              {product.variants.map((variant) => (
                <option key={variant._id} value={variant._id}>
                  {variant.attributes.value} 
                </option>
              ))}
            </select> :
          <div className="cursor-pointer rounded-md border border-[#eee4ce] bg-[#f5edda] px-1.5 py-1 text-xs text-[#790007] outline-none transition hover:border-[#790007]/30 focus:border-[#790007]">

Standard
            </div>
} 
            <button
              type="button"
              className="flex cursor-pointer shrink-0 items-center justify-center gap-1 rounded-md bg-[#760209] px-2.5 py-2 text-[10px] font-medium text-white transition duration-300 hover:bg-[#150102] sm:px-3 sm:text-xs"
            >
              <GoPlus className="text-base" />

              <span className="hidden xl:inline">Add To Cart</span>
              <span className="xl:hidden">Add</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
 
const BestSeller = () => {
  const sectionRef = useRef(null);
  const leftHeadingRef = useRef(null);
  const rightHeadingRef = useRef(null);
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useGSAP(
    () => {
      const productCards = gsap.utils.toArray(".best-seller-card");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .from(leftHeadingRef.current, {
          x: -80,
          y: 25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .from(
          rightHeadingRef.current,
          {
            x: 80,
            y: 25,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "<"
        )
        .from(
          sliderRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          productCards,
          {
            y: 90,
            opacity: 0,
            scale: 0.9,
            rotate: 2,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.4"
        );
    },
    {
      scope: sectionRef,
    }
  );

  const fetchBestseller = async () => {
    try {
      const response = await axios.get(`${base_url}/cache/product/bestseller`);
      const data = await response.data;

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBestseller();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#fff9e7] px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 xl:px-40"
    >
      {/* Heading */}
      <div className="mb-8 flex flex-col text-center md:text-left gap-4 md:gap-6 md:flex-row md:items-end md:justify-between">
        <div ref={leftHeadingRef}>
          <UnderlineText text="Bestsellers" />

          <h2 className="mt-4 max-w-xl font-p text-3xl leading-[0.95] text-[#760209] sm:text-4xl lg:text-5xl">
            Get Your Kitchen
            <span className="md:block"> Essentials</span>
          </h2>
        </div>

        <div ref={rightHeadingRef} className="w-full md:w-auto">
          <p className="md:max-w-[230px] text-sm leading-relaxed text-[#760209] md:text-right md:text-base">
            Indian households have used brass vessels for centuries.
          </p>

          <Link
            href="/products"
            className="mt-4 inline-flex min-w-32 justify-center rounded-full bg-[#760209] px-6 py-2.5 text-xs font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-[#150102] md:float-right"
          >
            Shop All
          </Link>
        </div>
      </div>

      {/* Products slider */}
      <div ref={sliderRef} className="relative group">
        
        {/* Custom Navigation Buttons */}
        <button className="best-seller-prev absolute p-2 left-0 top-[40%] z-10 -translate-x-1/3 -translate-y-1/2 flex  items-center justify-center rounded-full bg-white/60 text-[#760209] shadow-lg transition-all hover:bg-[#760209] hover:text-white xl:-translate-x-full">
        
          <IoIosArrowBack className="text-xl" /> 
        </button>

        <button className="best-seller-next p-2  absolute right-0 top-[40%] z-10 translate-x-1/3 -translate-y-1/2 flex  items-center justify-center rounded-full bg-white/60 text-[#760209] shadow-lg transition-all hover:bg-[#760209] hover:text-white xl:translate-x-full">
        
          <IoIosArrowForward  className="text-xl"  />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          // Map Swiper navigation to custom classes
          navigation={{
            nextEl: ".best-seller-next",
            prevEl: ".best-seller-prev",
          }}
          spaceBetween={30}
          slidesPerView={1.08}
          speed={700}
          grabCursor
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.3,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          className="best-seller-swiper !pb-12"
        >
          {products.length > 0 &&
            products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} wishlist={wishlist} dispatch={dispatch} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .best-seller-swiper .swiper-slide {
          height: auto;
        }

        /* Pagination Styling */
        .best-seller-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: rgba(118, 2, 9, 0.35);
          opacity: 1;
          transition:
            width 0.3s ease,
            border-radius 0.3s ease,
            background 0.3s ease;
        }

        .best-seller-swiper .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 999px;
          background: #760209;
        }

        /* Swiper sets these disabled classes automatically */
        .best-seller-prev.swiper-button-disabled,
        .best-seller-next.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default BestSeller;