import { GOOGLE_MAPS_API_KEY } from '@/key';

interface TransitArrival {
  time: string;
  destination: string;
  platform: string;
  status: 'On Time' | 'Delayed';
  delay?: string;
}

interface StationSchedule {
  stationName: string;
  northbound: TransitArrival[];
  southbound: TransitArrival[];
}

const getMockSchedule = (stationName: string, routeName: string): StationSchedule => {
  // Generate realistic times based on current time
  const now = new Date();
  const times = Array(6).fill(0).map((_, i) => {
    const time = new Date(now.getTime() + (i * 7 * 60000)); // 7 minutes interval
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  });

  // Determine destinations based on route
  let northDestination = '';
  let southDestination = '';

  if (routeName.includes('Kajang Line')) {
    northDestination = 'Kajang';
    southDestination = 'Kwasa Damansara';
  } else if (routeName.includes('Kelana Jaya Line')) {
    northDestination = 'Gombak';
    southDestination = 'Putra Heights';
  } else if (routeName.includes('Ampang Line')) {
    northDestination = 'Ampang';
    southDestination = 'Sentul Timur';
  } else if (routeName.includes('Sri Petaling Line')) {
    northDestination = 'Sri Petaling';
    southDestination = 'Sentul Timur';
  }

  return {
    stationName,
    northbound: [
      {
        time: times[0],
        destination: northDestination,
        platform: '1',
        status: 'On Time'
      },
      {
        time: times[2],
        destination: northDestination,
        platform: '1',
        status: 'Delayed',
        delay: '3 mins'
      },
      {
        time: times[4],
        destination: northDestination,
        platform: '1',
        status: 'On Time'
      }
    ],
    southbound: [
      {
        time: times[1],
        destination: southDestination,
        platform: '2',
        status: 'On Time'
      },
      {
        time: times[3],
        destination: southDestination,
        platform: '2',
        status: 'On Time'
      },
      {
        time: times[5],
        destination: southDestination,
        platform: '2',
        status: 'Delayed',
        delay: '2 mins'
      }
    ]
  };
};

export const getTransitSchedule = async (
  stationName: string,
  routeName: string
): Promise<StationSchedule> => {
  try {
    // For now, return mock data
    return getMockSchedule(stationName, routeName);
  } catch (error) {
    console.error('Transit API Error:', error);
    throw error;
  }
};