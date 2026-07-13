"use client";

import { base_url } from "@/components/utile";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  IoAddOutline,
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoCallOutline,
  IoCheckmarkCircle,
  IoCloseOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoMapOutline,
  IoPersonOutline,
  IoSaveOutline,
} from "react-icons/io5";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  pincode: "",
  state: "",
  city: "",
  houseNo: "",
  area: "",
  landmark: "",
  addressType: "Home",
  isDefault: false,
};

const AddressCompo = ({selectedAddressId,setSelectedAddressId}) => {
  const [formData, setFormData] = useState(initialForm);
  const [addresses, setAddresses] = useState([]);
 

  const [errors, setErrors] = useState({});

  const [formLoading, setFormLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [defaultLoadingId, setDefaultLoadingId] =
    useState("");

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const { isUser } = useSelector((state) => state.user);

  /*
   * Fetch all logged-in user's addresses
   */
  const fetchAddress = useCallback(async () => {
    if (!isUser) {
      setAddresses([]);
      setSelectedAddressId("");
      return;
    }

    try {
      setFetchLoading(true);

      const response = await axios.get(
        `${base_url}/address/get`
      );

      const addressList = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setAddresses(addressList);

    
      const defaultAddress =
        addressList.find((address) => address.isDefault) ||
        addressList[0];

      setSelectedAddressId(defaultAddress?._id || "");

     
      setShowAddressForm(addressList.length === 0);
    } catch (error) {
      console.error("Fetch address error:", error);

      setAddresses([]);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch addresses"
      );
    } finally {
      setFetchLoading(false);
    }
  }, [isUser]);


  useEffect(() => {
    try {
      const temporaryAddress =
        localStorage.getItem("addresstemp");

      if (temporaryAddress) {
        const parsedAddress =
          JSON.parse(temporaryAddress);

        setFormData({
          firstName: parsedAddress.firstName || "",
          lastName: parsedAddress.lastName || "",
          phone: parsedAddress.phone || "",
          pincode: parsedAddress.pincode || "",
          state: parsedAddress.state || "",
          city: parsedAddress.city || "",
          houseNo: parsedAddress.houseNo || "",
          area: parsedAddress.area || "",
          landmark: parsedAddress.landmark || "",
          addressType:
            parsedAddress.addressType || "Home",
          isDefault: Boolean(parsedAddress.isDefault),
        });
      }
    } catch (error) {
      console.error(
        "Temporary address parse error:",
        error
      );

      localStorage.removeItem("addresstemp");
    }

    fetchAddress();
  }, [fetchAddress]);

 

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    let updatedValue =
      type === "checkbox" ? checked : value;

    if (name === "phone" || name === "pincode") {
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData((previous) => ({
      ...previous,
      [name]: updatedValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.houseNo.trim()) {
      newErrors.houseNo =
        "House or flat number is required";
    }

    if (!formData.area.trim()) {
      newErrors.area =
        "Area or locality is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    /*
     * Save temporarily when user is not logged in
     */
    if (!isUser) {
      localStorage.setItem(
        "addresstemp",
        JSON.stringify(formData)
      );

      toast.success("Address saved temporarily");
      return;
    }

    try {
      setFormLoading(true);

      const response = await axios.post(
        `${base_url}/address/create`,
        formData
      );

      if (response.data?.success) {
        toast.success(
          response.data?.message ||
            "Address added successfully"
        );

        localStorage.removeItem("addresstemp");

        setFormData(initialForm);
        setErrors({});
        setShowAddressForm(false);

        await fetchAddress();
      }
    } catch (error) {
      console.error(
        "Create address error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add address"
      );
    } finally {
      setFormLoading(false);
    }
  };


  const handleSetDefault = async (addressId) => {
    if (!addressId || defaultLoadingId) return;

    try {
      setDefaultLoadingId(addressId);

      const response = await axios.patch(
        `${base_url}/address/set-default/${addressId}`
      );

      if (response.data?.success) {
        /*
         * Update all addresses locally.
         * Selected address becomes true, all others false.
         */
        setAddresses((previousAddresses) =>
          previousAddresses.map((address) => ({
            ...address,
            isDefault: address._id === addressId,
          }))
        );

        setSelectedAddressId(addressId);

        toast.success(
          response.data?.message ||
            "Default address updated"
        );
      }
    } catch (error) {
      console.error(
        "Set default address error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to set default address"
      );
    } finally {
      setDefaultLoadingId("");
    }
  };

  const openAddressForm = () => {
    setFormData(initialForm);
    setErrors({});
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setFormData(initialForm);
    setErrors({});
    setShowAddressForm(false);
  };

  const inputClasses = (field) => `
    w-full rounded-xl border bg-white px-4 py-3 pl-11
    text-sm text-gray-900 outline-none transition
    placeholder:text-gray-400 focus:ring-2
    ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
    }
  `;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
     

        {isUser && (
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Delivery Address
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select a saved address or add a new one.
                </p>
              </div>

              {!showAddressForm && (
                <button
                  type="button"
                  onClick={openAddressForm}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                  <IoAddOutline className="text-lg" />
                  Add New Address
                </button>
              )}
            </div>

            {fetchLoading ? (
              <AddressSkeleton />
            ) : addresses.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    selected={
                      selectedAddressId === address._id
                    }
                    defaultLoading={
                      defaultLoadingId === address._id
                    }
                    onSelect={() =>
                      setSelectedAddressId(address._id)
                    }
                    onSetDefault={() =>
                      handleSetDefault(address._id)
                    }
                  />
                ))}
              </div>
            ) : (
              !showAddressForm && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
                  <IoLocationOutline className="mx-auto text-5xl text-gray-400" />

                  <h3 className="mt-4 font-semibold text-gray-900">
                    No saved address found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Add your delivery address to continue.
                  </p>

                  <button
                    type="button"
                    onClick={openAddressForm}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white"
                  >
                    <IoAddOutline className="text-lg" />
                    Add Address
                  </button>
                </div>
              )
            )}
          </section>
        )}

        {/* Address form */}

        {(!isUser ||
          showAddressForm ||
          addresses.length === 0) && (
          <section
            className={
              isUser && addresses.length > 0
                ? "mt-8 border-t border-gray-200 pt-8"
                : ""
            }
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Add New Address
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter your delivery address information.
                </p>
              </div>

              {isUser && addresses.length > 0 && (
                <button
                  type="button"
                  onClick={closeAddressForm}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-600 transition hover:bg-gray-100"
                >
                  <IoCloseOutline />
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  icon={<IoPersonOutline />}
                  error={errors.firstName}
                  inputClass={inputClasses(
                    "firstName"
                  )}
                  required
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  icon={<IoPersonOutline />}
                  inputClass={inputClasses(
                    "lastName"
                  )}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  icon={<IoCallOutline />}
                  error={errors.phone}
                  inputClass={inputClasses("phone")}
                  maxLength={10}
                  required
                />

                <InputField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  icon={<IoLocationOutline />}
                  error={errors.pincode}
                  inputClass={inputClasses(
                    "pincode"
                  )}
                  maxLength={6}
                  inputMode="numeric"
                  required
                />

                <InputField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  icon={<IoMapOutline />}
                  error={errors.state}
                  inputClass={inputClasses("state")}
                  required
                />

                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  icon={<IoBusinessOutline />}
                  error={errors.city}
                  inputClass={inputClasses("city")}
                  required
                />

                <InputField
                  label="House / Flat Number"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="House no., flat no., building"
                  icon={<IoHomeOutline />}
                  error={errors.houseNo}
                  inputClass={inputClasses(
                    "houseNo"
                  )}
                  required
                />

                <InputField
                  label="Area / Locality"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Street, area or locality"
                  icon={<IoLocationOutline />}
                  error={errors.area}
                  inputClass={inputClasses("area")}
                  required
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark (optional)"
                    icon={<IoLocationOutline />}
                    inputClass={inputClasses(
                      "landmark"
                    )}
                  />
                </div>
              </div>

              {/* Address type */}

              <div className="mt-7">
                <label className="mb-3 block text-sm font-medium text-gray-800">
                  Address Type
                </label>

                <div className="grid grid-cols-3 gap-3">
                  <AddressTypeButton
                    type="Home"
                    icon={<IoHomeOutline />}
                    selected={
                      formData.addressType === "Home"
                    }
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        addressType: "Home",
                      }))
                    }
                  />

                  <AddressTypeButton
                    type="Work"
                    icon={<IoBriefcaseOutline />}
                    selected={
                      formData.addressType === "Work"
                    }
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        addressType: "Work",
                      }))
                    }
                  />

                  <AddressTypeButton
                    type="Other"
                    icon={<IoLocationOutline />}
                    selected={
                      formData.addressType === "Other"
                    }
                    onClick={() =>
                      setFormData((previous) => ({
                        ...previous,
                        addressType: "Other",
                      }))
                    }
                  />
                </div>
              </div>

              {/* Default checkbox */}

              {isUser && (
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 accent-gray-900"
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Make this my default address
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      This address will be selected
                      automatically during checkout.
                    </p>
                  </div>
                </label>
              )}

              {/* Form actions */}

              <div className="mt-7 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                {isUser &&
                  addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={closeAddressForm}
                      disabled={formLoading}
                      className="rounded-xl border border-gray-300 px-7 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  )}

                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IoSaveOutline className="text-lg" />

                  {formLoading
                    ? "Saving..."
                    : "Save Address"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default AddressCompo;

/*
 * Input component
 */

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  inputClass,
  required = false,
  type = "text",
  maxLength,
  inputMode,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

/*
 * Address type button
 */

const AddressTypeButton = ({
  type,
  icon,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
        selected
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {type}
    </button>
  );
};

/*
 * Saved address card
 */

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
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          onSelect();
        }
      }}
      className={`relative cursor-pointer rounded-2xl border p-5 outline-none transition ${
        selected
          ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
          : "border-gray-200 bg-white hover:border-gray-400"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
              address.isDefault
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {getAddressIcon()}
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900">
                {address.firstName}{" "}
                {address.lastName}
              </h3>

              {address.isDefault && (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  Default
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gray-500">
              {address.addressType}
            </p>
          </div>
        </div>

        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-gray-900 bg-gray-900"
              : "border-gray-300 bg-white"
          }`}
        >
          {selected && (
            <span className="h-2 w-2 rounded-full bg-white" />
          )}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm leading-6 text-gray-600">
        <p>
          {address.houseNo}, {address.area}
        </p>

        {address.landmark && (
          <p>Near {address.landmark}</p>
        )}

        <p>
          {address.city}, {address.state} -{" "}
          {address.pincode}
        </p>

        <p className="flex items-center gap-2 pt-2 font-medium text-gray-800">
          <IoCallOutline className="text-base" />
          {address.phone}
        </p>
      </div>
{/* 
      {!address.isDefault && (
        <button
          type="button"
          disabled={defaultLoading}
          onClick={(event) => {
            event.stopPropagation();
            onSetDefault();
          }}
          className="mt-4 flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-900 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IoCheckmarkCircle className="text-base" />

          {defaultLoading
            ? "Setting..."
            : "Set as Default"}
        </button>
      )} */}
    </div>
  );
};

/*
 * Loading skeleton
 */

const AddressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-gray-200 p-5"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200" />

            <div className="flex-1">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-16 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-4/5 rounded bg-gray-200" />
            <div className="h-3 w-28 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};