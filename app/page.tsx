"use client";

import { Footer } from "@/components/footer/Footer";
import { Menu } from "@/components/menu";
import { Navigation } from "@/components/auth/navigation";
import { Services } from "@/components/filter/Services";


export default function Home() {
  return (
    <>
      <Navigation />
      <Services />
      <Menu />
      <Footer />
    </>
  );
}
