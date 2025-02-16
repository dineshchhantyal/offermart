import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about OfferMart's mission to reduce waste through smart shopping",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About OfferMart</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
          OfferMart is a youth-led initiative tackling the $1 trillion food
          waste problem through innovative marketplace solutions.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
        <p className="mb-6">
          We connect businesses with conscious consumers to reduce waste and
          create a sustainable future for all.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Our Impact</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Processed $2,500+ in sales during pilot phase</li>
          <li>Saved businesses $8,000+ in potential waste costs</li>
          <li>Partnered with 15+ local businesses</li>
          <li>Engaged 500+ active users</li>
        </ul>
      </div>
    </div>
  );
}
