import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Report() {
  const router = useRouter();
  const { service, selectedRoute, selectedStation } = useLocalSearchParams();
  const [status, setStatus] = useState("on-time");
  const [delay, setDelay] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("normal");
  const [notes, setNotes] = useState("");

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
    // Validate required fields
    if (!selectedRoute || !selectedStation) {
      Alert.alert("Error", "Route and station information is missing");
      return;
    }

    // Create report object
    const report = {
      id: Date.now().toString(), // temporary ID
      route: selectedRoute,
      station: selectedStation,
      status: status,
      delay: status === "delayed" ? delay : null,
      crowdLevel: crowdLevel,
      notes: notes,
      timestamp: new Date().toLocaleString(),
      upvotes: 0
    };

    // Here you would typically send this to your backend
    console.log("Submitting report:", report);

    // Show success message and navigate back
    Alert.alert(
      "Success",
      "Thank you for your report!",
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Report Status"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        {/* Display Route and Station Info */}
        <View className="bg-[#73D1C0] p-4 rounded-xl mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="map" size={24} color="white" />
            <Text className="ml-2 text-white font-bold">{selectedRoute}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="location" size={24} color="white" />
            <Text className="ml-2 text-white">{selectedStation}</Text>
          </View>
        </View>

        {/* Status Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Current Status</Text>
          <View className="flex-row flex-wrap">
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center mr-1 mb-2 px-4 py-2 rounded-full ${
                  status === option.id
                    ? "bg-green"
                    : "border"
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
                className={`flex-row items-center mr-2 mb-2 px-4 py-2 rounded-full ${
                  crowdLevel === option.id
                    ? "bg-green"
                    : "border"
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
            className="border p-4 rounded-xl"
            placeholder="Any additional information..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-green p-3 rounded-xl mb-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submit Report
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}