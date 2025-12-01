import { User, Bookmark, Sun, Moon, Globe, Info, LogIn } from 'lucide-react';
import { useState } from 'react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  const menuItems = [
    { icon: LogIn, label: 'Login / Signup', action: () => {} },
    { icon: User, label: 'My Profile', action: () => {} },
    { icon: Bookmark, label: 'Saved Places / Heritage Pass', action: () => {} },
    { icon: Info, label: 'About the Project', action: () => {} },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 backdrop-blur-2xl bg-white/80 border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Menu
            </h2>
          </div>

          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-4 p-4 rounded-2xl backdrop-blur-lg bg-white/50 border border-white/30 hover:bg-white/70 transition-all shadow-md"
              >
                <item.icon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center justify-between p-4 rounded-2xl backdrop-blur-lg bg-white/50 border border-white/30 hover:bg-white/70 transition-all shadow-md"
            >
              <div className="flex items-center space-x-4">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-orange-500" />
                ) : (
                  <Sun className="w-5 h-5 text-orange-500" />
                )}
                <span className="text-gray-700 font-medium">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </div>
            </button>

            <button
              onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
              className="w-full flex items-center justify-between p-4 rounded-2xl backdrop-blur-lg bg-white/50 border border-white/30 hover:bg-white/70 transition-all shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Globe className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">Language</span>
              </div>
              <span className="text-sm font-bold text-orange-500">{language}</span>
            </button>

            <button className="w-full p-4 rounded-2xl backdrop-blur-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
              Plan My Heritage Tour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
