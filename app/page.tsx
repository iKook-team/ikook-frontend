
import { Metadata } from "next";
import HomePage from "@/components/pages/home-page"; export const metadata: Metadata = {
  title: "Hire a Private Chef in Nigeria, UK & South Africa | iKook",
  description:
    "Book professional private chefs for home dining, events, meal prep and more. Available in Nigeria, United Kingdom, and South Africa. Get personalized culinary experiences delivered to your home.",
  keywords: [
    "private chef Nigeria",
    "private chef UK",
    "private chef South Africa",
    "hire personal chef",
    "chef at home service",
    "event catering chef",
    "meal prep chef near me",
  ],
  openGraph: {
    title: "iKook - Hire a Private Chef for Unforgettable Culinary Experience",
    description:
      "Book professional private chefs for home dining, events, meal prep and more. Available in Nigeria, UK & South Africa.",
    url: "https://ikook.co.uk",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iKook Private Chef Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iKook - Hire a Private Chef for Unforgettable Culinary Experience",
    description:
      "Book professional private chefs for home dining, events, meal prep and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://ikook.co.uk",
  },
};

export default function Index() {
  return <HomePage />;
}
