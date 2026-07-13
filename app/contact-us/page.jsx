"use client";

import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";

import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";

import {
  FiChevronDown,
  FiLoader,
  FiSend,
} from "react-icons/fi";

import { base_url } from "@/components/utile";

// Custom easing for that "luxury" buttery smooth feel
const premiumEase = [0.25, 0.1, 0.25, 1];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contactDetails = [
    {
      id: 1,
      title: "Call us",
      value: "+91 98765 43210",
      description: "Monday to Saturday, 10:00 AM to 7:00 PM",
      href: "tel:+919876543210",
      icon: FaPhone,
    },
    {
      id: 2,
      title: "Email us",
      value: "support@shudhyam.com",
      description: "We usually reply within one business day.",
      href: "mailto:support@shudhyam.com",
      icon: FaEnvelope,
    },
   
    {
      id: 4,
      title: "Visit us",
      value: "Jaipur, Rajasthan",
      description: "Please contact us before planning your visit.",
      href: "https://maps.google.com",
      icon: FaLocationDot,
    },
  ];

  const faqs = [
    {
      question: "How can I track my Shudhyam order?",
      answer:
        "You can track your order from the Track Order page using your order number and registered phone number. Tracking details are also shared by email or WhatsApp after dispatch.",
    },
    {
      question: "How should I clean copper utensils?",
      answer:
        "Use a soft sponge with mild dish soap for regular cleaning. For natural copper shine, use lemon and salt or a copper cleaning solution. Avoid harsh steel scrubbers.",
    },
    {
      question: "Do you provide returns or replacements?",
      answer:
        "Returns and replacements are available according to our return policy. Contact us within the specified period if your product arrives damaged, incorrect or defective.",
    },
    {
      question: "Can I place a bulk or corporate order?",
      answer:
        "Yes. We accept bulk, gifting and corporate enquiries. Share your quantity, product preference, delivery location and expected timeline through the contact form.",
    },
    {
      question: "Do you ship throughout India?",
      answer:
        "Yes, Shudhyam delivers to most serviceable locations across India. Shipping availability and estimated delivery time are shown during checkout.",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await axios.post(`${base_url}/contact`, formData);

      setSuccessMessage(
        response.data?.message ||
          "Thank you for contacting Shudhyam. Our team will get back to you soon."
      );
      setFormData(initialFormData);
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#FFF9E6] text-[#211714]">
      
    
      <section className="relative overflow-hidden bg-[#1a110e] py-32 text-white ">
      
       

        <div className="relative mx-auto px-4 md:px-12 lg:px-24 xl:px-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: premiumEase, delay: 0.1 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className="h-[1px] w-8 md:w-12 bg-[#d79461]" />
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-[#d79461]">
                We are here to help
              </span>
              <span className="h-[1px] w-8 md:w-12 bg-[#d79461]" />
            </div>

            <h1 className="font-serif text-5xl font-light leading-[1.1] sm:text-6xl lg:text-[5rem]">
              Let&apos;s start a <br />
              <span className="italic text-[#d79461]">conversation.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-[15px] font-light leading-relaxed text-white/70 md:text-lg">
              Have a question about our copper utensils, your order, or bulk
              purchasing? Send us a message and the Shudhyam team will help you.
            </p>
          </motion.div>
        </div>
      </section>

  
      <section className="relative z-10 -mt-16 md:-mt-24">
        <div className="mx-auto grid  gap-6 px-5 md:grid-cols-2 md:px-10 xl:grid-cols-3 lg:px-16">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                target={item.title === "Visit us" ? "_blank" : undefined}
                rel={item.title === "Visit us" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: premiumEase, delay: 0.2 + (index * 0.1) }}
                className="group border border-[#e5ddd4] bg-white p-8 shadow-[0_20px_50px_-12px_rgba(35,22,18,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-[#b76a3e]/30 hover:shadow-[0_30px_60px_-15px_rgba(183,106,62,0.12)] md:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4ece3] text-lg text-[#a75d36] transition-colors duration-500 group-hover:bg-[#52070a] group-hover:text-white">
                  <Icon />
                </div>

                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a75d36]">
                  {item.title}
                </p>

                <h2 className="mt-3 font-serif text-2xl text-[#271914]">
                  {item.value}
                </h2>

                <p className="mt-4 text-[15px] font-light leading-relaxed text-[#75665e]">
                  {item.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </section>

    
      <section className="py-24">
        <div className="mx-auto grid  gap-10  lg:grid-cols-2 px-4 md:px-12 lg:px-24 xl:px-40">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase }}
            className="pt-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              Get In Touch
            </p>

            <h2 className="mt-6 max-w-xl font-serif text-4xl font-light leading-tight text-[#231612] md:text-5xl">
              We would love to <span className="italic text-[#52070a]">hear from you.</span>
            </h2>

            <p className="mt-8 max-w-xl text-[15px] font-light leading-relaxed text-[#71635c] md:text-lg">
              Whether you need product guidance, order assistance, or want to
              discuss a bulk purchase, our team is ready to help.
            </p>

            <div className="mt-14 space-y-8">
              <div className="flex items-start gap-6 border-b border-[#e5ddd4] pb-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece3] text-[#52070a]">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#271914]">
                    Working Hours
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-[#71635c]">
                    Monday to Saturday <br />
                    10:00 AM to 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-b border-[#e5ddd4] pb-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece3] text-[#52070a]">
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#271914]">
                    Quick Assistance
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-[#71635c]">
                    Message us on WhatsApp for product information and order assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 pb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece3] text-[#52070a]">
                  <FaInstagram className="text-xl" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#271914]">
                    Follow Our Journey
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-[#71635c]">
                    Follow Shudhyam on Instagram for new collections, care tips and copper inspiration.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-4 bg-[#52070a] px-9 py-4 text-sm font-medium tracking-wide text-white transition-all hover:bg-[#1a110e]"
            >
              Chat on WhatsApp
              <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
            className="border border-[#e5ddd4] bg-white p-8 shadow-[0_30px_90px_rgba(35,22,18,0.06)] "
          >
            <div className="mb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
                Send A Message
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-[#261813]">
                How can we help?
              </h2>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-[#75665e]">
                Fill in the form below and our team will contact you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormInput
                  label="Your Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#55463f]"
                  >
                    Enquiry Type
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-14 w-full appearance-none border border-[#e5ddd4] bg-[#faf8f5] px-5 text-[15px] font-light text-[#33241f] outline-none transition-all focus:border-[#b76a3e] focus:bg-white focus:ring-1 focus:ring-[#b76a3e]/20"
                  >
                    <option value="">Select enquiry type</option>
                    <option value="Product enquiry">Product enquiry</option>
                    <option value="Order support">Order support</option>
                    <option value="Return or replacement">Return or replacement</option>
                    <option value="Bulk order">Bulk order</option>
                    <option value="Business collaboration">Business collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#55463f]"
                >
                  Your Message <span className="text-[#b76a3e]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none border border-[#e5ddd4] bg-[#faf8f5] px-5 py-4 text-[15px] font-light text-[#33241f] outline-none transition-all placeholder:text-[#a39791] focus:border-[#b76a3e] focus:bg-white focus:ring-1 focus:ring-[#b76a3e]/20"
                />
              </div>

              {successMessage && (
                <div className="border border-[#cce5ff] bg-[#f0f8ff] px-5 py-4 text-[15px] font-light leading-relaxed text-[#004085]">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="border border-[#f5c6cb] bg-[#f8d7da] px-5 py-4 text-[15px] font-light leading-relaxed text-[#721c24]">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className="group flex h-14 w-full items-center justify-center gap-4 bg-[#52070a] px-9 text-sm font-medium tracking-wide text-white transition-all hover:bg-[#1a110e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitLoading ? (
                  <>
                    <FiLoader className="animate-spin text-lg" />
                    Sending message...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiSend className="text-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1" />
                  </>
                )}
              </button>

              <p className="text-center text-[13px] font-light leading-relaxed text-[#887a73] pt-2">
                By submitting this form, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-[#b76a3e] underline transition-colors hover:text-[#52070a]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </section>

     
      <section className="bg-[#FFF9E6]  border-t border-[#e5ddd4] py-24">
        <div className="mx-auto px-4 md:px-12 lg:px-24 xl:px-40">
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
                Our Location
              </p>
              <h2 className="mt-5 font-serif text-4xl font-light text-[#231612] md:text-5xl">
                Visit <span className="italic text-[#52070a]">Shudhyam.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] font-light leading-relaxed text-[#71635c]">
              Please contact our team before visiting so we can arrange the
              right assistance for you.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase }}
            className="grid overflow-hidden border border-[#e5ddd4] bg-white shadow-[0_20px_50px_-12px_rgba(35,22,18,0.05)] lg:grid-cols-[1fr_400px]"
          >
            <div className="min-h-[500px]">
              <iframe
                title="Shudhyam location"
                src="https://www.google.com/maps?q=Jaipur,Rajasthan,India&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[500px] border-0 grayscale-[40%] contrast-125 opacity-90"
              />
            </div>

            <div className="flex flex-col justify-center bg-[#1a110e] p-10 text-white md:p-14">
              <FaLocationDot className="text-4xl text-[#d79461]" />

              <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#d79461]">
                Shudhyam HQ
              </p>

              <h3 className="mt-5 font-serif text-3xl font-light leading-tight">
                Jaipur, Rajasthan
              </h3>

              <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
                Add your complete showroom, office or warehouse address here for your premium visitors.
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 inline-flex items-center gap-4 border border-[#d79461] px-8 py-4 text-sm font-medium tracking-wide text-[#d79461] transition-all hover:bg-[#d79461] hover:text-[#1a110e]"
              >
                Get Directions
                <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-[#FFF9E6] py-24 ">
        <div className="mx-auto grid  gap-16  lg:grid-cols-[0.8fr_1.2fr] px-4 md:px-12 lg:px-24 xl:px-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b76a3e]">
              Common Questions
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#231612] md:text-5xl">
              Frequently <br className="hidden lg:block"/>
              <span className="italic text-[#52070a]">asked questions.</span>
            </h2>

            <p className="mt-8 text-[15px] font-light leading-relaxed text-[#71635c]">
              Find quick answers about orders, product care, delivery, and bulk enquiries.
            </p>

            <Link
              href="/faq"
              className="group mt-10 inline-flex items-center gap-4 text-sm font-medium tracking-wide text-[#52070a]"
            >
              View All Questions
              <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
            className="border-t border-[#e5ddd4]"
          >
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#e5ddd4]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-8 text-left transition-colors hover:bg-white/50"
                  >
                    <span className="font-serif text-2xl font-light text-[#291b16]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5ddd4] transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 bg-[#1a110e] text-white border-transparent"
                          : "bg-transparent text-[#1a110e]"
                      }`}
                    >
                      <FiChevronDown />
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] pb-8 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pr-12 text-[15px] font-light leading-relaxed text-[#74665f]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FFF9E6] px-5 pb-24 md:px-10 md:pb-32 lg:px-16 pt-10">
        <div className="relative mx-auto max-w-[1450px] overflow-hidden bg-[#1a110e] px-6 py-24 text-center text-white md:px-12 md:py-32">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#d79461]/20 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#b76a3e]/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d79461]">
              Explore Shudhyam
            </p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
              Discover copperware made for <span className="italic text-[#d79461]">meaningful homes.</span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-[15px] font-light leading-relaxed text-white/70 md:text-lg">
              Explore traditional craftsmanship shaped into elegant products for modern kitchens.
            </p>

            <Link
              href="/products"
              className="group mt-12 inline-flex items-center gap-4 border border-[#d79461] bg-transparent px-10 py-4 text-sm font-medium tracking-wider text-[#d79461] transition-all hover:bg-[#d79461] hover:text-[#1a110e]"
            >
              Shop The Collection
              <FaArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#55463f]"
      >
        {label}
        {required && <span className="ml-1 text-[#b76a3e]">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="h-14 w-full border border-[#e5ddd4] bg-[#faf8f5] px-5 text-[15px] font-light text-[#33241f] outline-none transition-all placeholder:text-[#a39791] focus:border-[#b76a3e] focus:bg-white focus:ring-1 focus:ring-[#b76a3e]/20"
      />
    </div>
  );
};

export default ContactUsPage;