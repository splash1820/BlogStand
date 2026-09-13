import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-6 mb-6">
          <span className="text-xl font-bold text-white mb-4 md:mb-0">MyLogo</span>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-white text-sm">Privacy Policy</a>
            <a href="#terms" className="hover:text-white text-sm">Terms of Service</a>
            <a href="#support" className="hover:text-white text-sm">Support</a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          © 2026 MyLogo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
