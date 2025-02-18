"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShoppingBag, Clock, PiggyBank, LeafyGreen } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Near-Expiry Deals",
    description: "Get quality products at 60-70% off retail price",
    gradient: "from-emerald-400 to-green-600",
    pattern:
      "radial-gradient(circle, rgba(72,187,120,0.1) 1px, transparent 1px)",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-Time Updates",
    description: "Browse fresh deals updated daily from local businesses",
    gradient: "from-blue-400 to-cyan-600",
    pattern:
      "linear-gradient(45deg, rgba(56,189,248,0.1) 25%, transparent 25%)",
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: "Save Money",
    description: "Access premium products at fraction of original cost",
    gradient: "from-purple-400 to-indigo-600",
    pattern:
      "repeating-linear-gradient(0deg, rgba(129,140,248,0.1) 0px, transparent 2px)",
  },
  {
    icon: <LeafyGreen className="h-6 w-6" />,
    title: "Eco-Friendly",
    description: "Help reduce waste and support sustainable practices",
    gradient: "from-teal-400 to-emerald-600",
    pattern:
      "radial-gradient(circle at 50% 50%, rgba(45,212,191,0.1) 0%, transparent 50%)",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Animated background patterns */}
      <motion.div style={{ opacity }} className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-32 w-32 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          style={{ y }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600"
          >
            Why Choose RenewMart?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Join thousands of smart shoppers and businesses making a difference
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  backgroundImage: feature.pattern,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative p-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
