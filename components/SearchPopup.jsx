"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoArrowForwardOutline,
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { base_url, img_url } from "./utile";



const SearchPopup = ({ setOpenSearch }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleClose = () => {
    setOpenSearch(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (value.length < 3) return;
  };

  const handleClear = () => {
    setSearch("");
    setSearchResults([]);
    setHasSearched(false);
  };

  useEffect(() => {
    const value = search.trim();

    if (value.length < 3) {
      setSearchResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setHasSearched(false);

        const response = await axios.get(
          `${base_url}/cache/product/search/${encodeURIComponent(value)}`,
          {
            signal: controller.signal,
          }
        );

        if (response.data?.success) {
          setSearchResults(response.data.products || []);
        } else {
          setSearchResults([]);
        }

        setHasSearched(true);
      } catch (error) {
        if (
          error.code !== "ERR_CANCELED" &&
          error.name !== "CanceledError"
        ) {
          console.error("Search error:", error);
          setSearchResults([]);
          setHasSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center px-3 pt-4 sm:px-6 sm:pt-10">
      {/* Background overlay */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        aria-label="Close search"
      />

      {/* Search popup */}
      <div className="relative w-full md:max-w-4/5 overflow-hidden rounded-2xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Search products
            </h2>

            <p className="mt-0.5 text-sm text-neutral-500">
              Search by product name or category
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition hover:bg-neutral-950 hover:text-white"
            aria-label="Close search"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        {/* Search input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-4 sm:p-6"
        >
          <div className="flex h-14 flex-1 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 transition focus-within:border-neutral-900 focus-within:bg-white focus-within:ring-4 focus-within:ring-neutral-900/5">
            <IoSearchOutline className="shrink-0 text-xl text-neutral-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search copper bottle, saucepan..."
              autoFocus
              className="h-full w-full bg-transparent text-sm text-neutral-950 outline-none placeholder:text-neutral-400 sm:text-base"
            />

            {loading && (
              <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            )}

            {search && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-950"
                aria-label="Clear search"
              >
                <IoCloseOutline className="text-xl" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={search.trim().length < 3}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-6"
          >
            <span className="hidden sm:inline">Search</span>
            <IoArrowForwardOutline className="text-xl sm:ml-2" />
          </button>
        </form>

       
        {/* Search results */}
        {search.trim().length >= 3 && (
          <div className="border-t border-neutral-100">
            <div className="flex items-center justify-between px-5 py-4 sm:px-6">
              <p className="text-sm font-medium text-neutral-900">
                Search results
              </p>

              {!loading && searchResults.length > 0 && (
                <p className="text-xs text-neutral-400">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "product" : "products"} found
                </p>
              )}
            </div>

            {loading && (
              <div className="space-y-3 px-5 pb-6 sm:px-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex animate-pulse items-center gap-4 rounded-xl bg-neutral-50 p-3"
                  >
                    <div className="h-16 w-16 rounded-lg bg-neutral-200" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 rounded bg-neutral-200" />
                      <div className="h-3 w-1/3 rounded bg-neutral-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && searchResults.length > 0 && (
              <div className="max-h-[430px] overflow-y-auto px-3 pb-4 sm:px-5">
                {searchResults.map((item) => (
                  <Link
                    key={item._id}
                    href={`/product/${item.slug}`}
                    onClick={handleClose}
                    className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-neutral-50"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
                      <img
                        src={`${img_url}${item.thumbnail}`}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-neutral-900 sm:text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-neutral-400">
                        View product
                      </p>
                    </div>

                    <IoArrowForwardOutline className="shrink-0 text-xl text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-900" />
                  </Link>
                ))}
              </div>
            )}

            {!loading &&
              hasSearched &&
              searchResults.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                    <IoSearchOutline className="text-2xl text-neutral-400" />
                  </div>

                  <h3 className="mt-4 font-medium text-neutral-900">
                    No products found
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Try searching with another product name.
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;