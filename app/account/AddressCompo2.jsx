"use client";

import { base_url } from "@/components/utile";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import {
  IoBriefcaseOutline,
  IoCallOutline,
  IoCheckmarkCircle,
  IoHomeOutline,
  IoLocationOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const AddressCompo2 = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [defaultLoadingId, setDefaultLoadingId] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addresses, setAddresses] = useState([]);

  const fetchAddress = useCallback(async () => {
    try {
      setFetchLoading(true);

      const response = await axios.get(`${base_url}/address/get`);

      const addressList = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setAddresses(addressList);

      const defaultAddress =
        addressList.find((address) => address.isDefault) || addressList[0];

      setSelectedAddressId(defaultAddress?._id || "");
    } catch (error) {
      console.error("Fetch address error:", error);

      setAddresses([]);

      toast.error(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    } finally {
      setFetchLoading(false);
    }
  }, []);

  const deletAddress= async(id)=>{
    try {setFetchLoading(true);
        const response = await axios.delete(`${base_url}/address/delete/${id}`)
        const data = await response.data;
        if(data.success){
            toast.success(data.message)
            fetchAddress()
        }else{

            toast.error(data.message)
        }
    } catch (error) {
        console.log(first)
        toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  const handleSetDefault = async (addressId) => {
    if (!addressId || defaultLoadingId) return;

    try {
      setDefaultLoadingId(addressId);

      const response = await axios.patch(
        `${base_url}/address/set-default/${addressId}`
      );

      if (response.data?.success) {
        setAddresses((previousAddresses) =>
          previousAddresses.map((address) => ({
            ...address,
            isDefault: address._id === addressId,
          }))
        );

        setSelectedAddressId(addressId);

        toast.success(
          response.data?.message || "Default address updated"
        );
      }
    } catch (error) {
      console.error("Set default address error:", error);

      toast.error(
        error.response?.data?.message || "Failed to set default address"
      );
    } finally {
      setDefaultLoadingId("");
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b6a4a]">
              Saved Address
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-stone-950">
              My Addresses
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Select your preferred delivery address.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchAddress}
            disabled={fetchLoading}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IoRefreshOutline className={fetchLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {fetchLoading ? (
          <AddressSkeleton />
        ) : addresses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                selected={selectedAddressId === address._id}
                defaultLoading={defaultLoadingId === address._id}
                onSelect={() => setSelectedAddressId(address._id)}
                onSetDefault={() => handleSetDefault(address._id)}
                deletAddress={deletAddress}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-[#fffaf4] px-5 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6b1f12]/10 text-3xl text-[#6b1f12]">
              <IoLocationOutline />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-stone-950">
              No saved address found
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Add an address first to see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressCompo2;

const AddressCard = ({
  address,
  selected,
  defaultLoading,
  onSelect,
  onSetDefault,

  
}) => {
  const getAddressIcon = () => {
    if (address.addressType === "Work") {
      return <IoBriefcaseOutline />;
    }

    if (address.addressType === "Home") {
      return <IoHomeOutline />;
    }

    return <IoLocationOutline />;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect();
        }
      }}
      className={`relative cursor-pointer rounded-3xl border p-5 outline-none transition ${
        selected
          ? "border-[#6b1f12] bg-[#fff7ed] ring-1 ring-[#6b1f12]"
          : "border-stone-200 bg-white hover:border-stone-400"
      }`}
    >

        {/* <CiCircleRemove onClick={(e)=>
            {e.preventDefault(),
                deletAddress(address._id)

            }
            } className="absolute bottom-4 right-4  text-[#6b1f12] cursor-pointer text-2xl  font-bold" /> */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl ${
              address.isDefault
                ? "bg-[#6b1f12] text-white"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {getAddressIcon()}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-stone-950">
                {address.firstName} {address.lastName}
              </h3>

              {address.isDefault && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  Default
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              {address.addressType}
            </p>
          </div>
        </div>

        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#6b1f12] bg-[#6b1f12]"
              : "border-stone-300 bg-white"
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm leading-6 text-stone-600">
        <p>
          {address.houseNo}, {address.area}
        </p>

        {address.landmark && <p>Near {address.landmark}</p>}

        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>

        <p className="flex items-center gap-2 pt-2 font-medium text-stone-800">
          <IoCallOutline className="text-base" />
          {address.phone}
        </p>
      </div>

      {!address.isDefault && (
        <button
          type="button"
          disabled={defaultLoading}
          onClick={(event) => {
            event.stopPropagation();
            onSetDefault();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-[#6b1f12] hover:text-[#6b1f12] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IoCheckmarkCircle className="text-base" />
          {defaultLoading ? "Setting..." : "Set as Default"}
        </button>
      )}
    </div>
  );
};

const AddressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-3xl border border-stone-200 p-5"
        >
          <div className="flex gap-3">
            <div className="h-11 w-11 rounded-full bg-stone-200" />

            <div className="flex-1">
              <div className="h-4 w-32 rounded bg-stone-200" />
              <div className="mt-2 h-3 w-16 rounded bg-stone-200" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 w-full rounded bg-stone-200" />
            <div className="h-3 w-4/5 rounded bg-stone-200" />
            <div className="h-3 w-28 rounded bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  );
};