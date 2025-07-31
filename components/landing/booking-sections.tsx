import { Button } from "@/components/ui/button";

export function BookingSections() {
  return (
    <section className="bg-white py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Booking Made Easy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/28cb944db002d1afb3a7add3d8ea9cfffbf3eae9?width=1198"
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#323335]">
              Booking a chef made easy
            </h3>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              iKooK provides the quickest and most affordable way to book a
              private chef. Chefs can create set menus that can be booked
              quickly, or customised menus to suit the individual user&apos;s needs.
              Our chat feature allows you and the chef to communicate so
              everything in the booking goes smoothly.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              The chef will make sure all the cookware used is left as it was
              found, so you can enjoy your meal with peace of mind, knowing that
              your chef has taken care of everything!
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              Start searching now!
            </p>
            <Button className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-[#323335] font-semibold px-8 py-3 rounded-md border-2 border-[#323335]">
              Get Started
            </Button>
          </div>
        </div>

        {/* Flexible Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#323335]">
              Flexible booking and working
            </h3>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              iKooK created a platform which allows you to make a booking at
              anytime you want with one of the best, top-rated private chefs.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              Chefs are able to set their own schedule and work whenever they
              want. As a chef, you can express your creativity through creating
              set menus, as well as customised menus for every individual
              booking.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              iKooK verifies that each chef is professionally trained with
              adequate certificates and comply with our SLA. We will also make
              sure that each chef completes the CPD accredited Covid19 safety
              course on how to protect themselves.
            </p>
            <Button className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-[#323335] font-semibold px-8 py-3 rounded-md border-2 border-[#323335]">
              Signup as Chef
            </Button>
          </div>

          <div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5b567ff79c1cfea84498177ee48b6135baa9d526?width=1198"
                alt="Chef working flexibly"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
