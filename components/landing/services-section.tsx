import Image from "next/image";

export default function ServicesSection() {
  const services = [
    {
      title: "LEARN FOOD",
      subtitle: "Learn from experienced chefs",
      image:
        "/large-event.png",
    },
    {
      title: "CHEF AT HOME",
      subtitle: "Professional chefs at your location",
      image:
        "/chef-at-home.png",
    },
    {
      title: "MEAL PREP",
      subtitle: "Healthy meals prepared for you",
      image:
        "/meal-prep.png",
    },
  ];

  return (
    <section className="bg-white py-12 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute top-0 left-[15%] right-[15%] h-0.5 bg-gray-200" />
            <div className="absolute bottom-0 left-[15%] right-[15%] h-0.5 bg-gray-200" />
            <h2 className="text-3xl lg:text-4xl font-medium text-[#323335] py-4 bg-white inline-block px-8">
              Our Services
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <Image
              key={index}
              src={service.image}
              alt={service.title}
              width={400}
              height={450}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Bottom Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FCC01C] p-12 text-center rounded-lg">
            <h3 className="text-4xl lg:text-5xl font-bold text-[#323335] mb-4">
              VIP CHEFS
            </h3>
            <p className="text-lg text-[#323335]">
              Get access to our VIP chefs
            </p>
          </div>

          <div className="bg-[#323335] p-12 text-center rounded-lg">
            <h3 className="text-3xl lg:text-4xl font-bold text-[#FCC01C] mb-4 leading-tight">
              HEALTHY EATING COACH
            </h3>
            <p className="text-lg text-[#FCC01C]">
              Improve your healthy eating with our coach
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
