"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section className="relative py-32" ref={ref}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#44ff9a11_1px,transparent_1px),linear-gradient(0deg,#44ff9a11_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div style={{ scale }} className="container mx-auto px-4">
        {/* Hexagon grid background */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-24 w-24 bg-green-500/5"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Stats content */}
        <div className="relative z-10">
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
      </motion.div>
    </section>
  );
}
