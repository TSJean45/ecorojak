import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../key';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateHealthyRoute = async (
  currentLocation: { latitude: number; longitude: number }
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a health and fitness route planner that creates walking routes optimized for exercise and environmental awareness."
        },
        {
          role: "user",
          content: `Create a walking route near coordinates (${currentLocation.latitude}, ${currentLocation.longitude}) in Kepong, Malaysia. 
          Return a JSON object with: 
          {
            "name": "route name",
            "distance": "distance in km",
            "duration": "duration in minutes",
            "calories": "estimated calories",
            "difficulty": "Easy/Moderate/Challenging",
            "highlights": ["point 1", "point 2", "point 3"],
            "waypoints": [
              {"latitude": number, "longitude": number, "description": "string"}
            ]
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    const route = JSON.parse(response.choices[0].message.content);
    return route;
  } catch (error) {
    console.error('Error generating route:', error);
    
    // Return a fallback route if API fails
    return {
      name: "Kepong Health Loop",
      distance: "2.5 km",
      duration: "30 mins",
      calories: "150 cal",
      difficulty: "Moderate",
      highlights: [
        "Pass by Metropolitan Park",
        "Green corridor walk",
        "2 Recycling points on route",
        "Scenic lake view"
      ],
      waypoints: [
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          description: "Start point"
        },
        {
          latitude: currentLocation.latitude + 0.002,
          longitude: currentLocation.longitude + 0.002,
          description: "Metropolitan Park"
        },
        {
          latitude: currentLocation.latitude + 0.003,
          longitude: currentLocation.longitude - 0.001,
          description: "Recycling Point 1"
        },
        {
          latitude: currentLocation.latitude - 0.001,
          longitude: currentLocation.longitude + 0.003,
          description: "Lake View Point"
        },
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          description: "End point"
        }
      ]
    };
  }
}; 