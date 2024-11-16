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
  currentLocation: { latitude: number; longitude: number }
): Promise<HealthyRoute> => {
  try {
    console.log('Starting route generation with location:', currentLocation);
    
    // Generate random radius between 200-500 meters
    const radius = (Math.random() * 0.003) + 0.002;
    
    // Generate random angles for waypoints
    const angles = Array.from({length: 3}, () => Math.random() * 2 * Math.PI);
    
    // Create waypoints
    const waypoints = [
      // Start point
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      // Random waypoints
      ...angles.map(angle => ({
        latitude: currentLocation.latitude + (radius * Math.cos(angle)),
        longitude: currentLocation.longitude + (radius * Math.sin(angle))
      })),
      // Return to start
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      }
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

      // Generate random highlights based on distance
      const possibleHighlights = [
        "Tree-lined streets",
        "Quiet neighborhood paths",
        "Local gardens view",
        "Pleasant walking terrain",
        "Peaceful residential area",
        "Good sidewalk coverage",
        "Interesting architecture",
        "Morning/evening friendly"
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
        difficulty: distance < 1 ? "Easy" : distance < 2 ? "Moderate" : "Challenging",
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