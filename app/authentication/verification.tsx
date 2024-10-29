import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Verification() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-center mt-12">
        Verify Your Email
      </Text>

      <View className="flex-1 justify-center space-y-4">
        <Text className="text-center text-gray-600">
          Enter the verification code sent to your email
        </Text>

        <View className="flex-row justify-center space-x-2">
          {[1, 2, 3, 4].map((index) => (
            <TextInput
              key={index}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center"
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <TouchableOpacity 
          className="bg-green p-4 rounded-full"
          onPress={() => router.push('/authentication/avatar')}
        >
          <Text className="text-white text-center font-semibold">Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-center text-gray-600">
            Didn't receive code? Resend
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
