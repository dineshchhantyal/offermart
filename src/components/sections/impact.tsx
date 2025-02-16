"use client";

import { motion } from "framer-motion";
import { Leaf, DollarSign, Users } from "lucide-react";

const stats = [
  {
    icon: <Leaf className="h-8 w-8" />,
    value: "2,500+",
    label: "Kg of Food Saved",
    description: "Preventing waste and reducing environmental impact",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    value: "$8,000+",
    label: "Saved by Businesses",
    description: "Helping businesses minimize losses from waste",
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: "15+",
    label: "Partner Businesses",
    description: "Local bakeries and grocers working together",
  },
];

export function ImpactSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Making a measurable difference in our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-8 rounded-xl bg-white dark:bg-gray-900"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {stat.label}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
