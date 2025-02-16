"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const missions = [
  "Reduce food waste in the global economy",
  "Connect businesses with conscious consumers",
  "Enable sustainable shopping practices",
  "Drive youth-led environmental change",
];

export function MissionSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              As Gen Z innovators, we&apos;re tackling the $1 trillion food
              waste problem by creating a sustainable marketplace that benefits
              both businesses and consumers.
            </p>
            <ul className="space-y-4">
              {missions.map((mission, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-green-600 h-5 w-5" />
                  <span className="text-gray-700 dark:text-gray-200">
                    {mission}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
