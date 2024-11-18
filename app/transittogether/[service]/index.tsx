import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { getTransitSchedule } from "@/utils/transitApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Update = {
  id: string;
  text: string;
  upvotes: number;
  timestamp: string;
  // ... other properties
};

export default function TransitService() {
  const router = useRouter();
  const { service, selectedRoute: routeParam } = useLocalSearchParams();
  const [selectedRoute, setSelectedRoute] = useState(
    routeParam ? JSON.parse(routeParam as string) : null
  );
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});

  // Example data structure for updates
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: 1,
      route: "Port Klang Line",
      trainNumber: "EMU82",
      station: "Shah Alam",
      status: "Delayed",
      delay: "15 mins",
      timestamp: "10:30 AM",
      crowdLevel: "High",
      reporter: "User123",
      upvotes: 5,
      details: "Signal fault at Shah Alam station",
    },
    {
      id: 2,
      route: "Seremban Line",
      trainNumber: "EMU29",
      station: "Bandar Tasik Selatan",
      status: "On Time",
      timestamp: "10:45 AM",
      crowdLevel: "Medium",
      reporter: "TrainSpotter",
      upvotes: 3,
      details: "Train is running smoothly",
    },
    {
      id: 3,
      route: "Port Klang Line",
      trainNumber: "EMU55",
      station: "Klang",
      status: "Delayed",
      delay: "20 mins",
      timestamp: "11:00 AM",
      crowdLevel: "Very High",
      reporter: "Commuter2024",
      upvotes: 8,
      details: "Technical issues, train moving slowly",
    },
    {
      id: 4,
      route: "Seremban Line",
      trainNumber: "EMU41",
      station: "Serdang",
      status: "Cancelled",
      timestamp: "11:15 AM",
      crowdLevel: "N/A",
      reporter: "KTMWatcher",
      upvotes: 12,
      details: "Train breakdown at UKM station",
    },
    {
      id: 5,
      route: "Port Klang Line",
      trainNumber: "EMU93",
      station: "KL Sentral",
      status: "On Time",
      timestamp: "11:30 AM",
      crowdLevel: "Low",
      reporter: "RailFan",
      upvotes: 2,
      details: "Normal service resumed",
    },
    {
      id: 6,
      route: "Skypark Line",
      trainNumber: "EMU17",
      station: "Subang Jaya",
      status: "Delayed",
      delay: "10 mins",
      timestamp: "11:45 AM",
      crowdLevel: "Medium",
      reporter: "SubangCommuter",
      upvotes: 4,
      details: "Waiting for track clearance",
    },
  ]);

  useEffect(() => {
    if (selectedRoute && selectedStation) {
      loadSchedule(selectedStation, selectedRoute.name);
    }
  }, [selectedRoute, selectedStation]);

  const loadSchedule = async (station: string, routeName: string) => {
    setLoading(true);
    try {
      const scheduleData = await getTransitSchedule(station, routeName);
      setSchedules(scheduleData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (updateId: string) => {
    // Check if user has already voted
    const hasVoted = userVotes[updateId];
    if (hasVoted) return;

    try {
      // Update the local state
      setUpdates((prevUpdates) =>
        prevUpdates.map((update) =>
          update.id === updateId
            ? { ...update, upvotes: update.upvotes + 1 }
            : update
        )
      );

      // Store the user's vote
      const newUserVotes = { ...userVotes, [updateId]: true };
      setUserVotes(newUserVotes);
      await AsyncStorage.setItem("userVotes", JSON.stringify(newUserVotes));

      // Here you would typically make an API call to update the server
      // await updateUpvoteOnServer(updateId);
    } catch (error) {
      console.error("Failed to update vote:", error);
      // Revert the optimistic update if failed
      setUpdates((prevUpdates) =>
        prevUpdates.map((update) =>
          update.id === updateId
            ? { ...update, upvotes: update.upvotes - 1 }
            : update
        )
      );
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title={service === "ktm" ? "KTM Updates" : "RapidKL Updates"}
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        {/* Route Selection */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Select Route</Text>
          <TouchableOpacity
            className="flex-row items-center p-3 bg-gray-100 rounded-lg"
            onPress={() => router.push(`/transittogether/${service}/routes`)}
          >
            <Ionicons name="map-outline" size={24} color="#666" />
            <Text className="ml-2 flex-1">
              {selectedRoute ? selectedRoute.name : "Choose your route"}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {selectedRoute && (
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Select Station</Text>
            <TouchableOpacity
              className="flex-row items-center p-3 bg-gray-100 rounded-lg"
              onPress={() => {
                // Show station selection modal or navigate to station selection
                const stations = selectedRoute.stations || [];
                if (stations.length > 0) {
                  Alert.alert(
                    "Select Station",
                    "Choose your station",
                    stations.map((station) => ({
                      text: station,
                      onPress: () => setSelectedStation(station),
                    })),
                    { cancelable: true }
                  );
                }
              }}
            >
              <Ionicons name="location-outline" size={24} color="#666" />
              <Text className="ml-2 flex-1">
                {selectedStation ? selectedStation : "Choose your station"}
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        {/* Add Update Button */}
        <TouchableOpacity
          className="bg-green p-4 rounded-xl mb-4"
          onPress={() => {
            if (!selectedRoute || !selectedStation) {
              Alert.alert("Error", "Please select both route and station first");
              return;
            }
            router.push({
              pathname: `/transittogether/${service}/report`,
              params: {
                selectedRoute: selectedRoute.name,
                selectedStation: selectedStation
              }
            });
          }}
        >
          <Text className="text-white text-center font-semibold">
            Report Current Status
          </Text>
        </TouchableOpacity>

        {/* Recent Updates */}
        <Text className="text-lg font-semibold mb-2">Recent Updates</Text>
        {updates.map((update) => (
          <View
            key={update.id}
            className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
          >
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold">{update.route}</Text>
              <Text className="text-gray-500">{update.timestamp}</Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Ionicons
                name={
                  update.status === "Delayed" ? "warning" : "checkmark-circle"
                }
                size={16}
                color={update.status === "Delayed" ? "#DC2626" : "#16A34A"}
              />
              <Text className="ml-1">{update.status}</Text>
              {update.delay && (
                <Text className="text-red-500 ml-2">({update.delay})</Text>
              )}
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#666" />
                <Text className="text-gray-500 ml-1">{update.crowdLevel}</Text>
              </View>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => handleUpvote(update.id)}
              >
                <Ionicons
                  name="arrow-up"
                  size={16}
                  color={userVotes[update.id] ? "#22C55E" : "#666"}
                />
                <Text
                  className={`ml-1 ${
                    userVotes[update.id] ? "text-green" : "text-gray-500"
                  }`}
                >
                  {update.upvotes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {loading ? (
          <View className="mt-4 p-4">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-center mt-2">Loading schedules...</Text>
          </View>
        ) : schedules.length > 0 ? (
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">
              Arrivals at {selectedStation}
            </Text>

            <View className="mb-4">
              <Text className="font-medium text-gray-600 mb-2">
                Northbound → {schedules.northbound[0]?.destination}
              </Text>
              {schedules.northbound.map((arrival, idx) => (
                <View
                  key={idx}
                  className="flex-row justify-between items-center py-2 border-b border-gray-100"
                >
                  <Text className="text-lg">{arrival.time}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 mr-2">
                      Platform {arrival.platform}
                    </Text>
                    <Text
                      className={
                        arrival.status === "Delayed"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {arrival.status === "Delayed"
                        ? `+${arrival.delay}`
                        : "On Time"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-600 mb-2">
                Southbound → {schedules.southbound[0]?.destination}
              </Text>
              {schedules.southbound.map((arrival, idx) => (
                <View
                  key={idx}
                  className="flex-row justify-between items-center py-2 border-b border-gray-100"
                >
                  <Text className="text-lg">{arrival.time}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 mr-2">
                      Platform {arrival.platform}
                    </Text>
                    <Text
                      className={
                        arrival.status === "Delayed"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {arrival.status === "Delayed"
                        ? `+${arrival.delay}`
                        : "On Time"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          selectedRoute && (
            <View className="mt-4 p-4 bg-orange-50 rounded-xl">
              <Text className="text-center text-orange-700">
                No schedules available for this route at the moment
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}
