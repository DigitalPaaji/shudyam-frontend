"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { base_url } from "./utile";
import { useDispatch } from "react-redux";
import { toggle } from "./store/toggleUser";

axios.defaults.withCredentials = true;

const AuthPopUp = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [googleLoading, setGoogleLoading] = useState(false);
const dispatch= useDispatch()
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
       dispatch(toggle(false));
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [ ]);

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse?.credential;

    if (!token) {
      return toast.error("Google login token not received");
    }

    try {
      setGoogleLoading(true);

      const response = await axios.post(
        `${base_url}/auth/google`,
        { token },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Logged in successfully"
        );

       dispatch(toggle(false));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Google login failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close popup"
        onClick={()=> dispatch(toggle(false))}
        className="absolute inset-0 cursor-default"
      />

      {/* Popup */}
      <div className="relative z-10 max-h-[94vh] w-full max-w-[430px] overflow-y-auto custom-scrollbar2 rounded-2xl border border-white/10 bg-[#181311] text-[#f5eee8] shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        {/* Top accent */}
        <div className="h-1 w-full bg-[#a9613f]" />

        <button
          type="button"
          onClick={()=> dispatch(toggle(false))}
          className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xl text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="px-6 pb-7 pt-8 sm:px-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <p className="font-serif text-3xl tracking-[0.18em] text-white">
              SHUDHYAM
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#ba7653]">
              Pure Copper Living
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-black/25 p-1">
            <button
              type="button"
              onClick={() => setActiveForm("login")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeForm === "login"
                  ? "bg-[#6c181b] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setActiveForm("signup")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeForm === "signup"
                  ? "bg-[#6c181b] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeForm === "login" ? (
            <Login onSuccess={()=> location.reload()} />
          ) : (
            <Signup
              onSuccess={()=> location.reload()}
              openLogin={() => setActiveForm("login")}
            />
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
              Or
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google */}
          <div className="flex min-h-[44px] justify-center">
            {googleLoading ? (
              <div className="flex h-11 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/60">
                Connecting to Google...
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() =>
                  toast.error("Google login failed")
                }
                size="large"
                shape="rectangular"
                theme="filled_black"
                text={
                  activeForm === "login"
                    ? "signin_with"
                    : "signup_with"
                }
              />
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-white/35">
            By continuing, you agree to our{" "}
            <a
              href="/terms-and-conditions"
              className="text-[#c78663] hover:underline"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              className="text-[#c78663] hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPopUp;



const Login = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = user.email.trim().toLowerCase();

    if (!email || !user.password) {
      return toast.error("Please enter email and password");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${base_url}/auth/login`,
        {
          email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Logged in successfully"
        );

        onSuccess();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-white">
          Welcome back
        </h1>

        <p className="mt-1 text-sm text-white/45">
          Login to continue shopping with Shudhyam.
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-xs text-[#c78663] hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <AuthButton
          loading={loading}
          text="Login"
          loadingText="Logging in..."
        />
      </div>
    </form>
  );
};



const Signup = ({ onSuccess, openLogin }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;

    setUserData((previousData) => ({
      ...previousData,
      [name]:
        name === "otp"
          ? value.replace(/\D/g, "").slice(0, 6)
          : value,
    }));
  };

  const validateUser = () => {
    const name = userData.name.trim();
    const email = userData.email.trim().toLowerCase();

    if (
      !name ||
      !email ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSendOtp = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateUser()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${base_url}/auth/sendotp`,
        {
          email: userData.email.trim().toLowerCase(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "OTP sent successfully"
        );

        setOtpSent(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    const otp = userData.otp.trim();

    if (!/^\d{6}$/.test(otp)) {
      return toast.error("Enter a valid 6-digit OTP");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${base_url}/auth/verifyotp`,
        {
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Account created successfully"
        );

        onSuccess();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDetails = () => {
    setOtpSent(false);

    setUserData((previousData) => ({
      ...previousData,
      otp: "",
    }));
  };

  return (
    <form
      onSubmit={
        otpSent ? handleVerifyOtp : handleSendOtp
      }
    >
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-white">
          {otpSent ? "Verify your email" : "Create account"}
        </h1>

        <p className="mt-1 text-sm text-white/45">
          {otpSent
            ? `Enter the OTP sent to ${userData.email}`
            : "Create your Shudhyam account."}
        </p>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <InputField
            label="Name"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInput}
            placeholder="Enter your name"
            autoComplete="name"
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInput}
            placeholder="Enter your email"
            autoComplete="email"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInput}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
          />

          <InputField
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInput}
            placeholder="Enter password again"
            autoComplete="new-password"
          />

          <AuthButton
            loading={loading}
            text="Send OTP"
            loadingText="Sending OTP..."
          />

          <p className="text-center text-sm text-white/45">
            Already have an account?{" "}
            <button
              type="button"
              onClick={openLogin}
              className="font-medium text-[#c78663] hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/65">
              Verification code
            </label>

            <input
              type="text"
              name="otp"
              value={userData.otp}
              onChange={handleInput}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              placeholder="000000"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-center text-xl tracking-[0.45em] text-white outline-none transition placeholder:text-white/20 focus:border-[#a9613f]"
            />
          </div>

          <AuthButton
            loading={loading}
            text="Verify & Sign Up"
            loadingText="Creating account..."
          />

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleChangeDetails}
              disabled={loading}
              className="text-white/45 transition hover:text-white"
            >
              Change details
            </button>

            <button
              type="button"
              onClick={() => handleSendOtp()}
              disabled={loading}
              className="font-medium text-[#c78663] hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </form>
  );
};



const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/65">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#a9613f] focus:bg-black/30"
      />
    </div>
  );
};

const AuthButton = ({
  loading,
  text,
  loadingText,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-[#6c181b] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#7b2023] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : text}
    </button>
  );
};