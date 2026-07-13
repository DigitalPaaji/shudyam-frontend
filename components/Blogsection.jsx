"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowUpRight, FiClock } from "react-icons/fi";

import HeadLine from "./HeadLine";
import { base_url, img_url } from "./utile";
import Link from "next/link";

const Blogsection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);



  const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${base_url}/cache/blogs/random`
      );

      const data = response.data;

      if (data?.success) {
        setBlogs(data.blogs || []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden px-4 py-24 md:px-12 lg:px-24 xl:px-40">
      <div className="text-center">
        <HeadLine text="Recipes, Events & More" />

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#310104]/60">
          Explore our latest stories, kitchen inspiration and useful
          guides.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <div className="aspect-[4/3] animate-pulse bg-gray-200" />

              <div className="space-y-3 p-5">
                <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <Link
            href={`/blog/${item.slug}`}
              key={item._id}
              className="group overflow-hidden rounded-2xl border border-[#760209]/10 bg-white text-left shadow-[0_15px_45px_rgba(49,1,4,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(49,1,4,0.12)]"
            >
              {/* Blog image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f0e4dc]">
                <img
                  src={`${img_url}${item.thumbnail}`}
                  alt={item.title || "Blog thumbnail"}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#760209] shadow-sm backdrop-blur-md">
                  <FiClock />
                  <span>{item.readingtime} min read</span>
                </div>
              </div>

              {/* Blog content */}
              <div className="px-5 py-2">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#760209]/55">
                  {formatDate(item.createdAt)}
                </p>

                <h3 className="my-2 line-clamp-2 font-p text-xl font-medium leading-7 text-[#310104] transition group-hover:text-[#760209]">
                  {item.title}
                </h3>

                {/* <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#310104]/60">
                  {item.des}
                </p> */}

                <button
                  type="button"
                  className="mt- inline-flex items-center gap-2 text-sm font-medium text-[#760209]"
                >
                  Read article

                  <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogsection;