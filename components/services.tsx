'use client';

import { useState } from 'react';
import { MVAForm } from './mva-form';

const services = [
  {
    title: "Motor Vehicle Accident (MVA)",
    description: "Motor Vehicle Accidents can be a traumatic and life-changing experience. We provide comprehensive support for MVA claims, helping you navigate the complex process with ease.",
    icon: "🚨",
    gradient: "from-red-400 to-pink-500"
  },
  {
    title: "Affordable Care Act (ACA)",
    description: "Navigate the Affordable Care Act with confidence. We help you find the right healthcare coverage that fits your needs and budget under the ACA marketplace.",
    icon: "🏥",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    title: "Medicare Services",
    description: "Medicare is a government-funded health insurance program that provides coverage to individuals aged 65 or older, as well as individuals with certain disabilities.",
    icon: "⚕️",
    gradient: "from-purple-400 to-indigo-500"
  },
  {
    title: "Home Renovation",
    description: "Transform your home with our renovation services. From small upgrades to complete remodels, we connect you with trusted contractors and financing options.",
    icon: "🏠",
    gradient: "from-orange-400 to-amber-500"
  },
  {
    title: "Final Expense (FE)",
    description: "Getting a Final Expense Life Insurance policy gives you the coverage you need, for your entire lifetime. Secure your family's future with affordable whole life insurance.",
    icon: "📋",
    gradient: "from-gray-400 to-slate-500"
  },
  {
    title: "Auto Insurance",
    description: "Auto insurance is a must-have for every driver. We offer comprehensive auto insurance services that provide you with the protection you need on the road.",
    icon: "🚗",
    gradient: "from-blue-400 to-cyan-500"
  }
];

export function Services() {
  const [showMVAForm, setShowMVAForm] = useState(false);

  const handleServiceClick = (index: number) => {
    if (index === 0) { // MVA service
      setShowMVAForm(true);
    }
  };

  return (
    <>
      {showMVAForm && <MVAForm onClose={() => setShowMVAForm(false)} />}
      
      <section id="services" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-lg">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
            What We <span className="text-red-600 dark:text-red-500">Offer</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive BPO solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(index)}
              className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent overflow-hidden cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon with gradient background */}
              <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-all">
                {service.title}
              </h3>
              
              <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow icon */}
              <div className="relative mt-6 flex items-center text-red-600 dark:text-red-500 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-sm">Learn More</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
