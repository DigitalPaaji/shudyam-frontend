"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaRegUser } from "react-icons/fa6";
import {
  IoBagHandleOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "./store/CategorySlice";
import SearchPopup from "./SearchPopup";
import LoginPopUp from "./LoginPopUp";
import { toggle } from "./store/toggleUser";
import { getUser } from "./store/userSlice";
import { loadCart } from "./store/AddtoCartLocal";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const dispatch = useDispatch()
  const route = useRouter()
  const {categories,error,loading} = useSelector(state=>state.categories)
  const {showLogin} = useSelector(state=>state.toggleUser)
  const {isUser,user} = useSelector(state=>state.user)
  const {cart} = useSelector(state=>state.LocalCart)
  const headerRef = useRef(null);
  const [cartCount,setCartCount]=useState(0)
  const [openSearch,setOpenSearch]=useState(false);
// console.log(cartCount,user?.cartCount,"saddd")

  useGSAP(
    () => {
      gsap.from(".header-item", {
        y: -25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: headerRef }
  );

  const closeMenu = () => {
    setMenuOpen(false);
    setCollectionOpen(false);
  };

  useEffect(()=>{
dispatch(getCategory())
dispatch(loadCart())

dispatch(getUser())
  },[])


  useEffect(()=>{
if(isUser){
 setCartCount(user?.cartCount) 
}else{
  setCartCount(cart.length)
}

  },[isUser,user?.cartCount])

  const navClass =
    "relative py-2 text-xs text-[#fff9e6] transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#e5c66f] after:transition-all after:duration-300 hover:text-[#e5c66f] hover:after:w-full";

  const iconClass =
    "flex h-9 w-9 items-center justify-center text-[#fff9e6] transition hover:bg-white/10 hover:text-[#e5c66f]";

  return (
    <>
      <header
        ref={headerRef}
        className=" absolute font-p left-0 top-0 z-50 w-full   px-4 md:px-12 lg:px-24 xl:px-40"
      >
 {showLogin && <LoginPopUp />

 }
<div className="relative mx-auto flex h-[70px] items-center justify-between ">
         
{
  openSearch &&
<SearchPopup setOpenSearch={setOpenSearch} />
}


          <nav className="header-item hidden flex-1 items-center gap-8 lg:flex">
            <div className="group relative">
              <button
                type="button"
                className={`${navClass} flex items-center gap-1.5`}
              >
                Collection

                <FaAngleDown className="text-[9px] transition group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-3 pt-4 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="border border-[#d9bd72]/25 bg-[#1b0102] p-2 shadow-2xl">
                  { categories.length > 0 && categories?.map((item) => (
                    <Link
                      key={item._id}
                      href={`/products?category=${item.slug}`}
                      className="block border-b border-[#d9bd72]/10 px-4 py-3 text-xs text-[#fff9e6] transition last:border-none hover:bg-white/5 hover:text-[#e5c66f]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/about-us" className={navClass}>
              About Us
            </Link>

            <Link href="/craftsmanship" className={navClass}>
              Craftsmanship
            </Link>
          </nav>

          
          <div className="header-item flex flex-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={iconClass}
            >
              {menuOpen ? (
                <IoCloseOutline className="text-2xl" />
              ) : (
                <IoMenuOutline className="text-2xl" />
              )}
            </button>
          </div>
          
          <Link
            href="/"
            aria-label="Homepage"
            className="header-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div
            onClick={()=>route.push("/")}
              className="h-12 w-28 bg-[#e5c66f] sm:w-32 cursor-pointer"
              style={{
                WebkitMask: "url('/logo.webp') center / contain no-repeat",
                mask: "url('/logo.webp') center / contain no-repeat",
              }}
            />
          </Link>
          

          <div className="header-item flex flex-1 items-center justify-end gap-1 lg:gap-7">
            <nav className="hidden items-center gap-8 lg:flex">
              <Link href="/blog" className={navClass}>
                Our Blogs
              </Link>

              <Link href="/contact-us" className={navClass}>
                Contact Us
              </Link>
            </nav>

            <div className="flex items-center">
              <button
                type="button"
                onClick={()=>setOpenSearch(true)}
                className={`${iconClass} hidden sm:flex`}
              >
                <IoSearchOutline className="text-lg" />
              </button>

{isUser ? 

               <Link
                href="/account"
                aria-label="Account"
                className={`${iconClass} hidden sm:flex`}
              >
                <FaRegUser />
              </Link> :
              <div
              onClick={()=>dispatch(toggle(true))}
                className={`${iconClass} hidden sm:flex`}
              >
                <FaRegUser />
              </div>
}

              <Link
                href="/cart"
                aria-label="Cart"
                className={`${iconClass} relative`}
              >
                <IoBagHandleOutline className="text-lg" />

              {isUser &&   <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5c66f] px-1 text-[8px] font-semibold text-[#250103]">
                  {cartCount}
                </span>
}
              </Link>
            </div>
          </div>
        </div>

      
        {menuOpen && (
       
<nav
  className={`absolute left-0 top-full w-full border-t border-[#d9bd72]/20 bg-[#1b0102] px-5 py-4 transition-all duration-300 lg:hidden ${
    menuOpen
      ? "visible translate-y-0 opacity-100"
      : "invisible -translate-y-3 pointer-events-none opacity-0"
  }`}
>
  <div className="border-b border-[#d9bd72]/15">
    <button
      type="button"
      onClick={() => setCollectionOpen((previous) => !previous)}
      className="flex w-full items-center justify-between py-4 text-sm text-[#fff9e6]"
    >
      Collection

      <FaAngleDown
        className={`text-xs transition-transform duration-300 ${
          collectionOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className={`grid transition-all duration-300 ${
        collectionOpen
          ? "grid-rows-[1fr] pb-3"
          : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className="border-l border-[#d9bd72]/25 pl-4">
          {categories.length > 0 && categories.map((item) => (
            <Link
              href={`/products?category=${item.slug}`}
              key={item._id}
              onClick={closeMenu}
              className="block py-2.5 text-xs text-[#fff9e6]/70 hover:text-[#e5c66f]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>

  <Link
    href="/about-us"
    onClick={closeMenu}
    className="block border-b border-[#d9bd72]/15 py-4 text-sm text-[#fff9e6]"
  >
    About Us
  </Link>

  <Link
    href="/craftsmanship"
    onClick={closeMenu}
    className="block border-b border-[#d9bd72]/15 py-4 text-sm text-[#fff9e6]"
  >
    Craftsmanship
  </Link>

  <Link
    href="/blog"
    onClick={closeMenu}
    className="block border-b border-[#d9bd72]/15 py-4 text-sm text-[#fff9e6]"
  >
    Our Blogs
  </Link>

  <Link
    href="/contact-us"
    onClick={closeMenu}
    className="block py-4 text-sm text-[#fff9e6]"
  >
    Contact Us
  </Link>

  <div className="mt-3 grid grid-cols-2 gap-3">
    <button
      type="button"
                      onClick={()=>setOpenSearch(true)}

      className="flex items-center justify-center gap-2 border border-[#d9bd72]/25 px-4 py-3 text-xs text-[#fff9e6]"
    >
      <IoSearchOutline />
      Search
    </button>

    <Link
      href="/account"
      onClick={closeMenu}
      className="flex items-center justify-center gap-2 bg-[#e5c66f] px-4 py-3 text-xs font-medium text-[#250103]"
    >
      <FaRegUser />
      Account
    </Link>
  </div>
</nav>
        )}
      </header>

      {menuOpen && (
    <button
  type="button"
  aria-label="Close menu"
  onClick={closeMenu}
  className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
    menuOpen
      ? "visible opacity-100"
      : "invisible pointer-events-none opacity-0"
  }`}
/>
      )}
    </>
  );
};

export default Header;