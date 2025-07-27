import { Button } from "../ui/button";

export default function ExperienceSection() {
  return (
    <section className="bg-[#323335] py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              Experience different cuisines and enjoy professionally prepared
              food, at your home or for any occasion! Our app will connect you
              with trained chefs who tailor to your exact needs.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white hover:bg-gray-100 text-[#323335] font-semibold px-8 py-4 rounded-md">
                Get Started
              </Button>

              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-md flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-[#FCC01C] rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5V19L19 12L8 5Z" fill="#323335" />
                  </svg>
                </div>
                <span>How to Book</span>
              </Button>
            </div>
          </div>

          {/* Right Content - Chef Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-[4/3]">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/affc2398101ef05c374621226bf50347d1ae3e34?width=897"
                alt="Professional chef in kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
