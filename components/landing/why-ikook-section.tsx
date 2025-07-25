import { Button } from "../ui/button";

const features = [
  {
    id: 1,
    number: "1",
    title: "Precious moments",
    description: "Enjoy quality time with families and friends at home over some excellent food.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/527c198107f511946c0fda2a9d3849b9242a8ebd?width=127"
  },
  {
    id: 2,
    number: "2", 
    title: "Chef at Home",
    description: "Professional chefs come to your home and prepare fresh meals for your special occasions.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/1b953a16850283e97b293dd77405c883d4ecb507?width=736"
  },
  {
    id: 3,
    number: "3",
    title: "Ingredients - sorted!",
    description: "Chefs take care of all ingredients, so you don't have to worry about shopping.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/feb030461af37f171913f04e21c4fe767c77307d?width=207"
  }
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="bg-white rounded-lg p-8 text-center shadow-sm relative">
      <div className="absolute top-4 left-4 text-6xl font-semibold text-black/10">
        {feature.number}
      </div>
      <div className="mb-6 flex justify-center">
        <img
          src={feature.icon}
          alt={feature.title}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#323335] mb-4">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function WhyIKookSection() {
  return (
    <section className="bg-[#FCC01C] py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#323335] mb-12">
            Why iKooK?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>

        {/* Bottom Section - Booking Made Easy */}
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
              iKooK provides the quickest and most affordable way to book a private chef. 
              Chefs can create set menus that can be booked quickly, or customised menus 
              to suit the individual user's needs. Our chat feature allows you and the chef 
              to communicate so everything in the booking goes smoothly.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              The chef will make sure all the cookware used is left as it was found, so you 
              can enjoy your meal with peace of mind, knowing that your chef has taken care 
              of everything!
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
              iKooK created a platform which allows you to make a booking at anytime you want 
              with one of the best, top-rated private chefs.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              Chefs are able to set their own schedule and work whenever they want. As a chef, 
              you can express your creativity through creating set menus, as well as customised 
              menus for every individual booking.
            </p>
            <p className="text-[#323335]/70 text-lg leading-relaxed">
              iKooK verifies that each chef is professionally trained with adequate certificates 
              and comply with our SLA. We will also make sure that each chef completes the CPD 
              accredited Covid19 safety course on how to protect themselves.
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