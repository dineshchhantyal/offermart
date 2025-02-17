export const siteConfig = {
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : new URL("http://localhost:3000"),
  name: "OfferMart",
  description: "Buy and sell sustainable products",
};
