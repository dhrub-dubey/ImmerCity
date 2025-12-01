import { MapPin, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Place {
  id: string;
  name: string;
  image: string;
  distance: string;
  category: string;
  rating: number;
}

export default function NearbyPlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
          fetchNearbyPlaces();
        },
        () => {
          setLocationGranted(false);
          showSamplePlaces();
        }
      );
    } else {
      showSamplePlaces();
    }
  }, []);

  const fetchNearbyPlaces = () => {
    setTimeout(() => {
      showSamplePlaces();
    }, 1000);
  };

  const showSamplePlaces = () => {
    setPlaces([
      {
        id: '1',
        name: 'Victoria Memorial',
        image: 'https://images.pexels.com/photos/13641896/pexels-photo-13641896.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '2.3 km',
        category: 'Heritage Building',
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Indian Museum',
        image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '1.5 km',
        category: 'Museum',
        rating: 4.6,
      },
      {
        id: '3',
        name: 'Princep Ghat',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '3.1 km',
        category: 'Landmark',
        rating: 4.7,
      },
      {
        id: '4',
        name: 'Maidan',
        image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '1.8 km',
        category: 'Park',
        rating: 4.5,
      },
      {
        id: '5',
        name: 'Marble Palace',
        image: 'https://images.pexels.com/photos/164338/pexels-photo-164338.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '4.2 km',
        category: 'Heritage Building',
        rating: 4.4,
      },
      {
        id: '6',
        name: 'Birla Planetarium',
        image: 'https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=600',
        distance: '2.7 km',
        category: 'Cultural Spot',
        rating: 4.6,
      },
    ]);
    setLoading(false);
  };

  if (loading) {
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nearby Heritage Places</h2>
          {!locationGranted && (
            <button className="text-sm text-orange-500 font-medium hover:underline">
              Enable Location
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="group backdrop-blur-xl bg-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40 hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-full border border-white/40">
                  <span className="text-xs font-semibold text-gray-700">{place.category}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {place.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{place.distance} away</span>
                  </div>

                  <div className="flex items-center space-x-1 backdrop-blur-lg bg-orange-50 px-2.5 py-1 rounded-full">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="text-sm font-semibold text-gray-900">{place.rating}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl backdrop-blur-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
