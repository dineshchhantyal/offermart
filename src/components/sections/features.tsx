"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Clock, PiggyBank, LeafyGreen } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Near-Expiry Deals",
    description: "Get quality products at 60-70% off retail price",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-Time Updates",
    description: "Browse fresh deals updated daily from local businesses",
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Save Money",
    description: "Access premium products at fraction of original cost",
  },
  {
    icon: <LeafyGreen className="h-6 w-6" />,
    title: "Eco-Friendly",
    description: "Help reduce waste and support sustainable practices",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose OfferMart?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of smart shoppers and businesses making a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                {feature.icon}
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
