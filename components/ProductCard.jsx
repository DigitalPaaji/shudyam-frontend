"use client"
import Image from "next/image";
import { useState } from "react";
import { base_url, img_url } from "./utile";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart } from "./store/AddtoCartLocal";
import { addinCart } from "./store/userSlice";

const ProductCard = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);
  const {isUser} = useSelector(state=>state.user)
const dispatch = useDispatch()


  const sellingPrice = Number(
    activeVariant.mrp
  );

  const originalPrice = Number(
  activeVariant.basePrice
  );

  const discountPercentage =
    originalPrice > sellingPrice
      ? Math.round(
          ((originalPrice - sellingPrice) / originalPrice) * 100
        )
      : 0;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const handleVariantChange = (event) => {
    const selectedSize = event.target.value;

    const selectedVariant = product.variants.find(
      (variant) => variant._id === selectedSize
    );

    if (selectedVariant) {
      setActiveVariant(selectedVariant);
    }
  };







  const handleAddToCart = async (e) => {
    e.preventDefault()
      if (
        !product ||
        !activeVariant
      ) {
        return;
      }
  
      const cartData = {
        productid: product._id,
        variantid: activeVariant._id,
        quantity : 1,
        price:sellingPrice
      };
  
  if(isUser){
  
  try {
    const response = await axios.post(`${base_url}/cart/add`,{
      productid:product._id,
      variantid:activeVariant._id ,
      quantity:1
    })
    
    const data = await response.data;
     
    if(data.success){
  
      toast.success(data.message)
       if(data.addNew){
      
            dispatch(addinCart())
          }
    }
  else{
    toast.error(data.message)
  }
  
    
  } catch (error) {
    console.log(error)
    // toast.error(error.response.data.message)
  
  }
  
  
  
  }else{
    dispatch(addToCart(cartData))
    toast.success("Add to cart")
    // setGotoCast(true)
  }
  
    
    };




  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full flex-col">
      {/* Product Image */}
      <div className="relative  w-full overflow-hidden bg-[#fbf6e7]">
        {discountPercentage > 0 && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-[#870008] px-3 py-1.5 text-[10px] font-medium tracking-wide text-white">
            {discountPercentage}% OFF
          </span>
        )}

       <img
               src={`${img_url}${product.thumbnail}`}
               alt={product.name}
             
               
               className="object-cover object-center    p-7"
             />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col pt-4">
 <h3
              title={product.name}
              className=" mb-1    text-sm font-medium text-[#650006]"
            >
              {product.name}
            </h3>

        <div className="mb-3 flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* <h3
              title={product.name}
              className=" hidden md:inline-block  truncate text-sm font-medium text-[#650006]"
            >
              {product.name}
            </h3> */}

            <div className="mt-1 flex flex-wrap items-center md:gap-2">
              <span className="text-sm font-semibold text-[#790007]">
                Rs. {formatPrice(sellingPrice)}
              </span>
{originalPrice != null &&
  originalPrice !== "" &&
  !isNaN(Number(originalPrice)) &&
  Number(originalPrice) > 0 && (
    <span className="text-xs text-[#987f76] line-through">
      Rs. {formatPrice(Number(originalPrice))}
    </span>
  )}
              
            </div>
          </div>

          <div className="shrink-0">
            <select
              value={activeVariant.size}
              onChange={handleVariantChange}
                onClick={(e)=>e.preventDefault()}
              aria-label={`Select size for ${product.title}`}
              className="cursor-pointer rounded-md border border-[#eee4ce] bg-[#f5edda] px-1.5 py-1 text-xs text-[#790007] outline-none transition hover:border-[#790007]/30 focus:border-[#790007]"
            >
              {product.variants.map((variant) => (
                <option key={variant._id} value={variant._id} className=" hover:bg-p">
                   {variant.attributes.value} 
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="cursor-pointer mt-auto w-full rounded-[3px] bg-[#800007] px-5 py-3 text-xs font-medium text-white transition-all duration-300 hover:bg-[#5f0005] active:scale-[0.98]"
        >
          + Add To Cart
        </button>
      </div>
    </Link>
  );
};
export default ProductCard