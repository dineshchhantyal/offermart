"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Local Bakery Owner",
    image: "/testimonials/sarah.jpg",
    quote:
      "OfferMart has helped us reduce waste by 40% while maintaining profitability. It's a game-changer for small businesses.",
  },
  {
    name: "Mike Chen",
    role: "Student",
    image: "/testimonials/mike.jpg",
    quote:
      "I save hundreds on groceries every month while helping the environment. The app is super easy to use!",
  },
  {
    name: "Emma Davis",
    role: "Sustainability Club President",
    image: "/testimonials/emma.jpg",
    quote:
      "OfferMart proves that sustainable business models can work. Their impact metrics are impressive.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hear from our community of businesses and consumers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {testimonial.quote}
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
