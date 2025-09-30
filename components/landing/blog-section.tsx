import { Button } from "../ui/button";

import SectionHeader from "@/components/common/SectionHeader";

const blogPosts = [
  {
    id: 1,
    title: "How To Create A Luxury Private Dining Experience At Home",
    excerpt:
      "You don't have to leave your home to create a fine dining experience...",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/f4b8b58012c47362abf1359d23385b5fb6cff17f?width=1216",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How To Plan A Menu For Your Event",
    excerpt:
      "You don't have to leave your home to create a fine dining experience...",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/962d61e257213dccf160da83706d978aa1ecce27?width=1216",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Finger Food Ideas For Garden Party",
    excerpt:
      "You don't have to leave your home to create a fine dining experience...",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/23e30eef5ba97cbeff584bbc1dfd327820e663fb?width=1216",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "How To Create A Luxury Private Dining Experience At Home",
    excerpt:
      "You don't have to leave your home to create a fine dining experience...",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/f4b8b58012c47362abf1359d23385b5fb6cff17f?width=1216",
    readTime: "5 min read",
  },
];

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl lg:text-2xl font-medium text-[#323335] leading-tight line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#FCC01C] font-medium hover:underline cursor-pointer">
            Read More
          </span>
          <span className="text-sm text-gray-500">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}

export default function BlogSection() {
  return (
    <section className="bg-white py-16 px-4 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader title="Our Blog" />

        {/* Blog Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="w-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Button className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-[#323335] font-semibold px-8 py-3 rounded-md">
            See More
          </Button>
        </div>
      </div>
    </section>
  );
}
