import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "@/components/Header";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
// Add this custom style array at the top of your file
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9",
      },
    ],
  },
];

export default function RideDetails() {
  const mapRef = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const insets = useSafeAreaInsets();

  // Example coordinates for Melaka Sentral and TBS
  const origin = {
    latitude: 2.2062,
    longitude: 102.2553,
    title: "Melaka Sentral",
    description: "Melaka",
  };

  const destination = {
    latitude: 3.0819,
    longitude: 101.7183,
    title: "TBS",
    description: "Kuala Lumpur",
  };

  // Calculate the region to show both markers
  const midpoint = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
    latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 1.5,
    longitudeDelta: Math.abs(origin.longitude - destination.longitude) * 1.5,
  };

  useEffect(() => {
    const getOSMRoute = async () => {
      try {
        // Using OSRM (Open Source Routing Machine)
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord) => ({
              latitude: coord[1],
              longitude: coord[0],
            })
          );
          setRouteCoordinates(coordinates);

          // Fit map to show all coordinates including markers
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(
              [origin, destination, ...coordinates],
              {
                edgePadding: {
                  top: 50,
                  right: 50,
                  bottom: 50,
                  left: 50,
                },
                animated: true,
              }
            );
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    getOSMRoute();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Header title="Ride Details" showBackButton={true} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        <View style={{ height: Dimensions.get("window").height * 0.2 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={midpoint}
            mapType="standard"
            customMapStyle={mapStyle}
          >
            <Marker
              coordinate={origin}
              title={origin.title}
              description={origin.description}
              pinColor="green"
            />
            <Marker
              coordinate={destination}
              title={destination.title}
              description={destination.description}
              pinColor="red"
            />
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#2196F3"
                strokeWidth={3}
              />
            )}
          </MapView>
        </View>

        <View className="px-5">
          <Text className="text-xl font-bold text-black py-2">
            Friday, October 24, 2024
          </Text>
          <View className="flex-row items-start">
            <View className="mr-1">
              <Text className="text-lg font-bold">07:00 AM</Text>
              <Text className="text-lg font-bold mt-[55px]">09:00 AM</Text>
            </View>

            {/* Circle and line column */}
            <View className="items-center justify-center mx-4">
              <View className="mt-2 w-4 h-4 bg-green rounded-full" />
              <View className="w-0.5 bg-green h-16" />
              <View className="w-4 h-4 bg-green rounded-full" />
            </View>

            {/* Address column */}
            <View className="flex-1">
              <View>
                <Text className="text-md font-semibold">Melaka Sentral</Text>
                <Text className="text-xs text-gray-500">Melaka</Text>
              </View>

              <View className="mt-11">
                <Text className="text-md font-semibold">
                  TBS (Terminal Bersepadu Selatan)
                </Text>
                <Text className="text-xs text-gray-500">Kuala Lumpur</Text>
              </View>
            </View>
          </View>

          <View className="h-0.5 bg-[#E8E6E6] my-3" />

          <View className="flex-row items-center justify-between">
            {/* Left section: Car info and image */}
            <View className="flex-1">
              {/* Top row: Car name and image */}
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-bold">Perodua Viva</Text>
                  <Text className="text-gray-600">Black</Text>
                </View>
                <Image
                  source={require("@/assets/images/car.png")}
                  style={{ width: 100, height: 60 }}
                  resizeMode="contain"
                />
              </View>

              {/* Third row: Seats info */}
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row">
                  <Ionicons name="person" size={24} color="#9A9A9A" />
                  <Ionicons name="person-outline" size={24} color="#9A9A9A" />
                  <Ionicons name="person-outline" size={24} color="#9A9A9A" />
                  <Ionicons name="person-outline" size={24} color="#9A9A9A" />
                </View>
                <Text className="text-gray">3 seat(s) available</Text>
              </View>

              <View className="h-0.5 bg-[#E8E6E6] my-3" />

              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Image
                    source={require("@/assets/images/profile.png")}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <Text className="text-lg font-semibold">John Doe</Text>
                </View>
                <Ionicons name="chatbubble-outline" size={24} color="#000" />
              </View>

              {/* Guidelines Container */}
              <View className="border border-[#9A9A9A] rounded-lg p-4 mb-3">
                <View>
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="bulb" size={20} color="#FDB216" />
                    <Text className="ml-2 text-black text-lg font-bold">
                      Guidelines From The Host
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="cash-outline" size={20} color="#666" />
                    <Text className="ml-2 text-gray-600">Cash only</Text>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="woman-outline" size={20} color="#666" />
                    <Text className="ml-2 text-gray-600">Female only</Text>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <Text className="ml-2 text-gray-600">Be on time</Text>
                  </View>
                  <View className="flex-row items-center mb-3">
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color="#666"
                    />
                    <Text className="ml-2 text-gray-600">No smoking</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="briefcase-outline" size={20} color="#666" />
                    <Text className="ml-2 text-gray-600">
                      Small luggage only
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="bg-green py-2 rounded-full items-center">
                <Text className="text-white font-bold text-lg">
                  Request For Ride
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
