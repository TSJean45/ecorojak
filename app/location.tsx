import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Linking,
  Modal,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "../components/Header";
import { Chip } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // For GPS and bookmark icons
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../key';
import 'react-native-get-random-values';
import { generateHealthyRoute } from '../utils/huggingface';

type CategoryKey = "recycle" | "vending" | "events"; // Updated type

// Add new types
type Route = {
  id: string;
  name: string;
  distance: string;
  duration: string;
  coordinates: { latitude: number; longitude: number; }[];
};

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
    description: string;
  }>;
};

export default function LocationScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );
  const [results, setResults] = useState<
    { id: string; name: string; status: string; distance: string; image: any }[]
  >([]);
  const [title, setTitle] = useState<string>("");

  const insets = useSafeAreaInsets();
  const categories = [
    { key: "recycle", label: "Recycle Stations" },
    { key: "vending", label: "Reverse Vending" },
    { key: "events", label: "Events" }, // New category
  ];

  // Add new state for current location
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 3.2087,    // Default Kepong coordinates
    longitude: 101.6341,
  });

  // Add sample locations for markers
  const sampleLocations = [
    { 
      id: '1', 
      latitude: 3.2087, 
      longitude: 101.6341, 
      pinImage: require('../assets/images/locationpin1.png'),
      title: "Kepong Recycling Center"
    },
    { 
      id: '2', 
      latitude: 3.2157, 
      longitude: 101.6361, 
      pinImage: require('../assets/images/locationpin2.png'),
      title: "RVM @ AEON Kepong"
    },
    { 
      id: '3', 
      latitude: 3.2027, 
      longitude: 101.6321, 
      pinImage: require('../assets/images/locationpin3.png'),
      title: "Earth Day Festival @ Metropolitan Park"
    },
    { 
      id: '4', 
      latitude: 3.2117, 
      longitude: 101.6301, 
      pinImage: require('../assets/images/locationpin4.png'),
      title: "RVM @ Metro Prima Kepong"
    },
    { 
      id: '5', 
      latitude: 3.2047, 
      longitude: 101.6381, 
      pinImage: require('../assets/images/locationpin1.png'),
      title: "Jinjang Community Recycling Hub"
    },
    { 
      id: '6', 
      latitude: 3.1997, 
      longitude: 101.6331, 
      pinImage: require('../assets/images/locationpin2.png'),
      title: "Green Living Workshop @ Desa Park City"
    },
    { 
      id: '7', 
      latitude: 3.2137, 
      longitude: 101.6391, 
      pinImage: require('../assets/images/locationpin3.png'),
      title: "Weekend Recycling Drive @ Taman Ehsan"
    }
  ];

  // Add sample routes
  const walkingRoutes: Route[] = [
    {
      id: "route1",
      name: "Kepong Recycling Route",
      distance: "2.5 km",
      duration: "30 mins",
      coordinates: [
        { latitude: 3.2087, longitude: 101.6341 }, // Start
        { latitude: 3.2157, longitude: 101.6361 }, // AEON
        { latitude: 3.2117, longitude: 101.6301 }, // Metro Prima
        { latitude: 3.2047, longitude: 101.6381 }, // Jinjang Hub
      ],
    },
    {
      id: "route2",
      name: "Event Venues Route",
      distance: "3.2 km",
      duration: "40 mins",
      coordinates: [
        { latitude: 3.2087, longitude: 101.6341 }, // Start
        { latitude: 3.2027, longitude: 101.6321 }, // Earth Day Festival
        { latitude: 3.1997, longitude: 101.6331 }, // Green Living Workshop
        { latitude: 3.2137, longitude: 101.6391 }, // Weekend Drive
      ],
    },
  ];

  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showHealthyRoute, setShowHealthyRoute] = useState(false);
  const [healthyRoute, setHealthyRoute] = useState<HealthyRoute | null>(null);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);

  // Add useEffect for location permission and tracking
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      
      setCurrentLocation(newLocation);
      
      // Pan to user's location when received
      mapRef.current?.animateToRegion({
        ...newLocation,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }, 1000);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10
        },
        (location) => {
          const updatedLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
          setCurrentLocation(updatedLocation);
        }
      );
    })();
  }, []);

  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
    if (category === "vending") {
      setTitle("Reverse Vending Machines");
      setResults([
        {
          id: "2",
          name: "RVM @ AEON Kepong",
          status: "Open",
          distance: "1.2km",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "4",
          name: "RVM @ Metro Prima Kepong",
          status: "Open",
          distance: "0.8km",
          image: require("../assets/images/recycle1.png"),
        },
      ]);
    } else if (category === "recycle") {
      setTitle("Recycle Stations");
      setResults([
        {
          id: "1",
          name: "Kepong Recycling Center",
          status: "Open",
          distance: "0.5km",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "5",
          name: "Jinjang Community Recycling Hub",
          status: "Open",
          distance: "1.5km",
          image: require("../assets/images/recycle1.png"),
        },
      ]);
    } else if (category === "events") {
      setTitle("Upcoming Events");
      setResults([
        {
          id: "3",
          name: "Earth Day Festival @ Metropolitan Park",
          status: "Apr 22",
          distance: "2.1km",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "6",
          name: "Green Living Workshop @ Desa Park City",
          status: "Tomorrow",
          distance: "2.5km",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "7",
          name: "Weekend Recycling Drive @ Taman Ehsan",
          status: "This Sat",
          distance: "1.8km",
          image: require("../assets/images/recycle1.png"),
        },
      ]);
    } else {
      setResults([]);
    }
  };

  // Add route selection handler
  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
  };

  // Add mapRef at the top of your component
  const mapRef = useRef<MapView>(null);  // Add this

  // Add this function to center the map
  const centerOnLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    }, 1000);  // 1000ms animation duration
  };

  // Add this state for search input visibility
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleGenerateHealthyRoute = async () => {
    setIsGeneratingRoute(true);
    try {
      const route = await generateHealthyRoute(currentLocation);
      if (route) {
        setHealthyRoute(route);
        // Convert waypoints to route format for the map
        setSelectedRoute({
          id: 'ai-route',
          name: route.name,
          distance: route.distance,
          duration: route.duration,
          coordinates: route.waypoints.map(wp => ({
            latitude: wp.latitude,
            longitude: wp.longitude
          }))
        });
        setShowHealthyRoute(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGeneratingRoute(false);
    }
  };

  const getGoogleMapsUrl = (waypoints: Array<{latitude: number; longitude: number}>) => {
    // Start point
    const origin = `${waypoints[0].latitude},${waypoints[0].longitude}`;
    
    // End point
    const destination = `${waypoints[waypoints.length-1].latitude},${waypoints[waypoints.length-1].longitude}`;
    
    // Select only key waypoints (every 10th point or so)
    const middlePoints = waypoints
      .filter((_, index) => index % 10 === 0) // Take every 10th point
      .slice(1, -1) // Remove start and end points
      .map(wp => `${wp.latitude},${wp.longitude}`)
      .join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${middlePoints}&travelmode=walking`;
    
    console.log('Simplified Google Maps URL:', url);
    
    return url;
  };

  // Add these state variables at the top
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    distance: 'medium', // short, medium, long
    difficulty: 'moderate', // easy, moderate, challenging
    duration: '30', // in minutes
  });

  // Add this component for the preferences modal
  const RoutePreferencesModal = ({ visible, onClose, onSave }) => {
    const [tempPrefs, setTempPrefs] = useState(preferences);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Route Preferences</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Distance Preference */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Distance</Text>
              <View className="flex-row space-x-2">
                {['short', 'medium', 'long'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    className={`flex-1 py-2 px-4 rounded-full ${
                      tempPrefs.distance === option ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    onPress={() => setTempPrefs({ ...tempPrefs, distance: option })}
                  >
                    <Text className={`text-center ${
                      tempPrefs.distance === option ? 'text-white' : 'text-gray-700'
                    }`}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Difficulty Preference */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Difficulty</Text>
              <View className="flex-row space-x-2">
                {['easy', 'moderate', 'challenging'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    className={`flex-1 py-2 px-4 rounded-full ${
                      tempPrefs.difficulty === option ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    onPress={() => setTempPrefs({ ...tempPrefs, difficulty: option })}
                  >
                    <Text className={`text-center ${
                      tempPrefs.difficulty === option ? 'text-white' : 'text-gray-700'
                    }`}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Duration Preference */}
            <View className="mb-6">
              <Text className="font-bold mb-2">Duration (minutes)</Text>
              <View className="flex-row space-x-2">
                {['15', '30', '45', '60'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    className={`flex-1 py-2 px-4 rounded-full ${
                      tempPrefs.duration === option ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    onPress={() => setTempPrefs({ ...tempPrefs, duration: option })}
                  >
                    <Text className={`text-center ${
                      tempPrefs.duration === option ? 'text-white' : 'text-gray-700'
                    }`}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              className="bg-green-500 py-3 rounded-lg"
              onPress={() => {
                onSave(tempPrefs);
                onClose();
              }}
            >
              <Text className="text-white font-bold text-center">Save Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Location" showBackButton={true} />
      <View
        className="flex-1 bg-transparent"
        style={{ paddingBottom: insets.bottom + 60 }}
      >
        <MapView
          ref={mapRef}  // Add this
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
          {/* Current Location Marker */}
          <Marker
            coordinate={currentLocation}
            title="You are here"
          >
            <Image 
              source={require('../assets/images/tapir-pin.png')} 
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>

          {/* Location Markers */}
          {sampleLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.title}
            >
              <Image 
                source={location.pinImage}
                style={{ width: 30, height: 30 }}  // Increased size
                resizeMode="contain"
              />
            </Marker>
          ))}

          {/* Show selected route polyline */}
          {selectedRoute && (
            <Polyline
              coordinates={selectedRoute.coordinates}
              strokeColor="#2D68FF"
              strokeWidth={3}
            />
          )}
        </MapView>
        <View className="absolute top-0 left-0 right-0 p-4">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View className="flex-1">
              <GooglePlacesAutocomplete
                placeholder='Search location'
                onPress={(data, details = null) => {
                  if (details) {
                    const { lat, lng } = details.geometry.location;
                    mapRef.current?.animateToRegion({
                      latitude: lat,
                      longitude: lng,
                      latitudeDelta: 0.0222,
                      longitudeDelta: 0.0121,
                    }, 1000);
                  }
                }}
                query={{
                  key: GOOGLE_MAPS_API_KEY,
                  language: 'en',
                  components: 'country:my', // Restrict to Malaysia
                }}
                fetchDetails={true}
                enablePoweredByContainer={false}
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  },
                  listView: {
                    position: 'absolute',
                    top: 45,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    zIndex: 1000,
                    elevation: 5,
                  },
                  row: {
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                  },
                  separator: {
                    height: 0.5,
                    backgroundColor: '#c8c7cc',
                  },
                }}
              />
            </View>
            <TouchableOpacity 
              className="ml-2 bg-white p-2.5 rounded-md"
              onPress={centerOnLocation}
            >
              <MaterialIcons name="gps-fixed" size={24} color="green" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                {categories.map((category) => (
                  <Chip
                    key={category.key}
                    selected={selectedCategory === category.key}
                    onPress={() => handleCategorySelect(category.key)}
                    style={{ marginRight: 5, backgroundColor: "white" }}
                  >
                    {category.label}
                  </Chip>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        {selectedCategory && (
          <View
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white"
            style={{ height: 220, paddingBottom: insets.bottom + 80 }}
          >
            <View className="flex-row justify-between items-center px-3 mt-3">
              <Text className="text-lg font-bold">{title}</Text>
              <TouchableOpacity 
                onPress={() => {
                  setSelectedCategory(null);
                  setTitle(""); // Also clear the title
                  setResults([]); // Clear the results
                }}
                className="p-2 rounded-full"
              >
                <MaterialIcons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={results}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row bg-white p-3 my-1 mx-1 w-60 rounded-lg items-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-xl mr-2"
                  />
                  <View className="flex-1">
                    <Text className="font-bold">{item.name}</Text>
                    <Text
                      className={
                        item.status === "Open" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {item.status}
                    </Text>
                    <View className="flex-row items-center">
                      <MaterialIcons name="location-on" size={16} color="gray" />
                      <Text className="ml-1">{item.distance} away</Text>
                    </View>
                  </View>
                  <MaterialIcons name="bookmark-border" size={24} color="gray" />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<></>}
            />
          </View>
        )}
      </View>

      {/* Add Routes Button */}
      <View className="absolute right-4 bottom-52 flex-col space-y-4">
        <TouchableOpacity
          className="bg-white p-3 rounded-full shadow-lg"
          onPress={() => setShowRoutes(!showRoutes)}
        >
          <MaterialIcons name="directions-walk" size={24} color="green" />
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-white p-3 rounded-full shadow-lg"
          onPress={async () => {
            console.log('Initial route generation clicked');
            setIsGeneratingRoute(true);
            try {
              const route = await generateHealthyRoute(currentLocation);
              console.log('Route generated successfully:', route);
              setHealthyRoute(route);
              setSelectedRoute({
                id: 'ai-route',
                coordinates: route.waypoints
              });
              setShowHealthyRoute(true);
            } catch (error) {
              console.error('Error in initial route generation:', error);
            } finally {
              setIsGeneratingRoute(false);
            }
          }}
          disabled={isGeneratingRoute}
        >
          {isGeneratingRoute ? (
            <ActivityIndicator color="green" />
          ) : (
            <MaterialIcons name="directions-walk" size={24} color="green" />
          )}
        </TouchableOpacity>
      </View>

      {/* Routes Bottom Sheet */}
      {showRoutes && (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
          style={{ height: 280, paddingBottom: insets.bottom + 90 }}
        >
          <View className="p-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-lg font-bold">Suggested Walking Routes</Text>
              <TouchableOpacity 
                onPress={() => setShowRoutes(false)}
                className="p-2"
              >
                <MaterialIcons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={walkingRoutes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mr-4 bg-white rounded-lg p-2 mb-2"
                  style={{ 
                    width: 200,
                    height: 130,
                    // iOS shadow
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    // Android shadow
                    elevation: 5,
                  }}
                  onPress={() => handleRouteSelect(item)}
                >
                  <Text className="font-bold text-base mb-1">{item.name}</Text>
                  <View className="flex-row items-center mb-1">
                    <MaterialIcons name="straighten" size={16} color="gray" />
                    <Text className="ml-1 text-gray-600">{item.distance}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialIcons name="access-time" size={16} color="gray" />
                    <Text className="ml-1 text-gray-600">{item.duration}</Text>
                  </View>
                  {selectedRoute?.id === item.id && (
                    <TouchableOpacity 
                      className="mt-2 bg-green py-2 rounded-md items-center"
                      onPress={() => {
                        // Handle start navigation
                        console.log('Starting navigation for route:', item.name);
                      }}
                    >
                      <Text className="text-white font-bold">Start!</Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}

      {showHealthyRoute && healthyRoute && (
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4"
          style={{ 
            marginBottom: 90 // Lift above nav bar
          }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">AI Generated Health Route</Text>
            <TouchableOpacity 
              onPress={() => {
                setShowHealthyRoute(false);
                setSelectedRoute(null);
              }}
              className="p-2"
            >
              <MaterialIcons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-lg p-4 shadow-md space-y-4">
            <Text className="text-lg font-bold">{healthyRoute.name}</Text>
            
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <MaterialIcons name="straighten" size={20} color="gray" />
                <Text className="ml-2">{healthyRoute.distance}</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="access-time" size={20} color="gray" />
                <Text className="ml-2">{healthyRoute.duration}</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="local-fire-department" size={20} color="gray" />
                <Text className="ml-2">{healthyRoute.calories}</Text>
              </View>
            </View>

            <View>
              <Text className="font-bold mb-2">Route Highlights:</Text>
              {healthyRoute.highlights.map((highlight, index) => (
                <Text key={index} className="text-gray-600">• {highlight}</Text>
              ))}
            </View>

            {/* Action Buttons */}
            <View className="mt-4 space-y-2">
              {/* Generate Again & Google Maps buttons */}
              <View className="flex-row space-x-2">
                <TouchableOpacity 
                  className="flex-1 bg-[#22C55E] py-3 rounded-lg flex-row justify-center items-center"
                  onPress={async () => {
                    console.log('Regenerate button clicked');
                    setIsGeneratingRoute(true);
                    try {
                      const newRoute = await generateHealthyRoute(currentLocation);
                      console.log('New route generated successfully:', newRoute);
                      setHealthyRoute(newRoute);
                      setSelectedRoute({
                        id: 'ai-route',
                        coordinates: newRoute.waypoints
                      });
                    } catch (error) {
                      console.error('Error in route regeneration:', error);
                    } finally {
                      setIsGeneratingRoute(false);
                    }
                  }}
                  disabled={isGeneratingRoute}
                >
                  {isGeneratingRoute ? (
                    <ActivityIndicator color="white" style={{ marginRight: 8 }} />
                  ) : (
                    <MaterialIcons name="refresh" size={20} color="white" style={{ marginRight: 8 }} />
                  )}
                  <Text className="text-white font-bold">
                    {isGeneratingRoute ? 'Generating...' : 'Generate Again'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-1 bg-blue-500 py-3 rounded-lg flex-row justify-center items-center"
                  onPress={() => {
                    const url = getGoogleMapsUrl(healthyRoute.waypoints);
                    Linking.openURL(url);
                  }}
                >
                  <MaterialIcons 
                    name="map" 
                    size={20} 
                    color="white" 
                    style={{ marginRight: 8 }} 
                  />
                  <Text className="text-white font-bold">
                    Google Maps
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Hide button */}
              <TouchableOpacity 
                className="bg-gray-500 py-3 rounded-lg items-center"
                onPress={() => setShowHealthyRoute(false)}
              >
                <Text className="text-white font-bold">Hide Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Update your logo TouchableOpacity to show the preferences modal */}
      <TouchableOpacity 
        onPress={() => setShowPreferences(true)}
        className="absolute top-10 left-4 z-10"
      >
        <Image
          source={require("../assets/images/Logo.png")}
          className="w-12 h-12 rounded-full"
        />
      </TouchableOpacity>

      {/* Add the preferences modal to your render */}
      <RoutePreferencesModal
        visible={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSave={(newPrefs) => {
          setPreferences(newPrefs);
          // You might want to generate a new route here with the new preferences
        }}
      />
    </View>
  );
}
