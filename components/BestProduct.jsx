"use client";


import React, { useEffect, useRef, useState } from "react";
import UnderlineText from "./UnderlineText";

import axios from "axios";
import { base_url, img_url } from "./utile";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Autoplay, EffectCube } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store/AddtoCartLocal";
import { toast } from "react-toastify";
import { addinCart } from "./store/userSlice";
import Link from "next/link";



const BestProductCompo = ({ product, index }) => {
  const dispatch = useDispatch()
const [selectVarient,setSelectVarient]=useState(product.variants[0]) 
  const {isUser} = useSelector(state=>state.user)
  const [goToCart,setGotoCast]=useState(false)

const sellingPrice = Number(selectVarient?.mrp || 0);
  const handleAddToCart = async () => {
    if (
      !product ||
      !selectVarient 
    ) {
      return;
    }

    const cartData = {
      productid: product._id,
      variantid: selectVarient._id,
      quantity:1,
      price:sellingPrice
    };

if(isUser){

try {
  const response = await axios.post(`${base_url}/cart/add`,{
    productid:product._id,
    variantid:selectVarient._id ,
    quantity:1
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

  const reverse = index % 2 !== 0;

const thumbnailImage =  product.isTopImage ? product.images[product.isTopImage]    :product.thumbnail

  return (
    <section className="overflow-hidden py-12">
      <div className="grid grid-cols-12 items-center gap-8 lg:gap-16">
       
        <div
       
          className={`order-1 col-span-12 flex justify lg:col-span-6 ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[600px]">
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-gray-100 to-transparent blur-3xl"></div>

            <img
              src={`${img_url}${thumbnailImage}`}
              alt={product.name}
              loading="lazy"
              className="h-auto  w-full object-contain "
            />
          </div>
        </div>
<div className={`order-2 col-span-12 w-full lg:col-span-6 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}>
<div className="flex flex-col items-center text-center px-2 sm:px-6">
                <UnderlineText text="Featured" />

                <h3 className="mt-5 font-p text-2xl font-medium leading-tight text-p lg:text-5xl">
                  {product.name}
                </h3>

                 {/* <p className="mt-5 font-p text-xl font-semibold  text-p ">
                  {product?.shortDescription}
                </p> */}

<div className="flex mt-5 gap-3">
{product?.variants?.map((item) => (
<div key={item._id} className={` cursor-pointer font-medium text-sm    px-3 rounded-2xl p-1 ${selectVarient._id ===item._id? "bg-p text-white":""} border-[#530509] border `} onClick={()=>setSelectVarient(item)}>
<p> ₹{item.mrp}/<span className="text-sm"> {item.attributes?.value}</span> </p>

</div>
))}

</div>


{goToCart ? <Link href="/cart"              className="mt-8 w-full max-w-[260px] cursor-pointer rounded-full bg-p px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:px-12"
>Go to Cart</Link>:
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-8 w-full max-w-[260px] cursor-pointer rounded-full bg-p px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:px-12"
                >
                  Add to Cart
                </button>
}
              </div>
</div>

      </div>
    </section>
  );
};

const BestProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchTop = async () => {
    try {
      const response = await axios.get(`${base_url}/cache/productstop`);
      const data = await response.data;
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchTop();
  }, []);

  if (!products || products.length === 0) {
    return null; // Or return a loading skeleton if preferred
  }

  return (
    <div className="w-full bg-gray-50/30  px-4  sm:px-6 md:px-12  lg:px-24  xl:px-40">
      {products.map((item, index) => (
        <BestProductCompo product={item} index={index} key={item._id} bestImage={true} />
      ))}
    </div>
  );
};

export default BestProduct;