import { Metadata } from "next";
import { FaqSection } from "@/components/faq/faq-section";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Private Chef Services | iKook",
  description:
    "Get answers to common questions about hiring private chefs, pricing, booking process, dietary requirements, and more. Learn everything you need to know about iKook services.",
  openGraph: {
    title: "FAQs - Private Chef Services | iKook",
    description:
      "Find answers to frequently asked questions about booking private chefs, pricing, menus, and our services.",
    url: "https://ikook.co.uk/faqs",
  },
  alternates: {
    canonical: "https://ikook.co.uk/faqs",
  },
};

export default function Faqs() {
  return (
    <>
      <Navigation />
      <div>
        <FaqSection />
      </div>
      <Footer />
    </>
  );
}

