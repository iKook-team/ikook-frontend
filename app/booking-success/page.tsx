import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Booking Success | iKook",
  description: "Your private chef booking request has been submitted successfully. Our team will contact you soon.",
  openGraph: {
    title: "Booking Success | iKook",
    description: "Your private chef booking request has been submitted successfully.",
    url: "https://ikook.co.uk/booking-success",
    type: "website",
  },
  alternates: {
    canonical: "https://ikook.co.uk/booking-success",
  },
};

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="flex w-full flex-col items-stretch mt-[110px] max-md:mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 md:mb-28 lg:mb-32">
          <div className="max-md:max-w-full">
            <div className="text-center mb-12">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <h1 className="text-[#323335] text-[50px] font-bold leading-none mb-6 max-md:text-[40px]">
                Booking
                <span className="ml-3 relative inline-block">
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
                  <span className="relative z-[3]">Successful!</span>
                </span>
              </h1>
              
              <p className="text-[#323335] text-xl font-medium mb-8 max-w-3xl mx-auto">
                Thank you for your booking request! We&apos;ve received your details and our team is already working to find the perfect chef for your event.
              </p>
              
              <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                One of our representatives will contact you shortly to discuss your requirements and match you with the ideal private chef.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-semibold text-[#323335] mb-6">What happens next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-[#323335] mb-2">Review Your Request</h3>
                  <p className="text-gray-600 text-sm">Our team reviews your event details and requirements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-[#323335] mb-2">Chef Matching</h3>
                  <p className="text-gray-600 text-sm">We match you with the perfect chef based on your needs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-[#323335] mb-2">Contact You</h3>
                  <p className="text-gray-600 text-sm">We&#39;ll call or email to confirm details and finalize booking</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explore"
                className="px-8 py-4 bg-[#FCC01C] text-white font-bold rounded-lg hover:bg-[#E6AC19] transition-colors text-center"
              >
                Explore Chefs
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-[#323335] text-[#323335] font-bold rounded-lg hover:bg-[#323335] hover:text-white transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
