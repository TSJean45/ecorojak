import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Report() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [status, setStatus] = useState("on-time");
  const [delay, setDelay] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("normal");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");

  const statusOptions = [
    { id: "on-time", label: "On Time", icon: "checkmark-circle" },
    { id: "delayed", label: "Delayed", icon: "time" },
    { id: "cancelled", label: "Cancelled", icon: "close-circle" },
  ];

  const crowdOptions = [
    { id: "empty", label: "Empty", icon: "person-outline" },
    { id: "normal", label: "Normal", icon: "people-outline" },
    { id: "crowded", label: "Crowded", icon: "people" },
    { id: "full", label: "Full", icon: "people-sharp" },
  ];

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log({
      service,
      selectedRoute,
      status,
      delay,
      crowdLevel,
      notes,
      location,
      timestamp: new Date(),
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Report Status"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        {/* Route Selection */}
        <TouchableOpacity
          className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-6"
          onPress={() => router.push(`/transittogether/${service}/routes`)}
        >
          <View className="flex-row items-center">
            <Ionicons name="map-outline" size={24} color="#666" />
            <Text className="ml-2 text-gray-700">
              {selectedRoute || "Select Route"}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        {/* Current Location */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Current Location</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-xl"
            placeholder="Enter station or stop name"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Status Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Current Status</Text>
          <View className="flex-row flex-wrap">
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center mr-3 mb-2 px-4 py-2 rounded-full ${
                  status === option.id
                    ? "bg-blue-500"
                    : "bg-gray-100"
                }`}
                onPress={() => setStatus(option.id)}
              >
                <Ionicons
                  name={option.icon}
                  size={16}
                  color={status === option.id ? "#fff" : "#666"}
                />
                <Text
                  className={`ml-2 ${
                    status === option.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delay Input */}
        {status === "delayed" && (
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Delay Duration</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-xl"
              placeholder="Enter delay in minutes"
              value={delay}
              onChangeText={setDelay}
              keyboardType="number-pad"
            />
          </View>
        )}

        {/* Crowd Level */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Crowd Level</Text>
          <View className="flex-row flex-wrap">
            {crowdOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center mr-3 mb-2 px-4 py-2 rounded-full ${
                  crowdLevel === option.id
                    ? "bg-blue-500"
                    : "bg-gray-100"
                }`}
                onPress={() => setCrowdLevel(option.id)}
              >
                <Ionicons
                  name={option.icon}
                  size={16}
                  color={crowdLevel === option.id ? "#fff" : "#666"}
                />
                <Text
                  className={`ml-2 ${
                    crowdLevel === option.id
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Additional Notes</Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-xl"
            placeholder="Any additional information..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-xl mb-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submit Report
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}