"use client";

import { toggle } from "@/components/store/toggleUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ordercompo from "./Ordercompo";
import AddressCompo2 from "./AddressCompo2";

const Page = () => {
  const { isUser, user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showingData,setShowingData]=useState("profile")

  useEffect(() => {
    if (!isLoading && !isUser) {
      dispatch(toggle(true));
      router.replace("/");
    }
  }, [isLoading, isUser, dispatch, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f2]">
        <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="animate-pulse rounded-3xl bg-white p-6 shadow-sm">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
            <div className="mt-5 h-5 w-48 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-72 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!isUser) return null;

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2b1512]">
      <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8b5a3c]">
            My Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#2b1512] sm:text-4xl">
            Welcome back, {user?.name || "Customer"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#73564d]">
            Manage your profile, orders, addresses, wishlist and account details
            from one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl h-fit lg:sticky top-10 border border-[#eadfd4] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {user?.image || user?.avatar ? (
                <img
                  src={user?.image || user?.avatar}
                  alt={user?.name || "User"}
                  className="h-24 w-24 rounded-full border-4 border-[#f3e5d8] object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#62080d] to-[#210102] text-4xl font-semibold text-white shadow-md">
                  {firstLetter}
                </div>
              )}

              <h2 className="mt-5 text-xl font-semibold">
                {user?.name || "User"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#73564d]">
                {user?.email || "No email found"}
              </p>
              {user?.phone && (
                <p className="mt-1 text-sm text-[#73564d]">{user.phone}</p>
              )}

              <span className="mt-4 rounded-full bg-[#f7eee6] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#62080d]">
                Active Customer
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <AccountLink label="My Profile" setShowingData={()=>setShowingData("profile")}/>
              <AccountLink  label="My Orders" setShowingData={()=>setShowingData("orders")}/>
                <AccountLink  label="Saved Addresses" setShowingData={()=>setShowingData("address")} />
              {/* <AccountLink type="wishlist" label="Wishlist" setShowingData={()=>setShowingData("profile")}/>
           
           <AccountLink type="cart" label="My Cart" setShowingData={()=>setShowingData("profile")}> */}
          
          <Link href={"/cart"} className="flex items-center justify-between rounded-2xl border border-[#f0e4d9] px-4 py-3 text-sm font-medium text-[#2b1512] transition hover:border-[#62080d] hover:bg-[#fff8f2]"
    >
      <span>My Cart</span>
      <span className="text-[#62080d]">→</span>
    </Link>
       <Link href={"/wishlist"} className="flex items-center justify-between rounded-2xl border border-[#f0e4d9] px-4 py-3 text-sm font-medium text-[#2b1512] transition hover:border-[#62080d] hover:bg-[#fff8f2]"
    >
      <span>Wishlist</span>
      <span className="text-[#62080d]">→</span>
    </Link>


          
            </div>
          </aside>


{showingData=="profile" &&
<ProfieCompo user={user} setShowingData={setShowingData}/>
}
{showingData=="orders" &&
<Ordercompo userId={user._id} />
}
{showingData=="address" &&
<AddressCompo2 userId={user._id} />
}


          
        </div>
      </main>
    </div>
  );
};

export default Page;

const AccountLink = ({ setShowingData, label, }) => {
  return (
    <div
      onClick={()=>setShowingData()}
      className="flex items-center justify-between rounded-2xl border border-[#f0e4d9] px-4 py-3 text-sm font-medium text-[#2b1512] transition hover:border-[#62080d] hover:bg-[#fff8f2]"
    >
      <span>{label}</span>
      <span className="text-[#62080d]">→</span>
    </div>
  );
};

const InfoCard = ({ title, value, href }) => {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#eadfd4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-sm font-medium text-[#73564d]">{title}</p>
      <h3 className="mt-3 text-2xl font-semibold text-[#2b1512]">{value}</h3>
      <p className="mt-2 text-sm text-[#8b5a3c]">Open section →</p>
    </Link>
  );
};

const DetailItem = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-[#faf7f2] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5a3c]">
        {label}
      </p>
      <p className="mt-2 break-all text-sm font-medium text-[#2b1512]">
        {value || "Not provided"}
      </p>
    </div>
  );
};


const ProfieCompo=({user,setShowingData})=>{
  return(

    <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* <InfoCard title="Orders" value="View"  /> */}
              <div
          onClick={()=>setShowingData("orders")}   className="rounded-3xl border cursor-pointer border-[#eadfd4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">    
      <p className="text-sm font-medium text-[#73564d]">Orders</p>
      <h3 className="mt-3 text-2xl font-semibold text-[#2b1512]">View</h3>
      <p className="mt-2 text-sm text-[#8b5a3c]">Open section →</p>
    </div>
              <InfoCard title="Wishlist" value="Saved" href="/wishlist" />
              {/* <InfoCard title="Addresses" value="Manage"/> */}
              <div
   onClick={()=>setShowingData("address")}
      className="rounded-3xl border cursor-pointer border-[#eadfd4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-sm font-medium text-[#73564d]">Addresses</p>
      <h3 className="mt-3 text-2xl font-semibold text-[#2b1512]">Manage</h3>
      <p className="mt-2 text-sm text-[#8b5a3c]">Open section →</p>
    </div>
            </div>

            <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 border-b border-[#f0e4d9] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Profile Details</h3>
                  <p className="mt-1 text-sm text-[#73564d]">
                    Your personal account information.
                  </p>
                </div>

                <Link
                  href="/profile/edit"
                  className="w-fit rounded-full bg-[#62080d] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#210102]"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailItem label="Full Name" value={user?.name} />
                <DetailItem label="Email Address" value={user?.email} />
                <DetailItem label="Phone Number" value={user?.phone} />
                <DetailItem label="Role" value={user?.role || "Customer"} />
              </div>
            </div>

            <div className="rounded-3xl border border-[#eadfd4] bg-gradient-to-br from-[#210102] via-[#62080d] to-[#210102] p-6 text-white shadow-sm">
              <h3 className="text-xl font-semibold">Need help?</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Track your order, update delivery address, or contact support if
                you need help with your purchase.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/track-order"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#62080d] transition hover:bg-[#f7eee6]"
                >
                  Track Order
                </Link>

                <Link
                  href="/contact-us"
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </section>
  )
}

// const OrderCompo = ({userId})=>{






// return(
// <div>


// </div>


// )
// }