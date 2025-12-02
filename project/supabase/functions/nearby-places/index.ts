import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GOOGLE_PLACES_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

interface PlacesRequest {
  latitude: number;
  longitude: number;
  radius?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { latitude, longitude, radius = 5000 }: PlacesRequest = await req.json();

    if (!GOOGLE_PLACES_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const heritageKeywords = [
      "museum",
      "historical site",
      "landmark",
      "temple",
      "monument",
      "archaeological site",
      "heritage site",
      "historic building",
      "park",
      "library",
    ];

    const results: any[] = [];

    for (const keyword of heritageKeywords) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
          `location=${latitude},${longitude}&` +
          `radius=${radius}&` +
          `keyword=${keyword}&` +
          `key=${GOOGLE_PLACES_API_KEY}`
      );

      const data = await response.json();

      if (data.results) {
        results.push(...data.results);
      }
    }

    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.place_id, item])).values()
    )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20);

    const processedPlaces = uniqueResults.map((place) => ({
      id: place.place_id,
      name: place.name,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      rating: place.rating || 0,
      types: place.types || [],
      photo: place.photos?.[0]?.photo_reference || null,
      vicinity: place.vicinity,
    }));

    return new Response(JSON.stringify({ places: processedPlaces }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch nearby places" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
