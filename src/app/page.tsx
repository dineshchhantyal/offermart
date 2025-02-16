import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-500 to-green-700 dark:from-green-900 dark:to-black py-24 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Save Money, Reduce Waste
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Join our marketplace for near-expiry goods and make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/sell"
              className="px-8 py-3 bg-white text-green-700 font-bold rounded-full shadow-md hover:bg-gray-200 transition"
            >
              Start Selling
            </Link>
            <Link
              href="/buy/new"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-700 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "List Your Products",
                description: "Choose between commission-free or commission-based listings.",
                icon: "📦",
              },
              {
                title: "AI Quality Check",
                description: "Our AI assesses product quality and remaining shelf life.",
                icon: "🤖",
              },
              {
                title: "Save Money",
                description: "Get great deals on quality products near expiry.",
                icon: "💰",
              },
            ].map(({ title, description, icon }, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-green-100 dark:bg-green-950">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "1000+", label: "Products Saved" },
              { value: "500+", label: "Active Users" },
              { value: "2 tons", label: "Waste Reduced" },
            ].map(({ value, label }, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="text-5xl font-bold text-green-700 dark:text-green-400 mb-2">
                  {value}
                </div>
                <p className="text-gray-800 dark:text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
