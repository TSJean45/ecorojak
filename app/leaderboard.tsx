import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CrownSvg from "../assets/images/crown.svg";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const cityIconMap: { [key: string]: any } = {
  johor: require("../assets/images/johor.png"),
  kl: require("../assets/images/kl.png"),
  penang: require("../assets/images/kl.png"),
  malacca: require("../assets/images/johor.png"),
  ipoh: require("../assets/images/johor.png"),
  kuching: require("../assets/images/johor.png"),
  kotakinabalu: require("../assets/images/johor.png"),
  putrajaya: require("../assets/images/johor.png"),
  petalingjaya: require("../assets/images/johor.png"),
};

type LeaderboardEntry = {
  id: string;
  rank: number;
  name: string;
  score: number;
  cityIcon: string;
  rankChange?: "up" | "down" | "same"; // Add this line
};

const podiumConfig = [
  { place: 2, color: "#ADC6C9", height: "h-20", iconSize: 90 },
  { place: 1, color: "#FDB216", height: "h-24", iconSize: 120 }, 
  { place: 3, color: "#F38F37", height: "h-16", iconSize: 80 }, 
];

const Podium = ({ topThree }: { topThree: LeaderboardEntry[] }) => (
  <View className="flex-row justify-center items-end mt-8">
    {podiumConfig.map((config, index) => (
      <View
        key={config.place}
        className={`items-center ${
          index === 1 ? "" : index === 0 ? "mr-2" : "ml-2"
        }`}
      >
        <View className="items-center">
          {index === 1 && (
            <View className="absolute -top-8 z-10">
              <CrownSvg width={50} height={50} />
            </View>
          )}
          <View
            className="rounded-full p-1"
            style={{ backgroundColor: config.color }}
          >
            <Image
              source={cityIconMap[topThree[index].cityIcon]}
              style={{ width: config.iconSize, height: config.iconSize }}
              className="rounded-full"
            />
          </View>
          <Text className="font-bold mb-1">{topThree[index].name}</Text>
          <Text className="text-sm mb-2">{topThree[index].score} steps.</Text>
          <View
            className={`w-24 ${config.height} items-center justify-start rounded-t-3xl`}
            style={{ backgroundColor: config.color }}
          >
            <Text className="font-bold text-lg text-white mt-2">{topThree[index].rank}</Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);

const LeaderboardItem = ({ item }: { item: LeaderboardEntry }) => (
  <View className="flex-row items-center py-4 px-6">
    <View className="w-6 mr-2">
      {item.rankChange === "up" && (
        <Ionicons name="arrow-up" size={20} color="green" />
      )}
      {item.rankChange === "down" && (
        <Ionicons name="arrow-down" size={20} color="red" />
      )}
      {item.rankChange === "same" && (
        <Ionicons name="remove" size={20} color="gray" />
      )}
    </View>
    <Text className="font-bold text-lg w-8 mr-2">{item.rank}</Text>
    <Image
      source={cityIconMap[item.cityIcon]}
      style={{ width: 40, height: 40 }}
      className="rounded-full mr-3"
    />
    <Text className="flex-1 ml-2 text-md font-bold">{item.name}</Text>
    <Text className="text-md font-regular">{item.score} steps.</Text>
  </View>
);

const TabButton = ({
  title,
  isActive,
  onPress,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center justify-center py-1 ${
      isActive ? "bg-green" : "bg-white"
    }`}
  >
    <Text className={`font-bold ${isActive ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState("Daily");
  const tabs = ["Daily", "Monthly", "All Time"];
  const insets = useSafeAreaInsets();

  const topThree: LeaderboardEntry[] = [
    { id: "2", rank: 2, name: "Penang", score: 8750432, cityIcon: "penang" },
    { id: "1", rank: 1, name: "Kuala Lumpur", score: 9245671, cityIcon: "kl" },
    { id: "3", rank: 3, name: "Johor Bahru", score: 8124563, cityIcon: "johor" },
  ];

  const remainingSeven: LeaderboardEntry[] = [
    {
      id: "4",
      rank: 4,
      name: "Malacca",
      score: 7856234,
      cityIcon: "malacca",
      rankChange: "up",
    },
    {
      id: "5",
      rank: 5,
      name: "Ipoh",
      score: 7234891,
      cityIcon: "ipoh",
      rankChange: "down",
    },
    {
      id: "6",
      rank: 6,
      name: "Kuching",
      score: 6987452,
      cityIcon: "kuching",
      rankChange: "same",
    },
    {
      id: "7",
      rank: 7,
      name: "Kota Kinabalu",
      score: 6543217,
      cityIcon: "kotakinabalu",
      rankChange: "up",
    },
    {
      id: "8",
      rank: 8,
      name: "Putrajaya",
      score: 6123456,
      cityIcon: "putrajaya",
      rankChange: "down",
    },
    {
      id: "9",
      rank: 9,
      name: "Petaling Jaya",
      score: 5876543,
      cityIcon: "petalingjaya",
      rankChange: "same",
    },
    {
      id: "10",
      rank: 10,
      name: "Petaling Jaya",
      score: 5234567,
      cityIcon: "petalingjaya",
      rankChange: "up",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
    />
      <ImageBackground
        source={require("../assets/images/leaderboard-background.png")}
        style={{ flex: 1, width: width, height: height * 0.7  }}
        imageStyle={{
          opacity: 0.4,
          resizeMode: "cover",
          position: "absolute",
          right: 0,
        }}  
      >
        <View
          className="flex-1 bg-transparent"
          style={{ paddingBottom: insets.bottom + 60 }}
        >
          <Header title="Leaderboard" />

          <View className="flex-row mx-4 mt-4 bg-gray-300 rounded-full overflow-hidden">
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                title={tab}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </View>

          <Podium topThree={topThree} />

          <View className="bg-white rounded-t-3xl flex-1">
            <FlatList
              data={remainingSeven}
              renderItem={({ item }) => <LeaderboardItem item={item} />}
              keyExtractor={(item) => item.id}
              className=""
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
