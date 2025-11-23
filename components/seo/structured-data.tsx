import React from "react";

interface StructuredDataProps {
    data: Record<string, any>;
}

/**
 * Component to inject JSON-LD structured data into the page
 * Used for SEO to help search engines understand page content
 */
export function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Schema builders for different types

/**
 * Organization Schema
 * Use on homepage and main pages
 */
export function createOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "iKook",
        description:
            "Professional private chef services connecting talented chefs with food enthusiasts across Nigeria, United Kingdom, and South Africa.",
        url: "https://ikook.co.uk",
        logo: "https://ikook.co.uk/footer-logo.png",
        image: "https://ikook.co.uk/og-image.png",
        sameAs: [
            // Add your actual social media URLs here
            "https://www.facebook.com/IKOOKAPP",
            "https://www.instagram.com/ikookapp",
            "https://twitter.com/ikookapp",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            availableLanguage: ["English"],
        },
        areaServed: [
            {
                "@type": "Country",
                name: "Nigeria",
            },
            {
                "@type": "Country",
                name: "United Kingdom",
            },
            {
                "@type": "Country",
                name: "South Africa",
            },
        ],
    };
}

/**
 * Local Business Schema
 * Use for location-specific pages
 */
export function createLocalBusinessSchema(location: string) {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://ikook.co.uk/locations/${location.toLowerCase()}`,
        name: `iKook ${location}`,
        description: `Professional private chef services in ${location}`,
        url: `https://ikook.co.uk/locations/${location.toLowerCase()}`,
        serviceArea: {
            "@type": "Country",
            name: location,
        },
        priceRange: "$$",
    };
}

/**
 * Service Schema
 * Use for service pages (chef-at-home, fine-dining, etc.)
 */
export function createServiceSchema(params: {
    name: string;
    description: string;
    url: string;
    serviceType: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: params.serviceType,
        name: params.name,
        description: params.description,
        url: params.url,
        provider: {
            "@type": "Organization",
            name: "iKook",
            url: "https://ikook.co.uk",
        },
        areaServed: [
            {
                "@type": "Country",
                name: "Nigeria",
            },
            {
                "@type": "Country",
                name: "United Kingdom",
            },
            {
                "@type": "Country",
                name: "South Africa",
            },
        ],
    };
}

/**
 * Person Schema (Chef Profile)
 * Use for individual chef profile pages
 */
export function createPersonSchema(chef: {
    id: number;
    firstName: string;
    lastName: string;
    bio?: string;
    avatar?: string;
    averageRating?: number;
    reviewCount?: number;
}) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `https://ikook.co.uk/chefs/${chef.id}`,
        name: `${chef.firstName} ${chef.lastName}`,
        jobTitle: "Private Chef",
        url: `https://ikook.co.uk/chefs/${chef.id}`,
    };

    if (chef.bio) {
        schema.description = chef.bio;
    }

    if (chef.avatar) {
        schema.image = chef.avatar;
    }

    if (chef.averageRating && chef.reviewCount) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: chef.averageRating,
            reviewCount: chef.reviewCount,
            bestRating: "5",
            worstRating: "1",
        };
    }

    return schema;
}

/**
 * Blog Posting Schema
 * Use for blog post pages
 */
export function createBlogPostingSchema(post: {
    title: string;
    description: string;
    slug: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `https://ikook.co.uk/blog/${post.slug}`,
        image: post.image || "https://ikook.co.uk/og-image.png",
        datePublished: post.datePublished,
        dateModified: post.dateModified || post.datePublished,
        author: {
            "@type": "Person",
            name: post.author || "iKook Team",
        },
        publisher: {
            "@type": "Organization",
            name: "iKook",
            logo: {
                "@type": "ImageObject",
                url: "https://ikook.co.uk/footer-logo.png",
            },
        },
    };
}

/**
 * FAQ Page Schema
 * Use for FAQ page
 */
export function createFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

/**
 * Aggregate Rating Schema
 * Use for chef profiles with reviews
 */
export function createAggregateRatingSchema(params: {
    itemName: string;
    ratingValue: number;
    reviewCount: number;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        itemReviewed: {
            "@type": "Service",
            name: params.itemName,
        },
        ratingValue: params.ratingValue,
        reviewCount: params.reviewCount,
        bestRating: "5",
        worstRating: "1",
    };
}

/**
 * Breadcrumb List Schema
 * Use for navigation breadcrumbs
 */
export function createBreadcrumbListSchema(
    items: Array<{ name: string; url: string }>,
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
