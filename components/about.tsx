"use client";

import { useState } from "react";

export function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/50 to-transparent dark:from-blue-900/20 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <span className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-lg">
              ABOUT US
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-6 mb-6">
              Building <span className="text-red-600 dark:text-red-500">Success Together</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              NexaGen is a leading Business Process Outsourcing company dedicated to helping 
              businesses grow by providing quality leads, exceptional customer service, and innovative 
              BPO solutions.
            </p>
            
            {showMore && (
              <>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Another notable strength of NexaGen is our commitment to 
                  technological innovation and adaptation. We understand the rapidly evolving landscape 
                  of business process outsourcing and customer engagement.
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  By investing in state-of-the-art BPO technologies and keeping our team updated 
                  with the latest advancements, we ensure that our services remain efficient, effective, 
                  and in line with industry best practices.
                </p>
              </>
            )}
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* Right side - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Happy Clients */}
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">🎯</div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-1">40+</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Happy Clients</div>
            </div>

            {/* 24/7 Support */}
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">⭐</div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Support</div>
            </div>

            {/* Services Offered */}
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">📊</div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">6</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Services Offered</div>
            </div>

            {/* 100% Dedicated */}
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">🚀</div>
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="text-4xl font-bold text-red-600 mb-1">100%</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Dedicated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
