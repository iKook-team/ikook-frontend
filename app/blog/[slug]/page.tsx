import React from "react";
import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data/blog-posts";
import Link from "next/link";

// This would normally be fetched from an API based on the post slug
const getPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

// Define the page props type for Next.js 13+
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Export as a default async function with proper typing
export default async function Page({ params, searchParams }: PageProps) {
  // Await both params and searchParams promises
  const [{ slug }, search] = await Promise.all([
    params,
    searchParams
  ]);
  
  // Use the search params if needed
  console.log('Search params:', search);
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-6 flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {post.author}
                </p>
              </div>
            </div>
          </header>

          <div className="aspect-[16/9] w-full relative rounded-lg overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose max-w-none prose-lg text-gray-700"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/<p>/g, '<p class="mb-4">') 
            }}
          />
        </article>

        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="aspect-video relative w-full">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{relatedPost.excerpt}</p>
                      <div className="text-sm text-gray-500">{relatedPost.readTime}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
