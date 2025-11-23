import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/next';
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://ikook.co.uk"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "private chef",
    "personal chef",
    "hire chef",
    "chef at home",
    "private dining",
    "meal prep chef",
    "event catering",
    "cooking class",
    "chef services Nigeria",
    "chef services UK",
    "chef services South Africa",
  ],
  authors: [{ name: "iKook" }],
  creator: "iKook",
  publisher: "iKook",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ikook.co.uk",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iKook - Hire a Private Chef for Unforgettable Culinary Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.png"],
    creator: "@ikook",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Brevo chat widget script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                // Brevo
                window.BrevoConversationsSetup = {
                  buttonPosition: window.innerWidth < 1024 ?
                    'br' : /* chat button position on small screens */
                    'br'  /* chat button position on big screens */
            };
            (function(d, w, c) {
              w.BrevoConversationsID = '61ba8b5a08f61d658230ee93';
              w[c] = w[c] || function() {
                (w[c].q = w[c].q || []).push(arguments);
              };
              const s = d.createElement('script');
              s.async = true;
              s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
              if (d.head) d.head.appendChild(s);
            })(document, window, 'BrevoConversations');
          });
        `,
          }}
        />
      </head>
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div>
            <main>
              {children}
              <Analytics />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
