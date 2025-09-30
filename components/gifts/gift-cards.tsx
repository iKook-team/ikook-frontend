import React from "react";

const GiftCard = ({ amount }: { amount: string }) => (
  <article className="w-[386px] h-[202px] relative max-md:w-full">
    <div className="w-[386px] h-[202px] absolute bg-[#FCC01C] rounded-[12.169px] left-0 top-0" />
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg width="386" height="202" viewBox="0 0 386 202" fill="none" xmlns="http://www.w3.org/2000/svg" class="gift-card-pattern" style="width: 386px; height: 202px; position: absolute; left: 0; top: 0"> <mask id="mask0_2469_32139" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="386" height="202"> <rect width="385.747" height="202" rx="12.1687" fill="#FCC01C"></rect> </mask> <g mask="url(#mask0_2469_32139)"> <path d="M211.228 69.9211C227.512 69.8563 240.755 83.1794 240.692 99.7951C240.63 116.411 227.286 129.839 211.002 129.905C194.718 129.97 181.475 116.647 181.537 100.032C181.6 83.4158 194.944 69.9862 211.228 69.9211Z" stroke="white" stroke-opacity="0.2" stroke-width="9.06844"></path> <path d="M155.188 95.4271L178.145 97.123L178.112 106.053L155.142 107.674L155.188 95.4271Z" fill="white" fill-opacity="0.2"></path> <path d="M195.863 28.8746C193.228 32.0446 189.529 40.1238 195.813 47.0805C196.572 48.3604 202.148 53.9858 194.501 62.4694" stroke="white" stroke-opacity="0.2" stroke-width="6.04563" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M211.925 17.0541C209.291 20.2241 205.592 28.3032 211.876 35.2599C212.635 36.5399 218.211 42.1652 210.563 50.6488" stroke="white" stroke-opacity="0.2" stroke-width="6.04563" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M229.55 28.8343C226.916 32.0043 223.217 40.0835 229.501 47.0402C230.26 48.3201 235.836 53.9455 228.188 62.4291" stroke="white" stroke-opacity="0.2" stroke-width="6.04563" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M294.564 69.8222C310.848 69.7569 324.092 83.0795 324.029 99.6949C323.966 116.31 310.622 129.74 294.338 129.806C278.053 129.871 264.81 116.548 264.873 99.9321C264.935 83.3167 278.28 69.8875 294.564 69.8222Z" stroke="white" stroke-opacity="0.2" stroke-width="9.06844"></path> <path d="M68.5885 74.8056C70.728 69.1456 75.2535 67.947 77.2489 68.0553L77.1247 132.019L68.4774 132.037L68.5885 74.8056Z" fill="white" fill-opacity="0.2"></path> <path d="M102.496 131.994L102.68 47.2159L111.952 47.1951L111.865 87.2293L151.69 47.1059L163.611 47.0792L111.841 98.3312L111.768 131.973L102.496 131.994Z" fill="white" fill-opacity="0.2"></path> <path d="M152.167 132.555L117.802 98.3178C121.514 96.6947 127.958 97.6222 130.717 98.2888L164.419 132.528L152.167 132.555Z" fill="white" fill-opacity="0.2"></path> <path d="M349.488 131.363L349.672 46.5844L358.944 46.5635L358.857 86.5977L398.682 46.4743L410.604 46.4476L358.833 97.6996L358.76 131.342L349.488 131.363Z" fill="white" fill-opacity="0.2"></path> <path d="M399.159 131.924L364.794 97.6862C368.506 96.0631 374.951 96.9906 377.709 97.6572L411.412 131.896L399.159 131.924Z" fill="white" fill-opacity="0.2"></path> <ellipse cx="6.62063" cy="6.72654" rx="6.62063" ry="6.72654" transform="matrix(1 -0.00225024 -0.00217483 1 66.6484 44.1727)" fill="white" fill-opacity="0.2"></ellipse> </g> </svg>',
        }}
      />
    </div>
    <div className="text-white text-3xl font-bold absolute w-[84px] h-9 left-[18px] top-[133px]">
      iKooK
    </div>
    <div className="text-white text-3xl font-bold absolute left-[18px] top-[15px]">
      {amount}
    </div>
    <div className="text-white text-xs font-normal absolute w-[52px] h-[15px] left-8 top-[166px]">
      Gift Card
    </div>
    <button className="w-[124px] h-10 absolute left-[250px] top-[142px]">
      <div className="w-[124px] h-10 absolute bg-white rounded-[44.159px] border-[1.766px] border-solid border-white left-0 top-0" />
      <span className="w-[85px] h-[17px] text-[#0A1481] text-sm font-normal absolute left-[19px] top-3">
        Choose card
      </span>
    </button>
  </article>
);

const GiftCards = () => {
  const cardAmounts = ["£100", "£200", "£300", "£500", "£800", "£1000"];

  return (
    <section className="w-full relative max-w-7xl mx-auto px-6 lg:px-12 py-16 max-md:w-full">
      <div className="relative h-[89px]">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg width="1255" height="89" viewBox="0 0 1255 89" fill="none" xmlns="http://www.w3.org/2000/svg" class="section-header" style="width: 1255px; height: 87px; position: absolute; left: 3px; top: 0"> <path d="M0 1H1254.5" stroke="#323335" stroke-opacity="0.2" stroke-width="2"></path> <path d="M0 88H1254.5" stroke="#323335" stroke-opacity="0.2" stroke-width="2"></path> <text fill="#323335" xml:space="preserve" style="white-space: pre" font-family="Poppins" font-size="35" font-weight="500" letter-spacing="0em"><tspan x="537" y="56.75">Gift Cards</tspan></text> </svg>',
          }}
        />
      </div>
      <div className="grid grid-cols-[repeat(3,386px)] grid-rows-[repeat(2,202px)] gap-[46px_46px] mt-[75px] max-md:grid-cols-[repeat(2,1fr)] max-md:gap-5 max-sm:grid-cols-[1fr]">
        {cardAmounts.map((amount, index) => (
          <GiftCard key={index} amount={amount} />
        ))}
      </div>
    </section>
  );
};

export default GiftCards;
