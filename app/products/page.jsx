"use client";

import ProductCard from "@/components/ProductCard";
import { base_url } from "@/components/utile";
import axios from "axios";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const PRICE_MIN = 0;
const PRICE_MAX = 40000;
const PRICE_STEP = 100;

const sortArray = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Price: Low to High",
    value: "price-low",
  },
  {
    name: "Price: High to Low",
    value: "price-high",
  },
  {
    name: "Name: A to Z",
    value: "name-asc",
  },
  {
    name: "Name: Z to A",
    value: "name-desc",
  },
];

/* ----------------------------------
   Price range slider
---------------------------------- */

const PriceRangeSlider = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}) => {
  const minPercent =
    ((minValue - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const maxPercent =
    ((maxValue - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const handleMinRange = (event) => {
    const value = Number(event.target.value);

    setMinValue(
      Math.min(value, maxValue - PRICE_STEP)
    );
  };

  const handleMaxRange = (event) => {
    const value = Number(event.target.value);

    setMaxValue(
      Math.max(value, minValue + PRICE_STEP)
    );
  };

  const handleMinInput = (event) => {
    const rawValue = event.target.value;

    if (rawValue === "") return;

    const value = Number(rawValue);

    if (Number.isNaN(value)) return;

    setMinValue(
      Math.min(
        Math.max(value, PRICE_MIN),
        maxValue - PRICE_STEP
      )
    );
  };

  const handleMaxInput = (event) => {
    const rawValue = event.target.value;

    if (rawValue === "") return;

    const value = Number(rawValue);

    if (Number.isNaN(value)) return;

    setMaxValue(
      Math.max(
        Math.min(value, PRICE_MAX),
        minValue + PRICE_STEP
      )
    );
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        .price-range-input {
          pointer-events: none;
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 0;
          margin: 0;
          appearance: none;
          -webkit-appearance: none;
          transform: translateY(-50%);
          background: transparent;
          outline: none;
        }

        .price-range-input::-webkit-slider-runnable-track {
          height: 0;
          border: none;
          background: transparent;
        }

        .price-range-input::-webkit-slider-thumb {
          pointer-events: auto;
          width: 21px;
          height: 21px;
          border: 4px solid white;
          border-radius: 9999px;
          appearance: none;
          -webkit-appearance: none;
          cursor: grab;
          background: #760209;
          box-shadow:
            0 0 0 1px rgba(118, 2, 9, 0.16),
            0 5px 14px rgba(118, 2, 9, 0.28);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .price-range-input::-webkit-slider-thumb:hover {
          transform: scale(1.08);
          box-shadow:
            0 0 0 4px rgba(118, 2, 9, 0.08),
            0 6px 16px rgba(118, 2, 9, 0.3);
        }

        .price-range-input::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.12);
        }

        .price-range-input::-moz-range-track {
          height: 0;
          border: none;
          background: transparent;
        }

        .price-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border: 4px solid white;
          border-radius: 9999px;
          cursor: grab;
          background: #760209;
          box-shadow:
            0 0 0 1px rgba(118, 2, 9, 0.16),
            0 5px 14px rgba(118, 2, 9, 0.28);
        }

        .price-number-input::-webkit-outer-spin-button,
        .price-number-input::-webkit-inner-spin-button {
          margin: 0;
          appearance: none;
          -webkit-appearance: none;
        }

        .price-number-input {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Selected prices */}
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-xl border border-black/10 bg-[#FFF9F2] px-3 py-2 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
            Minimum
          </p>

          <p className="mt-0.5 text-sm font-semibold text-[#260305]">
            ₹{minValue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="h-px w-5 bg-black/15" />

        <div className="rounded-xl border border-black/10 bg-[#FFF9F2] px-3 py-2 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
            Maximum
          </p>

          <p className="mt-0.5 text-sm font-semibold text-[#260305]">
            ₹{maxValue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="px-1">
        <div className="relative h-9">
          {/* Full track */}
          <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/10" />

          {/* Active track */}
          <div
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#570207] to-[#9A181E]"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* Minimum handle */}
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={minValue}
            onChange={handleMinRange}
            aria-label="Minimum product price"
            className={`price-range-input ${
              minValue > PRICE_MAX - PRICE_STEP * 5
                ? "z-30"
                : "z-20"
            }`}
          />

          {/* Maximum handle */}
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={maxValue}
            onChange={handleMaxRange}
            aria-label="Maximum product price"
            className="price-range-input z-20"
          />
        </div>

        <div className="mt-1 flex items-center justify-between text-[11px] font-medium text-gray-400">
          <span>
            ₹{PRICE_MIN.toLocaleString("en-IN")}
          </span>

          <span>
            ₹{PRICE_MAX.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Manual inputs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="minimum-price"
            className="mb-2 block text-xs font-medium text-gray-500"
          >
            Minimum price
          </label>

          <div className="flex items-center rounded-xl border border-black/10 bg-white px-3 transition duration-200 focus-within:border-p focus-within:ring-4 focus-within:ring-p/5">
            <span className="text-sm font-medium text-gray-400">
              ₹
            </span>

            <input
              id="minimum-price"
              type="number"
              value={minValue}
              min={PRICE_MIN}
              max={maxValue - PRICE_STEP}
              step={PRICE_STEP}
              onChange={handleMinInput}
              className="price-number-input min-w-0 flex-1 bg-transparent px-2 py-3 text-sm font-medium text-[#260305] outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="maximum-price"
            className="mb-2 block text-xs font-medium text-gray-500"
          >
            Maximum price
          </label>

          <div className="flex items-center rounded-xl border border-black/10 bg-white px-3 transition duration-200 focus-within:border-p focus-within:ring-4 focus-within:ring-p/5">
            <span className="text-sm font-medium text-gray-400">
              ₹
            </span>

            <input
              id="maximum-price"
              type="number"
              value={maxValue}
              min={minValue + PRICE_STEP}
              max={PRICE_MAX}
              step={PRICE_STEP}
              onChange={handleMaxInput}
              className="price-number-input min-w-0 flex-1 bg-transparent px-2 py-3 text-sm font-medium text-[#260305] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};



const FilterSection = ({
  showFilter,
  setShowFilter,
  category,
  categories,
  categoryLoading,
  categoryError,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  onCategoryChange,
  onApplyPrice,
  onClearPrice,
  onClearAll,
  totalProducts,
}) => {
  const isPriceChanged =
    minValue > PRICE_MIN || maxValue < PRICE_MAX;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 ${
        showFilter
          ? "pointer-events-auto visible"
          : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={() => setShowFilter(false)}
        className={`absolute inset-0 h-full w-full bg-black/45 backdrop-blur-[3px] transition-opacity duration-300 ${
          showFilter ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Filter drawer */}
      <aside
        className={`absolute inset-y-0 left-0 flex w-[92%] max-w-[420px] flex-col overflow-hidden bg-[#FFFCF7] shadow-[20px_0_70px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-p/60">
              Refine collection
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#260305]">
              Filters
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilter(false)}
            className="flex items-center justify-center rounded-full  text-gray-500 transition duration-200 hover:border-p/30 hover:bg-p  cursor-pointer"
          >
            <MdOutlineCancel className="text-2xl" />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto  custom-scrollbar px-5 py-7 sm:px-6">
          {/* Categories */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#260305]">
                  Categories
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Choose a product collection
                </p>
              </div>

              {category && (
                <button
                  type="button"
                  onClick={() => {onCategoryChange(""),setShowFilter(false)}}
                  className="text-xs font-semibold text-p transition hover:opacity-60"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {onCategoryChange(""),setShowFilter(false)}}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  !category
                    ? "border-p bg-p text-white shadow-[0_5px_18px_rgba(118,2,9,0.2)]"
                    : "border-black/10 bg-white text-gray-600 hover:border-p/40 hover:text-p"
                }`}
              >
                All Products
              </button>

              {categoryLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-9 w-24 animate-pulse rounded-full bg-black/5"
                    />
                  ))
                : categories.map((item) => {
                    const isActive = item.slug === category;
                    const categoryName =
                      item.name || item.title || "Category";

                    return (
                      <button
                        type="button"
                        key={item._id}
                        onClick={() =>{
                          onCategoryChange(item.slug),setShowFilter(false)}
                        }
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-p bg-p text-white shadow-[0_5px_18px_rgba(118,2,9,0.2)]"
                            : "border-black/10 bg-white text-gray-600 hover:border-p/40 hover:text-p"
                        }`}
                      >
                        {categoryName}
                      </button>
                    );
                  })}
            </div>

            {categoryError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {categoryError}
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="my-8 h-px bg-black/10" />

          {/* Price */}
          <section>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#260305]">
                  Price Range
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Set your preferred budget
                </p>
              </div>

              {isPriceChanged && (
                <button
                  type="button"
                  onClick={onClearPrice}
                  className="text-xs font-semibold text-p transition hover:opacity-60"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
              <PriceRangeSlider
                minValue={minValue}
                maxValue={maxValue}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
              />
            </div>

            <button
              type="button"
              onClick={()=>{onApplyPrice(),setShowFilter(false)}}
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#260305] px-4 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-p"
            >
              Apply Price Range
            </button>
          </section>
        </div>

        {/* Footer actions */}
        <footer className="border-t border-black/10 bg-white px-5 py-4 sm:px-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={()=>{onClearAll(),setShowFilter(false)}}
              className="w-[38%] rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-p hover:text-p"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={() => setShowFilter(false)}
              className="flex-1 rounded-xl bg-p px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(118,2,9,0.2)] transition hover:opacity-90"
            >
              View {totalProducts || 0} Products
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
};






const ProductsPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    categories = [],
    error: categoryError,
    loading: categoryLoading,
  } = useSelector((state) => state.categories);

  const category = searchParams.get("category") || "";

  const currentPage = Math.max(
    Number(searchParams.get("page")) || 1,
    1
  );

  const appliedMin = Math.max(
    Number(searchParams.get("min")) || PRICE_MIN,
    PRICE_MIN
  );

  const appliedMax = Math.min(
    Number(searchParams.get("max")) || PRICE_MAX,
    PRICE_MAX
  );

  const sort = searchParams.get("sort") || "newest";

  const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [productError, setProductError] = useState("");

  const [minValue, setMinValue] = useState(appliedMin);
  const [maxValue, setMaxValue] = useState(appliedMax);

  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 16,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const priceFilterApplied =
    appliedMin !== PRICE_MIN ||
    appliedMax !== PRICE_MAX;

  /* Keep slider synchronized with URL */
  useEffect(() => {
    setMinValue(appliedMin);
    setMaxValue(appliedMax);
  }, [appliedMin, appliedMax]);

  /* Prevent page scroll behind mobile drawer */
  useEffect(() => {
    document.body.style.overflow = showFilter
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter]);

  const updateQuery = (updates) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();

    router.push(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
      {
        scroll: false,
      }
    );
  };

  /* Fetch products */
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductError("");

        const response = await axios.get(
          `${base_url}/cache/product/get`,
          {
            params: {
              page: currentPage,
              category: category || undefined,
              min: appliedMin,
              max: appliedMax,
              sort,
            },
            signal: controller.signal,
          }
        );

        const data = response.data;

        if (!data?.success) {
          throw new Error(
            data?.message || "Failed to fetch products"
          );
        }

        setProducts(data.products || []);

        setPagination(
          data.pagination || {
            totalProducts: 0,
            totalPages: 0,
            currentPage,
            limit: 16,
            hasNextPage: false,
            hasPreviousPage: false,
          }
        );
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error("Fetch products error:", error);

        setProducts([]);

        setProductError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load products"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [
    category,
    currentPage,
    appliedMin,
    appliedMax,
    sort,
  ]);

  const handleCategoryChange = (slug) => {
    updateQuery({
      category: slug || null,
      page: null,
    });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;

    updateQuery({
      sort: value === "newest" ? null : value,
      page: null,
    });
  };

  const applyPriceFilter = () => {
    if (minValue >= maxValue) {
      setProductError(
        "Minimum price must be lower than maximum price."
      );

      return;
    }

    setProductError("");

    updateQuery({
      min:
        minValue === PRICE_MIN
          ? null
          : minValue,
      max:
        maxValue === PRICE_MAX
          ? null
          : maxValue,
      page: null,
    });
  };

  const clearPriceFilter = () => {
    setMinValue(PRICE_MIN);
    setMaxValue(PRICE_MAX);

    updateQuery({
      min: null,
      max: null,
      page: null,
    });
  };

  const clearAllFilters = () => {
    setMinValue(PRICE_MIN);
    setMaxValue(PRICE_MAX);

    router.push(pathname, {
      scroll: false,
    });
  };

  const changePage = (newPage) => {
    if (
      newPage < 1 ||
      newPage > pagination.totalPages
    ) {
      return;
    }

    updateQuery({
      page: newPage === 1 ? null : newPage,
    });

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  const pageNumbers = useMemo(() => {
    const totalPages = pagination.totalPages;
    const activePage = pagination.currentPage;

    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (activePage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (activePage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      totalPages,
    ];
  }, [
    pagination.totalPages,
    pagination.currentPage,
  ]);

  const selectedCategoryName =
    categories.find(
      (item) => item.slug === category
    )?.name ||
    categories.find(
      (item) => item.slug === category
    )?.title ||
    category;

  return (
    <div className="min-h-screen bg-[#FFF9E6]">
      {/* Banner */}
      <section className="relative h-[38vh] min-h-[280px] overflow-hidden sm:h-[48vh] lg:h-[65vh]">
        <img
          src="/images/banner.png"
          alt="Premium copper products"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

        {/* <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40">
          <div className="max-w-xl text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#F4C86A] sm:text-sm">
              Premium Collection
            </p>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
              Timeless Copper Essentials
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Explore premium copper products designed for
              traditional and modern living.
            </p>
          </div>
        </div> */}
      </section>

      <FilterSection
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        category={category}
        categories={categories}
        categoryLoading={categoryLoading}
        categoryError={categoryError}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onCategoryChange={handleCategoryChange}
        onApplyPrice={applyPriceFilter}
        onClearPrice={clearPriceFilter}
        onClearAll={clearAllFilters}
        totalProducts={pagination.totalProducts}
      />

      <main className="px-4 py-12 sm:px-6 md:px-12 lg:px-24 lg:py-20 xl:px-40">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-p">
              Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-[#260305] sm:text-4xl">
              Explore Products
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {loading
                ? "Loading products..."
                : `${pagination.totalProducts} products found`}
            </p>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => setShowFilter(true)}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-p px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:flex-none"
            >
              <IoFilterOutline className="text-lg" />

              <span>Filter</span>

              {(category || priceFilterApplied) && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-p">
                  {Number(Boolean(category)) +
                    Number(priceFilterApplied)}
                </span>
              )}
            </button>

            <select
              value={sort}
              onChange={handleSortChange}
              className="min-w-0 flex-1 cursor-pointer rounded-lg border-2 border-p bg-white px-3 py-2.5 text-sm text-[#260305] outline-none sm:min-w-[210px]"
            >
              {sortArray.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(category || priceFilterApplied) && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-gray-500">
              Active filters:
            </span>

            {category && (
              <button
                type="button"
                onClick={() =>
                  handleCategoryChange("")
                }
                className="flex items-center gap-2 rounded-full bg-p px-3 py-1.5 text-xs text-white"
              >
                {selectedCategoryName}
                <MdOutlineCancel />
              </button>
            )}

            {priceFilterApplied && (
              <button
                type="button"
                onClick={clearPriceFilter}
                className="flex items-center gap-2 rounded-full bg-p px-3 py-1.5 text-xs text-white"
              >
                ₹{appliedMin.toLocaleString("en-IN")} – ₹
                {appliedMax.toLocaleString("en-IN")}
                <MdOutlineCancel />
              </button>
            )}

            <button
              type="button"
              onClick={clearAllFilters}
              className="ml-1 text-xs font-medium text-p underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Error */}
        {productError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {productError}
          </div>
        )}

        <div className="min-h-screen">
        {loading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                >
                  <div className="aspect-[3/4] rounded-xl bg-gray-200" />

                  <div className="mt-4 h-4 w-4/5 rounded bg-gray-200" />

                  <div className="mt-2 h-4 w-2/5 rounded bg-gray-200" />

                  <div className="mt-3 h-5 w-3/5 rounded bg-gray-200" />
                </div>
              )
            )}
          </div>
        ) : products.length > 0 ? (
          <div className=" grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-white px-5 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-p/10">
              <IoFilterOutline className="text-2xl text-p" />
            </div>

            <h3 className="text-xl font-semibold text-[#260305]">
              No products found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              No products match the selected category or
              price range.
            </p>

            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-6 rounded-lg bg-p px-6 py-3 text-sm font-medium text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() =>
                changePage(currentPage - 1)
              }
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm transition hover:border-p disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft />

              <span className="hidden sm:inline">
                Previous
              </span>
            </button>

            {pageNumbers.map((pageNumber, index) =>
              pageNumber === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="flex h-10 w-8 items-center justify-center text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() =>
                    changePage(pageNumber)
                  }
                  className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                    pagination.currentPage ===
                    pageNumber
                      ? "border-p bg-p text-white"
                      : "border-black/10 bg-white text-gray-700 hover:border-p"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() =>
                changePage(currentPage + 1)
              }
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm transition hover:border-p disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="hidden sm:inline">
                Next
              </span>

              <FaChevronRight />
            </button>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

/* Suspense required for useSearchParams in Next.js */
const ProductsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FFF9E6]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-p/20 border-t-p" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;