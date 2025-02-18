"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Leaf, Users, ShoppingBag, Sprout, ArrowRight } from "lucide-react";

const missions = [
  {
    title: "Reduce food waste in the global economy",
    icon: Leaf,
    color: "text-green-600",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Connect businesses with conscious consumers",
    icon: Users,
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Enable sustainable shopping practices",
    icon: ShoppingBag,
    color: "text-purple-600",
    gradient: "from-purple-500/10 to-indigo-500/10",
  },
  {
    title: "Drive youth-led environmental change",
    icon: Sprout,
    color: "text-teal-600",
    gradient: "from-teal-500/10 to-green-500/10",
  },
];

export function MissionSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div className="container mx-auto px-4" style={{ y, opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Mission
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                As Gen Z innovators, we're tackling the $1 trillion food waste
                problem by creating a sustainable marketplace that benefits both
                businesses and consumers.
              </motion.p>
            </div>

            <div className="grid gap-6">
              {missions.map((mission, index) => {
                const Icon = mission.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${mission.gradient} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-6 w-6 ${mission.color}`} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {mission.title}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
            <Image
              src="/logo.png"
              alt="Our Mission"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
