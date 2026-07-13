"use client";

import { base_url, img_url } from "@/components/utile";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import { useParams } from "next/navigation";
import React, {useCallback,useEffect,useMemo,useRef,useState,} from "react";
import {FiCheck,FiChevronLeft,FiChevronRight,FiHeart,FiMinus,FiPlus,FiRefreshCw,FiShield,FiShoppingBag,FiTruck,} from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewSection from "@/components/ReviewSection";
import RelatedProducts from "@/components/RelatedProducts";
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/components/store/AddtoCartLocal";
import { toast } from "react-toastify";
import Link from "next/link";
import { addinCart } from "@/components/store/userSlice";
import { toggleWishlist } from "@/components/store/wishlistslice";
axios.defaults.withCredentials=true









gsap.registerPlugin(useGSAP);

const ProductPage = () => {
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const containerRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [goToCart,setGotoCast]=useState(false)
const [viewers, setViewers] = useState(1);
 const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const  wishlist = useSelector(state=>state.wishlist) 

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {isUser} = useSelector(state=>state.user)


  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${base_url}/cache/product/single/${slug}`
      );

      const fetchedProduct = response.data?.product;

      if (!fetchedProduct) {
        setProduct(null);
        setError("Product not found.");
        return;
      }

      const firstAvailableVariant =
        fetchedProduct.variants?.find(
          (variant) =>
            variant.isActive && Number(variant.stock) > 0
        ) ||
        fetchedProduct.variants?.find(
          (variant) => variant.isActive
        ) ||
        fetchedProduct.variants?.[0] ||
        null;

      setProduct(fetchedProduct);
      setSelectedVariant(firstAvailableVariant);
      setQuantity(1);
      setActiveImageIndex(0);
    } catch (error) {
      console.error("Product fetch error:", error);

      setProduct(null);
      setError(
        error?.response?.data?.message ||
          "Unable to load this product."
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);


useEffect(()=>{
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
socket.on('connect', () => {
      // 2. Tell the server which page we are currently looking at
      socket.emit('join-page', slug);
    });
    socket.on('update-viewers', (count) => {
      setViewers(count);
    });
    return () => {
      socket.disconnect();
    };

},[ ])

  useEffect(() => {
    fetchProduct();


  }, [fetchProduct]);

  useGSAP(
    () => {
      if (loading || !product) return;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".product-breadcrumb", {
          y: 15,
          opacity: 0,
          duration: 0.45,
        })
        .from(
          ".product-gallery",
          {
            x: -40,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.15"
        )
        .from(
          ".product-content",
          {
            x: 40,
            opacity: 0,
            duration: 0.75,
          },
          "-=0.6"
        )
        .from(
          ".product-fade-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.06,
          },
          "-=0.45"
        )
        .from(
          ".product-bottom-section",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.2"
        );
    },
    {
      scope: containerRef,
      dependencies: [loading, product],
      revertOnUpdate: true,
    }
  );

  const getImageUrl = useCallback((image) => {
    if (!image) return "/placeholder.webp";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    const backendUrl = base_url
      .replace(/\/api\/v1\/?$/, "")
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");

    return `${backendUrl}${
      image.startsWith("/") ? image : `/${image}`
    }`;
  }, []);

  const productImages = useMemo(() => {
    if (!product) return [];

    const allImages = Array.isArray(product.images)
      ? product.images
      : [];

    let images = allImages;

    if (selectedVariant?.images?.length) {
      const variantImages = selectedVariant.images
        .map((item) => {
          const value = String(item);

          if (/^\d+$/.test(value)) {
            return allImages[Number(value)];
          }

          return value;
        })
        .filter(Boolean);

      if (variantImages.length) {
        images = variantImages;
      }
    }

    if (!images.length && product.thumbnail) {
      images = [product.thumbnail];
    }

    return [...new Set(images)];
  }, [product, selectedVariant]);

  useEffect(() => {
    setActiveImageIndex(0);

    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(0, 0);
    }
  }, [productImages, mainSwiper]);

  const sellingPrice = Number(selectedVariant?.mrp || 0);
  const originalPrice = Number(
    selectedVariant?.basePrice || 0
  );
  const availableStock = Number(
    selectedVariant?.stock || 0
  );

  const discountPercentage =
    originalPrice > sellingPrice
      ? Math.round(
          ((originalPrice - sellingPrice) /
            originalPrice) *
            100
        )
      : 0;

  const savedAmount = Math.max(
    originalPrice - sellingPrice,
    0
  );

  const handleVariantChange = (variant) => {
    if (Number(variant.stock) <= 0) return;

    setSelectedVariant(variant);
    setQuantity(1);
    setActiveImageIndex(0);

    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(0);
    }
  };

  const increaseQuantity = () => {
    setQuantity((previous) =>
      Math.min(
        previous + 1,
        Math.max(availableStock, 1)
      )
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const handleAddToCart = async () => {
    if (
      !product ||
      !selectedVariant ||
      availableStock <= 0
    ) {
      return;
    }

    const cartData = {
      productid: product._id,
      variantid: selectedVariant._id,
      quantity,
      price:sellingPrice
    };

if(isUser){

try {
  const response = await axios.post(`${base_url}/cart/add`,{
    productid:product._id,
    variantid:selectedVariant._id ,
    quantity
  })
  
  const data = await response.data;
   
  if(data.success){

    toast.success(data.message)
    setGotoCast(true)
    if(data.addNew){

      dispatch(addinCart())
    }

  }
else{
  toast.error(data.message)
}

  
} catch (error) {
  toast.error(error.response.data.message)

}



}else{
  dispatch(addToCart(cartData))
  toast.success("Add to cart")
  setGotoCast(true)
}

  
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff9e6]">
        <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

        <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 md:px-10 md:py-12 lg:px-16 xl:px-20">
          <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="aspect-square rounded-3xl bg-neutral-200" />

            <div className="space-y-5 py-3">
              <div className="h-4 w-28 rounded bg-neutral-200" />
              <div className="h-10 w-4/5 rounded bg-neutral-200 sm:h-12" />
              <div className="h-20 rounded bg-neutral-200" />
              <div className="h-10 w-52 rounded bg-neutral-200" />
              <div className="h-24 rounded bg-neutral-200" />
              <div className="h-14 rounded-full bg-neutral-200" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff9e6] px-4">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white/40 p-7 text-center shadow-sm sm:p-10">
          <FiRefreshCw className="mx-auto text-4xl text-[#52070a]" />

          <h1 className="mt-5 text-2xl font-semibold text-neutral-900">
            Product unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {error || "We could not find this product."}
          </p>

          <button
            type="button"
            onClick={fetchProduct}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#52070a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#350305]"
          >
            <FiRefreshCw />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen overflow-hidden bg-[#fff9e6] pb-24 text-neutral-900 lg:pb-0"
    >
      <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-16 xl:px-20">
        <div className="product-breadcrumb mb-6 flex min-w-0 items-center gap-2 overflow-hidden text-xs text-neutral-500 sm:mb-8 sm:text-sm">
          <span className="shrink-0">Home</span>
          <span className="shrink-0">/</span>

          <span className="shrink-0">
            {product.category?.name || "Category"}
          </span>

          <span className="shrink-0">/</span>

          <span className="truncate font-medium text-neutral-900">
            {product.name}
          </span>
        </div>

        <div className="grid items-start gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          <div className="product-gallery min-w-0">
            <div className="relative overflow-hidden rounded-2xl     sm:rounded-3xl">
              {product.isBestSaller && (
                <span className="absolute left-3 top-3 z-20 rounded-full bg-[#52070a] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white sm:left-5 sm:top-5 sm:px-4 sm:text-[10px]">
                  Best seller
                </span>
              )}

              {discountPercentage > 0 && (
                <span className="absolute right-3 top-3 z-20 rounded-full bg-[#f3e8d6] px-3 py-2 text-[10px] font-semibold text-[#52070a] sm:right-5 sm:top-5 sm:px-4 sm:text-xs">
                  {discountPercentage}% off
                </span>
              )}

              <Swiper
                onSwiper={setMainSwiper}
                onSlideChange={(swiper) =>
                  setActiveImageIndex(swiper.realIndex)
                }
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                }}
                navigation={{
                  prevEl: ".product-prev-button",
                  nextEl: ".product-next-button",
                }}
                className="product-main-swiper"
              >
                {productImages.map((image, index) => (
                  <SwiperSlide key={`${image}-${index}`}>

                    <div className="flex aspect-[1/1.06] items-center justify-center  bg-[#fff9e6] p-4 sm:aspect-square sm:p-7 md:p-10">
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-contain "
                      />
                    </div>


                  </SwiperSlide>
                ))}
              </Swiper>

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="product-prev-button absolute bottom-4 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 text-base shadow-md transition hover:bg-[#52070a] hover:text-white sm:bottom-5 sm:left-5 sm:h-11 sm:w-11"
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    className="product-next-button absolute bottom-4 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 text-base shadow-md transition hover:bg-[#52070a] hover:text-white sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">
                {productImages.map((image, index) => (
                  <button
                    type="button"
                    key={`thumbnail-${image}-${index}`}
                    onClick={() => {
                      setActiveImageIndex(index);
                      mainSwiper?.slideTo(index);
                    }}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border p-1.5 transition sm:h-20 sm:w-20 sm:rounded-2xl md:h-[88px] md:w-[88px] ${
                      activeImageIndex === index
                        ? "border-[#62080d] ring-1 ring-[#62080d]"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} thumbnail ${
                        index + 1
                      }`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-content min-w-0 lg:sticky lg:top-24">
            <p className="product-fade-item text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7b2528] sm:text-xs">
              {product.category?.name ||
                "Premium cookware"}
            </p>

            <h1 className="product-fade-item mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-[2.7rem] xl:text-5xl">
              {product.name}
            </h1>

            <p className="product-fade-item mt-4 max-w-xl text-sm leading-7 text-neutral-600 sm:mt-5 sm:text-base">
              {product.shortDescription}
            </p>

            <div className="product-fade-item mt-5 flex flex-wrap items-end gap-2 sm:mt-7 sm:gap-3">
              <span className="text-2xl font-semibold sm:text-3xl">
                ₹{sellingPrice.toLocaleString("en-IN")}
              </span>

              {originalPrice > sellingPrice && (
                <>
                  <span className="pb-0.5 text-base text-neutral-400 line-through sm:pb-1 sm:text-lg">
                    ₹
                    {originalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="mb-0.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 sm:mb-1 sm:px-3 sm:text-sm">
                    Save ₹
                    {savedAmount.toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </div>

            <p className="product-fade-item mt-2 text-[11px] text-neutral-500 sm:text-xs">
              Inclusive of all taxes
            </p>

            <div className="product-fade-item my-6 h-px bg-neutral-200 sm:my-8" />

            {!!product.variants?.length && (
              <div className="product-fade-item">
                <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                  <h2 className="text-sm font-semibold">
                    Select size
                  </h2>

                  {selectedVariant?.sku && (
                    <span className="text-[10px] text-neutral-500 sm:text-xs">
                      SKU: {selectedVariant.sku}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.variants
                    .filter(
                      (variant) => variant.isActive
                    )
                    .map((variant) => {
                      const isSelected =
                        selectedVariant?._id ===
                        variant._id;

                      const isOutOfStock =
                        Number(variant.stock) <= 0;

                      return (
                        <button
                          type="button"
                          key={variant._id}
                          disabled={isOutOfStock}
                          onClick={() =>
                            handleVariantChange(variant)
                          }
                          className={`relative min-w-[72px] rounded-xl border px-4 py-2.5 text-xs font-medium transition sm:min-w-24 sm:px-5 sm:py-3 sm:text-sm ${
                            isSelected
                              ? "border-[#52070a] bg-[#52070a] text-white"
                              : "border-neutral-300 bg-white/40 text-neutral-800 hover:border-[#52070a]"
                          } ${
                            isOutOfStock
                              ? "cursor-not-allowed opacity-40"
                              : ""
                          }`}
                        >
                          {variant.attributes?.value ||
                            variant.sku}

                          {isSelected && (
                            <FiCheck className="absolute -right-2 -top-2 rounded-full bg-white/40 p-1 text-[#52070a] shadow-md" />
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            <div className="product-fade-item mt-5 flex items-center gap-2 text-xs sm:mt-6 sm:text-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  availableStock > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              {availableStock > 0 ? (
                <span className="text-green-700">
                  In stock
                  {availableStock <= 10 &&
                    ` — only ${availableStock} left`}
                </span>
              ) : (
                <span className="text-red-600">
                  Out of stock
                </span>
              )}
            </div>

            <div className="product-fade-item mt-6 sm:mt-8">
              <h2 className="mb-3 text-sm font-semibold sm:mb-4">
                Quantity
              </h2>

<div className="flex justify-between items-center ">
              <div className="flex h-11 w-32 items-center justify-between rounded-full border border-neutral-300 bg-white/40 px-1.5 sm:h-12 sm:w-36 sm:px-2">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <FiMinus />
                </button>

                <span className="text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >=
                    Math.max(availableStock, 1)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
                >
                  <FiPlus />
                </button>
              </div>
<div className="flex items-center gap-1">
<img src="/eye.gif" alt="" className="h-3" />
              <p className="text-p">{viewers+6} people are viewing
</p>  

</div>
              </div>
            </div>


            <div className="product-fade-item mt-6 grid grid-cols-[1fr_52px] gap-2.5 sm:mt-8 sm:grid-cols-[1fr_58px] sm:gap-3">
           {goToCart ? <Link href="/cart"                             className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#52070a] px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#350305] disabled:cursor-not-allowed disabled:bg-neutral-300 sm:h-14 sm:gap-3 sm:px-8 sm:text-sm sm:tracking-[0.1em]"

>Go to Cart</Link>  :
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  !selectedVariant ||
                  availableStock <= 0
                }
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#52070a] px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#350305] disabled:cursor-not-allowed disabled:bg-neutral-300 sm:h-14 sm:gap-3 sm:px-8 sm:text-sm sm:tracking-[0.1em]"
              >
                <FiShoppingBag className="text-base sm:text-lg" />
                Add to cart
              </button>
}

              <button
                type="button"
                aria-label="Toggle wishlist"
                // onClick={() =>
                //   setIsWishlisted((previous) => !previous)
                // }
                onClick={()=>dispatch(toggleWishlist(product._id))}
                className={`flex h-12 w-full items-center justify-center rounded-full border text-lg transition sm:h-14 sm:text-xl ${
                  wishlist.includes(product._id)
                    ? "border-[#52070a] bg-[#52070a] text-white"
                    : "border-neutral-300 bg-white/40 hover:border-[#52070a] hover:text-[#52070a]"
                }`}
              >
                <FiHeart
                  className={
                     wishlist.includes(product._id) ? "fill-current" : ""
                  }
                />
              </button>
            </div>

            

            <div className="product-fade-item mt-6 grid gap-3 rounded-2xl border border-neutral-200 bg-white/40 p-4 sm:mt-8 sm:grid-cols-3 sm:gap-4 sm:p-5">
              <div className="flex items-center gap-3">
                <FiTruck className="shrink-0 text-xl text-[#62080d]" />

                <div>
                  <p className="text-xs font-semibold">
                    Fast delivery
                  </p>
                  <p className="mt-0.5 text-[10px] text-neutral-500 sm:mt-1 sm:text-[11px]">
                    Secure shipping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiShield className="shrink-0 text-xl text-[#62080d]" />

                <div>
                  <p className="text-xs font-semibold">
                    Secure payment
                  </p>
                  <p className="mt-0.5 text-[10px] text-neutral-500 sm:mt-1 sm:text-[11px]">
                    Protected checkout
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiRefreshCw className="shrink-0 text-xl text-[#62080d]" />

                <div>
                  <p className="text-xs font-semibold">
                    Easy returns
                  </p>
                  <p className="mt-0.5 text-[10px] text-neutral-500 sm:mt-1 sm:text-[11px]">
                    Simple support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-bottom-section mt-12 grid gap-7 border-t border-neutral-200 pt-9 sm:mt-16 sm:gap-8 sm:pt-12 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7b2528] sm:text-xs">
              About the product
            </p>

            <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
              Product description
            </h2>

            <div
              className="mt-5 max-w-3xl text-sm leading-7 text-neutral-600 sm:mt-6 sm:text-[15px] sm:leading-8 [&_p]:mb-4"
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
            />
          </div>

          {!!product.details &&
            Object.keys(product.details).length > 0 && (
              <div className="h-fit rounded-2xl border border-neutral-200 bg-white/40 p-5 sm:rounded-3xl sm:p-7 md:p-8">
                <h2 className="font-serif text-xl sm:text-2xl">
                  Product details
                </h2>

                <div className="mt-4 divide-y divide-neutral-200 sm:mt-6">
                  {Object.entries(product.details).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[0.8fr_1fr] gap-3 py-3 text-xs sm:gap-4 sm:py-4 sm:text-sm"
                      >
                        <span className="text-neutral-500">
                          {key}
                        </span>

                        <span className="break-words font-medium text-neutral-900">
                          {String(value)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>

        {!!product.tags?.length && (
          <div className="product-bottom-section mt-9 border-t border-neutral-200 pt-7 sm:mt-12 sm:pt-8">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 bg-white/40 px-3 py-1.5 text-[10px] text-neutral-600 sm:px-4 sm:py-2 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}


            {!!product.variants?.length && (
              <div className="product-fade-item my-24">
              
               

                
               

                <div className="flex flex-wrap gap-2 sm:gap-3 justify-evenly items-end">
                  {product.variants
                    .filter(
                      (variant) => variant.isActive
                    )
                    .map((variant,index) => {
                      const isSelected =
                        selectedVariant?._id ===
                        variant._id;

                      const isOutOfStock =
                        Number(variant.stock) <= 0;

                      return (
<div key={index} className="items-center flex flex-col  gap-2"  onClick={() =>
                             handleVariantChange(variant)
                          }>

    <img src={`${img_url}${product.thumbnail}`}  alt={`${product.name}`}
                        className="  object-contain "  style={{height: (150 + index*50)}}  />

                        <button
                          type="button"
                          key={variant._id}
                          disabled={isOutOfStock}
                         
                          className={`relative w-fit rounded-xl border  text-xs font-medium transition px-2 py-0.5 ${
                            isSelected
                              ? "border-[#52070a] bg-[#52070a] text-white"
                              : "border-neutral-300 bg-white/40 text-neutral-800 hover:border-[#52070a]"
                          } ${
                            isOutOfStock
                              ? "cursor-not-allowed opacity-40"
                              : ""
                          }`}
                        >
                        
                          {variant.attributes?.value ||
                            variant.sku}

                          {isSelected && (
                            <FiCheck className="absolute -right-2 -top-2 rounded-full bg-white/40 p-1 text-[#52070a] shadow-md" />
                          )}
                        </button>
                        <p className="font-p text-p">{product.name}</p>

</div>

                      );
                    })}
                </div>
              </div>
            )}

<ReviewSection productid={product._id} />

<RelatedProducts categoryId={product.category._id} />



      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/40/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] text-neutral-500">
              {selectedVariant?.attributes?.value ||
                selectedVariant?.sku ||
                product.name}
            </p>

            <p className="text-lg font-semibold">
              ₹{sellingPrice.toLocaleString("en-IN")}
            </p>
          </div>

{goToCart ? <Link href="/cart"              className="flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#52070a] px-5 text-xs font-semibold uppercase tracking-[0.07em] text-white disabled:bg-neutral-300"
>Go to Cart</Link>  :
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              !selectedVariant || availableStock <= 0
            }
            className="flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#52070a] px-5 text-xs font-semibold uppercase tracking-[0.07em] text-white disabled:bg-neutral-300"
          >
            <FiShoppingBag />
            Add to cart
          </button>
}
        </div>
      </div>

      <style jsx global>{`
        .product-main-swiper .swiper-pagination {
          bottom: 16px !important;
        }

        .product-main-swiper
          .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #52070a;
          opacity: 0.25;
        }

        .product-main-swiper
          .swiper-pagination-bullet-active {
          opacity: 1;
        }

        @media (max-width: 639px) {
          .product-main-swiper .swiper-pagination {
            bottom: 14px !important;
          }
        }
      `}</style>
    </main>
  );
};

export default ProductPage;
