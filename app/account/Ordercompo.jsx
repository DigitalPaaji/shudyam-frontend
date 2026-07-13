"use client";

import { base_url, img_url } from "@/components/utile";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPackage, FiTruck, FiMapPin } from "react-icons/fi";

axios.defaults.withCredentials = true;

const Ordercompo = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${base_url}/order/get-my`);
      const data = response.data;

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
        setError(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const getImage = (image) => {
    if (!image) return "/placeholder.png";
    if (image.startsWith("http")) return image;
    return `${img_url}${image}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "paid" || value === "delivered") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (value === "pending") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }

    if (value === "cancelled" || value === "failed") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-stone-50 text-stone-700 border-stone-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf7f1] px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-10 w-56 animate-pulse rounded-xl bg-stone-200" />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-3xl border border-stone-200 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbf7f1] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-stone-900">
            Something went wrong
          </h2>
          <p className="mt-3 text-stone-600">{error}</p>

          <button
            onClick={fetchOrder}
            className="mt-6 rounded-full bg-[#6b1f12] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4b140b]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-[#fbf7f1] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6b1f12]/10 text-[#6b1f12]">
            <FiPackage size={28} />
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-stone-900">
            No orders yet
          </h2>

          <p className="mt-3 text-stone-600">
            Your purchased products will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-[#6b1f12] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4b140b]"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fbf7f1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#9b6a4a]">
            Shudhyam Copper
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-stone-950 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-stone-600">
            Track your purchases, payment status and delivery details.
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="border-b border-stone-100 bg-gradient-to-r from-[#2b0603] via-[#7b1e11] to-[#2b0603] p-5 text-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                      Order ID
                    </p>

                    <h2 className="mt-1 break-all text-sm font-semibold sm:text-base">
                      #{order._id}
                    </h2>

                    <p className="mt-2 text-sm text-white/70">
                      Ordered on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      Order: {order.orderStatus}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.paymentStatus
                      )}`}
                    >
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4">
                  {order.items?.map((item) => {
                    const product = item.productId;

                    const selectedVariant = product?.variants?.find(
                      (variant) => variant._id === item.variantId
                    );

                    return (
                      <div
                        key={item._id}
                        className="flex gap-4 rounded-2xl border border-stone-100 bg-[#fffaf4] p-3"
                      >
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white sm:h-28 sm:w-28">
                          <img
                            src={getImage(product?.thumbnail)}
                            alt={product?.name || "Product"}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-base font-semibold text-stone-950">
                            {product?.name}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm text-stone-600">
                            {product?.shortDescription}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="rounded-full bg-white px-3 py-1 font-medium text-stone-700">
                              Qty: {item.quantity}
                            </span>

                            {selectedVariant?.attributes?.value && (
                              <span className="rounded-full bg-white px-3 py-1 font-medium text-stone-700">
                                Variant: {selectedVariant.attributes.value}
                              </span>
                            )}

                            {selectedVariant?.mrp && (
                              <span className="rounded-full bg-white px-3 py-1 font-medium text-stone-700">
                                Price: {formatPrice(selectedVariant.mrp)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-stone-100 bg-[#fffaf4] p-5">
                  <h3 className="text-lg font-semibold text-stone-950">
                    Order Summary
                  </h3>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-stone-600">
                      <span>Payment Method</span>
                      <span className="font-semibold text-stone-900">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-900">
                        {formatPrice(order.price)}
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Discount</span>
                      <span className="font-semibold text-stone-900">
                        {formatPrice(order.discount)}
                      </span>
                    </div>

                    <div className="border-t border-stone-200 pt-3">
                      <div className="flex justify-between text-base font-semibold text-stone-950">
                        <span>Total</span>
                        <span>{formatPrice(order.totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <div className="flex items-start gap-3">
                      <FiMapPin className="mt-1 text-[#7b1e11]" />

                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">
                          Delivery Address
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-stone-600">
                          {order.address?.firstName} {order.address?.lastName}
                          <br />
                          {order.address?.houseNo}, {order.address?.area}
                          <br />
                          {order.address?.city}, {order.address?.state} -{" "}
                          {order.address?.pincode}
                          <br />
                          Phone: {order.address?.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4">
                    <FiTruck className="text-[#7b1e11]" />

                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Tracking ID
                      </p>

                      <p className="text-sm text-stone-600">
                        {order.trackingId || "Not assigned yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ordercompo;