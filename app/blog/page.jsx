"use client";

import {base_url, img_url} from "@/components/utile";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiClock, FiCalendar } from "react-icons/fi";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.jpg";
    if (image.startsWith("http")) return image;
    return `${img_url}${image}`;
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${base_url}/cache/blogs`);
      const data = response.data;

      if (data.success) {
        setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
      } else {
        setBlogs([]);
        setError(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      setBlogs([]);
      setError("Something went wrong while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#310104]">
      <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

      <section className="mx-auto  px-4 md:px-12 lg:px-24 xl:px-40 py-24">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm  uppercase tracking-[0.25em] text-[#760209]/70">
            Our Blogs
          </p>

          <h1 className="font-p text-4xl  text-[#310104] sm:text-5xl">
            Latest Articles
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#310104]/65 sm:text-base">
            Read our latest stories, tips, guides and updates.
          </p>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#760209]/10 bg-white shadow-[0_15px_45px_rgba(49,1,4,0.06)]"
              >
                <div className="aspect-[4/3] animate-pulse bg-[#eadbd1]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-32 animate-pulse rounded bg-[#eadbd1]" />
                  <div className="h-5 w-full animate-pulse rounded bg-[#eadbd1]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#eadbd1]" />
                  <div className="h-4 w-24 animate-pulse rounded bg-[#eadbd1]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-red-600">{error}</h2>
          </div>
        )}
        
    {!loading && !error && blogs.length === 0 && (
          <div className="rounded-3xl border border-[#760209]/10 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-[#760209]">
              No blogs found
            </h2>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((item) => (
              <Link
                href={`/blog/${item.slug}`}
                key={item._id}
                className="group overflow-hidden rounded-2xl border border-[#760209]/10 bg-white text-left shadow-[0_15px_45px_rgba(49,1,4,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(49,1,4,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0e4dc]">
                  <img
                    src={getImageUrl(item.thumbnail)}
                    alt={item.title || "Blog thumbnail"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#760209] shadow-sm backdrop-blur-md">
                    <FiClock />
                    <span>{item.readingtime || 1} min read</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#760209]/55">
                    <FiCalendar />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>

                  <h3 className="line-clamp-2 font-p text-xl font-medium leading-7 text-[#310104] transition group-hover:text-[#760209]">
                    {item.title}
                  </h3>

                  {item.des && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#310104]/65">
                      {item.des}
                    </p>
                  )}

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#760209]">
                    Read article
                    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;