import Link from "next/link";
import { Button } from "../ui/button";
import SectionHeader from "@/components/common/SectionHeader";
import { blogPosts } from "@/lib/data/blog-posts";

// Get first 3 blog posts
const featuredPosts = blogPosts.slice(0, 3);

function BlogCard({ post }: { post: (typeof featuredPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm group h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <h3 className="text-xl lg:text-2xl font-medium text-[#323335] leading-tight line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[#FCC01C] font-medium hover:underline">
              Read More
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
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
          {featuredPosts.map((post) => (
            <div key={post.id} className="w-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-[#FCC01C] hover:bg-[#FCC01C]/90 text-[#323335] font-semibold px-8 py-3 rounded-md">
              See More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
