import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CoinBanner from "./CoinBanner";
import SectionHeader from "./SectionHeader";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LeafSVG from "../assets/images/checkin.svg";
import CoinSVG from "../assets/images/coin.svg";

const backgroundImage = require("../assets/images/mission-background.png");

const weekData = [
  { day: "Mon", date: 19, status: "claimed" },
  { day: "Tue", date: 20, status: "claimed" },
  { day: "Wed", date: 21, status: "claimed" },
  { day: "Thu", date: 22, status: "today" },
  { day: "Fri", date: 23, status: "inactive" },
  { day: "Sat", date: 24, status: "inactive" },
  { day: "Sun", date: 25, status: "inactive" },
];

const missions = [
  {
    id: "1",
    title: "Mission 1",
    progress: 0.5,
    remaining: 5000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "2",
    title: "Mission 2",
    progress: 0.3,
    remaining: 3000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "3",
    title: "Mission 3",
    progress: 0.7,
    remaining: 2000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "4",
    title: "Mission 4",
    progress: 0.1,
    remaining: 6000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "5",
    title: "Mission 5",
    progress: 0.9,
    remaining: 1000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "6",
    title: "Mission 6",
    progress: 0.4,
    remaining: 4000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "7",
    title: "Mission 7",
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

const MissionItem = ({
  title,
  progress,
  remaining,
  image,
}: MissionItemProps) => (
  <View className="flex-row items-center px-2 py-2 bg-white mx-4 my-1 rounded-lg shadow">
    <Image source={image} style={{ width: 35, height: 70, marginRight: 10 }} />
    <View className="flex-1">
      <View className="flex-row items-center">
        <Ionicons name="flame" size={20} color="orange" />
        <Text className="text-md font-bold ml-1">{title}</Text>
      </View>
      <View className="flex-row items-center py-1">
        <Text className="text-xs text-black mr-1">Reward 2</Text>
        <CoinSVG width={15} height={15} />
      </View>
      <ProgressBar
        progress={0.5}
        color="#73D1C0"
        style={{
          height: 10,
          borderRadius: 5,
        }}
      />
      <Text className="text-[10px] text-gray-500">
        {remaining} more to complete the challenges
      </Text>
    </View>
    <TouchableOpacity className="bg-green px-4 py-1 rounded-2xl">
      <Text className="text-xs text-white font-bold">Go!</Text>
    </TouchableOpacity>
  </View>
);

export default function MissionContent({
  coinBalance = 500,
}: MissionContentProps) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(255, 255, 255, 0.65)",
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}>
        <CoinBanner
          coinBalance={coinBalance}
          expiringCoins={10}
          expirationDate="2024-12-31"
          hasExtension={true}
        />
        <View className="py-4 px-2 bg-white m-4 rounded-2xl -mt-14">
          <View className="flex-row justify-between">
            {weekData.map(({ day, date, status }) => (
              <View
                key={day}
                className={`px-3 py-2 items-center ${
                  status === "today" ? "bg-green" : "bg-[#F1F1F1]"
                } rounded-2xl`}
              >
                <Text
                  className={`text-xs font-sans ${
                    status === "today" ? "text-white" : "text-black"
                  }`}
                >
                  {day}
                </Text>
                <Text
                  className={`text-lg font-bold ${
                    status === "today" ? "text-white" : "text-black"
                  }`}
                >
                  {date}
                </Text>
                {status === "claimed" && <LeafSVG width={16} height={16} />}
              </View>
            ))}
          </View>
          <View className="flex-row items-center justify-center">
            <Image
              source={require("../assets/images/checkin-left.png")}
              style={{ width: 40, height: 52 }}
            />
            <TouchableOpacity className="bg-green py-1 px-6 mx-2 rounded-full">
              <View className="flex-row items-center">
                <Text className="text-white font-bold mr-2">
                  Check-in to get 1
                </Text>
                <CoinSVG width={20} height={20} />
              </View>
            </TouchableOpacity>
            <Image
              source={require("../assets/images/checkin-right.png")}
              style={{ width: 32, height: 52 }}
            />
          </View>
        </View>
        <SectionHeader title="Daily Missions" />
        {missions.map((mission) => (
          <MissionItem key={mission.id} {...mission} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
