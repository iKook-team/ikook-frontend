import React from 'react';

interface BlogPostProps {
  image: string;
  title: string;
  excerpt: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, excerpt }) => (
  <article className="flex flex-col items-stretch font-normal max-md:max-w-full">
    <img
      src={image}
      className="aspect-[1.34] object-contain w-full shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] max-md:max-w-full"
      alt={title}
    />
    <h3 className="text-[#323335] text-[25px] mt-5 max-md:max-w-full">
      {title}
    </h3>
    <p className="text-[#323335] text-[17px] mt-4 max-md:max-w-full max-md:mr-2.5">
      {excerpt}
    </p>
    <button className="text-[#FCC01C] text-xl font-medium mt-[21px] text-left hover:underline">
      Read More
    </button>
  </article>
);

export const BlogSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1260px] mt-[157px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <BlogPost
            image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/b168101e5e388845438cefd6ea7a498309689cdf?placeholderIfAbsent=true"
            title="How To Create A Luxury Private Dining Experience At Home"
            excerpt="You don't have to leave your home to create a fine dining experience..."
          />
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col items-stretch text-[#323335] font-medium max-md:max-w-full max-md:mt-[38px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/4f38fb928906d37d7b2a82cacd5fd54522ef0db8?placeholderIfAbsent=true"
              className="aspect-[333.33] object-contain w-full max-md:max-w-full"
              alt="Blog decoration"
            />
            <h2 className="text-[#323335] text-[35px] self-center mt-3">
              Our Blog
            </h2>
            <img
              src="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/4f38fb928906d37d7b2a82cacd5fd54522ef0db8?placeholderIfAbsent=true"
              className="aspect-[333.33] object-contain w-full mt-3 max-md:max-w-full"
              alt="Blog decoration"
            />
            <div className="mt-[76px] max-md:mt-10">
              <BlogPost
                image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/1f0bc6f47a114ab59eab51391d6596392ec550fd?placeholderIfAbsent=true"
                title="How To Plan A Menu For Your Event"
                excerpt="You don't have to leave your home to create a fine dining experience..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[1260px] mt-[22px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <BlogPost
              image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/a07dbd00f1b8685df19b87e1b60591a3c6ee80ea?placeholderIfAbsent=true"
              title="Finger Food Ideas For Garden Party"
              excerpt="You don't have to leave your home to create a fine dining experience..."
            />
          </div>
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch font-normal mt-[111px] max-md:max-w-full max-md:mt-10">
              <BlogPost
                image="https://api.builder.io/api/v1/image/assets/9d6446e875d44ea29d44396a5fa1d405/b168101e5e388845438cefd6ea7a498309689cdf?placeholderIfAbsent=true"
                title="How To Create A Luxury Private Dining Experience At Home"
                excerpt="You don't have to leave your home to create a fine dining experience..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-[77px] max-md:mt-10">
        <button className="shadow-[0px_0px_0px_4px_rgba(255,255,255,0.01)] flex w-[147px] max-w-full flex-col items-stretch text-base text-[#323335] font-semibold justify-center bg-[#FCC01C] px-9 py-[13px] hover:bg-[#FCC01C]/90 transition-colors max-md:px-5">
          See More
        </button>
      </div>
    </section>
  );
};