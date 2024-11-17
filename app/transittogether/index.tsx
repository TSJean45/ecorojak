import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function TransitTogether() {
  const router = useRouter();

  const transitOptions = [
    {
      id: 'mrt',
      name: 'MRT',
      icon: 'train',
      color: '#2563EB', // Blue
      crowdsourced: false,
      description: 'Official MRT schedule and updates',
    },
    {
      id: 'lrt',
      name: 'LRT',
      icon: 'subway',
      color: '#16A34A', // Green
      crowdsourced: false,
      description: 'Official LRT schedule and updates',
    },
    {
      id: 'ktm',
      name: 'KTM',
      icon: 'train-outline',
      color: '#DC2626', // Red
      crowdsourced: true,
      description: 'Community-driven KTM updates',
    },
    {
      id: 'rapidkl',
      name: 'RapidKL Bus',
      icon: 'bus',
      color: '#CA8A04', // Yellow
      crowdsourced: true,
      description: 'Community-driven bus updates',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="TransitTogether"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        <View className="mt-4 mb-6">
          <Text className="text-2xl font-bold">
            Real-time Transit Updates
          </Text>
          <Text className="text-gray-600 mt-1">
            Stay informed with official schedules and community updates
          </Text>
        </View>

        {/* Featured Updates or Alerts */}
        <View className="bg-orange-50 p-4 rounded-xl mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={20} color="#EA580C" />
            <Text className="text-orange-800 font-semibold ml-2">
              Active Alerts
            </Text>
          </View>
          <Text className="text-orange-700">
            KTM Seremban Line: 15min delay reported by community
          </Text>
        </View>

        {/* Transit Options Grid */}
        <View className="flex-row flex-wrap justify-between">
          {transitOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="w-[48%] p-4 rounded-xl mb-4"
              style={{ backgroundColor: option.color + '10' }}
              onPress={() => router.push(`/transittogether/${option.id}`)}
            >
              <View>
                <View className="flex-row items-center justify-between">
                  <Ionicons 
                    name={option.icon} 
                    size={28} 
                    color={option.color} 
                  />
                  {option.crowdsourced && (
                    <View className="bg-gray-100 rounded-full px-2 py-1">
                      <Ionicons name="people" size={12} color="#666" />
                    </View>
                  )}
                </View>
                <Text className="text-lg font-semibold mt-2">{option.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Community Stats */}
        <View className="flex-row justify-between bg-gray-50 p-4 rounded-xl mt-2 mb-4">
          <View className="items-center">
            <Text className="text-gray-600">Active Users</Text>
            <Text className="text-xl font-bold">2.5K</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-600">Updates Today</Text>
            <Text className="text-xl font-bold">156</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-600">Contributors</Text>
            <Text className="text-xl font-bold">487</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}