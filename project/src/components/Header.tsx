import { MapPin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const [location, setLocation] = useState('Detecting location...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Kolkata, West Bengal');
        },
        () => {
          setLocation('Enable location for better experience');
        }
      );
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">IC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Live the city’s hidden soul
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 backdrop-blur-lg bg-white/50 px-4 py-2 rounded-full border border-white/30 shadow-md">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-700">{location}</span>
          </div>

          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl backdrop-blur-lg bg-white/50 border border-white/30 hover:bg-white/70 transition-all shadow-md"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <div className="sm:hidden pb-3 flex items-center justify-center space-x-2">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-gray-700">{location}</span>
        </div>
      </div>
    </header>
  );
}
