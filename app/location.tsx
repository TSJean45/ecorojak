import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "../components/Header";
import { Chip } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // For GPS and bookmark icons
import * as Location from 'expo-location';

type CategoryKey = "recycle" | "vending" | "community"; // Updated type

// Add new types
type Route = {
  id: string;
  name: string;
  distance: string;
  duration: string;
  coordinates: { latitude: number; longitude: number; }[];
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
    { key: "vending", label: "Reverse Vending Machine" },
    { key: "community", label: "Community Events" }, // New category
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
      latitude: 3.2120, 
      longitude: 101.6341, 
      pinImage: require('../assets/images/locationpin1.png'),
      title: "Kepong Community Recycling Center"
    },
    { 
      id: '2', 
      latitude: 3.2157, 
      longitude: 101.6361, 
      pinImage: require('../assets/images/locationpin2.png'),
      title: "RVM @ Aeon Kepong"
    },
    { 
      id: '3', 
      latitude: 3.2027, 
      longitude: 101.6321, 
      pinImage: require('../assets/images/locationpin3.png'),
      title: "Weekend Recycling Drive"
    },
    { 
      id: '4', 
      latitude: 3.2117, 
      longitude: 101.6301, 
      pinImage: require('../assets/images/locationpin4.png'),
      title: "Jinjang Recycling Point"
    },
    { 
      id: '5', 
      latitude: 3.2047, 
      longitude: 101.6381, 
      pinImage: require('../assets/images/locationpin1.png'),
      title: "RVM @ Metro Point"
    },
  ];

  // Add sample routes
  const walkingRoutes: Route[] = [
    {
      id: "route1",
      name: "Kepong Nature Walk",
      distance: "2.5 km",
      duration: "30 mins",
      coordinates: [
        { latitude: 3.2087, longitude: 101.6341 }, // Start (current location)
        { latitude: 3.2120, longitude: 101.6341 }, // Point 1
        { latitude: 3.2157, longitude: 101.6361 }, // Point 2
        { latitude: 3.2117, longitude: 101.6301 }, // End
      ],
    },
    {
      id: "route2",
      name: "Community Circuit",
      distance: "1.8 km",
      duration: "22 mins",
      coordinates: [
        { latitude: 3.2087, longitude: 101.6341 }, // Start
        { latitude: 3.2027, longitude: 101.6321 }, // Point 1
        { latitude: 3.2047, longitude: 101.6381 }, // End
      ],
    },
  ];

  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Add useEffect for location permission and tracking
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10
        },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        }
      );
    })();
  }, []);

  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
    if (category === "vending") {
      setTitle("Reverse Vending Machine nearby");
      setResults([
        {
          id: "1",
          name: "RVM @ Aeon Kepong",
          status: "Open",
          distance: "200m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "2",
          name: "RVM @ Metro Point",
          status: "Open",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        // ... more RVM locations
      ]);
    } else if (category === "recycle") {
      setTitle("Recycle Stations nearby");
      setResults([
        {
          id: "8",
          name: "Kepong Community Recycling Center",
          status: "Open",
          distance: "300m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "9",
          name: "Jinjang Recycling Point",
          status: "Open",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
        // ... more recycling stations
      ]);
    } else if (category === "community") {
      setTitle("Community Events nearby");
      setResults([
        {
          id: "14",
          name: "Weekend Recycling Drive",
          status: "Now",
          distance: "400m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "15",
          name: "Earth Day Celebration",
          status: "Upcoming",
          distance: "800m",
          image: require("../assets/images/recycle1.png"),
        },
        // ... more community events
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
            <View className="flex-row flex-1 items-center bg-white rounded-md p-2 shadow">
              <MaterialIcons
                name="search"
                size={20}
                color="gray"
                style={{ marginRight: 5 }}
              />
              <TextInput placeholder="Search" style={{ flex: 1 }} />
            </View>
            <TouchableOpacity 
              className="ml-2 bg-white p-2.5 rounded-md"
              onPress={centerOnLocation}  // Add this
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
        <View
          className={`absolute bottom-0 left-0 right-0 rounded-t-3xl ${
            selectedCategory ? "bg-white" : "bg-transparent"
          }`}
          style={{ height: 200, paddingBottom: insets.bottom + 70 }}
        >
          <Text className="text-lg px-3 mt-3 font-bold">{title}</Text>
          <FlatList
            data={results}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row bg-white p-2 m-1 w-60 rounded-lg items-center"
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
      </View>

      {/* Add Routes Button */}
      <TouchableOpacity
        className="absolute right-4 bottom-52 bg-white p-3 rounded-full shadow-lg"
        onPress={() => setShowRoutes(!showRoutes)}
      >
        <MaterialIcons name="directions-walk" size={24} color="green" />
      </TouchableOpacity>

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
    </View>
  );
}
