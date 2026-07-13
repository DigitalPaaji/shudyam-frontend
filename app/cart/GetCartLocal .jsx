"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  FiAlertCircle,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


import { base_url, img_url } from "@/components/utile";
import { decreaseQuantity ,removeFromCart,increaseQuantity} from "@/components/store/AddtoCartLocal";

gsap.registerPlugin(useGSAP);

const initialCartData = {
  cart: [],
  unavailableItems: [],
  totalItems: 0,
  subtotal: 0,
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const getImageUrl = (image) => {
  if (!image) return "/placeholder.webp";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${img_url}${image}`;
};

const GetCartLocal = () => {
  const pageRef = useRef(null);
  const dispatch = useDispatch();

  const { cart: localCart } = useSelector(
    (state) => state.LocalCart
  );
const cartParam = encodeURIComponent(JSON.stringify(localCart));
  const [cartData, setCartData] = useState(initialCartData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCartLocal = async (signal) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        `${base_url}/cart/getlocal`,
        {
          cart: localCart.map((item) => ({
            productid: item.productid,
            variantid: item.variantid,
            quantity: item.quantity,
          })),
        },
        {
          signal,
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Unable to load cart"
        );
      }

      setCartData(response.data);
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.code === "ERR_CANCELED"
      ) {
        return;
      }

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while loading your cart"
      );
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!localCart || localCart.length === 0) {
      setCartData(initialCartData);
      setIsLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    fetchCartLocal(controller.signal);

    return () => {
      controller.abort();
    };
  }, [localCart]);

  useGSAP(
    () => {
      if (!cartData.cart.length || isLoading) return;

      gsap.from(".cart-heading", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".cart-item", {
        y: 35,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".cart-summary", {
        x: 45,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
      });
    },
    {
      scope: pageRef,
      dependencies: [cartData.cart.length, isLoading],
      revertOnUpdate: true,
    }
  );

  const handleIncrease = (item) => {
    if (item.quantity >= item.variant.stock) return;

    dispatch(
      increaseQuantity({
        productid: item.productid,
        variantid: item.variantid,
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      decreaseQuantity({
        productid: item.productid,
        variantid: item.variantid,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(
      removeFromCart({
        productid: item.productid,
        variantid: item.variantid,
      })
    );
  };

  if (isLoading) {
    return <CartLoading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-500" />

          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load cart
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cartData.cart.length) {
    return <EmptyCart />;
  }

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-[#f8f7f4] px-4 py-10 sm:px-6 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="cart-heading mb-8 flex flex-col justify-between gap-3 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b5e3c]">
              Your selection
            </p>

            <h1 className="text-3xl font-semibold text-gray-950 sm:text-4xl">
              Shopping Cart
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            {cartData.totalItems}{" "}
            {cartData.totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        {cartData.unavailableItems?.length > 0 && (
          <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />

            <p>
              {cartData.unavailableItems.length} cart item
              {cartData.unavailableItems.length > 1 ? "s are" : " is"}{" "}
              currently unavailable.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            {cartData.cart.map((item) => (
              <article
                key={`${item.productid}-${item.variantid}`}
                className="cart-item group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f3f0eb] sm:h-36 sm:w-32"
                  >
                    <img
                      src={getImageUrl(item.thumbnail)}
                      alt={item.name}
                      className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          className="line-clamp-2 text-base font-semibold text-gray-950 transition hover:text-[#8b5e3c] sm:text-lg"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                          {item.variant?.attributes?.itemtype && (
                            <span>
                              {item.variant.attributes.itemtype}
                            </span>
                          )}

                          {item.variant?.attributes?.value && (
                            <span className="rounded-full bg-[#f3f0eb] px-3 py-1 font-medium text-gray-700">
                              {item.variant.attributes.value}
                            </span>
                          )}

                          {item.variant?.sku && (
                            <span>
                              SKU: {item.variant.sku}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-500">
                          Quantity
                        </p>

                        <div className="mt-1 flex h-10 items-center overflow-hidden rounded-full border border-gray-200 bg-white">
                          <button
                            type="button"
                            onClick={() => handleDecrease(item)}
                            className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus />
                          </button>

                          <span className="min-w-10 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleIncrease(item)}
                            disabled={
                              item.quantity >= item.variant.stock
                            }
                            className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <FiPlus />
                          </button>
                        </div>

                        {item.quantity >= item.variant.stock && (
                          <p className="mt-1 text-xs text-amber-600">
                            Maximum stock selected
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.price)} each
                        </p>

                        <p className="mt-1 text-lg font-semibold text-gray-950">
                          {formatPrice(item.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f0eb] text-[#8b5e3c]">
                <FiShoppingBag className="text-xl" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-950">
                  Order Summary
                </h2>

                <p className="text-xs text-gray-500">
                  Prices verified from server
                </p>
              </div>
            </div>

            <div className="space-y-4 py-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cartData.totalItems} items)
                </span>

                <span className="font-medium text-gray-950">
                  {formatPrice(cartData.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span className="font-medium text-green-600">
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-gray-200 pt-5">
              <div>
                <p className="text-sm text-gray-500">
                  Estimated total
                </p>

                <p className="text-xs text-gray-400">
                  Inclusive of applicable taxes
                </p>
              </div>

              <p className="text-2xl font-semibold text-gray-950">
                {formatPrice(cartData.subtotal)}
              </p>
            </div>

            <Link
              href={`/checkout?cart=${cartParam}&&type=cart`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#8b5e3c]"
            >
              Proceed to Checkout
              <FiArrowRight className="text-lg" />
            </Link>

            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center rounded-full border border-gray-300 px-6 py-3.5 text-sm font-medium text-gray-800 transition hover:border-gray-950 hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

const EmptyCart = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#f8f7f4] px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <FiShoppingBag className="text-3xl text-[#8b5e3c]" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-950">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Add some beautiful copper products to your cart and
          they will appear here.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b5e3c]"
        >
          Start Shopping
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

const CartLoading = () => {
  return (
    <div className="min-h-screen bg-[#f8f7f4] px-4 py-12 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-10 w-56 rounded-lg bg-gray-200" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="h-32 w-28 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-4">
                  <div className="h-5 w-2/3 rounded bg-gray-200" />
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="mt-8 h-10 w-28 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-96 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="mt-8 h-4 w-full rounded bg-gray-200" />
            <div className="mt-4 h-4 w-full rounded bg-gray-200" />
            <div className="mt-8 h-14 w-full rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCartLocal;