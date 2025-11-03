'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3.33; // 100/30 for 3 seconds
      });
    }, 100);

    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo with animation */}
        <div className="mb-12 animate-fadeIn">
          <div className="inline-block">
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="text-white drop-shadow-2xl">NEXA</span>
              <span className="text-red-600 drop-shadow-2xl">GEN</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-red-600 drop-shadow-2xl">MARKETING</span>
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent mb-4"></div>
            <p className="text-blue-400 text-xl md:text-2xl font-bold uppercase tracking-[0.3em] animate-pulse">
              Your Success Our Priority
            </p>
          </div>
        </div>

        {/* Tagline with typing effect */}
        <div className="mb-16 animate-slideIn">
          <p className="text-gray-300 text-2xl md:text-3xl mb-6 font-light leading-relaxed">
            Welcome to your trusted partner for
          </p>
          <p className="text-white text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Innovative Business Process Outsourcing Solutions
          </p>
        </div>

        {/* Services showcase */}
        <div className="mb-16 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: '🎯', name: 'MVA Solutions' },
              { icon: '🏥', name: 'ACA Services' },
              { icon: '💊', name: 'Medicare' },
              { icon: '🏠', name: 'Home Renovation' },
              { icon: '💼', name: 'Final Expense' },
              { icon: '🚗', name: 'Auto Insurance' }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <p className="text-gray-300 text-sm font-medium">{service.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loading bar */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full transition-all duration-100 ease-linear shadow-lg shadow-red-500/50"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-3 font-medium">
              Loading your experience...
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="text-4xl font-black text-red-600 mb-2">40+</div>
            <div className="text-gray-400 text-sm font-medium">Happy Clients</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="text-4xl font-black text-red-600 mb-2">6</div>
            <div className="text-gray-400 text-sm font-medium">Service Areas</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="text-4xl font-black text-red-600 mb-2">24/7</div>
            <div className="text-gray-400 text-sm font-medium">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
