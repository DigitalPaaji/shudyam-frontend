"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "./utile";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryId) {
      setFetchLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setFetchLoading(true);
        setError("");

        const response = await axios.get(
          `${base_url}/cache/product/category/${categoryId}`,
          {
            signal: controller.signal,
          }
        );

        const fetchedProducts = Array.isArray(response.data?.products)
          ? response.data.products
          : [];

        const relatedProducts = currentProductId
          ? fetchedProducts.filter(
              (product) => product._id !== currentProductId
            )
          : fetchedProducts;

        setProducts(relatedProducts);
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        console.error("Related products error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load related products."
        );
      } finally {
        if (!controller.signal.aborted) {
          setFetchLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [categoryId, currentProductId]);

  if (fetchLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-[1500px] px-4 md:px-10 lg:px-16">
          <div className="mb-8 h-9 w-56 animate-pulse rounded bg-neutral-200" />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-neutral-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="overflow-hidden  py-16 md:py-24">
      <div className="mx-auto  px-4 md:px-10 lg:px-16">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#52070a]">
              You may also like
            </p>

            <h2 className="font-serif text-3xl font-semibold text-neutral-950  md:text-4xl">
              Related Products
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous product"
              className="related-prev flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition hover:border-[#52070a] hover:bg-[#52070a] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronLeft size={21} />
            </button>

            <button
              type="button"
              aria-label="Next product"
              className="related-next flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition hover:border-[#52070a] hover:bg-[#52070a] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiChevronRight size={21} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={14}
          slidesPerView={1.35}
          navigation={{
            previousEl: ".related-prev",
            nextEl: ".related-next",
          }}
          autoplay={
            products.length > 1
              ? {
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          loop={products.length > 4}
          breakpoints={{
            480: {
              slidesPerView: 1.7,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.7,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="!overflow-visible"
        >
          {products.slice(0, 10).map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RelatedProducts;