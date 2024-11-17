import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function ReportStatus() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const [status, setStatus] = useState('on-time');
  const [delay, setDelay] = useState('');
  const [crowdLevel, setCrowdLevel] = useState('normal');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Submit report to backend
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
        {/* Status Selection */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Current Status</Text>
          <View className="flex-row">
            {['on-time', 'delayed', 'cancelled'].map((option) => (
              <TouchableOpacity
                key={option}
                className={`mr-2 px-4 py-2 rounded-full ${
                  status === option ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                onPress={() => setStatus(option)}
              >
                <Text
                  className={
                    status === option ? 'text-white' : 'text-gray-700'
                  }
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delay Input */}
        {status === 'delayed' && (
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Delay Duration</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="Enter delay in minutes"
              value={delay}
              onChangeText={setDelay}
              keyboardType="number-pad"
            />
          </View>
        )}

        {/* Crowd Level */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Crowd Level</Text>
          <View className="flex-row">
            {['empty', 'normal', 'crowded', 'full'].map((option) => (
              <TouchableOpacity
                key={option}
                className={`mr-2 px-4 py-2 rounded-full ${
                  crowdLevel === option ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                onPress={() => setCrowdLevel(option)}
              >
                <Text
                  className={
                    crowdLevel === option ? 'text-white' : 'text-gray-700'
                  }
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Additional Notes</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Any additional information..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-xl mb-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">
            Submit Report
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}