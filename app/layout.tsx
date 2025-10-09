import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
