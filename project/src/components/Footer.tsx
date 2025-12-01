export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
  ];

  return (
    <footer className="backdrop-blur-xl bg-white/70 border-t border-white/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">IC</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Live the city’s hidden soul
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm text-gray-600">
            Built at <span className="font-semibold text-orange-600">CalcuttaHacks</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {currentYear} Chronos Shifters. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
