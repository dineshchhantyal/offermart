import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sonner";
import { Providers } from "./providers";

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
    default: "OfferMart",
    template: "%s | OfferMart",
  },
  description: "Buy and sell sustainable products",
  metadataBase: new URL("https://offermart.vercel.app"), // Update with your production URL
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://offermart.vercel.app",
    siteName: "OfferMart",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OfferMart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@offerwmart",
    creator: "@offerwmart",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/logo.png",
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
        <Providers>
          <Header label="Home" />
          <SessionProvider session={session}>
            <Toaster />

            {children}
          </SessionProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
