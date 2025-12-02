export interface OverpassPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  type: 'historic' | 'museum' | 'library' | 'park' | 'cafe';
}

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getCategoryLabel = (type: string): string => {
  const categoryMap: { [key: string]: string } = {
    historic: 'Historic Site',
    museum: 'Museum',
    library: 'Library',
    park: 'Park',
    cafe: 'Café',
  };
  return categoryMap[type] || 'Heritage Site';
};

export const fetchNearbyPlaces = async (
  latitude: number,
  longitude: number,
  radius: number = 2000
): Promise<OverpassPlace[]> => {
  const query = `[out:json];
(
  node["historic"](around:${radius},${latitude},${longitude});
  node["tourism"="museum"](around:${radius},${latitude},${longitude});
  node["amenity"="library"](around:${radius},${latitude},${longitude});
  node["leisure"="park"](around:${radius},${latitude},${longitude});
  node["amenity"="cafe"](around:${radius},${latitude},${longitude});
);
out center;`;

  try {
    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/osm3s',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return [];
    }

    const places: OverpassPlace[] = data.elements
      .filter((element: any) => element.lat && element.lon && element.tags?.name)
      .map((element: any) => {
        let type: 'historic' | 'museum' | 'library' | 'park' | 'cafe' = 'historic';

        if (element.tags.tourism === 'museum') {
          type = 'museum';
        } else if (element.tags.amenity === 'library') {
          type = 'library';
        } else if (element.tags.leisure === 'park') {
          type = 'park';
        } else if (element.tags.amenity === 'cafe') {
          type = 'cafe';
        }

        const distance = calculateDistance(
          latitude,
          longitude,
          element.lat,
          element.lon
        );

        return {
          id: `${element.id}`,
          name: element.tags.name,
          latitude: element.lat,
          longitude: element.lon,
          category: getCategoryLabel(type),
          distance,
          type,
        };
      })
      .sort((a: OverpassPlace, b: OverpassPlace) => a.distance - b.distance)
      .slice(0, 20);

    return places;
  } catch (error) {
    console.error('Overpass API error:', error);
    throw error;
  }
};
