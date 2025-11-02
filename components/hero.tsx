export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/hero.jpg" 
          alt="NexaGen Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-white uppercase tracking-wide">
              WELCOME TO<br />
              <span className="text-white">NEXA</span>
              <span className="text-red-600">GEN</span><br />
              <span className="text-red-600">MARKETING</span>
            </h1>
            
            <div className="h-1 w-24 bg-red-600"></div>
            
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
              Your Success Our Priority
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#services"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-center"
              >
                Explore Our Services
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right side - Logo/Badge */}
          <div className="flex justify-center items-center">
            <div className="text-center space-y-4 bg-white/10 backdrop-blur-lg p-12 rounded-3xl border-2 border-white/20 shadow-2xl">
              {/* <div className="text-6xl mb-4">🚀</div> */}
              <h2 className="text-4xl font-black text-white">
                <span className="text-white">NEXA</span>
                <span className="text-red-600">GEN</span>
              </h2>
              <h3 className="text-3xl font-black text-red-600">
                MARKETING
              </h3>
              <p className="text-blue-400 text-lg font-bold uppercase tracking-wider">
                YOUR SUCCESS OUR PRIORITY
              </p>
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-white to-red-600"></div>
              <p className="text-white text-sm font-light">
                Let's Build Success Together
              </p>
            </div>
          </div>
        </div>

        {/* Stats/Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-red-600 mb-2">40+</div>
            <div className="text-white text-sm font-semibold">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-red-600 mb-2">6</div>
            <div className="text-white text-sm font-semibold">Service Areas</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-white text-sm font-semibold">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
