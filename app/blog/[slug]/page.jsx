"use client";

import { base_url, img_url } from "@/components/utile";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IoArrowBack } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (image) => {
   
    return `${img_url}${image}`;
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${base_url}/cache/blog/${slug}`);
      const data = response.data;

      setBlog(data.blog || data);
    } catch (error) {
      setError("Blog not found or something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#210102]">
      <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

      <main className="mx-auto  px-4 md:px-12 lg:px-24 xl:px-40 py-10">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#62080d]/20 bg-white px-4 py-2 text-sm font-medium text-[#62080d] shadow-sm transition hover:bg-[#62080d] hover:text-white"
        >
          <IoArrowBack size={16} />
          Back
        </button>

        {loading && (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />

            <div className="mt-5 h-72 animate-pulse rounded-2xl bg-gray-200" />

            <div className="mt-5 space-y-3">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#62080d]">
              {error}
            </h2>
          </div>
        )}

        {!loading && blog && (
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#62080d]/10">
            {blog.thumbnail && (
              <div className="relative h-[260px] w-full overflow-hidden sm:h-[420px]">
                <img
                  src={getImageUrl(blog.thumbnail)}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-5xl">
                    {blog.title}
                  </h1>
                </div>
              </div>
            )}

            <div className="p-5 sm:p-8">
              {!blog.thumbnail && (
                <h1 className="mb-4 text-3xl font-bold text-[#210102] sm:text-5xl">
                  {blog.title}
                </h1>
              )}

              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-[#62080d]/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-2">
                  <BsClock size={16} />
                  {blog.readingtime || 1} min read
                </span>

                {blog.createdAt && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#fff1e8] px-4 py-2">
                    <SlCalender size={16} />
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {blog.des && (
                <p className="mb-8 text-lg leading-8 text-[#4b1b1d]">
                  {blog.des}
                </p>
              )}

              <div className="space-y-8">
                {Array.isArray(blog.fulldes) &&
                  blog.fulldes.map((item, index) => (
                    <section
                      key={index}
                      className="rounded-3xl border border-[#62080d]/10 bg-[#fffaf6] p-5 sm:p-6"
                    >
                      {item.title && (
                        <h2 className="mb-3 text-2xl font-semibold text-[#62080d]">
                          {item.title}
                        </h2>
                      )}

                      {item.des && (
                        <p className="whitespace-pre-line text-base leading-8 text-[#3f1719]">
                          {item.des}
                        </p>
                      )}
                    </section>
                  ))}
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default Page;