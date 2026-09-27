import type { Metadata, Viewport } from "next";
import { Jost, Roboto_Condensed } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Motion } from "@/components/motion";
import Preloader from "@/components/Preloader";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";
import "@/styles/chrome.css";
import "@/styles/home.css";

// Both families are the live site's own (computed styles: Jost for headings and body, Roboto Condensed for UI).
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const cond = Roboto_Condensed({ subsets: ["latin"], variable: "--font-cond", display: "swap" });

export const metadata: Metadata = {
  title: "Pentagon Technical Services – Global Critical Infrastructure Specialists",
  description: "Global construction consultancy delivering high-performance project teams across mission-critical environments.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#074059" };

/* `js` is set before first paint (unless reduced motion is requested) so reveal targets can start hidden without a
   flash, and `is-loading` holds the page behind the preloader. Without JavaScript neither class is added, the
   <noscript> style removes the preloader, and everything renders in place. */
const boot = "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js','is-loading')";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" data-header="dark" className={`${jost.variable} ${cond.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body id="top">
        <a className="skip" href="#main">Skip to content</a>
        <Preloader />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
