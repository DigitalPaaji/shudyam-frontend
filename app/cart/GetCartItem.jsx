"use client";

import { base_url, img_url } from "@/components/utile";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { removeinCart } from "@/components/store/userSlice";

axios.defaults.withCredentials = true;
gsap.registerPlugin(useGSAP);

const initialCartData = {
  cartItems: [],
  count: 0,
  grandTotal: 0,
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
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${img_url}${image}`;
};

const GetCartItem = () => {
  const pageRef = useRef(null);
  const dispatch = useDispatch();

  const [cartData, setCartData] = useState(initialCartData);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  const checkoutCart = useMemo(() => {
    return cartData.cartItems.map((item) => {
      const variantId = item.productvarient || item.variantid || item.variantId;

      return {
        productid: item.product?._id,
        variantid: variantId,
        quantity: item.quantity,
        price: item.price || item.total,
      };
    });
  }, [cartData.cartItems]);

  const cartParam = useMemo(() => {
    return encodeURIComponent(JSON.stringify(checkoutCart));
  }, [checkoutCart]);

  const fetchCart = async ({ signal, showLoader = true } = {}) => {
    try {
      if (showLoader) setIsLoading(true);

      setError("");

      const response = await axios.get(`${base_url}/cart/get`, {
        withCredentials: true,
        signal,
      });

      const data = response.data;

      setCartData({
        cartItems: Array.isArray(data.cartItems) ? data.cartItems : [],
        count: data.count || 0,
        grandTotal: data.grandTotal || 0,
      });
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        return;
      }

      console.error("Cart fetch error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while loading your cart"
      );
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchCart({
      signal: controller.signal,
      showLoader: true,
    });

    return () => controller.abort();
  }, []);

  useGSAP(
    () => {
      if (!cartData.cartItems.length || isLoading) return;

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
      dependencies: [cartData.cartItems.length, isLoading],
      revertOnUpdate: true,
    }
  );

  const getSelectedVariant = (item) => {
    const variantId = item.productvarient || item.variantid || item.variantId;

    return item.product?.variants?.find(
      (variant) => String(variant._id) === String(variantId)
    );
  };

  const handleIncrease = async (item) => {
    const variant = getSelectedVariant(item);

    if (variant && item.quantity >= variant.stock) {
      alert("Maximum stock selected");
      return;
    }

    try {
      setActionLoadingId(item._id);

      await axios.get(`${base_url}/cart/increment/${item._id}`, {
        withCredentials: true,
      });

      await fetchCart({ showLoader: false });
    } catch (error) {
      console.error("Increase quantity error:", error);
      alert(error.response?.data?.message || "Failed to increase quantity");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) {
      handleRemove(item);
      return;
    }

    try {
      setActionLoadingId(item._id);

      const response = await axios.get(`${base_url}/cart/decrement/${item._id}`, {
        withCredentials: true,
      });

      const data = response.data;

      if (data?.delete) {
        dispatch(removeinCart());
      }

      await fetchCart({ showLoader: false });
    } catch (error) {
      console.error("Decrease quantity error:", error);
      alert(error.response?.data?.message || "Failed to decrease quantity");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleRemove = async (item) => {
    try {
      setActionLoadingId(item._id);

      await axios.delete(`${base_url}/cart/delete/${item._id}`, {
        withCredentials: true,
      });

      dispatch(removeinCart());

      await fetchCart({ showLoader: false });
    } catch (error) {
      console.error("Remove cart error:", error);
      alert(error.response?.data?.message || "Failed to remove item");
    } finally {
      setActionLoadingId("");
    }
  };

  if (isLoading) {
    return <CartLoading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f7f4] px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-500" />

          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load cart
          </h2>

          <p className="mt-2 text-sm text-gray-600">{error}</p>

          <button
            type="button"
            onClick={() => fetchCart({ showLoader: true })}
            className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cartData.cartItems.length) {
    return <EmptyCart />;
  }

  const totalItems = cartData.cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <main
      // ref={pageRef}
      className=" bg-[#f8f7f4] px-4 py-10 sm:px-6 lg:px-12 lg:py-16"
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
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            {cartData.cartItems.map((item) => {
              const product = item.product;
              const variant = getSelectedVariant(item);
              const isActionLoading = actionLoadingId === item._id;

              return (
                <article
                  key={item._id}
                  className="cart-item group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={`/product/${product?.slug}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f3f0eb] sm:h-36 sm:w-32"
                    >
                      <img
                        src={getImageUrl(product?.thumbnail)}
                        alt={product?.name || "Product image"}
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${product?.slug}`}
                            className="line-clamp-2 text-base font-semibold text-gray-950 transition hover:text-[#8b5e3c] sm:text-lg"
                          >
                            {product?.name}
                          </Link>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
                            {product?.shortDescription}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                            {variant?.attributes?.itemtype && (
                              <span>{variant.attributes.itemtype}</span>
                            )}

                            {variant?.attributes?.value && (
                              <span className="rounded-full bg-[#f3f0eb] px-3 py-1 font-medium text-gray-700">
                                {variant.attributes.value}
                              </span>
                            )}

                            {variant?.sku && <span>SKU: {variant.sku}</span>}

                            {variant?.stock !== undefined && (
                              <span className="text-green-600">
                                Stock: {variant.stock}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isActionLoading}
                          onClick={() => handleRemove(item)}
                          aria-label={`Remove ${product?.name}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>

                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>

                          <div className="mt-1 flex h-10 items-center overflow-hidden rounded-full border border-gray-200 bg-white">
                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() => handleDecrease(item)}
                              className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus />
                            </button>

                            <span className="min-w-10 text-center text-sm font-semibold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              disabled={
                                isActionLoading ||
                                (variant && item.quantity >= variant.stock)
                              }
                              onClick={() => handleIncrease(item)}
                              className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <FiPlus />
                            </button>
                          </div>

                          {variant && item.quantity >= variant.stock && (
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
              );
            })}
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
                <span>Subtotal ({totalItems} items)</span>

                <span className="font-medium text-gray-950">
                  {formatPrice(cartData.grandTotal)}
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
                <p className="text-sm text-gray-500">Estimated total</p>

                <p className="text-xs text-gray-400">
                  Inclusive of applicable taxes
                </p>
              </div>

              <p className="text-2xl font-semibold text-gray-950">
                {formatPrice(cartData.grandTotal)}
              </p>
            </div>

            <Link
              href={`/checkout?cart=${cartParam}&type=cart`}
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
          Add some beautiful copper products to your cart and they will appear
          here.
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

export default GetCartItem;