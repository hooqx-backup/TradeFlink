import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white py-16">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">Tradeflink</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making global trade simpler, faster, and fairer for every business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Security</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Resources</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Compliance</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Tradeflink. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <span>LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <span>Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
