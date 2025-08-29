"use client";

import { FaqSection } from "@/components/faq/faq-section";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

function Faqs() {
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

export default Faqs;
