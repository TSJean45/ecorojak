import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function RideDetails() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Ride Details" showBackButton={true} />
      
      <View className="px-4 py-2">
        <Text className="text-lg font-semibold text-gray-600">Friday, October 24, 2024</Text>
      </View>
      
      <View className="flex-1 px-4">
        <View className="flex-row items-start">
          <View className="items-center mr-4">
            <Text className="text-lg font-bold">07:00 AM</Text>
            <View className="w-4 h-4 bg-green-500 rounded-full mt-2" />
            <View className="w-0.5 bg-gray-300 h-24 mt-2" />
            <View className="w-4 h-4 bg-red-500 rounded-full mt-2" />
            <Text className="text-lg font-bold mt-2">09:00 AM</Text>
          </View>
          
          <View className="flex-1">
            <View className="mb-8">
              <Text className="text-lg font-semibold">Melaka Sentral</Text>
              <Text className="text-gray-600">Melaka</Text>
            </View>
            
            <View className="mt-20">
              <Text className="text-lg font-semibold">TBS (Terminal Bersepadu Selatan)</Text>
              <Text className="text-gray-600">Kuala Lumpur</Text>
            </View>
          </View>
        </View>
        
        <View className="h-0.5 bg-gray-300 my-8" />
        
        {/* Add more content below the horizontal line if needed */}
      </View>
    </SafeAreaView>
  );
}
