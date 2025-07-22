import React from 'react';

export const ImageGallery: React.FC = () => {
  return (
    <section className="self-stretch flex flex-row items-stretch justify-center gap-[11px] flex-nowrap mt-[65px] max-md:flex-wrap max-md:mt-10">
      <div className="flex flex-col w-[350px] max-md:w-full max-md:max-w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/18b621ae7ac72fc8b666be278472e3bd591dc8dd?placeholderIfAbsent=true"
          className="aspect-[2.67] object-cover w-full rounded-[13px] max-md:max-w-full"
          alt="Featured dish"
        />
        <div className="mt-4 max-md:max-w-full">
          <div className="gap-5 flex flex-row max-md:flex-col max-md:items-stretch">
            <div className="w-[65%] max-md:w-full max-md:ml-0">
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/a8be99dd7e96ebafa9dcf6c8738d534952400826?placeholderIfAbsent=true"
                className="aspect-[2.48] object-cover w-full rounded-[13px] max-md:mt-[22px]"
                alt="Cuisine variety"
              />
            </div>
            <div className="w-[35%] ml-5 max-md:w-full max-md:ml-0">
              <img
                src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/271b821b21a80fea217f6073e3f40ec734c4ae2d?placeholderIfAbsent=true"
                className="aspect-[1.33] object-cover w-full rounded-[13px] max-md:mt-[22px]"
                alt="Chef preparation"
              />
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/24ae1c14603a91c56e38ad6a7d9be9bde659cd34?placeholderIfAbsent=true"
        className="aspect-[0.59] object-cover w-[200px] rounded-[13px] max-md:w-full max-md:mt-10"
        alt="Dining experience"
      />
      <div className="flex flex-col w-[220px] max-md:w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/832135cb5e3d87801981000555a28d98fcae50a1?placeholderIfAbsent=true"
          className="aspect-[1.99] object-cover w-full rounded-[13px]"
          alt="Food presentation"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/5a376a64495f155536369e5eb667b1e8a1fbe4ee?placeholderIfAbsent=true"
          className="aspect-[1.77] object-cover w-full mt-9 rounded-[13px]"
          alt="Culinary art"
        />
      </div>
      <img
        src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/6b1eb005cdafce7f870624afaa3689030eafd031?placeholderIfAbsent=true"
        className="aspect-[0.77] object-cover w-[180px] rounded-[13px] max-md:w-full"
        alt="Gourmet meal"
      />
    </section>
  );
};
