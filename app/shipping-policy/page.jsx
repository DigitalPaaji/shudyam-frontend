
import Link from "next/link";
import {
  FiAlertCircle,
  FiBox,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

export const metadata = {
  title: "Shipping Policy | Shudhyam",
  description:
    "Read Shudhyam's shipping policy, delivery timelines, shipping charges, order tracking, damaged parcel guidelines, and delivery terms.",
};

const shippingHighlights = [
  {
    icon: FiPackage,
    title: "Secure Packaging",
    description:
      "Every Shudhyam product is carefully packed to help prevent transit damage.",
  },
  {
    icon: FiTruck,
    title: "Trusted Delivery",
    description:
      "Orders are shipped through reliable courier and logistics partners.",
  },
  {
    icon: FiClock,
    title: "Order Tracking",
    description:
      "Tracking details are shared after your order has been dispatched.",
  },
];

const sections = [
  {
    id: "processing",
    title: "1. Order Processing",
    content: (
      <>
        <p>
          Orders are generally processed within 1 to 3 business days after
          payment confirmation.
        </p>

        <p>
          Orders placed on Sundays, public holidays, or outside normal business
          hours may be processed on the next working day.
        </p>

        <p>
          Processing time may be longer during festivals, sales, product
          launches, high-demand periods, or due to circumstances beyond our
          control.
        </p>
      </>
    ),
  },
  {
    id: "delivery-time",
    title: "2. Estimated Delivery Time",
    content: (
      <>
        <p>
          Estimated delivery timelines begin after the order has been processed
          and dispatched.
        </p>

        <div className="overflow-hidden rounded-2xl border border-[#b87333]/15">
          <div className="grid grid-cols-2 bg-[#fbf6f0] px-5 py-4 text-sm font-semibold text-[#5a2c17]">
            <span>Delivery Location</span>
            <span>Estimated Timeline</span>
          </div>

          <div className="grid grid-cols-2 border-t border-[#b87333]/10 px-5 py-4 text-sm text-stone-700">
            <span>Metro cities</span>
            <span>3 to 6 business days</span>
          </div>

          <div className="grid grid-cols-2 border-t border-[#b87333]/10 px-5 py-4 text-sm text-stone-700">
            <span>Other cities and towns</span>
            <span>5 to 8 business days</span>
          </div>

          <div className="grid grid-cols-2 border-t border-[#b87333]/10 px-5 py-4 text-sm text-stone-700">
            <span>Remote locations</span>
            <span>7 to 12 business days</span>
          </div>
        </div>

        <p>
          These timelines are estimates and are not guaranteed. Delivery may be
          affected by weather, strikes, courier delays, natural disasters,
          public holidays, security restrictions, or incorrect customer
          information.
        </p>
      </>
    ),
  },
  {
    id: "shipping-charges",
    title: "3. Shipping Charges",
    content: (
      <>
        <p>
          Shipping charges, if applicable, are calculated based on the delivery
          location, product weight, package dimensions, order value, and
          available courier service.
        </p>

        <p>
          The final shipping charge will be displayed at checkout before you
          complete your order.
        </p>

        <p>
          We may offer free shipping on selected products, order values,
          locations, or promotional campaigns. Such offers may be changed or
          withdrawn without prior notice.
        </p>
      </>
    ),
  },
  {
    id: "tracking",
    title: "4. Order Tracking",
    content: (
      <>
        <p>
          Once your order has been dispatched, tracking details may be sent by
          email, SMS, WhatsApp, or made available through your account.
        </p>

        <p>
          Courier tracking information may take up to 24 hours to become active
          after dispatch.
        </p>

        <p>
          Tracking timelines and updates are provided by the courier partner
          and may occasionally be delayed.
        </p>
      </>
    ),
  },
  {
    id: "address",
    title: "5. Delivery Address",
    content: (
      <>
        <p>
          Customers are responsible for providing a complete and accurate
          delivery address, including:
        </p>

        <ul>
          <li>Recipient&apos;s full name</li>
          <li>House, flat, building, or street details</li>
          <li>Area, landmark, city, state, and PIN code</li>
          <li>Active mobile number</li>
        </ul>

        <p>
          Shudhyam is not responsible for delays, failed deliveries, or losses
          caused by incomplete or incorrect address information.
        </p>

        <p>
          Address changes may only be possible before the order has been
          dispatched.
        </p>
      </>
    ),
  },
  {
    id: "failed-delivery",
    title: "6. Failed Delivery Attempts",
    content: (
      <>
        <p>
          Courier partners may attempt delivery more than once depending on
          their service policy.
        </p>

        <p>
          If delivery fails because the customer is unavailable, refuses the
          parcel, provides an incorrect address, or does not respond to courier
          calls, the order may be returned to us.
        </p>

        <p>
          Re-shipping charges may apply before the order can be dispatched
          again.
        </p>
      </>
    ),
  },
  {
    id: "rto",
    title: "7. Return to Origin Orders",
    content: (
      <>
        <p>
          Orders returned to Shudhyam by the courier partner are known as
          Return to Origin orders.
        </p>

        <p>Reasons may include:</p>

        <ul>
          <li>Customer unavailable at the delivery address</li>
          <li>Incorrect or incomplete address</li>
          <li>Customer refused to accept the order</li>
          <li>Courier could not contact the customer</li>
          <li>Delivery location was not serviceable</li>
        </ul>

        <p>
          For prepaid orders, eligible refunds may be issued after deducting
          shipping, return shipping, payment gateway, or handling charges where
          applicable.
        </p>
      </>
    ),
  },
  {
    id: "damaged",
    title: "8. Damaged or Tampered Packages",
    content: (
      <>
        <div className="rounded-2xl border border-[#b87333]/20 bg-[#b87333]/5 p-5">
          <div className="flex gap-3">
            <FiAlertCircle className="mt-1 shrink-0 text-xl text-[#a85d28]" />

            <p className="text-sm leading-7 text-stone-700">
              Please do not accept a package if it is visibly opened, torn,
              crushed, wet, resealed, or heavily damaged.
            </p>
          </div>
        </div>

        <p>
          Customers are strongly advised to record a clear, continuous unboxing
          video from before opening the parcel until the product is fully
          inspected.
        </p>

        <p>
          Any damaged, defective, missing, or incorrect product should be
          reported within the period stated in our Return and Refund Policy.
        </p>

        <p>
          Shudhyam may request images, videos, packaging labels, invoices, and
          other evidence before approving a replacement, refund, or claim.
        </p>
      </>
    ),
  },
  {
    id: "partial-shipment",
    title: "9. Partial Shipments",
    content: (
      <>
        <p>
          Products from the same order may occasionally be shipped separately
          due to stock availability, warehouse location, product size, or
          courier requirements.
        </p>

        <p>
          You may receive more than one shipment and more than one tracking
          number for the same order.
        </p>

        <p>
          Additional shipping charges will not be applied unless clearly
          communicated and accepted by the customer.
        </p>
      </>
    ),
  },
  {
    id: "delays",
    title: "10. Delivery Delays",
    content: (
      <>
        <p>
          Shudhyam makes reasonable efforts to deliver orders within the
          estimated timeline, but delays may occur due to:
        </p>

        <ul>
          <li>Weather conditions or natural disasters</li>
          <li>Courier or logistics disruptions</li>
          <li>Strikes, government restrictions, or local shutdowns</li>
          <li>High order volumes or festive-season demand</li>
          <li>Remote or restricted delivery locations</li>
          <li>Incorrect address or customer unavailability</li>
        </ul>

        <p>
          A delay in delivery does not automatically make an order eligible for
          cancellation or compensation after dispatch.
        </p>
      </>
    ),
  },
  {
    id: "cod",
    title: "11. Cash on Delivery",
    content: (
      <>
        <p>
          Cash on Delivery may be available for selected products, order values,
          and PIN codes.
        </p>

        <p>
          We may contact customers to verify Cash on Delivery orders before
          dispatch.
        </p>

        <p>
          Shudhyam reserves the right to disable Cash on Delivery for customers
          with repeated refused deliveries, suspicious activity, or previous
          Return to Origin orders.
        </p>
      </>
    ),
  },
  {
    id: "international",
    title: "12. International Shipping",
    content: (
      <>
        <p>
          International shipping may be available only for selected products
          and destinations.
        </p>

        <p>
          International customers are responsible for customs duties, import
          taxes, local handling charges, and any other fees charged by the
          destination country.
        </p>

        <p>
          International delivery timelines depend on customs clearance,
          destination regulations, courier availability, and local delivery
          conditions.
        </p>

        <p>
          Shudhyam is not responsible for delays or charges caused by customs
          authorities.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "13. Ownership and Risk",
    content: (
      <>
        <p>
          Ownership and risk related to the product pass to the customer after
          successful delivery.
        </p>

        <p>
          Shudhyam is not responsible for loss, theft, or damage after the
          package has been delivered to the customer, recipient, security desk,
          reception, neighbour, or another authorized person at the address.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "14. Shipping Support",
    content: (
      <>
        <p>
          For help with dispatch, tracking, delivery delays, address updates, or
          damaged packages, please contact our customer-support team.
        </p>

        <Link
          href="/contact-us"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8f4b23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#713719]"
        >
          <FiMail />
          Contact Shipping Support
        </Link>
      </>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f2] text-[#271710]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#180b07] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12">
      

      

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#ddb184]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <FiChevronRight />

            <span className="text-white">Shipping Policy</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d79a62]/30 bg-white/5 px-4 py-2 text-sm text-[#e8bd94] backdrop-blur">
              <FiTruck />
              Delivery Information
            </div>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Shipping <span className=" bg-gradient-to-r from-[#f4d4b0] via-[#c98145] to-[#f2c18f] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              Learn how Shudhyam processes, packs, dispatches, tracks, and
              delivers your premium copper products.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Effective date: 1 July 2026
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Shipping across India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {shippingHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-[#b87333]/15 bg-white p-6 shadow-[0_20px_60px_rgba(69,35,18,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b87333]/10 text-xl text-[#9b5427]">
                  <Icon />
                </div>

                <h2 className="mt-5 font-serif text-2xl text-[#2b170f]">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery Summary */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 rounded-[2rem] border border-[#b87333]/15 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-3">
          <div className="flex gap-4">
            <FiClock className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">Processing</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Usually within 1 to 3 business days.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiMapPin className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">India Delivery</p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Usually within 3 to 12 business days.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiGlobe className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">
                International Orders
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Available only for selected destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-[#a45b2c]/15 bg-white p-6 shadow-sm">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#a45b2c]">
              On this page
            </p>

            <nav className="max-h-[70vh] space-y-1 overflow-y-auto pr-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2.5 text-sm leading-5 text-stone-600 transition hover:bg-[#b87333]/10 hover:text-[#7d3f1c]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-10 rounded-3xl border border-[#a45b2c]/15 bg-[#fffaf5] p-6 sm:p-8">
            <div className="flex gap-4">
              <FiBox className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

              <p className="leading-8 text-stone-700">
                This Shipping Policy applies to orders placed through the
                Shudhyam website. Delivery timelines are estimates and may vary
                according to location, availability, courier operations, and
                circumstances beyond our control.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#a45b2c]/15 rounded-[2rem] border border-[#a45b2c]/15 bg-white px-6 shadow-sm sm:px-10">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 py-9 sm:py-11"
              >
                <h2 className="font-serif text-2xl text-[#2b170f] sm:text-3xl">
                  {section.title}
                </h2>

                <div className="shipping-content mt-5 space-y-4 text-[15px] leading-8 text-stone-700 sm:text-base">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Notice */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#26120b] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <FiCheckCircle className="mx-auto text-4xl text-[#dca574]" />

            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
              Track your Shudhyam order
            </h2>

            <p className="mt-4 leading-7 text-stone-300">
              Use your tracking details or contact our support team for help
              with delivery-related questions.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/track-order"
                className="inline-flex items-center gap-2 rounded-full bg-[#b87333] px-7 py-3.5 font-semibold text-white transition hover:bg-[#965421]"
              >
                Track Order
                <FiChevronRight />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .shipping-content ul {
          margin: 1rem 0;
          display: grid;
          gap: 0.7rem;
        }

        .shipping-content li {
          position: relative;
          padding-left: 1.75rem;
        }

        .shipping-content li::before {
          content: "";
          position: absolute;
          left: 0.2rem;
          top: 0.75rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background: #b87333;
          box-shadow: 0 0 0 4px rgba(184, 115, 51, 0.12);
        }
      `}</style>
    </main>
  );
}