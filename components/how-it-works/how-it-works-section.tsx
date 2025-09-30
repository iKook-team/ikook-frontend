import React from "react";

import FeatureCard from "./feature-card";

const HowItWorksSection = () => {
  const features = [
    {
      title: "Signup",
      description:
        "Sign up today and gain access to a world of delicious menus, crafted by professional chefs.",
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/a52557fbbec295fc841880ad75b27d2eb0e726ad?width=1096",
      imageAlt: "Signup process illustration",
      iconSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 60px; height: 60px"> <path d="M27.8549 34.2858H2.14062L6.42634 55.7143H32.1406L27.8549 34.2858Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M32.1404 55.7143H57.8546C57.8546 45.063 49.2202 36.4286 38.569 36.4286C35.0092 36.4286 31.6747 37.393 28.8125 39.0749L32.1404 55.7143Z" fill="#FCC01C"></path> <path d="M38.5737 25.7143C44.4909 25.7143 49.2879 20.9174 49.2879 15.0001C49.2879 9.08272 44.4909 4.28577 38.5737 4.28577C32.6563 4.28577 27.8594 9.08272 27.8594 15.0001C27.8594 20.9174 32.6563 25.7143 38.5737 25.7143Z" fill="#FCC01C"></path> <path d="M38.5737 25.7143C44.4909 25.7143 49.2879 20.9174 49.2879 15.0001C49.2879 9.08272 44.4909 4.28577 38.5737 4.28577C32.6563 4.28577 27.8594 9.08272 27.8594 15.0001C27.8594 20.9174 32.6563 25.7143 38.5737 25.7143Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M38.5703 36.4285C41.1045 36.4229 43.615 36.9179 45.9572 37.8851C48.2997 38.8523 50.428 40.2726 52.2199 42.0646C54.0117 43.8565 55.4325 45.9848 56.3993 48.3274C57.3666 50.6695 57.8616 53.1801 57.856 55.7142" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M27.8549 34.2858H2.14062L6.42634 55.7143H32.1406L27.8549 34.2858Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M32.1406 55.7142H44.9978" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`,
    },
    {
      title: "Chef and menus",
      description:
        "Booking is easy – simply choose a menu that appeals to you. Can't find what you want? you can use the custom booking to get customized menu.",
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/93ac7e9b063966644e3ea66a9aabcd709ec777dc?width=1096",
      imageAlt: "Chef and menu selection",
      iconSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 60px; height: 60px"> <g clip-path="url(#clip0_2469_32395)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M38.1592 49.698C43.3834 54.9222 50.469 57.8571 57.8571 57.8571V45C53.8787 45 50.0636 43.4198 47.2504 40.6065C44.4373 37.7935 42.8571 33.9782 42.8571 30C42.8571 26.0217 44.4373 22.2064 47.2504 19.3934C50.0636 16.5803 53.8787 15 57.8571 15V2.14282C50.469 2.14282 43.3834 5.07777 38.1592 10.302C32.9349 15.5262 30 22.6118 30 30C30 37.3881 32.9349 44.4737 38.1592 49.698Z" fill="#FCC01C"></path> <path d="M57.8594 45C53.8809 45 50.0658 43.4199 47.2527 40.6066C44.4395 37.7936 42.8594 33.9783 42.8594 30C42.8594 26.0217 44.4395 22.2064 47.2527 19.3934C50.0658 16.5804 53.8809 15 57.8594 15" fill="white"></path> <path d="M2.14062 2.14282V11.7857C2.14062 14.6273 3.26945 17.3525 5.27875 19.3618C7.28807 21.3712 10.0133 22.5 12.8549 22.5C15.6965 22.5 18.4218 21.3712 20.4311 19.3618C22.4404 17.3525 23.5692 14.6273 23.5692 11.7857V2.14282" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.8594 2.14282V57.8571" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M57.8571 57.8571C50.469 57.8571 43.3834 54.9222 38.1592 49.698C32.9349 44.4737 30 37.3881 30 30C30 22.6118 32.9349 15.5262 38.1592 10.302C43.3834 5.07777 50.469 2.14282 57.8571 2.14282" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M57.8594 45C53.8809 45 50.0658 43.4199 47.2527 40.6066C44.4395 37.7936 42.8594 33.9783 42.8594 30C42.8594 26.0217 44.4395 22.2064 47.2527 19.3934C50.0658 16.5804 53.8809 15 57.8594 15" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_2469_32395"> <rect width="60" height="60" fill="white"></rect> </clipPath> </defs> </svg>`,
    },
    {
      title: "Payment",
      description:
        "Enjoy the convenience of seamless, secure online payments! Our platform offers a fast, easy, and secure way to pay for your experience.",
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/f215fbd418d137033d9f0322e9314e3a304a2139?width=1096",
      imageAlt: "Payment process",
      iconSvg: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 60px; height: 60px"> <g clip-path="url(#clip0_2469_32409)"> <path d="M29.9989 36.4287C33.5493 36.4287 36.4275 33.5505 36.4275 30.0001C36.4275 26.4497 33.5493 23.5715 29.9989 23.5715C26.4485 23.5715 23.5703 26.4497 23.5703 30.0001C23.5703 33.5505 26.4485 36.4287 29.9989 36.4287Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1429 12.8572H42.8571C44.0404 12.8572 45 13.8166 45 15V45C45 46.1833 44.0404 47.1429 42.8571 47.1429H17.1429C15.9594 47.1429 15 46.1833 15 45V15C15 13.8166 15.9594 12.8572 17.1429 12.8572ZM36.4286 30C36.4286 33.5504 33.5504 36.4286 30 36.4286C26.4496 36.4286 23.5714 33.5504 23.5714 30C23.5714 26.4496 26.4496 23.5715 30 23.5715C33.5504 23.5715 36.4286 26.4496 36.4286 30Z" fill="#FCC01C"></path> <path d="M29.9989 36.4287C33.5493 36.4287 36.4275 33.5505 36.4275 30.0001C36.4275 26.4497 33.5493 23.5715 29.9989 23.5715C26.4485 23.5715 23.5703 26.4497 23.5703 30.0001C23.5703 33.5505 26.4485 36.4287 29.9989 36.4287Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4.28348 19.2857C3.71516 19.2857 3.17012 19.0599 2.76825 18.658C2.36639 18.2562 2.14062 17.7112 2.14062 17.1428V4.28568C2.14062 3.71736 2.36639 3.17232 2.76825 2.77045C3.17012 2.36859 3.71516 2.14282 4.28348 2.14282H55.7121C56.2803 2.14282 56.8255 2.36859 57.2275 2.77045C57.629 3.17232 57.8549 3.71736 57.8549 4.28568V17.1428C57.8549 17.7112 57.629 18.2562 57.2275 18.658C56.8255 19.0599 56.2803 19.2857 55.7121 19.2857" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M42.8571 12.8572H17.1429C15.9594 12.8572 15 13.8166 15 15V45C15 46.1833 15.9594 47.1429 17.1429 47.1429H42.8571C44.0404 47.1429 45 46.1833 45 45V15C45 13.8166 44.0404 12.8572 42.8571 12.8572Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 57.8572H45" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_2469_32409"> <rect width="60" height="60" fill="white"></rect> </clipPath> </defs> </svg>`,
    },
    {
      title: "Event Date",
      description:
        "Our chefs take care of the rest, bringing the restaurant experience right to your kitchen. Experience the ultimate in personalized dining.",
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/532808ee086a85b69b09223b96bffe122e220bfe?width=1096",
      imageAlt: "Event date selection",
      iconSvg: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px"> <g clip-path="url(#clip0_2469_32423)"> <path d="M40.6288 45.2572L17.7258 36.7201C17.0478 36.4807 16.441 36.0745 15.9612 35.5389C15.4814 35.0037 15.144 34.3561 14.98 33.656C14.8161 32.9559 14.831 32.2259 15.0232 31.5331C15.2154 30.8403 15.5789 30.207 16.08 29.6915L30.4458 15.3258C30.9764 14.8284 31.6241 14.473 32.3287 14.2927C33.0333 14.1123 33.772 14.1127 34.4766 14.294C35.1808 14.4752 35.8281 14.8313 36.3582 15.3293C36.8882 15.8274 37.2839 16.4512 37.5088 17.1429L46.0116 40.0458C46.2475 40.7877 46.2722 41.5811 46.0819 42.336C45.8916 43.091 45.4946 43.7781 44.9351 44.3198C44.3759 44.8612 43.6761 45.2359 42.9153 45.4015C42.1545 45.5671 41.3625 45.5174 40.6288 45.2572Z" fill="#FCC01C"></path> <path d="M40.6285 45.2571L17.7258 36.72C17.0478 36.4807 16.441 36.0744 15.9612 35.5392C15.4814 35.0036 15.144 34.356 14.9801 33.656C14.8161 32.9559 14.831 32.2259 15.0232 31.5331C15.2154 30.8403 15.5789 30.207 16.08 29.6915L30.4458 15.3257C30.9764 14.8284 31.6241 14.473 32.3287 14.2926C33.0333 14.1123 33.772 14.1127 34.4763 14.2939C35.1809 14.4752 35.8282 14.8313 36.3582 15.3293C36.8883 15.8274 37.2839 16.4512 37.5085 17.1429L46.0114 40.0457C46.2476 40.7877 46.2719 41.581 46.082 42.336C45.8917 43.091 45.4947 43.778 44.9351 44.3198C44.3756 44.8615 43.6762 45.2362 42.9154 45.4018C42.1546 45.5674 41.3626 45.5174 40.6285 45.2571Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.03125 24.4456C8.55374 23.596 10.3367 23.3396 12.037 23.7256" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.8485 14.6743C13.8776 13.2107 13.4752 11.4426 13.717 9.70288" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22.7286 2.46851C21.527 6.14966 21.6851 10.1397 23.1743 13.7142" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3.42522 12.9601C4.37199 12.9601 5.13951 12.1925 5.13951 11.2458C5.13951 10.299 4.37199 9.53149 3.42522 9.53149C2.47845 9.53149 1.71094 10.299 1.71094 11.2458C1.71094 12.1925 2.47845 12.9601 3.42522 12.9601Z" stroke="#323335" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_2469_32423"> <rect width="48" height="48" fill="white"></rect> </clipPath> </defs> </svg>`,
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              iconSvg={feature.iconSvg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
