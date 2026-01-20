# SEO Improvement Plan for iKook Frontend

## Current State Analysis

### ✅ What's Already In Place
- Next.js 15 (App Router) - excellent for SEO
- Basic metadata in root layout (title, description, icons)
- Vercel Analytics integration
- Proper HTML lang attribute
- Theme color metadata

### ❌ What's Missing
- No `robots.txt` file
- No sitemap (static or dynamic)
- No structured data (JSON-LD)
- No Open Graph tags
- No Twitter Card tags
- No canonical URLs
- Missing page-specific metadata
- No alt texts verification on images
- Client-side rendered home page (should be SSR/SSG for SEO)
- Deprecated images.domains configuration

---

## Implementation Plan

### Phase 1: Core Technical SEO (High Priority)

#### 1.1 Metadata Enhancement

**Root Layout Updates** ([layout.tsx](file:///home/exalted/ikook/frontend/ikook-test/app/layout.tsx))
- Add comprehensive metadata object with:
  - Open Graph tags (og:title, og:description, og:image, og:url, og:type)
  - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
  - Canonical URL
  - Keywords (if applicable)
  - Author information
  - Viewport settings (already present ✓)
  
**Page-Specific Metadata** (For each major page)
- Add custom `generateMetadata()` function to key pages:
  - Homepage (`/page.tsx`)
  - Chef listings (`/chefs/page.tsx`)
  - Individual chef profiles (`/chefs/[id]/page.tsx`)
  - Service pages (chef-at-home, fine-dining, etc.)
  - Blog posts (`/blog/[slug]/page.tsx`)
  - Booking pages
  - About, FAQs, How It Works

Example structure:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Hire Private Chefs in Nigeria, UK & South Africa | iKook",
    description: "Book professional private chefs for home dining, events, meal prep and more. Available in Nigeria, United Kingdom, and South Africa.",
    openGraph: {
      title: "...",
      description: "...",
      images: ['/og-image.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "...",
      description: "...",
    },
  };
}
```

#### 1.2 Robots.txt

**Create** `public/robots.txt`
```txt
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /settings/
Disallow: /wallet/
Disallow: /payment-cards/
Disallow: /addresses/
Disallow: /calendar/
Disallow: /chat/

Sitemap: https://ikook.co.uk/sitemap.xml
```

#### 1.3 Sitemap Generation

**Create** `app/sitemap.ts` (Dynamic Sitemap)
- Generate sitemap with all public pages
- Include:
  - Homepage
  - Service pages
  - Public chef listings (fetch from API)
  - Blog posts (fetch from API)
  - Static pages (About, FAQs, How It Works, etc.)
  - Location pages
- Set proper priority and changeFrequency
- Update lastModified dates

**Create** `app/sitemap-[...slug].ts` if needed for large sitemaps

---

### Phase 2: Structured Data (JSON-LD)

#### 2.1 Schema Markup Components

**Create** `components/seo/structured-data.tsx` utility component

**Implement Schema Types:**

1. **Organization Schema** (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "iKook",
  "description": "...",
  "url": "https://ikook.co.uk",
  "logo": "https://ikook.co.uk/logo.png",
  "sameAs": [
    "https://instagram.com/ikook",
    "https://facebook.com/ikook",
    "https://twitter.com/ikook"
  ],
  "contactPoint": {...}
}
```

2. **LocalBusiness Schema** (For service areas)
```json
{
  "@type": "LocalBusiness",
  "serviceArea": ["Nigeria", "United Kingdom", "South Africa"]
}
```

3. **Service Schema** (Service pages)
```json
{
  "@type": "Service",
  "serviceType": "Private Chef Services",
  "provider": {...}
}
```

4. **Person Schema** (Chef profiles)
```json
{
  "@type": "Person",
  "name": "Chef Name",
  "jobTitle": "Private Chef",
  "image": "...",
  "review": {...},
  "aggregateRating": {...}
}
```

5. **BlogPosting Schema** (Blog posts)
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "image": "...",
  "author": {...},
  "datePublished": "...",
  "dateModified": "..."
}
```

6. **FAQPage Schema** (FAQs page)
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "...",
    "acceptedAnswer": {...}
  }]
}
```

7. **AggregateRating Schema** (For chefs with reviews)
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "127"
}
```

8. **BreadcrumbList Schema** (Navigation breadcrumbs)

---

### Phase 3: Performance & Image Optimization

#### 3.1 Next.js Image Configuration

**Update** `next.config.js`
- Replace deprecated `domains` with `remotePatterns`
- Add image optimization settings
- Configure image sizes and formats

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'townsmeet.s3.amazonaws.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    // ... others
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

#### 3.2 Image Optimization Audit

**Review and update all images:**
- Add descriptive alt text to all images
- Use Next.js Image component everywhere
- Add proper width/height attributes
- Lazy load images below the fold
- Use priority={true} for hero images

**Create OG Images:**
- Homepage OG image (1200x630)
- Service-specific OG images
- Blog post featured images
- Default fallback OG image

#### 3.3 Core Web Vitals Optimization

- Convert homepage to SSR/SSG (currently client-side)
- Implement loading states
- Optimize font loading (already using variable fonts ✓)
- Minimize layout shifts
- Reduce JavaScript bundle size
- Implement code splitting

---

### Phase 4: Content & URL Optimization

#### 4.1 URL Structure Review

**Current structure is good, ensure:**
- All URLs are lowercase
- Use hyphens for word separation ✓
- Avoid special characters
- Keep URLs short and descriptive ✓

**Canonical URLs:**
- Add canonical tags to prevent duplicate content
- Handle trailing slashes consistently
- Redirect www to non-www (or vice versa)

#### 4.2 Internal Linking Strategy

**Add strategic internal links:**
- Link from homepage to all service pages
- Link from blog posts to relevant services
- Create hub pages for:
  - Chef services overview
  - Location-specific pages
  - Event type pages

**Create Related Content Components:**
- "Related Services" section
- "Related Blog Posts" section
- "Popular Chefs in Your Area" section

#### 4.3 Heading Structure

**Audit and fix heading hierarchy:**
- One H1 per page (page title)
- Proper H2, H3, H4 nesting
- Include keywords naturally in headings

---

### Phase 5: Additional SEO Features

#### 5.1 RSS Feed
**Create** `app/feed.xml/route.ts`
- Generate RSS feed for blog posts
- Update when new posts are published

#### 5.2 Geo-Targeting
**Implement location-based SEO:**
- Create location-specific landing pages:
  - `/locations/nigeria`
  - `/locations/united-kingdom`
  - `/locations/south-africa`
  - (Already have `/locations/[country]/page.tsx` ✓)
- Add hreflang tags for international targeting
- Geographic schema markup

#### 5.3 Mobile Optimization
- Ensure mobile-friendly design (verify with Google Mobile-Friendly Test)
- Add mobile-specific metadata if needed
- Test touch targets (minimum 48x48px)

#### 5.4 Accessibility (A11y) for SEO
- Add ARIA labels where appropriate
- Ensure proper semantic HTML
- Add skip-to-content links
- Improve keyboard navigation

---

### Phase 6: Monitoring & Analytics

#### 6.1 Search Console Setup
- Verify ownership in Google Search Console
- Submit sitemap
- Monitor crawl errors
- Track search performance

#### 6.2 Enhanced Analytics
- Track custom events (form submissions, bookings, etc.)
- Set up conversion goals
- Monitor page speed metrics
- Track user engagement

---

## Implementation Priority

### 🔴 Critical (Week 1)
1. Add robots.txt
2. Create dynamic sitemap
3. Add Open Graph and Twitter Card metadata
4. Fix deprecated images configuration
5. Add page-specific metadata for top 10 pages

### 🟡 High Priority (Week 2)
1. Implement structured data (Organization, Service, Person schemas)
2. Convert homepage to SSR/SSG
3. Add canonical URLs
4. Create OG images for key pages
5. Audit and add alt text to all images

### 🟢 Medium Priority (Week 3-4)
1. Add remaining structured data schemas
2. Implement internal linking strategy
3. Create location-specific landing pages
4. Set up RSS feed
5. Optimize Core Web Vitals
6. Add breadcrumb navigation

### 🔵 Nice to Have (Ongoing)
1. Monitor and improve based on Search Console data
2. Add hreflang tags for international SEO
3. Create more location-specific content
4. Build backlink strategy
5. Regular content updates

---

## Success Metrics

**Track these KPIs:**
- Organic search traffic growth
- Keyword rankings for target terms
- Click-through rate (CTR) from search results
- Core Web Vitals scores (LCP, FID, CLS)
- Page load speed
- Mobile usability score
- Crawl errors
- Index coverage
- Conversion rate from organic traffic

**Target Keywords to Optimize For:**
- "private chef [location]"
- "hire chef [location]"
- "personal chef near me"
- "chef for event [location]"
- "meal prep chef [location]"
- "fine dining at home [location]"

---

## Tools Needed

1. **Google Search Console** - Monitor search performance
2. **Google Analytics** - Track user behavior
3. **Lighthouse** - Audit performance and SEO
4. **Schema.org Validator** - Test structured data
5. **Meta Tags Debugger** - Test OG tags (Facebook, Twitter, LinkedIn)
6. **Screaming Frog** (optional) - Comprehensive SEO audit

---

## Next Steps

Once you approve this plan, I'll implement it in phases, starting with the critical items. Each phase will include testing and verification to ensure everything works correctly.

Would you like me to proceed with implementation, or would you like to discuss any specific aspects of this plan first?
