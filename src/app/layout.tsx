import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

// next/font self-hosts the fonts at build time: no runtime request to
// Google Fonts, no layout shift, better Core Web Vitals than a <link> tag.
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Healthcare Innovation & Nutrition Design Challenge | BIT",
  description:
    "Join BIT students designing real solutions for Burkina Faso's health and nutrition challenges. Guided curriculum, hands on mentorship, and a final symposium.",
  openGraph: {
    title: "Healthcare Innovation & Nutrition Design Challenge | BIT",
    description:
      "Join BIT students designing real solutions for Burkina Faso's health and nutrition challenges.",
    images: ["/assets/clbs.jpg"],
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://bit.bf"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} no-js`}>
      <head>
      
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        {/* Mounted once, globally: handles the generic .fade-up / .reveal-left /
            .reveal-right reveals and secondary parallax effects shared across
            sections, so each section doesn't need to re-register ScrollTrigger. */}
        <ScrollAnimations />
      </body>
    </html>
  );
}
