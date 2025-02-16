import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OfferMart - Save Money, Reduce Waste",
    template: "%s | OfferMart",
  },
  description:
    "A commission-based marketplace connecting businesses with consumers to reduce food waste and save money.",
  keywords: [
    "food waste",
    "sustainability",
    "marketplace",
    "discounted products",
    "eco-friendly shopping",
    "near-expiry deals",
    "sustainable business",
    "Gen Z",
    "green commerce",
  ],
  authors: [{ name: "OfferMart Team" }],
  creator: "OfferMart",
  publisher: "OfferMart",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://offermart.com",
    siteName: "OfferMart",
    title: "OfferMart - Save Money, Reduce Waste",
    description:
      "Join the movement to reduce waste and save money. Find great deals on near-expiry items.",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "OfferMart - Sustainable Shopping Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OfferMart - Save Money, Reduce Waste",
    description:
      "Join the movement to reduce waste and save money. Find great deals on near-expiry items.",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
    creator: "@offermart",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  category: "E-commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen font-sans`}
      >
        <Header label="Home" />

        <SessionProvider session={session}>
          <Toaster />

          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
