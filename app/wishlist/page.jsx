"use client";

import { removeWishlist } from "@/components/store/wishlistslice";
import { base_url, img_url } from "@/components/utile";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { removeWishlist } from "@/components/store/wishlistSlice";

const Page = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      if (!wishlist || wishlist.length === 0) {
        setProducts([]);
        return;
      }

      const response = await axios.patch(
        `${base_url}/products/wishlist`,
        { wishlist },
        { withCredentials: true }
      );

      const data = response.data;

      if (data.success) {
        setProducts(Array.isArray(data.product) ? data.product : []);
      } else {
        setProducts([]);
        setError(data.message || "Failed to fetch wishlist");
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [wishlist]);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.webp";
    if (image.startsWith("http")) return image;
    return `${img_url}${image}`;
  };

  const handleRemoveWishlist = (productId) => {
    dispatch(removeWishlist(productId));
  };

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b1710]">
      <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b5e3c]">
              Your favourites
            </p>

            <h1 className="text-3xl font-semibold text-[#2b1710]">
              Wishlist
            </h1>

            <p className="mt-2 text-sm text-[#7a6a5d]">
              Products you saved for later
            </p>
          </div>

          <p className="text-sm text-[#7a6a5d]">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {loading ? (
          <WishlistLoading />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
            {error}
          </div>
        ) : products.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-[#e4d6c8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="block bg-[#f3eee7] p-4"
                >
                  <img
                    src={getImageUrl(product.thumbnail)}
                    alt={product.name}
                    className="h-56 w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#8b5e3c]">
                      {product.category?.name || "Product"}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemoveWishlist(product._id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h2 className="line-clamp-2 text-base font-semibold text-[#2b1710] transition hover:text-[#8b5e3c]">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.shortDescription}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={`/product/${product.slug}`}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2b1710] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5b1f12]"
                    >
                      <FiShoppingBag />
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const EmptyWishlist = () => {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <FiHeart className="text-3xl text-[#8b5e3c]" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-[#2b1710]">
          Your wishlist is empty
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Save your favourite copper products and view them here later.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-flex rounded-full bg-[#2b1710] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#5b1f12]"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};

const WishlistLoading = () => {
  return (
    <div className="grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-[#e4d6c8] bg-white p-4"
        >
          <div className="h-56 rounded-xl bg-gray-200" />
          <div className="mt-4 h-4 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-5 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-5 h-12 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default Page;