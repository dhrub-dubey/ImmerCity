import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationContextType {
  location: UserLocation | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: (lat: number, lng: number, address: string) => void;
  requestGeolocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    requestGeolocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const requestGeolocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation not supported on this device');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setLocation({ latitude, longitude, address });
        setIsLoading(false);

        const id = navigator.geolocation.watchPosition(
          (newPosition) => {
            const { latitude: newLat, longitude: newLon } = newPosition.coords;
            const newAddress = `${newLat.toFixed(4)}, ${newLon.toFixed(4)}`;
            setLocation({ latitude: newLat, longitude: newLon, address: newAddress });
          },
          (err) => {
            console.error('Watch position error:', err.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );

        setWatchId(id);
      },
      (err) => {
        let errorMessage = 'Unable to detect location';

        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable it in settings.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information unavailable.';
        } else if (err.code === err.TIMEOUT) {
          errorMessage = 'Location detection timeout. Please try again.';
        }

        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const updateLocation = (lat: number, lng: number, address: string) => {
    setLocation({ latitude: lat, longitude: lng, address });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        updateLocation,
        requestGeolocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}
