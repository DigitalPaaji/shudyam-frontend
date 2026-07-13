import Link from "next/link";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
  FiMail,
  FiShield,
} from "react-icons/fi";

export const metadata = {
  title: "Terms & Conditions | Shudhyam",
  description:
    "Read the terms and conditions governing purchases, payments, shipping, returns, and use of the Shudhyam website.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing, browsing, or purchasing from the Shudhyam website, you
          agree to be bound by these Terms and Conditions, our Privacy Policy,
          Shipping Policy, Return and Refund Policy, and any other policies
          displayed on our website.
        </p>

        <p>
          If you do not agree with these terms, please do not use our website or
          place an order with us.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: (
      <>
        <p>
          You must be at least 18 years old and legally capable of entering into
          a binding contract to place an order on our website.
        </p>

        <p>
          Customers below the age of 18 may use the website only under the
          supervision of a parent or legal guardian.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "3. Customer Account",
    content: (
      <>
        <p>
          Certain features may require you to create an account. You are
          responsible for maintaining the confidentiality of your login details
          and for all activities performed through your account.
        </p>

        <p>
          You agree to provide accurate, complete, and current information.
          Shudhyam reserves the right to suspend or terminate accounts containing
          false information or showing suspicious activity.
        </p>
      </>
    ),
  },
  {
    id: "products",
    title: "4. Product Information",
    content: (
      <>
        <p>
          We make every reasonable effort to display product descriptions,
          dimensions, finishes, colours, weights, prices, and images accurately.
          However, the actual appearance of a product may vary slightly due to
          lighting, screen settings, manufacturing processes, or photography.
        </p>

        <p>
          Copper is a natural material. Minor variations in colour, texture,
          shine, hammering, or finishing are normal and should not be considered
          manufacturing defects.
        </p>

        <div className="rounded-2xl border border-[#b87333]/20 bg-[#b87333]/5 p-5">
          <div className="flex gap-3">
            <FiAlertCircle className="mt-1 shrink-0 text-xl text-[#a85d28]" />

            <p className="text-sm leading-7 text-stone-700">
              Copper products can naturally develop patina or darken over time.
              This is a normal characteristic of copper and can generally be
              managed through proper cleaning and care.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "pricing",
    title: "5. Pricing and Availability",
    content: (
      <>
        <p>
          All prices displayed on the website are in Indian Rupees unless
          otherwise stated. Applicable taxes, delivery charges, and other fees
          will be shown during checkout.
        </p>

        <p>
          Product prices, discounts, offers, and availability may change without
          prior notice. Adding a product to your cart does not reserve the
          product or guarantee its price.
        </p>

        <p>
          In case of an incorrect price caused by a technical or human error, we
          may cancel the order and issue a full refund for any payment already
          received.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    title: "6. Orders and Order Acceptance",
    content: (
      <>
        <p>
          Placing an order constitutes an offer to purchase the selected
          products. An order is considered accepted only after it has been
          confirmed and processed by Shudhyam.
        </p>

        <p>We may cancel or refuse an order in circumstances including:</p>

        <ul>
          <li>The product is unavailable or out of stock.</li>
          <li>Payment authorization is unsuccessful.</li>
          <li>The delivery address is incomplete or unsupported.</li>
          <li>Pricing or product information is incorrect.</li>
          <li>Fraudulent or suspicious activity is detected.</li>
          <li>The quantity ordered appears intended for unauthorized resale.</li>
        </ul>

        <p>
          If a prepaid order is cancelled by us, the eligible amount will be
          refunded to the original payment method.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "7. Payments",
    content: (
      <>
        <p>
          Available payment methods may include cards, UPI, net banking,
          supported wallets, cash on delivery, or other options shown during
          checkout.
        </p>

        <p>
          Online payments are processed through third-party payment gateways.
          Shudhyam does not directly store complete card, UPI PIN, or banking
          credentials.
        </p>

        <p>
          Customers must ensure that they are authorized to use the selected
          payment method. Additional bank or payment-provider charges, if any,
          are the customer&apos;s responsibility.
        </p>
      </>
    ),
  },
  {
    id: "shipping",
    title: "8. Shipping and Delivery",
    content: (
      <>
        <p>
          Estimated delivery timelines are provided for convenience and may
          vary based on product availability, destination, courier operations,
          weather, public holidays, or other circumstances beyond our control.
        </p>

        <p>
          Customers are responsible for providing a complete and accurate
          delivery address and contact number. Additional delivery charges may
          apply when an order needs to be reshipped due to incorrect customer
          information or repeated failed delivery attempts.
        </p>

        <p>
          Ownership and risk associated with the product pass to the customer
          after successful delivery.
        </p>
      </>
    ),
  },
  {
    id: "inspection",
    title: "9. Delivery Inspection",
    content: (
      <>
        <p>
          Please inspect the package at the time of delivery. If the outer
          packaging appears opened, damaged, or tampered with, you may refuse the
          delivery or record an unboxing video before opening it.
        </p>

        <p>
          Claims involving damaged, defective, missing, or incorrect products
          should be reported within the period mentioned in our Return and
          Refund Policy.
        </p>

        <p>
          Photos, videos, packaging labels, invoices, and other supporting
          information may be required to verify a claim.
        </p>
      </>
    ),
  },
  {
    id: "returns",
    title: "10. Returns, Exchanges and Refunds",
    content: (
      <>
        <p>
          Returns, exchanges, cancellations, and refunds are governed by our
          Return and Refund Policy available on the website.
        </p>

        <p>
          Products must generally be returned unused, unwashed, undamaged, and
          in their original packaging with all labels, accessories, manuals, and
          invoices.
        </p>

        <p>
          Products damaged due to misuse, improper cleaning, accidental damage,
          normal copper oxidation, or failure to follow care instructions may
          not qualify for a return, exchange, or refund.
        </p>
      </>
    ),
  },
  {
    id: "care",
    title: "11. Copper Product Care",
    content: (
      <>
        <p>
          Customers must follow the care, cleaning, and usage instructions
          supplied with the product or displayed on the website.
        </p>

        <ul>
          <li>
            Do not use abrasive cleaners unless specifically recommended for the
            product.
          </li>
          <li>
            Do not expose handles, coatings, joints, or decorative finishes to
            unsuitable heat or chemicals.
          </li>
          <li>
            Confirm whether the product is suitable for gas, induction,
            electric, oven, or dishwasher use before using it.
          </li>
          <li>
            Do not store acidic food in unlined copper utensils for extended
            periods.
          </li>
        </ul>

        <p>
          Shudhyam will not be responsible for damage caused by improper use,
          storage, cleaning, maintenance, overheating, or unauthorized repair.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    title: "12. Warranty",
    content: (
      <>
        <p>
          A product warranty applies only when expressly stated on the product
          page, packaging, invoice, or warranty document.
        </p>

        <p>
          Unless otherwise specified, warranties do not cover normal wear and
          tear, scratches, dents caused after delivery, discolouration, natural
          patina, accidental damage, misuse, commercial use, or damage caused by
          improper cleaning.
        </p>
      </>
    ),
  },
  {
    id: "promotions",
    title: "13. Offers, Coupons and Promotions",
    content: (
      <>
        <p>
          Discount codes and promotional offers may be subject to minimum order
          values, product restrictions, expiry dates, usage limits, and other
          conditions.
        </p>

        <p>
          Unless expressly permitted, multiple offers cannot be combined.
          Shudhyam may modify, suspend, or withdraw an offer if misuse,
          duplication, technical error, or fraudulent activity is identified.
        </p>
      </>
    ),
  },
  {
    id: "prohibited",
    title: "14. Prohibited Use",
    content: (
      <>
        <p>You must not use the website to:</p>

        <ul>
          <li>Engage in unlawful, fraudulent, or harmful activities.</li>
          <li>Attempt unauthorized access to our systems or customer accounts.</li>
          <li>Upload malware, harmful scripts, or disruptive code.</li>
          <li>Copy, scrape, reproduce, or commercially exploit website content.</li>
          <li>Submit false reviews, claims, identities, or payment information.</li>
          <li>Interfere with the security or normal operation of the website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "15. Intellectual Property",
    content: (
      <>
        <p>
          All website content, including the Shudhyam name, logo, product
          photography, videos, text, graphics, packaging, designs, icons, and
          website layout, is owned by or licensed to Shudhyam.
        </p>

        <p>
          No content may be copied, reproduced, modified, republished,
          distributed, or commercially used without our prior written
          permission.
        </p>
      </>
    ),
  },
  {
    id: "reviews",
    title: "16. Reviews and User Content",
    content: (
      <>
        <p>
          When you submit a product review, photo, video, testimonial, or other
          content, you confirm that it is accurate, lawful, and does not violate
          another person&apos;s rights.
        </p>

        <p>
          You grant Shudhyam a non-exclusive right to display, reproduce, edit,
          and use submitted content for website, customer-support, and marketing
          purposes.
        </p>

        <p>
          We may remove content that is abusive, misleading, irrelevant,
          unlawful, promotional, or otherwise inappropriate.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "17. Third-Party Services",
    content: (
      <>
        <p>
          Our website may use or link to third-party services, including payment
          gateways, courier partners, analytics providers, and social media
          platforms.
        </p>

        <p>
          These services are governed by their own terms and privacy policies.
          Shudhyam is not responsible for the independent practices, content, or
          availability of third-party platforms.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "18. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Shudhyam will not
          be liable for indirect, incidental, special, or consequential losses
          arising from website use, delivery delays, product misuse, loss of
          data, or third-party services.
        </p>

        <p>
          Where liability cannot legally be excluded, our total liability will
          generally be limited to the amount paid for the product related to the
          claim.
        </p>

        <p>
          Nothing in these terms excludes any consumer rights that cannot be
          excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "19. Indemnification",
    content: (
      <p>
        You agree to indemnify and protect Shudhyam, its owners, employees,
        representatives, and service providers against claims, damages, losses,
        or expenses resulting from your unlawful use of the website, violation
        of these terms, or infringement of another person&apos;s rights.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "20. Privacy",
    content: (
      <p>
        Your personal information is collected and handled according to our
        Privacy Policy. By using the website, you consent to the processing of
        your information as described in that policy.
      </p>
    ),
  },
  {
    id: "changes",
    title: "21. Changes to These Terms",
    content: (
      <>
        <p>
          We may update these Terms and Conditions when our products, services,
          legal requirements, or business practices change.
        </p>

        <p>
          Updated terms become effective when published on this page. Continued
          use of the website after an update constitutes acceptance of the
          revised terms.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "22. Governing Law and Disputes",
    content: (
      <>
        <p>
          These terms are governed by the laws of India. Any dispute will be
          subject to the jurisdiction of the competent courts located where
          Shudhyam&apos;s registered office is situated, unless applicable
          consumer law requires otherwise.
        </p>

        <p>
          Before initiating formal proceedings, both parties should attempt to
          resolve the matter through good-faith communication.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "23. Contact Information",
    content: (
      <>
        <p>
          For questions regarding these Terms and Conditions, please contact
          Shudhyam through the details provided on our Contact Us page.
        </p>

        <Link
          href="/contact-us"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#8f4b23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#713719]"
        >
          <FiMail />
          Contact Shudhyam
        </Link>
      </>
    ),
  },
];

const importantPoints = [
  "Copper naturally changes colour and may develop patina.",
  "Product appearance can vary slightly from website photographs.",
  "Follow the supplied care and usage instructions.",
  "Report damaged or incorrect products within the return-policy period.",
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f2] text-[#271710]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#180b07] px-5 py-16 text-white sm:px-8 lg:px-12">
      
     

        <div className="relative mx-auto ">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#ddb184]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <FiChevronRight />

            <span className="text-white">Terms & Conditions</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d79a62]/30 bg-white/5 px-4 py-2 text-sm text-[#e8bd94] backdrop-blur">
              <FiShield />
              Legal Information
            </div>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Terms &amp; <span className=" bg-gradient-to-r from-[#f4d4b0] via-[#c98145] to-[#f2c18f] bg-clip-text text-transparent">
                  Conditions
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              These terms explain the rules that apply when you browse, create
              an account, or purchase premium copper products from Shudhyam.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Effective date: 1 July 2026
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-300">
                Applicable in India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-[#b87333]/15 bg-white p-6 shadow-[0_25px_70px_rgba(69,35,18,0.10)] sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a45b2c]">
                Important information
              </p>

              <h2 className="mt-3 font-serif text-2xl text-[#2b170f] sm:text-3xl">
                Before using your copper products
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {importantPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl bg-[#fbf7f2] p-4"
                >
                  <FiCheckCircle className="mt-1 shrink-0 text-[#a45b2c]" />

                  <p className="text-sm leading-6 text-stone-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-12">
        {/* Sidebar */}
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

        {/* Terms */}
        <div className="min-w-0">
          <div className="mb-10 rounded-3xl border border-[#a45b2c]/15 bg-[#fffaf5] p-6 sm:p-8">
            <p className="leading-8 text-stone-700">
              Please read these terms carefully before using the Shudhyam
              website. References to “Shudhyam”, “we”, “us”, or “our” refer to
              the owner and operator of the Shudhyam e-commerce platform.
              References to “you”, “customer”, or “user” refer to any person
              accessing or purchasing through the website.
            </p>
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

                <div className="terms-content mt-5 space-y-4 text-[15px] leading-8 text-stone-700 sm:text-base">
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dca574]">
              Need assistance?
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              We are here to help
            </h2>

            <p className="mt-4 leading-7 text-stone-300">
              Contact our support team for questions regarding orders,
              deliveries, product care, returns, or these terms.
            </p>

            <Link
              href="/contact-us"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#b87333] px-7 py-3.5 font-semibold text-white transition hover:bg-[#965421]"
            >
              Contact Support
              <FiChevronRight />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .terms-content ul {
          margin: 1rem 0;
          display: grid;
          gap: 0.7rem;
        }

        .terms-content li {
          position: relative;
          padding-left: 1.75rem;
        }

        .terms-content li::before {
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