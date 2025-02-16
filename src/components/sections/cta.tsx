"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 bg-green-600 dark:bg-green-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of conscious consumers and businesses building a
            sustainable future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/buy/new"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sell"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Become a Seller
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
