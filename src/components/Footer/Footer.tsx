import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-50 dark:bg-green-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-green-600">RenewMart</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Making sustainability accessible through smart shopping of
              near-expiry goods.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/safety"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Stay Updated
            </h3>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 dark:text-gray-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 dark:text-gray-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-green-600 dark:text-gray-300"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} RenewMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
