import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Routes() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Example route data - replace with actual routes
  const routes = {
    ktm: [
      {
        id: "1",
        name: "Port Klang Line",
        stations: ["KL Sentral", "Shah Alam", "Klang", "Port Klang"],
        color: "#DC2626",
      },
      {
        id: "2",
        name: "Seremban Line",
        stations: ["KL Sentral", "Bandar Tasik Selatan", "Seremban"],
        color: "#DC2626",
      },
    ],
    rapidkl: [
      {
        id: "B1",
        name: "Route 780",
        route: "Sri Nilam - Pasar Seni",
        color: "#CA8A04",
      },
      {
        id: "B2",
        name: "Route 420",
        route: "Puchong - Shah Alam",
        color: "#CA8A04",
      },
    ],
    mrt: [
      {
        id: "M1",
        name: "Kajang Line",
        stations: ["Kwasa Damansara", "Kajang"],
        color: "#2563EB",
      },
    ],
    lrt: [
      {
        id: "L1",
        name: "Kelana Jaya Line",
        stations: ["Gombak", "Putra Heights"],
        color: "#16A34A",
      },
    ],
  };

  const filteredRoutes = routes[service]?.filter((route) =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceName = () => {
    const names = {
      ktm: "KTM",
      rapidkl: "RapidKL Bus",
      mrt: "MRT",
      lrt: "LRT",
    };
    return names[service] || "";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title={`${getServiceName()} Routes`}
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <View className="flex-1 px-4">
        {/* Search Bar */}
        <View className="mb-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2"
              placeholder="Search routes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView className="flex-1">
          {filteredRoutes?.map((route) => (
            <TouchableOpacity
              key={route.id}
              className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
              onPress={() => {
                // Handle route selection
                router.back();
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="w-2 h-12 rounded-full mr-3"
                  style={{ backgroundColor: route.color }}
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{route.name}</Text>
                  <Text className="text-gray-500 mt-1">
                    {route.route || route.stations?.join(" → ")}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}