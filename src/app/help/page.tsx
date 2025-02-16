import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers to common questions about OfferMart",
};

const faqs = [
  {
    question: "How does OfferMart work?",
    answer:
      "OfferMart connects businesses selling near-expiry products with consumers looking for deals. Products are typically discounted 60-70% off retail price.",
  },
  {
    question: "Is it safe to buy near-expiry products?",
    answer:
      "Yes! All products are still within their safe consumption period. We work closely with businesses to ensure proper handling and storage.",
  },
  // Add more FAQs as needed
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Help Center</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
