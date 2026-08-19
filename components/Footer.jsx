"use client";

import React from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";

// const collectionLinks = [
//   "Sauce Pan",
//   "Saute Pan",
//   "Kadhai",
//   "Roti Concave Tawa",
//   "Tadka Pan",
//   "Parat",
//   "Wok Pan",
//   "Sigri",
//   "Lagan",
//   "Gift Sets",
// ];

const quickLinks = [
  {
  text:"About Us",
  link:"about-us"
},
  {
  text:"Contact Us",
  link:"contact-us"
},
 {
  text:"Craftsmanship",
  link:"craftsmanship"
},
 {
  text:"Products",
  link:"products"
},
 {
  text:"Our Blogs",
  link:"blog"
},
 {
  text:"Wishlist",
  link:"wishlist"
},

];


const customerLinks = [{
  text:"Terms & conditions",
  link:"terms-and-conditions"
},
//   {
//   text:"Track Order",
//   link:"track-order"
// },
{
  text:"Shipping & Delivery Policy",
  link:"shipping-policy"
},
{
  text:"Return & Refund Policy",
  link:"refund-policy"
},
 
];

const FooterLink = ({ children, href = "#" }) => {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 text-[12px] text-[#fff4d9]/65 transition-all duration-300 hover:translate-x-1 hover:text-[#fff4d9]"
    >
      <span className="h-px w-0 bg-[#fff4d9] transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
};

const Footer = () => {
  const {
    categories: collectionLinks = [],
    error,
    loading,
  } = useSelector((state) => state.categories);

  return (
    <footer className="relative overflow-hidden bg-[#fff9e8]">
      {/* Curved upper section */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="block h-[85px] w-full sm:h-[110px] lg:h-[135px]"
        >
          <defs>
            <linearGradient
              id="footerWaveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#150102" />
              <stop offset="50%" stopColor="#570207" />
              <stop offset="100%" stopColor="#150102" />
            </linearGradient>
          </defs>

          <path
            fill="url(#footerWaveGradient)"
            d="
              M0 180
              V105
              C290 25, 500 0, 720 0
              C940 0, 1150 25, 1440 105
              V180
              H0
              Z
            "
          />
        </svg>

        {/* Logo */}
        <div className="absolute left-1/2 top-[70%] md:top-[55%] z-20 -translate-x-1/2 -translate-y-1/2 sm:top-[48%]">
           {/* <p className=" text-nowrap text-[16px] md:text-[20px] p-2 font-medium leading-[1.05] lg:text-[32px] bg-gradient-to-r from-[#F8E7A1] via-[#E0A328] to-[#FFD56A] bg-[length:200%_100%] shine bg-clip-text text-transparent ">
  ॥ शुद्धता का वादा, परंपरा का साथ ॥
</p> */}
    <img
            src="/images/logo.webp"
            alt="Shudham"
            className="object-contain  w-[22rem]"
          />

        </div>
      </div>

      {/* Main footer */}
      <div className=" bg-gradient-to-r from-[#150102] via-[#570207] to-[#150102] px-4  sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Main content card */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/[0.04] bg-black/20 px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            {/* Subtle lighting */}
            <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#9c1d18]/15 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#8f170f]/10 blur-[100px]" />

            <div className="relative z-10 flex flex-col lg:flex-row   gap-20">
              {/* Newsletter */}
              <div>
                <img
            src="/images/logo.png"
            alt="Shudham"
            className="w-24 object-contain brightness-90 sm:w-32 lg:w-44"
          />
               

                <p className="mt-5 max-w-md text-sm leading-6 text-[#fff4d9]/65">
                  Sign up for our newsletter for 10% off, special offers,
                  cooking and cleaning tips and more.
                </p>

              
<div className="flex items-center gap-4 mt-5">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-6 w-6 items-center justify-center  text-[#fff1c9] transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1c9] hover:bg-[#fff1c9] hover:text-[#4b0808]"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://www.instagram.com/shudyam.india?igsh=MTFxejYyemRlM2ZtbA=="
                target="_blank"
                aria-label="Instagram"
                className="flex h-6 w-6 items-center justify-center  text-[#fff1c9] transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1c9] hover:bg-[#fff1c9] hover:text-[#4b0808]"
              >
                <FaInstagram />
              </Link>

              <Link
                href="#"
                aria-label="X"
                className="flex h-6 w-6 items-center justify-center  text-[#fff1c9] transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1c9] hover:bg-[#fff1c9] hover:text-[#4b0808]"
              >
                <FaXTwitter />
              </Link>

              <Link
                href="#"
                aria-label="YouTube"
                className="flex h-6 w-6 items-center justify-center  text-[#fff1c9] transition-all duration-300 hover:-translate-y-1 hover:border-[#fff1c9] hover:bg-[#fff1c9] hover:text-[#4b0808]"
              >
                <FaYoutube />
              </Link>
            </div>

              </div>
<div className=" w-full grid  gap-10 grid-cols-2 md:grid-cols-3 ">
            
              <div className="">
                <h3 className="mb-6 text-sm font-medium text-[#fff4d9]">
                  Collection
                </h3>

                <div className="grid  gap-x-5 gap-y-4">
                  {collectionLinks.map((item) => (
                    <FooterLink key={item._id} href={`/products?category=${item.slug}`} >{item.name?.toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase())}</FooterLink>
                  ))}
                </div>
              </div>

             
              <div>
                <h3 className="mb-6 text-sm font-medium text-[#fff4d9]">
                  Quick Links
                </h3>

                <div className="flex flex-col gap-4">
                  {quickLinks.map((item,index) => (
                    <FooterLink key={index}   href={`/${item.link}`} >{item.text}</FooterLink>
                  ))}
                </div>
              </div>

             
              <div>
                <h3 className="mb-6 text-sm font-medium text-[#fff4d9]">
                  Customer Services
                </h3>

                <div className="flex flex-col gap-4">
                  {customerLinks.map((item,index) => (
                    <FooterLink key={index} href={`/${item.link}`}>{item.text}</FooterLink>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

         
           <p className=" text-center py-3 text-[11px] text-[#fff4d9]/55">
              © {new Date().getFullYear()} Shudham. All rights reserved. Designed and Developed by <a target="_blank" href="https://digitalpaaji.com/">Digital Paaji</a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;