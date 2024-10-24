import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import CoinBanner from "./CoinBanner";
import SectionHeader from "./SectionHeader"; 
import { Ionicons } from "@expo/vector-icons";

const backgroundImage = require("../assets/images/mission-background.png");

interface MissionContentProps {
  coinBalance: number;
}

const weekData = [
  { day: 'Mon', date: 19, status: 'inactive' },
  { day: 'Tue', date: 20, status: 'inactive' },
  { day: 'Wed', date: 21, status: 'active' },
  { day: 'Thu', date: 22, status: 'today' },
  { day: 'Fri', date: 23, status: 'inactive' },
  { day: 'Sat', date: 24, status: 'inactive' },
  { day: 'Sun', date: 25, status: 'inactive' },
];

export default function MissionContent({
  coinBalance = 500,
}: MissionContentProps) {
  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
      <ScrollView className="flex-1">
        <CoinBanner
          coinBalance={coinBalance}
          expiringCoins={10}
          expirationDate="2024-12-31"
          hasExtension={true}
        />
        <View className="p-4 bg-white m-4 rounded-2xl -mt-14">
          <View className="flex-row justify-between mb-4">
            {weekData.map(({ day, date, status }) => (
              <View key={day} className="items-center">
                <Text className={`text-sm font-bold ${status === 'today' ? 'text-blue-500' : 'text-gray-700'}`}>
                  {day}
                </Text>
                <Text className={`text-lg ${status === 'today' ? 'text-blue-500' : 'text-gray-700'}`}>
                  {date}
                </Text>
                {status === 'active' && (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                )}
                {status === 'inactive' && (
                  <Ionicons name="close-circle" size={24} color="red" />
                )}
                {status === 'today' && (
                  <Ionicons name="ellipse" size={24} color="blue" />
                )}
              </View>
            ))}
          </View>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-full items-center">
            <Text className="text-white font-bold">Check-in to get 1 coin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}