"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { base_url } from "./utile";

// Icons
import { FiRefreshCw, FiUser } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReviewSection = ({ productid }) => {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!productid) {
      setFetchLoading(false);
      return;
    }

    try {
      setFetchLoading(true);
      setError("");

      const response = await axios.get(`${base_url}/cache/review/${productid}`);
      setReviews(response.data?.reviews || []);
    } catch (error) {
      console.error("Fetch reviews error:", error);
      setError(error?.response?.data?.message || "Unable to load reviews.");
    } finally {
      setFetchLoading(false);
    }
  }, [productid]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

 
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (fetchLoading) {
    return (
      <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-10 lg:px-16">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-200"></div>
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-neutral-200"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="h-64 animate-pulse rounded-2xl bg-neutral-200" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={fetchReviews}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          <FiRefreshCw /> Try again
        </button>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <FaQuoteLeft size={24} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-neutral-900">No reviews yet</h3>
        <p className="mt-2 text-sm text-neutral-500">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1500px] px-4 md:px-10 lg:px-16">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Customer Reviews
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            See what our customers are saying about this product.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative pb-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={reviews.length > 3} // Only loop if there are enough reviews
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full !pb-14"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="h-auto">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm transition hover:shadow-md">
                  
                  {/* Top: Quote Icon & Stars */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <FaQuoteLeft className="text-3xl text-neutral-200" />
                      <div className="flex gap-1 text-yellow-400">
                        {/* Assuming 5 stars for design, since it's not in the data schema */}
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={14} />
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm leading-relaxed text-neutral-700 italic line-clamp-4">
                      "{review.des}"
                    </p>
                  </div>

                  {/* Bottom: User Info */}
                  <div className="mt-6 flex items-center gap-4 border-t border-neutral-100 pt-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#52070a] text-white font-semibold uppercase">
                      {review.name?.charAt(0) || <FiUser />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-neutral-900 capitalize">
                        {review.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="capitalize">{review.work}</span>
                        <span className="h-1 w-1 rounded-full bg-neutral-300"></span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;