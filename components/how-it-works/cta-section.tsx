import React from 'react';

const CTASection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Yellow backdrop */}
          <div className="absolute inset-0 bg-[#FCC01C] translate-x-2 translate-y-2 rounded-xl -z-10" />

          {/* Card */}
          <div className="rounded-2xl bg-white shadow-[0_0_30px_0_rgba(0,0,0,0.10)] p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-[#FCC01C] text-2xl md:text-3xl lg:text-4xl font-bold">
                  Start booking a private chef today
                </h2>
              </div>
              <div>
                <button className="px-6 py-3 bg-white rounded-md border shadow-sm border-[rgba(0,0,0,0.08)] font-bold text-[#323335] hover:bg-gray-50 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Decorative images */}
            <div className="hidden md:block">
              <div className="relative h-0">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/125920288c2fb33b120eeb458dff501e738bf283?width=399"
                  alt="Chef cooking"
                  className="absolute right-40 -top-6 w-[200px] h-[231px] shadow-[3.449px_3.449px_13.797px_0_rgba(0,0,0,0.10)]"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/70bb5e3976e1a2e2edc3958ff4b947fa9b0ff95f?width=346"
                  alt="Food preparation"
                  className="absolute right-4 -top-24 w-[173px] h-[200px] shadow-[2.986px_2.986px_11.945px_0_rgba(0,0,0,0.10)]"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4d0ec61d739838c50e77f6fe79aadbcbd2ab548c?width=346"
                  alt="Delicious meal"
                  className="absolute right-6 top-24 w-[173px] h-[200px] shadow-[2.986px_2.986px_11.945px_0_rgba(0,0,0,0.10)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;