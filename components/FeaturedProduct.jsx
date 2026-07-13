"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import UnderlineText from "./UnderlineText";
import HeadLine from "./HeadLine";
import ProductCard from "./ProductCard";
import axios from "axios";
import { base_url } from "./utile";

// const products = [
//   {
//     id: 1,
//     image: "/p1.png",
//     hoverimg: "/hi.png",
//     title: "Copper Saucepan with Insulated Handle",
//     variants: [
//       { size: 14, mrp: "10,500", basePrice: "19,500" },
//       { size: 16, mrp: "12,500", basePrice: "21,500" },
//       { size: 18, mrp: "13,500", basePrice: "23,500" },
//     ],
//   },
//   {
//     id: 2,
//     image: "/p1.png",
//     hoverimg: "/hi.png",
//     title: "Copper Frying Pan",
//     variants: [
//       { size: 14, mrp: "15,400", basePrice: "24,400" },
//       { size: 16, mrp: "17,400", basePrice: "27,400" },
//       { size: 18, mrp: "19,400", basePrice: "29,400" },
//     ],
//   },
//   {
//     id: 3,
//     image: "/p1.png",
//     hoverimg: "/hi.png",
//     title: "Copper Kadhri",
//     variants: [
//       { size: 14, mrp: "23,400", basePrice: "35,000" },
//       { size: 16, mrp: "26,400", basePrice: "39,000" },
//       { size: 18, mrp: "29,400", basePrice: "43,000" },
//     ],
//   },
//   {
//     id: 4,
//     image: "/p1.png",
//     hoverimg: "/hi.png",
//     title: "Copper Saute Pan",
//     variants: [
//       { size: 14, mrp: "14,500", basePrice: "22,500" },
//       { size: 16, mrp: "16,500", basePrice: "25,500" },
//       { size: 18, mrp: "18,500", basePrice: "28,500" },
//     ],
//   },
//   {
//     id: 5,
//     image: "/p1.png",
//     hoverimg: "/hi.png",
//     title: "Traditional Copper Frypan",
//     variants: [
//       { size: 14, mrp: "13,500", basePrice: "21,500" },
//       { size: 16, mrp: "15,500", basePrice: "24,500" },
//       { size: 18, mrp: "17,500", basePrice: "27,500" },
//     ],
//   },
// ];



const FeaturedProduct = () => {

const [products,setProducts]=useState([ ])

  const fetchFeatured = async()=>{
    try {
      const response = await axios.get(`${base_url}/cache/product/featured`)
      const data =await response.data;
if(data.success){
  setProducts(data.products)
}
    } catch (error) {
      console.log(error)
    }
  }
       
useEffect(()=>{
  fetchFeatured()
},[])


  return (
    <section className="overflow-hidden bg-[#fbf6e7] px-4 md:px-12 lg:px-24 xl:px-40 py-24">
      <div className="">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <UnderlineText text="Featured" />

          <HeadLine
            text="Get Your Kitchen Essentials"
            styles="mt-4 text-[#650006]"
          />
        </div>

        {/* Product Slider */}
        <Swiper
          modules={[Autoplay]}
          loop={products.length > 3}
          grabCursor
          spaceBetween={18}
          slidesPerView={1.08}
          speed={750}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.4,
              spaceBetween: 18,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className=""
        >
          {products.length > 0 && products.map((product) => (
            <SwiperSlide key={product._id} className="">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProduct;