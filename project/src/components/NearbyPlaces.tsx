import { MapPin, Star, AlertCircle, Landmark, BookOpen, Coffee, Trees, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { fetchNearbyPlaces, OverpassPlace } from '../services/overpassAPI';
import { getPhotoForPlace } from '../services/placePhotos';

const getCategoryIcon = (type: string) => {
  const iconMap: { [key: string]: typeof Landmark } = {
    historic: Building2,
    museum: Landmark,
    library: BookOpen,
    park: Trees,
    cafe: Coffee,
  };
  return iconMap[type] || Landmark;
};

export default function NearbyPlaces() {
  const { location, isLoading: locationLoading, error: locationError } = useLocation();
  const [places, setPlaces] = useState<OverpassPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastLocationUpdate, setLastLocationUpdate] = useState<number>(0);

  useEffect(() => {
    if (location && !locationLoading) {
      const now = Date.now();
      if (now - lastLocationUpdate > 5000) {
        loadNearbyPlaces(location.latitude, location.longitude);
        setLastLocationUpdate(now);
      }
    }
  }, [location, locationLoading, lastLocationUpdate]);

  const loadNearbyPlaces = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchNearbyPlaces(latitude, longitude, 2000);
      setPlaces(result);
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Unable to load nearby heritage places. Please try again.');
    }

    setLoading(false);
  };

  if (locationLoading && !places.length) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nearby Heritage Places</h2>
          <p className="text-gray-600">Discover landmarks, museums, and cultural sites near you</p>

          {locationError && (
            <div className="flex items-start gap-3 mt-4 p-4 rounded-xl backdrop-blur-lg bg-red-50/80 border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{locationError}</p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 mt-4 p-4 rounded-xl backdrop-blur-lg bg-amber-50/80 border border-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{error}</p>
            </div>
          )}
        </div>

        {loading && places.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => {
              const IconComponent = getCategoryIcon(place.type);
              const photo = getPhotoForPlace(place.type, place.name);

              return (
                <div
                  key={place.id}
                  className="group backdrop-blur-xl bg-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40 hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                    <img
                      src={photo}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full border border-white/40 flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-gray-700">{place.category}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {place.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {place.distance < 1
                            ? `${(place.distance * 1000).toFixed(0)} m`
                            : `${place.distance.toFixed(1)} km`}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 backdrop-blur-lg bg-orange-50 px-2.5 py-1 rounded-full">
                        <Star className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-900">4.5</span>
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl backdrop-blur-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No heritage places found nearby</p>
            <p className="text-sm text-gray-500 mt-2">Try expanding your search or moving to a different location</p>
          </div>
        )}
      </div>
    </section>
  );
}
