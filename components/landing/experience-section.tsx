import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ExperienceSection() {
  return (
    <section className="w-full bg-[#FCC01C] py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Content - 60% width */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between h-full py-6">
            <h2 className="text-3xl md:text-4xl font-medium text-[#323335] leading-loose mb-32">
              Experience different cuisines and enjoy professionally prepared
              food, at your home or for any occasion! Our app will connect you
              with trained chefs who tailor to your exact needs.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="white"
                size="lg"
                className="px-8 py-4 text-lg font-semibold"
              >
                Get Started
              </Button>

              <button className="flex items-center space-x-3 text-white hover:text-ikook-primary transition-colors group">
                <div className="w-8 h-8 bg-ikook-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="text-lg font-semibold">How to Book</span>
              </button>
            </div>
          </div>

          {/* Right Image - 40% width */}
          <div className="relative w-full lg:w-[40%]">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/affc2398101ef05c374621226bf50347d1ae3e34?width=897"
                alt="Professional chef cooking"
                className="w-full h-[400px] lg:h-[500px] object-cover object-center"
              />
            </div>

            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FCC01C]/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
