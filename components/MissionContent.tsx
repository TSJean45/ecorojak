import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import CoinBanner from "./CoinBanner";
import SectionHeader from "./SectionHeader";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const backgroundImage = require("../assets/images/mission-background.png");

interface MissionContentProps {
  coinBalance?: number;
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

const missions = [
  {
    id: '1',
    title: 'Mission 1',
    progress: 0.5,
    remaining: 5000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: '2',
    title: 'Mission 2',
    progress: 0.3,
    remaining: 3000,
    image: require("../assets/images/mission1.png")
  },
  {
    id: '3',
    title: 'Mission 3',
    progress: 0.7,
    remaining: 2000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: '4',
    title: 'Mission 4',
    progress: 0.1,
    remaining: 6000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: '5',
    title: 'Mission 5',
    progress: 0.9,
    remaining: 1000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: '6',
    title: 'Mission 6',
    progress: 0.4,
    remaining: 4000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: '7',
    title: 'Mission 7',
    progress: 0.6,
    remaining: 2500,
    image: require("../assets/images/mission1.png"),
  },
];

interface MissionItemProps {
  title: string;
  progress: number;
  remaining: number;
  image: any;
}

const MissionItem = ({ title, progress, remaining, image }: MissionItemProps) => (
  <View className="flex-row items-center px-2 bg-white mx-2 m-1 rounded-lg shadow">
    <Image source={image} style={{ width: 50, height: 50, marginRight: 10 }} />
    <View className="flex-1">
      <View className="flex-row items-center">
        <Ionicons name="flame" size={20} color="orange" />
        <Text className="text-lg font-bold ml-2">{title}</Text>
      </View>
      <Text className="text-sm text-gray-600">Reward: 2 coins</Text>
      <ProgressBar progress={progress} color="blue" style={{ height: 10, borderRadius: 5, marginVertical: 5 }} />
      <Text className="text-xs text-gray-500">{remaining} more to complete the challenges</Text>
    </View>
    <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-full">
      <Text className="text-white font-bold">Go!</Text>
    </TouchableOpacity>
  </View>
);

export default function MissionContent({
  coinBalance = 500,
}: MissionContentProps) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.65)' }} />
      <View className="flex-1">
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
        <SectionHeader title="Daily Missions" />
        <View style={{ paddingBottom: insets.bottom + 60 }}>
          {missions.map((mission) => (
            <MissionItem key={mission.id} {...mission} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}
