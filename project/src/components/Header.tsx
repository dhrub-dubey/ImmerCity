import { MapPin, Menu, X, Loader } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from '../context/LocationContext';
import LocationPicker from './LocationPicker';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { location, isLoading } = useLocation();
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const displayLocation = isLoading
    ? 'Detecting location...'
    : location?.address.split(',')[0] || 'Select location';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Heritage
              </span>
            </div>

            <button
              onClick={() => setIsLocationPickerOpen(true)}
              className="hidden sm:flex items-center space-x-2 backdrop-blur-lg bg-white/50 px-4 py-2 rounded-full border border-white/30 hover:bg-white/70 shadow-md transition-all group"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 text-orange-500 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-orange-500" />
              )}
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {displayLocation}
              </span>
            </button>

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

          <div className="sm:hidden pb-3">
            <button
              onClick={() => setIsLocationPickerOpen(true)}
              className="w-full flex items-center justify-center space-x-2 backdrop-blur-lg bg-white/50 px-4 py-2.5 rounded-xl border border-white/30 hover:bg-white/70 transition-all"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 text-orange-500 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-orange-500" />
              )}
              <span className="text-sm text-gray-700">{displayLocation}</span>
            </button>
          </div>
        </div>
      </header>

      <LocationPicker
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
      />
    </>
  );
}
