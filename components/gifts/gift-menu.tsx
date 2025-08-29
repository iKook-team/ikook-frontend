import React from 'react';

const MenuCard = ({ title, price }: { title: string; price: string }) => (
  <article className="w-[394px] h-80 relative max-md:w-full">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/816f2cafa25049ba47fe5f03286ecde4ce78ca39?width=788"
      alt={title}
      className="w-[394px] h-[295px] absolute left-0 top-0"
    />
    <div className="w-[394px] h-[295px] absolute left-0 top-0" />
    <div className="w-[359px] h-[38px] absolute left-4 top-[249px]">
      <h3 className="w-[291px] text-white text-lg font-bold absolute h-[27px] left-0 top-[9px]">
        {title}
      </h3>
      <div className="w-12 h-[38px] absolute left-[311px] top-0">
        <div className="text-[#FCC01C] text-right text-[25px] font-bold absolute w-12 h-[38px] left-0 top-0">
          {price}
        </div>
        <div className="text-white text-[4px] font-normal absolute w-[27px] h-1.5 left-[21px] top-0">
          Starting from
        </div>
      </div>
    </div>
    <div className="w-[365px] h-10 absolute left-2.5 top-[301px]">
      <div className="w-[60px] h-[15px] absolute left-[51px] top-[23px]">
        <div className="w-[46px] text-[rgba(50,51,53,0.80)] text-[10px] font-normal absolute h-[15px] left-3.5 top-0">
          London
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"location-icon\" style=\"width: 12px; height: 12px; position: absolute; left: 0; top: 2px\"> <path d=\"M6 10.5C5.36847 9.96136 4.7831 9.3708 4.25 8.73455C3.45 7.77905 2.5 6.35605 2.5 5.00005C2.49965 4.30753 2.70475 3.63047 3.08935 3.05456C3.47394 2.47865 4.02074 2.02978 4.66053 1.76474C5.30033 1.49971 6.00437 1.43044 6.68356 1.56569C7.36274 1.70094 7.98654 2.03464 8.476 2.52455C8.80188 2.84898 9.06017 3.23481 9.23594 3.65973C9.41171 4.08465 9.50146 4.54021 9.5 5.00005C9.5 6.35605 8.55 7.77905 7.75 8.73455C7.2169 9.3708 6.63153 9.96136 6 10.5ZM6 3.50005C5.60218 3.50005 5.22064 3.65808 4.93934 3.93939C4.65804 4.22069 4.5 4.60222 4.5 5.00005C4.5 5.39787 4.65804 5.7794 4.93934 6.06071C5.22064 6.34201 5.60218 6.50005 6 6.50005C6.39783 6.50005 6.77936 6.34201 7.06066 6.06071C7.34197 5.7794 7.5 5.39787 7.5 5.00005C7.5 4.60222 7.34197 4.22069 7.06066 3.93939C6.77936 3.65808 6.39783 3.50005 6 3.50005Z\" fill=\"#FCC01C\"></path> </svg>",
            }}
          />
        </div>
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class=\"chef-avatar\" style=\"width: 40px; height: 40px; position: absolute; left: 0; top: 0\"> <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"url(#pattern0_7681_9170)\" stroke=\"white\" stroke-width=\"2\"></circle> <circle cx=\"35\" cy=\"34\" r=\"4\" fill=\"white\"></circle> <mask id=\"mask0_7681_9170\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"32\" y=\"32\" width=\"6\" height=\"4\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M32.5 34L33.125 33.375L34.375 34.625L36.875 32.125L37.5 32.75L34.375 35.875L32.5 34Z\" fill=\"white\" stroke=\"white\" stroke-width=\"0.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </mask> <g mask=\"url(#mask0_7681_9170)\"> <path d=\"M32 31H38V37H32V31Z\" fill=\"#FCC01C\"></path> </g> <defs> <pattern id=\"pattern0_7681_9170\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\"> <use xlink:href=\"#image0_7681_9170\" transform=\"translate(-0.136618) scale(0.000310849)\"></use> </pattern> </defs> </svg>",
          }}
        />
      </div>
      <div className="w-[124px] text-[#323335] text-xs font-normal absolute h-[18px] left-[51px] top-[5px]">
        Chef Titilayo John
      </div>
      <div className="w-16 h-[35px] absolute left-[301px] top-[3px]">
        <div className="w-[23px] text-[#323335] text-sm font-normal absolute h-[21px] left-[41px] top-0">
          4.6
        </div>
        <div className="w-16 h-8 absolute left-0 top-[3px]">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"star-icon\" style=\"width: 14px; height: 13px; position: absolute; left: 24px; top: 0\"> <path d=\"M12.4161 4.65472L8.94482 4.16829L7.39306 1.13504C7.35068 1.05199 7.28096 0.984762 7.19482 0.943897C6.97881 0.841075 6.71631 0.92676 6.6083 1.13504L5.05654 4.16829L1.58525 4.65472C1.48955 4.6679 1.40205 4.7114 1.33506 4.77731C1.25407 4.85758 1.20944 4.96556 1.21098 5.07753C1.21251 5.1895 1.26009 5.29631 1.34326 5.37447L3.85478 7.73543L3.26142 11.0692C3.24751 11.1468 3.25641 11.2265 3.28712 11.2995C3.31782 11.3724 3.36911 11.4356 3.43515 11.4818C3.5012 11.5281 3.57936 11.5555 3.66078 11.5611C3.7422 11.5667 3.82362 11.5502 3.8958 11.5135L7.00068 9.93951L10.1056 11.5135C10.1903 11.557 10.2888 11.5715 10.3831 11.5557C10.621 11.5161 10.781 11.2986 10.7399 11.0692L10.1466 7.73543L12.6581 5.37447C12.7265 5.30988 12.7716 5.22551 12.7853 5.13324C12.8222 4.90255 12.6554 4.68899 12.4161 4.65472Z\" fill=\"#FCC01C\"></path> </svg>",
              }}
            />
          </div>
          <div className="text-[#323335] text-[10px] font-normal absolute w-16 h-[15px] left-0 top-[17px]">
            (23 Reviews)
          </div>
        </div>
      </div>
    </div>
  </article>
);

const GiftMenus = () => {
  const menuItems = [
    { title: 'Birthday Dinner for 2 to 10', price: '£20' },
    { title: 'Romantic Private Date for 2', price: '£20' },
    { title: 'Meal at home with friends', price: '£20' },
  ];

  return (
    <section className="w-full relative max-w-7xl mx-auto px-6 lg:px-12 py-16 max-md:w-full">
      <div className="relative h-[89px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"1255\" height=\"89\" viewBox=\"0 0 1255 89\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"section-header\" style=\"width: 1255px; height: 87px; position: absolute; left: 3px; top: 0\"> <path d=\"M0 1H1254.5\" stroke=\"#323335\" stroke-opacity=\"0.2\" stroke-width=\"2\"></path> <path d=\"M0 88H1254.5\" stroke=\"#323335\" stroke-opacity=\"0.2\" stroke-width=\"2\"></path> <text fill=\"#323335\" xml:space=\"preserve\" style=\"white-space: pre\" font-family=\"Poppins\" font-size=\"35\" font-weight=\"500\" letter-spacing=\"0em\"><tspan x=\"532\" y=\"56.75\">Gift Menus</tspan></text> </svg>",
          }}
        />
      </div>
      <div className="grid grid-cols-[repeat(3,394px)] gap-[38px] mt-[75px] max-md:grid-cols-[repeat(2,1fr)] max-md:gap-5 max-sm:grid-cols-[1fr]">
        {menuItems.map((item, index) => (
          <MenuCard key={index} title={item.title} price={item.price} />
        ))}
      </div>
    </section>
  );
};

export default GiftMenus;
