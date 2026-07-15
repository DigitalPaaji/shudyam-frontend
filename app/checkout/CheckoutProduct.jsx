"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCheck,
  FiChevronLeft,
  FiCreditCard,
  FiLoader,
  FiLock,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

import { base_url, img_url } from "@/components/utile";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/components/store/toggleUser";

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
  }).format(Number(price) || 0);
};

const getImageUrl = (image) => {
  if (!image) return "/placeholder.webp";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${img_url}${image}`;
};

const CheckoutProduct = ({ product,setCheckoutData ,handelSubmitPayment}) => {
  const [cartData, setCartData] = useState(initialCartData);
  const [paymentMethod, setPaymentMethod] = useState("COD");
const {isUser} = useSelector(state=>state.user)
const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

 
  const parsedProducts = useMemo(() => {
    if (Array.isArray(product)) {
      return product;
    }

    if (typeof product === "string") {
      try {
        return JSON.parse(decodeURIComponent(product));
      } catch (error) {
        console.error("Invalid checkout product data:", error);
        return [];
      }
    }

    return [];
  }, [product]);

  const cartDependency = JSON.stringify(parsedProducts);

  const fetchCartLocal = async (signal) => {
    try {
      setIsLoading(true);
      setError("");

      const requestCart = parsedProducts.map((item) => ({
        productid: item.productid,
        variantid: item.variantid,
        quantity: Number(item.quantity),
      }));

      const response = await axios.post(
        `${base_url}/cart/getlocal`,
        {
          cart: requestCart,
        },
        {
          signal,
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Unable to load checkout products"
        );
      }

      setCartData(response.data);
      const items= response.data.cart.map((itm)=>
      ({
        productId : itm.productid,
        variantId:itm.variantid,
        quantity:itm.quantity
      })
      )
  const checkData={
   totalPrice: response.data.subtotal,
   price: response.data.subtotal,
   items,
   discount:0,

  }
      setCheckoutData(checkData)
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
          "Something went wrong while loading checkout products"
      );
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!parsedProducts.length) {
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
  }, [cartDependency]);

 

const handlePlaceOrder = async()=>{ 
  if(!isUser){
dispatch(toggle(true))
    
    return
  }
  
handelSubmitPayment()

}

 
//   const handlePlaceOrder = async () => {
//     if (!validateCheckout()) return;

//     try {
//       setIsPlacingOrder(true);
//       setFormError("");

//       const orderPayload = {
//         shippingAddress: address,
//         paymentMethod,

//         items: cartData.cart.map((item) => ({
//           productid: item.productid,
//           variantid: item.variantid,
//           quantity: item.quantity,
//         })),
//       };

//       console.log("Order payload:", orderPayload);

//       /*
//       const response = await axios.post(
//         `${base_url}/order/create`,
//         orderPayload,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         // router.push(`/order-success/${response.data.order._id}`);
//       }
//       */
//     } catch (error) {
//       setFormError(
//         error.response?.data?.message ||
//           "Unable to place your order. Please try again."
//       );
//     } finally {
//       setIsPlacingOrder(false);
//     }
//   };




  const shippingCharge = 0;
  const discount = 0;

  const grandTotal =
    cartData.subtotal + shippingCharge - discount;

  if (isLoading) {
    return <CheckoutLoading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f5f1] px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FiAlertCircle className="text-3xl text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-950">
            Unable to load checkout
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-gray-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#7c2d32]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cartData.cart.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f5f1] px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <FiShoppingBag className="text-3xl text-[#7c2d32]" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-950">
            No products for checkout
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Add products to your cart before continuing to
            checkout.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#7c2d32]"
          >
            <FiChevronLeft />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="">
      <div className="">
       
        {cartData.unavailableItems?.length > 0 && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />

            <div>
              <p className="font-semibold">
                Some products are unavailable
              </p>

              <p className="mt-1">
                Please return to your cart and remove unavailable
                products before ordering.
              </p>
            </div>
          </div>
        )}

        <div className="">
         

          <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 sm:p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4e9e4] text-[#7c2d32]">
                  <FiPackage className="text-xl" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-950">
                    Order summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    {cartData.totalItems}{" "}
                    {cartData.totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <Link
                href="/cart"
                className="text-xs font-semibold text-[#7c2d32] hover:underline"
              >
                Edit cart
              </Link>
            </div>

            <div className="max-h-[390px] space-y-5 overflow-y-auto py-5 pr-1">
              {cartData.cart.map((item) => (
                <CheckoutItem
                  key={`${item.productid}-${item.variantid}`}
                  item={item}
                />
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-100 py-5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span className="font-medium text-gray-950">
                  {formatPrice(cartData.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>

                  <span className="font-medium text-green-600">
                    -{formatPrice(discount)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-end justify-between border-t border-gray-200 pt-5">
              <div>
                <p className="text-sm font-medium text-gray-950">
                  Total amount
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Inclusive of applicable taxes
                </p>
              </div>

              <p className="text-2xl font-semibold text-gray-950">
                {formatPrice(grandTotal)}
              </p>


              
            </div>

            {formError && (
              <div className="mt-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-600">
                <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
                {formError}
              </div>
            )}

            <button
              type="button"
              disabled={
                isPlacingOrder ||
                cartData.unavailableItems?.length > 0
              }
              onClick={handlePlaceOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#7c2d32] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  Processing order
                </>
              ) : (
                <>
                  {paymentMethod === "COD"
                    ? "Place Order"
                    : `Pay ${formatPrice(grandTotal)}`}
                  <FiCheck className="text-lg" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiLock />
              Secure and encrypted checkout
            </div>
          </aside>

          
        </div>
      </div>
    </main>
  );
};



const CheckoutItem = ({ item }) => {
  return (
    <div className="flex gap-4">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#f7f5f1]"
      >
        <img
          src={getImageUrl(item.thumbnail)}
          alt={item.name}
          className="h-full w-full object-contain p-2"
        />

        <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-950 px-1.5 text-xs font-semibold text-white">
          {item.quantity}
        </span>
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/product/${item.slug}`}
          className="line-clamp-2 text-sm font-semibold leading-5 text-gray-950 transition hover:text-[#7c2d32]"
        >
          {item.name}
        </Link>

        {item.variant?.attributes?.value && (
          <p className="mt-1 text-xs text-gray-500">
            Size: {item.variant.attributes.value}
          </p>
        )}

        <p className="mt-2 text-xs text-gray-500">
          {formatPrice(item.price)} × {item.quantity}
        </p>
      </div>

      <p className="shrink-0 text-sm font-semibold text-gray-950">
        {formatPrice(item.total)}
      </p>
    </div>
  );
};

const CheckoutLoading = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f1] px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-10 w-72 rounded-lg bg-gray-200" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_410px]">
          <div className="space-y-6">
            <div className="h-[430px] rounded-3xl bg-white" />
            <div className="h-64 rounded-3xl bg-white" />
          </div>

          <div className="h-[600px] rounded-3xl bg-white" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;