import { useState, useRef, useEffect } from 'react';
import { MapPin, X, Search, Loader } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationPicker({ isOpen, onClose }: LocationPickerProps) {
  const [pincode, setPincode] = useState('');
  const [mapSearch, setMapSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { updateLocation, location } = useLocation();

  useEffect(() => {
    if (mapSearch.trim().length > 2) {
      searchLocations(mapSearch);
    }
  }, [mapSearch]);

  const searchLocations = async (query: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query
        )}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
      );

      const data = await response.json();

      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
    setIsSearching(false);
  };

  const selectLocation = (result: any) => {
    const { lat, lng } = result.geometry.location;
    updateLocation(lat, lng, result.formatted_address);
    onClose();
  };

  const handlePincodeSubmit = async () => {
    if (!pincode.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${
          import.meta.env.VITE_GOOGLE_PLACES_API_KEY
        }`
      );

      const data = await response.json();

      if (data.results?.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        updateLocation(lat, lng, result.formatted_address);
        onClose();
      }
    } catch (err) {
      console.error('Pincode search error:', err);
    }
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative backdrop-blur-2xl bg-white/95 rounded-3xl shadow-2xl border border-white/40 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/20 backdrop-blur-xl bg-white/80">
          <h2 className="text-2xl font-bold text-gray-900">Select Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Search by Location Name
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a place..."
                value={mapSearch}
                onChange={(e) => setMapSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-lg bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
            </div>

            {isSearching && (
              <div className="flex items-center justify-center py-4">
                <Loader className="w-5 h-5 text-orange-500 animate-spin" />
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectLocation(result)}
                    className="w-full text-left p-3 rounded-xl backdrop-blur-lg bg-white/50 hover:bg-white/80 border border-white/30 transition-all"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {result.formatted_address.split(',')[0]}
                    </p>
                    <p className="text-xs text-gray-600">
                      {result.formatted_address}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600 font-medium">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Enter Pincode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter pincode..."
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                className="flex-1 px-4 py-3 rounded-xl backdrop-blur-lg bg-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
              <button
                onClick={handlePincodeSubmit}
                disabled={isSearching || pincode.length < 5}
                className="px-6 py-3 rounded-xl backdrop-blur-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {location && (
            <div className="p-4 rounded-xl backdrop-blur-lg bg-orange-50/80 border border-orange-200">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Current Location:
              </p>
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{location.address}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
