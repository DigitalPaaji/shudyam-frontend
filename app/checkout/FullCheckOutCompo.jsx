"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import AddressCompo from './AddressCompo';
import { toast } from 'react-toastify';
import axios from 'axios';
import { base_url } from '@/components/utile';
import { removeinCartall } from '@/components/store/userSlice';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true
const FullCheckOutCompo = () => {
const searchParams = useSearchParams();
  const cartParam = JSON.parse(searchParams.get("cart"));
  const ordertype = searchParams.get("type");
 const router =useRouter()
 const dispatch = useDispatch()
const [checkoutData,setCheckoutData] =useState({
  address:"",
  price:"",
  discount:"",
  totalPrice:"",
  items:[]

})


  
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.onload = () => resolve(Boolean(window.Razorpay));
      existingScript.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      resolve(Boolean(window.Razorpay));
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const handleSubmitPayment = async () => {
  try {
    console.log("Payment started");
  
    const scriptLoaded = await loadRazorpay();

    console.log("Razorpay loaded:", scriptLoaded);
    console.log("window.Razorpay:", window.Razorpay);

    if (!scriptLoaded || !window.Razorpay) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderResponse = await axios.post(
      `${base_url}/order/create`,
      checkoutData,
      {
        withCredentials: true,
      }
    );

    const data = orderResponse.data;

    console.log("Order create response:", data);

    if (!data.success) {
      toast.error(data.message || "Failed to create payment order");
      return;
    }

    if (!data.key) {
      toast.error("Razorpay key missing");
      console.log("Missing key:", data);
      return;
    }

    if (!data.order?.id) {
      toast.error("Razorpay order id missing");
      console.log("Missing order id:", data);
      return;
    }

    if (!data.order?.amount) {
      toast.error("Razorpay amount missing");
      console.log("Missing amount:", data);
      return;
    }

    const selectedAddress = checkoutData?.address || checkoutData?.shippingAddress;

    const customerName =
      checkoutData?.name ||
      `${selectedAddress?.firstName || ""} ${selectedAddress?.lastName || ""}`.trim() ||
      "Customer";

    const customerEmail = checkoutData?.email || "";
    const customerPhone =
      checkoutData?.phone || selectedAddress?.phone || "";

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency || "INR",
      name: "Shudhyam",
      description: "Order Payment",
      order_id: data.order.id,

      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },

      theme: {
        color: "#111827",
      },

      handler: async function (response) {
        try {
          console.log("Razorpay payment success response:", response);

          const verifyResponse = await axios.post(
            `${base_url}/order/verify`,
            {
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ordertype
            },
            {
              withCredentials: true,
            }
          );


          if (verifyResponse.data.success) {
            toast.success("Payment successful");

            dispatch(removeinCartall());
            router.push(`/account`);
          } else {
            toast.error(
              verifyResponse.data.message || "Payment verification failed"
            );
          }
        } catch (error) {
          console.error("Payment verify error:", error);

          toast.error(
            error.response?.data?.message || "Payment verification failed"
          );
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Razorpay popup closed");
          toast.info("Payment popup closed");
        },
      },
    };


    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);

      toast.error(response.error?.description || "Payment failed");
    });

    console.log("Opening Razorpay popup");

    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Something went wrong"
    );
  }
};





  return (
    <div className='min-h-screen'>
              <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />






        
        <div className='px-4 md:px-12 lg:px-24 xl:px-40 py-24 grid lg:grid-cols-3 gap-5'>
<div className='col-span-2'>

<AddressCompo  selectedAddressId={checkoutData.address} setSelectedAddressId={(itm)=>setCheckoutData(prev=>({...prev,address:itm}))}   />




    </div>


    <div className='col-span-1'>
      <CheckoutProduct handelSubmitPayment={handleSubmitPayment} product={cartParam}  setCheckoutData={(item)=>setCheckoutData(prev=>({...prev,...item}))}/>
    </div>









        </div>



        


        
        
        
        </div>
  )
}

export default FullCheckOutCompo