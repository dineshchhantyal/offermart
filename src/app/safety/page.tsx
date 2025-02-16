import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety Information",
  description: "Learn about our safety measures and guidelines",
};

export default function SafetyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Safety Information</h1>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="p-6 rounded-lg bg-green-50 dark:bg-green-900/20">
          <Shield className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-semibold mb-2">Quality Assurance</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All products undergo strict quality checks before listing
          </p>
        </div>
        {/* Add more safety feature cards */}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Our Safety Guidelines</h2>
        <p>Detailed safety information and guidelines here...</p>
      </div>
    </div>
  );
}
