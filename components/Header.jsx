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
import axios from "axios";
import { base_url, img_url } from "./utile";
import { FiChevronRight, FiGrid } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);

  const dispatch = useDispatch();
  const route = useRouter();
  const headerRef = useRef(null);

  const { categories, error, loading } = useSelector((state) => state.categories);
  const { showLogin } = useSelector((state) => state.toggleUser);
  const { isUser, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.LocalCart);
  const [products, setProducts] = useState([]);

  const fetchRadnomproduct = async () => {
    try {
      const response = await axios.get(`${base_url}/cache/products/random`);
      const data = await response.data;
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setProducts([]);
    }
  };

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

  useEffect(() => {
    fetchRadnomproduct();
    dispatch(getCategory());
    dispatch(loadCart());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isUser) {
      setCartCount(user?.cartCount || 0);
    } else {
      setCartCount(cart?.length || 0);
    }
  }, [isUser, user?.cartCount, cart?.length]);

  const navClass =
    "relative py-2 text-xs  2xl:text-base text-[#150102] transition duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#e5c66f] after:transition-all after:duration-300 hover:after:w-full";

  const iconClass =
    "flex h-8 w-8  text-lg items-center justify-center text-[#150102] ";

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-50 bg-[#fff9e7] font-p w-full px-4 md:px-12 lg:px-24 xl:px-40 py-2 text-[#150102]"
      >
        {showLogin && <LoginPopUp />}

        <div className="relative mx-auto flex h-[75px] md:h-[70px] items-center justify-between">
          {openSearch && <SearchPopup setOpenSearch={setOpenSearch} />}

          {/* Desktop Left Nav */}
          <nav className="header-item hidden flex-1 items-center gap-8 xl:flex">
            <Link href="/" className={navClass}>
              Home
            </Link>

            <div className="group relative">
              <button
                type="button"
                className={`${navClass} flex items-center gap-1.5`}
              >
                <span>Collections </span>
                <FaAngleDown className="text-[9px] transition group-hover:rotate-180" />
              </button>

              <div className="hidden -translate-x-1/5 absolute top-full left-0 pt-5 translate-y-3 opacity-0 group-hover:block group-hover:translate-y-0 duration-300 group-hover:opacity-100">
                <div className="mt-3 w-[500px] rounded-2xl bg-white border border-black/10 shadow-2xl overflow-hidden p-4">
                  {/* SHOP ALL */}
                  <Link
                    href="/products"
                    className="group flex items-center gap-4 p-3 mb-2 rounded-xl bg-p text-white transition-all duration-300"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                      <FiGrid size={22} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold ">
                        Shop All Products
                      </p>
                      <p className="text-xs opacity-60 mt-0.5">
                        Explore our complete collection
                      </p>
                    </div>

                    <FiChevronRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {/* CATEGORIES */}
                  {categories?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {categories.map((item) => (
                        <Link
                          href={`/products?category=${item.slug}`}
                          key={item._id}
                          className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 transition-all duration-300"
                        >
                          {/* CATEGORY IMAGE */}
                          <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-black/5">
                            {item?.image ? (
                              <img
                                src={`${img_url}${item.image}`}
                                alt={item?.name || "Category"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-black/30">
                                <FiGrid size={20} />
                              </div>
                            )}
                          </div>

                          {/* CATEGORY INFO */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-black text-wrap">
                             {item.name?.toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                            <p className="mt-1 text-[11px] text-black/40">
                              Explore collection
                            </p>
                          </div>

                          <FiChevronRight
                            size={17}
                            className="shrink-0 text-black/30 transition-all duration-300 group-hover:text-black group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
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

          {/* Mobile Hamburger */}
          <div className="header-item flex flex-1 xl:hidden">
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

          {/* Center Logo */}
          <Link href="/" className="cursor-pointer mt-4 z-10">
            <img
              src="/images/logo1.webp"
              alt=""
              className="cursor-pointer w-32 md:w-36 pb-2"
            />
          </Link>

          {/* Right Nav Icons */}
          <div className="header-item flex flex-1 items-center justify-end gap-1 sm:gap-2 xl:gap-7">
            <nav className="hidden items-center gap-8 xl:flex">
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
                onClick={() => setOpenSearch(true)}
                className={iconClass}
              >
                <IoSearchOutline className="text-lg" />
              </button>

              {isUser ? (
                <Link
                  href="/account"
                  aria-label="Account"
                  className={iconClass}
                >
                  <FaRegUser className="text-lg" />
                </Link>
              ) : (
                <div
                  onClick={() => dispatch(toggle(true))}
                  className={`${iconClass} cursor-pointer`}
                >
                  <FaRegUser className="text-base" />
                </div>
              )}

              <Link
                href="/cart"
                aria-label="Cart"
                className={`${iconClass} relative`}
              >
                <IoBagHandleOutline className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-3.5 min-w-[14px] sm:h-4 sm:min-w-4 items-center justify-center rounded-full bg-[#e5c66f] px-1 text-[7px] sm:text-[8px] font-semibold text-[#250103]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <nav
          className={`absolute z-20 left-0 top-full w-full border-t border-[#d9bd72]/20 bg-[#1b0102] px-5 py-4 transition-all duration-300 xl:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100 pointer-events-auto"
              : "invisible -translate-y-3 pointer-events-none opacity-0"
          }`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="block border-b border-[#d9bd72]/15 py-4 text-sm text-[#fff9e6]"
          >
            Home
          </Link>

          <div className="border-b border-[#d9bd72]/15">
            <div className="flex w-full items-center justify-between py-4 text-sm text-[#fff9e6]">
              {/* Changed from "Products" to "Collections" here */}
              <span onClick={closeMenu} className="flex-1">
                Collections
              </span>
              <button
                type="button"
                onClick={() => setCollectionOpen((previous) => !previous)}
                className="pl-4 py-2"
              >
                <FaAngleDown
                  className={`text-xs transition-transform duration-300 ${
                    collectionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 ${
                collectionOpen ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-l border-[#d9bd72]/25 pl-4">
                  <Link
                    href="/products"
                    className="group flex items-center gap-4 p-3 mb-2 rounded-xl bg-p text-white transition-all duration-300"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                      <FiGrid size={22} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold ">
                        Shop All Products
                      </p>
                      <p className="text-xs opacity-60 mt-0.5">
                        Explore our complete collection
                      </p>
                    </div>

                    <FiChevronRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {/* CATEGORIES */}
                  {categories?.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {categories.map((item) => (
                        <Link
                          href={`/products?category=${item.slug}`}
                          key={item._id}
                          className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/95 transition-all duration-300"
                        >
                          {/* CATEGORY IMAGE */}
                          <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-white/95">
                            {item?.image ? (
                              <img
                                src={`${img_url}${item.image}`}
                                alt={item?.name || "Category"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/60">
                                <FiGrid size={20} />
                              </div>
                            )}
                          </div>

                          {/* CATEGORY INFO */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white ">
                              {item.name?.toLowerCase()
  .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                            <p className="mt-1 text-[11px] text-white/60">
                              Explore collection
                            </p>
                          </div>

                          <FiChevronRight
                            size={17}
                            className="shrink-0 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
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
        </nav>
      </header>

      <button
        type="button"
        aria-label="Close menu"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 xl:hidden ${
          menuOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};

export default Header;