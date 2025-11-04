"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";
import Link from 'next/link';
import { blogPosts } from "@/lib/data/blog-posts";

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-shadow duration-300 h-full">
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

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#323335] mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover delicious recipes, cooking tips, and culinary inspiration from our expert chefs.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <div key={post.id} className="w-full h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 p-0 rounded-full ${
                  currentPage === number
                    ? 'bg-[#FCC01C] text-[#323335] hover:bg-[#FCC01C]/90'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {number}
              </Button>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
