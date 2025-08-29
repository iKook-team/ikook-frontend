import React from 'react';

const Hero = () => {
  return (
    <section className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-12 py-16 min-h-[375px] max-md:w-full max-md:flex-col max-md:h-auto max-md:gap-10">
      <div className="w-[718px] h-[306px] relative max-md:w-full">
        <div>
          <h1 className="w-[718px] text-[#323335] text-[70px] font-bold leading-[71.4px] absolute h-[142px] left-0 top-[50px] max-md:text-5xl max-md:w-full max-sm:text-4xl">
            <span>Want to treat </span>
            <span className="relative inline-block">
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
              <span className="relative z-[3]">someone?</span>
            </span>
          </h1>
          <p className="w-[610px] text-[#686868] text-lg font-normal absolute h-[54px] left-0 top-[230px] max-md:w-full max-sm:text-base">
            Unforgettable memories with our gift experiences. Treat your loved
            ones to adventure today.
          </p>
          <button className="w-[180px] h-[50px] absolute flex items-center justify-center left-0 top-[306px]">
            <div className="w-[180px] h-[50px] absolute bg-[#FCC01C] rounded-[5px] left-0 top-0" />
            <span className="text-[#323335] text-base font-bold leading-6 absolute w-[59px] h-6 left-[45px] top-[13px]">
              Explore
            </span>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg id=\"2469:32106\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"button-arrow\" style=\"width: 16px; height: 16px; position: absolute; left: 110px; top: 17px\"> <path d=\"M8 12.6666L4 8.66661L4.93333 7.73328L8 10.7833L11.0667 7.73328L12 8.66661L8 12.6666ZM8 8.66661L4 4.66661L4.93333 3.73328L8 6.78328L11.0667 3.73328L12 4.66661L8 8.66661Z\" fill=\"#000817\"></path> </svg>",
                }}
              />
            </div>
          </button>
        </div>
      </div>
      <div className="w-[602px] h-[337px] rotate-[-3.698deg] relative max-md:w-full max-md:max-w-[400px]">
        <div className="w-[486px] h-[295px] rotate-[-3.698deg] absolute bg-[rgba(252,192,28,0.40)] rounded-[17.784px] left-[37px] top-[5px]" />
        <div className="w-[536px] h-[295px] rotate-[-3.698deg] absolute bg-[rgba(252,192,28,0.70)] rounded-[17.784px] left-[13px] top-[25px]" />
        <div className="w-[564px] h-[295px] rotate-[-3.698deg] absolute bg-[#FCC01C] rounded-[17.784px] left-[3px] top-11" />
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=\"2469:32112\" width=\"515\" height=\"206\" viewBox=\"0 0 515 206\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"card-logo\" style=\"width: 504px; height: 172px; transform: rotate(-3.631deg); position: absolute; left: 102px; top: 66px\"> <path d=\"M216.654 96.8609C240.396 95.2312 260.966 113.413 262.441 137.651C263.915 161.89 245.72 182.732 221.978 184.362C198.236 185.992 177.666 167.81 176.192 143.572C174.717 119.333 192.912 98.4906 216.654 96.8609Z\" stroke=\"white\" stroke-opacity=\"0.2\" stroke-width=\"13.253\"></path> <path d=\"M137.328 139.34L170.969 139.65L171.763 152.676L138.416 157.205L137.328 139.34Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <path d=\"M190.371 38.4464C186.828 43.3178 182.195 55.4491 192.015 65.0025C193.242 66.7976 201.904 74.4761 191.551 87.5694\" stroke=\"white\" stroke-opacity=\"0.2\" stroke-width=\"8.83535\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M212.676 19.6938C209.132 24.5653 204.5 36.6965 214.319 46.25C215.547 48.0451 224.209 55.7236 213.855 68.8168\" stroke=\"white\" stroke-opacity=\"0.2\" stroke-width=\"8.83535\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M239.489 35.2131C235.945 40.0846 231.312 52.2158 241.132 61.7692C242.359 63.5644 251.021 71.2428 240.668 84.3361\" stroke=\"white\" stroke-opacity=\"0.2\" stroke-width=\"8.83535\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M338.163 88.8638C361.905 87.234 382.475 105.415 383.95 129.653C385.424 153.891 367.228 174.734 343.486 176.364C319.743 177.994 299.173 159.812 297.699 135.574C296.224 111.336 314.42 90.4938 338.163 88.8638Z\" stroke=\"white\" stroke-opacity=\"0.2\" stroke-width=\"13.253\"></path> <path d=\"M9.08492 117.428C11.6718 108.972 18.1588 106.797 21.079 106.767L26.9266 200.064L14.3169 200.904L9.08492 117.428Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <path d=\"M63.9251 197.636L56.2031 73.9783L69.7238 73.074L73.3703 131.468L127.669 69.1986L145.053 68.036L74.3815 147.661L77.4458 196.732L63.9251 197.636Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <path d=\"M136.419 193.773L83.0734 147.08C88.3345 144.363 97.8204 145.108 101.906 145.821L154.285 192.579L136.419 193.773Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <path d=\"M424.074 173.436L416.352 49.7783L429.872 48.8741L433.519 107.268L487.818 44.9987L505.202 43.8361L434.53 123.461L437.594 172.532L424.074 173.436Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <path d=\"M496.567 169.573L443.222 122.88C448.483 120.163 457.969 120.908 462.054 121.621L514.434 168.379L496.567 169.573Z\" fill=\"white\" fill-opacity=\"0.2\"></path> <ellipse cx=\"9.67567\" cy=\"9.83046\" rx=\"9.67567\" ry=\"9.83046\" transform=\"matrix(0.997773 -0.0667361 0.0623203 0.998059 3.35938 72.9363)\" fill=\"white\" fill-opacity=\"0.2\"></ellipse> </svg>",
            }}
          />
        </div>
        <div className="rotate-[-3.698deg] text-white text-[89px] font-bold absolute w-[249px] h-[108px] left-[41px] top-[101px]">
          iKooK
        </div>
        <div className="rotate-[-3.698deg] text-white text-4xl font-normal absolute w-[153px] h-[43px] left-[90px] top-[206px]">
          Gift Card
        </div>
        <button className="w-[124px] h-[41px] rotate-[-3.698deg] absolute left-[437px] top-[253px]">
          <div className="w-[124px] h-[41px] rotate-[-3.698deg] absolute bg-white rounded-[44.46px] border-[1.778px] border-solid border-white left-0 top-0" />
          <span className="rotate-[-3.698deg] text-[#0A1481] text-sm font-normal absolute w-[86px] h-[17px] left-5 top-3.5">
            Choose card
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;