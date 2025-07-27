export default function ServicesSection() {
  const services = [
    {
      title: "LEARN FOOD",
      subtitle: "Learn from experienced chefs",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e7f14de75a63dd0b5e270101f268a9521e2eb948?width=786",
    },
    {
      title: "CHEF AT HOME",
      subtitle: "Professional chefs at your location",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/16100068db5221ab424d46e6c48b11a46cf375d9?width=786",
    },
    {
      title: "MEAL PREP",
      subtitle: "Healthy meals prepared for you",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7d5e453487f3c7b92228dea3793ab97b33069061?width=788",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200" />
            <h2 className="text-3xl lg:text-4xl font-medium text-[#323335] py-4 bg-white inline-block px-8">
              Our Services
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className="text-sm opacity-90">{service.subtitle}</p>
                </div>
              </div>
            </div>
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
