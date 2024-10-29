import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Signup() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mt-12">
        Create Account
      </Text>

      <View className="flex-1 justify-center space-y-4">
        <TextInput
          className="border border-gray-300 p-4 rounded-lg"
          placeholder="Full Name"
        />

        <TextInput
          className="border border-gray-300 p-4 rounded-lg"
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          className="border border-gray-300 p-4 rounded-lg"
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity 
          className="bg-green p-4 rounded-full"
          onPress={() => router.push('/authentication/verification')}
        >
          <Text className="text-white text-center font-semibold">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/authentication/login')}
        >
          <Text className="text-center text-gray-600">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
