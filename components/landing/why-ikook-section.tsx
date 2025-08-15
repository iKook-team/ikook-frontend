import { BookingSections } from "./booking-sections";

const features = [
  {
    id: 1,
    number: "1",
    title: "Precious moments",
    description:
      "Enjoy quality time with families and friends at home over some excellent food.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/527c198107f511946c0fda2a9d3849b9242a8ebd?width=127",
  },
  {
    id: 2,
    number: "2",
    title: "Chef at Home",
    description:
      "Professional chefs come to your home and prepare fresh meals for your special occasions.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/1b953a16850283e97b293dd77405c883d4ecb507?width=736",
  },
  {
    id: 3,
    number: "3",
    title: "Ingredients - sorted!",
    description:
      "Chefs take care of all ingredients, so you don't have to worry about shopping.",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/feb030461af37f171913f04e21c4fe767c77307d?width=207",
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
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
    <>
      {/* Top Section with Yellow Background */}
      <section className="bg-[#FCC01C] py-16 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#323335] mb-12">
            Why iKooK?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Sections with White Background */}
      <BookingSections />
    </>
  );
}
