import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function TransitService() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Example data structure for updates
  const updates = [
    {
      id: 1,
      route: "Port Klang - KL Sentral",
      station: "Shah Alam",
      status: "Delayed",
      delay: "15 mins",
      timestamp: "10:30 AM",
      crowdLevel: "High",
      reporter: "User123",
      upvotes: 5,
    },
    // Add more updates...
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title={service === 'ktm' ? 'KTM Updates' : 'RapidKL Updates'}
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
            onPress={() => router.push(`/transit/${service}/routes`)}
          >
            <Ionicons name="map-outline" size={24} color="#666" />
            <Text className="ml-2 flex-1">
              {selectedRoute || "Choose your route"}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Add Update Button */}
        <TouchableOpacity 
          className="bg-blue-500 p-4 rounded-xl mb-4"
          onPress={() => router.push(`/transit/${service}/report`)}
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
                name={update.status === 'Delayed' ? 'warning' : 'checkmark-circle'} 
                size={16} 
                color={update.status === 'Delayed' ? '#DC2626' : '#16A34A'} 
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
                onPress={() => {/* Handle upvote */}}
              >
                <Ionicons name="arrow-up" size={16} color="#666" />
                <Text className="text-gray-500 ml-1">{update.upvotes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}