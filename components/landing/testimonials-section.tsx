export default function TestimonialsSection() {
  return (
    <section className="bg-[#FCC01C] py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Avatar */}
          <div className="flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/dae2e4ece8777447073e6e9d07f336a05db5602c?width=500"
                alt="Customer testimonial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="space-y-4">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#323335]/20" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#323335]/20" />
                <h2 className="text-3xl lg:text-4xl font-medium text-[#323335] py-4 inline-block px-8">
                  What They Say
                </h2>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <div className="text-8xl lg:text-9xl font-bold text-white leading-none italic">
                &quot;
              </div>
              <blockquote className="text-2xl lg:text-3xl font-medium text-[#323335] leading-loose">
                The food and service was excellent, I was very impressed,
                I&apos;d totally recommend ikook. Excellent way to find the
                professional chef you need for your occasions.
              </blockquote>
            </div>

            {/* Attribution */}
            <div className="space-y-4">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#323335]/20" />
              <div className="pt-8">
                <h4 className="text-2xl lg:text-3xl font-medium text-[#323335] mb-2">
                  Stephanie Moore
                </h4>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#323335]"
                    >
                      <path
                        d="M17.3469 7.42896L12.4958 6.65262L10.3272 1.81152C10.2679 1.67897 10.1705 1.56167 9.05009 1.50645C9.74822 1.34234 9.38136 1.47909 9.23043 1.81152L7.06182 6.65262L2.21062 7.42896C2.07687 7.45 1.95458 7.51942 1.86096 7.62462C1.74777 7.75272 1.68541 7.92506 1.68755 8.10376C1.68971 8.28248 1.75618 8.45294 1.87242 8.57768L5.38233 12.3458L4.55309 17.6666C4.53366 17.9034 4.56609 18.1765 4.659 18.4404C4.75192 18.7043 4.89358 18.2512 5.07588 18.2504C5.22496 18.3006 5.38878 18.4227 5.43964 18.376L9.5879 15.8635L13.736 18.376C13.8364 18.4450 13.9740 18.4682 14.1058 18.4429C14.3826 18.3798 14.6618 18.0327 14.604 17.6666L13.7752 12.3458L17.285 8.57768C17.4007 8.4746 17.4844 8.33994 17.5284 8.19268C17.5944 7.82448 17.6813 7.4837 17.3469 7.42896Z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-end space-x-4 pt-8">
              <button className="w-16 h-16 rounded-full border-2 border-[#323335] flex items-center justify-center hover:bg-[#323335]/10 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#323335"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#323335"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
