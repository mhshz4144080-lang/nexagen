export function Footer() {
  const socialLinks = [
    { name: "Twitter", icon: "𝕏", href: "#" },
    { name: "LinkedIn", icon: "in", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "Facebook", icon: "f", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">Nexa</span>
              <span className="text-red-500">BPO</span>
            </h3>
            <p className="text-sm text-blue-400 font-semibold mb-4 uppercase tracking-wider">
              Your Success Our Priority
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for innovative BPO solutions. 
              Building relationships and delivering exceptional results.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <a href="tel:+92-115916860" className="hover:text-white transition-colors">
                  +92-115916860
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <a href="mailto:nexagenmarketing@info.com" className="hover:text-white transition-colors break-all">
                  nexagenmarketing@info.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span className="text-sm">
                  Office-s56, Second floor,<br />
                  Gold Point near Waris khan,<br />
                  Murree Road
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 NexaGen. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with <span className="text-red-500">❤️</span> - Your Success Our Priority
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
