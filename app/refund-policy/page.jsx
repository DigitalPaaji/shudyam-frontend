import Link from "next/link";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiMail,
  FiPackage,
  FiRefreshCcw,
  FiShield,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

export const metadata = {
  title: "Return & Refund Policy | Shudhyam",
  description:
    "Read Shudhyam's return, exchange, cancellation, and refund policy for copper cookware and other products.",
};

const highlights = [
  {
    icon: FiRefreshCcw,
    title: "7-Day Return Request",
    description:
      "Eligible return requests must be submitted within 7 days of delivery.",
  },
  {
    icon: FiPackage,
    title: "Original Condition",
    description:
      "Products must be unused and returned with their original packaging.",
  },
  {
    icon: FiCreditCard,
    title: "Secure Refunds",
    description:
      "Approved refunds are processed through the applicable payment method.",
  },
];

const sections = [
  {
    id: "overview",
    title: "1. Policy Overview",
    content: (
      <>
        <p>
          At Shudhyam, we carefully inspect and package every product before
          dispatch. This policy explains when a product may be returned,
          exchanged, replaced, or refunded.
        </p>

        <p>
          By purchasing from Shudhyam, you agree to the terms stated in this
          Return and Refund Policy.
        </p>

        <p>
          This policy should be read together with our Terms and Conditions and
          Shipping Policy.
        </p>
      </>
    ),
  },
  {
    id: "return-window",
    title: "2. Return Request Period",
    content: (
      <>
        <p>
          Eligible return requests must be submitted within 7 calendar days
          from the date of delivery.
        </p>

        <p>
          Requests submitted after the return period may not be accepted unless
          required under applicable consumer law.
        </p>

        <p>
          Submitting a return request does not automatically guarantee approval.
          Every request is reviewed according to product condition, order
          details, and the reason for return.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "3. Return Eligibility",
    content: (
      <>
        <p>A product may be eligible for return when:</p>

        <ul>
          <li>A different product was delivered.</li>
          <li>The product was damaged during transit.</li>
          <li>The product has a verified manufacturing defect.</li>
          <li>An item or accessory included with the product is missing.</li>
          <li>
            The product materially differs from its confirmed order details.
          </li>
        </ul>

        <p>
          The product must satisfy all applicable return conditions before a
          return, replacement, exchange, or refund is approved.
        </p>
      </>
    ),
  },
  {
    id: "return-condition",
    title: "4. Product Return Conditions",
    content: (
      <>
        <p>Returned products should generally be:</p>

        <ul>
          <li>Unused, unwashed, and unaltered.</li>
          <li>Free from scratches, stains, dents, or customer-caused damage.</li>
          <li>Returned in the original box and protective packaging.</li>
          <li>
            Accompanied by all accessories, manuals, labels, and complimentary
            items.
          </li>
          <li>Supported by the invoice or proof of purchase.</li>
        </ul>

        <p>
          Products that do not pass our return-quality inspection may be sent
          back to the customer and may not qualify for a refund.
        </p>
      </>
    ),
  },
  {
    id: "damaged-products",
    title: "5. Damaged, Defective or Incorrect Products",
    content: (
      <>
        <div className="rounded-2xl border border-[#b87333]/20 bg-[#b87333]/5 p-5">
          <div className="flex gap-3">
            <FiAlertCircle className="mt-1 shrink-0 text-xl text-[#a85d28]" />

            <p className="text-sm leading-7 text-stone-700">
              Damaged, defective, missing, or incorrect-product claims should
              be reported within 48 hours of delivery.
            </p>
          </div>
        </div>

        <p>
          Please record a clear and continuous unboxing video showing the sealed
          parcel, shipping label, opening process, product, and reported issue.
        </p>

        <p>We may request the following evidence:</p>

        <ul>
          <li>Order number and customer contact information.</li>
          <li>Photos of the outer and inner packaging.</li>
          <li>Photos or videos clearly showing the issue.</li>
          <li>Image of the shipping label and product label.</li>
          <li>Invoice or other proof of purchase.</li>
        </ul>

        <p>
          Claims may be rejected when sufficient evidence is not provided or
          when the damage appears to have occurred after delivery.
        </p>
      </>
    ),
  },
  {
    id: "copper-characteristics",
    title: "6. Natural Characteristics of Copper",
    content: (
      <>
        <p>
          Copper is a natural material and may develop patina, spots,
          discolouration, oxidation, or a darker appearance over time.
        </p>

        <p>
          Minor variations in colour, texture, hammering, polish, finish, size,
          or appearance are normal and may not be considered manufacturing
          defects.
        </p>

        <p>
          Natural oxidation or changes caused by normal usage, moisture, food,
          heat, storage, or cleaning methods are not generally eligible for
          return or refund.
        </p>
      </>
    ),
  },
  {
    id: "non-returnable",
    title: "7. Non-Returnable Products",
    content: (
      <>
        <p>Returns may not be accepted for:</p>

        <ul>
          <li>Products used, washed, cooked in, or tested with food.</li>
          <li>Products damaged due to improper cleaning or maintenance.</li>
          <li>Products damaged through overheating, misuse, or negligence.</li>
          <li>Personalized, engraved, or made-to-order products.</li>
          <li>Gift cards, promotional gifts, or complimentary products.</li>
          <li>Clearance or final-sale products marked as non-returnable.</li>
          <li>Products without their original packaging or accessories.</li>
          <li>
            Products showing normal copper oxidation, patina, or natural colour
            changes.
          </li>
          <li>
            Products purchased from unauthorized sellers or third-party stores.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "change-of-mind",
    title: "8. Change-of-Mind Returns",
    content: (
      <>
        <p>
          Change-of-mind returns may be accepted only when specifically
          permitted by Shudhyam and when the product is completely unused,
          unopened, and in resalable condition.
        </p>

        <p>
          Original shipping fees, return shipping charges, packaging charges,
          Cash on Delivery charges, and payment-processing fees may be deducted
          from the refundable amount.
        </p>

        <p>
          Shudhyam reserves the right to reject a change-of-mind return when the
          product cannot be resold as new.
        </p>
      </>
    ),
  },
  {
    id: "exchange",
    title: "9. Exchanges and Replacements",
    content: (
      <>
        <p>
          Approved exchanges or replacements are subject to product
          availability.
        </p>

        <p>
          If the requested replacement product is unavailable, we may offer one
          of the following:
        </p>

        <ul>
          <li>A replacement with another suitable product.</li>
          <li>Store credit, when applicable.</li>
          <li>A refund for the eligible amount.</li>
        </ul>

        <p>
          A replacement may be dispatched after the returned product has been
          received and successfully inspected.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "10. Order Cancellation",
    content: (
      <>
        <p>
          Customers may request cancellation before the order has been
          dispatched.
        </p>

        <p>
          Once an order has been packed, dispatched, or handed over to the
          courier partner, cancellation may no longer be possible.
        </p>

        <p>
          Shudhyam may cancel an order due to stock unavailability, pricing
          errors, payment failure, unsupported delivery locations, suspected
          fraud, or other operational reasons.
        </p>

        <p>
          If a prepaid order is cancelled by Shudhyam, the eligible amount will
          be refunded through the applicable payment method.
        </p>
      </>
    ),
  },
  {
    id: "refused-delivery",
    title: "11. Refused and Undelivered Orders",
    content: (
      <>
        <p>
          Customers should not refuse delivery unless the parcel is visibly
          opened, severely damaged, or tampered with.
        </p>

        <p>
          If a customer refuses an otherwise valid order, remains unavailable,
          or provides an incorrect address, the order may be returned to
          Shudhyam.
        </p>

        <p>
          Original shipping, return shipping, Cash on Delivery, handling, or
          payment-processing charges may be deducted from any eligible refund.
        </p>

        <p>
          Repeated refusal of Cash on Delivery orders may result in Cash on
          Delivery being disabled for future purchases.
        </p>
      </>
    ),
  },
  {
    id: "return-process",
    title: "12. Return Process",
    content: (
      <>
        <p>To request a return:</p>

        <ol>
          <li>Contact Shudhyam customer support within the applicable period.</li>
          <li>Provide your order number and reason for the request.</li>
          <li>Share the required photos, videos, and supporting information.</li>
          <li>Wait for return approval and return instructions.</li>
          <li>Pack the product securely in its original packaging.</li>
          <li>Hand over or ship the product as instructed.</li>
        </ol>

        <p>
          Products returned without prior authorization may not be accepted or
          processed.
        </p>
      </>
    ),
  },
  {
    id: "return-shipping",
    title: "13. Return Shipping",
    content: (
      <>
        <p>
          For verified damaged, defective, missing, or incorrect-product cases,
          Shudhyam may arrange reverse pickup or reimburse reasonable return
          shipping costs.
        </p>

        <p>
          For approved change-of-mind returns, the customer may be responsible
          for return shipping and secure packaging.
        </p>

        <p>
          Reverse pickup availability depends on the customer&apos;s PIN code
          and courier serviceability.
        </p>

        <p>
          When reverse pickup is unavailable, the customer may be asked to send
          the product through a trackable courier service.
        </p>
      </>
    ),
  },
  {
    id: "inspection",
    title: "14. Product Inspection",
    content: (
      <>
        <p>
          Returned products are inspected after reaching our facility. The
          inspection may take approximately 2 to 5 business days.
        </p>

        <p>The inspection may verify:</p>

        <ul>
          <li>The product matches the original order.</li>
          <li>The reported issue is genuine.</li>
          <li>The product has not been used or damaged by the customer.</li>
          <li>All original accessories and packaging are included.</li>
          <li>The product satisfies the applicable return conditions.</li>
        </ul>

        <p>
          We will notify the customer after the return has been approved or
          rejected.
        </p>
      </>
    ),
  },
  {
    id: "refund-method",
    title: "15. Refund Method",
    content: (
      <>
        <p>
          Approved prepaid-order refunds are generally processed to the original
          payment method.
        </p>

        <p>
          For Cash on Delivery orders, the customer may be asked to provide
          valid bank account or UPI details.
        </p>

        <p>
          Customers are responsible for providing accurate refund information.
          Shudhyam will not be responsible for delays or losses caused by
          incorrect bank or UPI details.
        </p>

        <p>
          Refunds are not normally issued in cash, unless expressly agreed by
          Shudhyam.
        </p>
      </>
    ),
  },
  {
    id: "refund-timeline",
    title: "16. Refund Timeline",
    content: (
      <>
        <p>
          Approved refunds are generally initiated within 5 to 10 business days
          after successful product inspection.
        </p>

        <p>
          After a refund has been initiated, the time required for it to appear
          in the customer&apos;s account depends on the bank, card issuer,
          payment gateway, or UPI provider.
        </p>

        <p>
          Banking delays after refund initiation are outside Shudhyam&apos;s
          direct control.
        </p>
      </>
    ),
  },
  {
    id: "deductions",
    title: "17. Refund Deductions",
    content: (
      <>
        <p>Where applicable, the following may be deducted from a refund:</p>

        <ul>
          <li>Original shipping charges.</li>
          <li>Return or reverse-pickup charges.</li>
          <li>Cash on Delivery charges.</li>
          <li>Payment gateway or transaction charges.</li>
          <li>Missing accessory or packaging value.</li>
          <li>Damage or reduction in product value.</li>
          <li>Promotional discount adjustments.</li>
        </ul>

        <p>
          No deduction will normally be applied when the return is approved
          because Shudhyam delivered a verified damaged, defective, or incorrect
          product.
        </p>
      </>
    ),
  },
  {
    id: "promotions",
    title: "18. Promotional and Bundle Orders",
    content: (
      <>
        <p>
          When a product purchased as part of a bundle, gift offer, or promotion
          is returned, all related products or complimentary items may also need
          to be returned.
        </p>

        <p>
          If a free product is not returned, its value may be deducted from the
          refundable amount.
        </p>

        <p>
          A partial return may result in the original discount being
          recalculated.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "19. Return and Refund Support",
    content: (
      <>
        <p>
          To request a return, replacement, cancellation, or refund, contact
          Shudhyam customer support with your order number and supporting
          evidence.
        </p>

        <Link
          href="/contact-us"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8f4b23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#713719]"
        >
          <FiMail />
          Contact Customer Support
        </Link>
      </>
    ),
  },
];

const refundSteps = [
  {
    number: "01",
    title: "Submit Request",
    description:
      "Contact our support team with your order details and reason for return.",
  },
  {
    number: "02",
    title: "Get Approval",
    description:
      "Our team reviews your request and provides the return instructions.",
  },
  {
    number: "03",
    title: "Return Product",
    description:
      "Pack the approved product securely and complete the reverse pickup.",
  },
  {
    number: "04",
    title: "Receive Refund",
    description:
      "After inspection, the approved refund or replacement is processed.",
  },
];

export default function RefundPolicyPage() {
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

            <span className="text-white">Return &amp; Refund Policy</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d79a62]/30 bg-white/5 px-4 py-2 text-sm text-[#e8bd94] backdrop-blur">
              <FiShield />
              Customer Protection
            </div>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Return &amp; <span className=" bg-gradient-to-r from-[#f4d4b0] via-[#c98145] to-[#f2c18f] bg-clip-text text-transparent">
                Refund Policy
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              Learn how to request a return, exchange, replacement,
              cancellation, or refund for your Shudhyam order.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Effective date: 1 July 2026
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Return request within 7 days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
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

      {/* Return Process */}
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 lg:px-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a45b2c]">
            Simple return process
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#2b170f] sm:text-4xl">
            How a return is processed
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {refundSteps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-[#b87333]/15 bg-white p-6 shadow-sm"
            >
              <span className="font-serif text-4xl text-[#b87333]/25">
                {step.number}
              </span>

              <h3 className="mt-5 font-serif text-xl text-[#2b170f]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 rounded-[2rem] border border-[#b87333]/15 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-3">
          <div className="flex gap-4">
            <FiClock className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">
                Report Damage Quickly
              </p>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                Report damaged or incorrect products within 48 hours.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiPackage className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">
                Keep the Packaging
              </p>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                Do not throw away the product box or courier packaging.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiCheckCircle className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

            <div>
              <p className="font-semibold text-[#2b170f]">
                Record Unboxing
              </p>

              <p className="mt-1 text-sm leading-6 text-stone-600">
                A continuous unboxing video helps us verify your claim.
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
              <FiAlertCircle className="mt-1 shrink-0 text-2xl text-[#a45b2c]" />

              <p className="leading-8 text-stone-700">
                Using, washing, cooking in, altering, or damaging a product may
                make it ineligible for return. Please contact our support team
                before returning any product.
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

                <div className="refund-content mt-5 space-y-4 text-[15px] leading-8 text-stone-700 sm:text-base">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#26120b] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#b87333]/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <FiRefreshCcw className="mx-auto text-4xl text-[#dca574]" />

            <h2 className="mt-5 font-serif text-3xl sm:text-4xl">
              Need to request a return?
            </h2>

            <p className="mt-4 leading-7 text-stone-300">
              Contact our support team with your order number, reason for the
              request, and supporting photos or videos.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-[#b87333] px-7 py-3.5 font-semibold text-white transition hover:bg-[#965421]"
              >
                Request a Return
                <FiChevronRight />
              </Link>

              <Link
                href="/shipping-policy"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <FiTruck />
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .refund-content ul,
        .refund-content ol {
          margin: 1rem 0;
          display: grid;
          gap: 0.7rem;
        }

        .refund-content li {
          position: relative;
          padding-left: 1.75rem;
        }

        .refund-content ul li::before {
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

        .refund-content ol {
          counter-reset: refund-counter;
        }

        .refund-content ol li {
          counter-increment: refund-counter;
        }

        .refund-content ol li::before {
          content: counter(refund-counter);
          position: absolute;
          left: 0;
          top: 0.35rem;
          display: flex;
          width: 1.25rem;
          height: 1.25rem;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(184, 115, 51, 0.12);
          color: #8f4b23;
          font-size: 0.7rem;
          font-weight: 700;
          line-height: 1;
        }
      `}</style>
    </main>
  );
}