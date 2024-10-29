import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Avatar() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mt-12">
        Choose Your Avatar
      </Text>
      
      {/* Avatar selection content will go here */}
      <View className="flex-1 justify-center items-center">
        <Text>Avatar Selection Coming Soon</Text>
      </View>

      <TouchableOpacity 
        className="bg-green p-4 rounded-full mt-4"
        onPress={() => router.push('/greenie')}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
