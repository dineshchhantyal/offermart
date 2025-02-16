import { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the OfferMart team",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>

          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <a href="mailto:support@OfferMart.com" className="text-green-600">
                support@OfferMart.com
              </a>
            </p>
            {/* Add more contact information */}
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
