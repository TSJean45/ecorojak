import { GOOGLE_MAPS_API_KEY } from '../key';

type HealthyRoute = {
  name: string;
  distance: string;
  duration: string;
  calories: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  waypoints: Array<{
    latitude: number;
    longitude: number;
  }>;
};

// Add the fallback route function
const getFallbackRoute = (currentLocation: {latitude: number; longitude: number}): HealthyRoute => {
  const smallRadius = 0.0005; // About 50m
  return {
    name: "Quick Walk Loop",
    distance: "0.5 km",
    duration: "8 mins",
    calories: "35 cal",
    difficulty: "Easy",
    highlights: [
      "Short walking path",
      "Perfect for a quick break",
      "Easy circular route",
      "Returns to start point"
    ],
    waypoints: [
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      {
        latitude: currentLocation.latitude + smallRadius,
        longitude: currentLocation.longitude,
      },
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude + smallRadius,
      },
      {
        latitude: currentLocation.latitude - smallRadius,
        longitude: currentLocation.longitude,
      },
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude - smallRadius,
      },
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }
    ]
  };
};

export const generateHealthyRoute = async (
  currentLocation: { latitude: number; longitude: number },
  options: {
    distance: 'short' | 'medium' | 'long';
    intensity: 'casual' | 'moderate' | 'challenging';
  }
): Promise<HealthyRoute> => {
  try {
    console.log('Starting route generation with location:', currentLocation);
    
    // Adjust radius values for more accurate distances
    // 0.001 is roughly 100m, so we'll adjust accordingly
    const baseRadius = options.distance === 'short' ? 0.0008 : // For 0-2km routes
                      options.distance === 'long' ? 0.002 :    // For 3-4km routes
                      0.0015;                                  // For 2-3km routes (medium)

    // Adjust number of waypoints based on intensity
    const numPoints = options.intensity === 'casual' ? 3 :
                     options.intensity === 'challenging' ? 5 :
                     4; // moderate

    // Reduce random factor to keep distances more consistent
    const randomFactor = options.intensity === 'casual' ? 0.1 :
                        options.intensity === 'challenging' ? 0.3 :
                        0.2; // moderate

    // Generate waypoints in a pattern
    const angles = Array.from(
      { length: numPoints }, 
      (_, i) => (i / numPoints) * 2 * Math.PI
    );

    const waypoints = [
      currentLocation,
      ...angles.map(angle => {
        const r = baseRadius * (1 + (Math.random() - 0.5) * randomFactor);
        return {
          latitude: currentLocation.latitude + (r * Math.cos(angle)),
          longitude: currentLocation.longitude + (r * Math.sin(angle))
        };
      }),
      currentLocation // Return to start
    ];

    console.log('Generated waypoints:', waypoints);

    // Format waypoints for Google API
    const waypointsStr = waypoints.slice(1, -1)
      .map(wp => `${wp.latitude},${wp.longitude}`)
      .join('|');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${currentLocation.latitude},${currentLocation.longitude}&waypoints=optimize:true|${waypointsStr}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;

    console.log('API Request URL:', url);

    const response = await fetch(url);
    const result = await response.json();

    console.log('API Response:', result);

    if (result.routes && result.routes[0]) {
      const route = result.routes[0];
      const points = decodePolyline(route.overview_polyline.points);
      const distance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1000;
      const duration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60;

      // Generate random route names
      const routeNames = [
        "Nature Explorer Loop",
        "Urban Discovery Path",
        "Wellness Walking Route",
        "Scenic Circuit",
        "Health Trek Path"
      ];

      // Update highlights based on intensity
      const intensityHighlights = {
        casual: [
          "Easy walking paths",
          "Gentle slopes",
          "Well-maintained sidewalks",
          "Relaxed pace friendly"
        ],
        moderate: [
          "Mixed terrain",
          "Some elevation changes",
          "Varied scenery",
          "Balanced workout"
        ],
        challenging: [
          "Steeper sections",
          "Varied elevation",
          "Longer stretches",
          "More intense workout"
        ]
      };

      // Add intensity-specific highlights to the pool
      const possibleHighlights = [
        ...intensityHighlights[options.intensity],
        "Tree-lined streets",
        "Quiet neighborhood paths",
        "Good sidewalk coverage",
        "Interesting architecture"
      ];

      // Randomly select 4 highlights
      const selectedHighlights = possibleHighlights
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      return {
        name: routeNames[Math.floor(Math.random() * routeNames.length)],
        distance: `${distance.toFixed(1)} km`,
        duration: `${Math.round(duration)} mins`,
        calories: `${Math.round(duration * 4.5)} cal`,
        difficulty: distance < 2 ? "Easy" :    // 0-2km
                     distance < 3 ? "Moderate" : // 2-3km
                     "Challenging",              // 3km+
        highlights: selectedHighlights,
        waypoints: points.map(p => ({
          latitude: p.lat || p.latitude,
          longitude: p.lng || p.longitude
        }))
      };
    } else {
      console.log('No routes found in response:', result);
      throw new Error('No route found in API response');
    }

  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
};

// Google Maps polyline decoder
function decodePolyline(encoded: string) {
  const poly = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let shift = 0, result = 0;
    
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    poly.push({
      lat: lat * 1e-5,
      lng: lng * 1e-5
    });
  }

  return poly;
} 