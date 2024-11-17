import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CoinIcon from "../assets/images/coin.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const events = [
    {
      id: "1",
      image: require("../assets/images/event1.png"),
      date: "Wed, Apr 28",
      time: "2:00 PM - 4:00 PM",
      title: "Community Recycling Day",
      address: "Kepong Community Center",
    },
    {
      id: "2",
      image: require("../assets/images/event1.png"),
      date: "Mon, Mar 28",
      time: "10:00 AM - 12:00 PM",
      title: "Green Living Workshop",
      address: "Petaling Jaya Library",
    },
    {
      id: "3",
      image: require("../assets/images/event1.png"),
      date: "Sat, Apr 1",
      time: "3:30 PM - 5:30 PM",
      title: "Earth Day Celebration",
      address: "KLCC Park",
    },
    {
      id: "4",
      image: require("../assets/images/event1.png"),
      date: "Wed, Apr 5",
      time: "9:00 AM - 11:00 AM",
      title: "Beach Cleanup Drive",
      address: "Port Dickson Beach",
    },
    {
      id: "5",
      image: require("../assets/images/event1.png"),
      date: "Sat, Apr 8",
      time: "4:00 PM - 6:00 PM",
      title: "Sustainable Living Fair",
      address: "Sunway Pyramid Convention Centre",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F9]">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-2">
          <View>
            <Text className="font-bold text-xl">Hello,</Text>
            <Text className="text-lg font-bold">Tey Wei Zheng!</Text>
          </View>
          <TouchableOpacity
            className="rounded-full p-2 bg-white"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Search Bar Row */}
        <View className="flex-row items-center px-4 gap-2">
          <TouchableOpacity className="bg-white border border-textBorder p-2 rounded-xl">
            <Ionicons name="scan-outline" size={24} color="black" />
          </TouchableOpacity>
          <View className="bg-white flex-1 flex-row items-center border border-textBorder rounded-xl  px-4 py-2">
            <Ionicons name="search-outline" size={20} color="gray" />
            <TextInput
              placeholder="Search"
              className="flex-1 ml-2"
              placeholderTextColor="gray"
            />
          </View>
        </View>

        {/* Stats Cards */}
        <View className="p-3">
          <View className="flex-row gap-2">
            {/* Left column: Stats */}
            <View className="flex-1">
              {/* Top row stats */}
              <View className="flex-row gap-2 mb-2">
                {/* Daily Walk Card */}
                <View className="flex-1 bg-[#FCE0DA] p-3 rounded-xl">
                  <Text className="font-bold text-sm">Daily Walk</Text>
                  <View className="flex-row items-center justify-between mt-1">
                    <View className="bg-white rounded-full p-1.5">
                      <Ionicons
                        name="footsteps-outline"
                        size={20}
                        color="red"
                      />
                    </View>
                    <View className="items-end">
                      <Text className="text-base font-bold leading-none">
                        12,345
                      </Text>
                      <Text className="text-[10px] text-gray">step(s)</Text>
                    </View>
                  </View>
                </View>

                {/* Carbon Emission Card */}
                <View className="flex-1 bg-[#EDEDED] p-3 rounded-xl">
                  <Text className="font-bold text-sm">Daily Carbon</Text>
                  <View className="flex-row items-center justify-between mt-1">
                    <View className="bg-white rounded-full p-1.5">
                      <Ionicons name="cloud-outline" size={20} color="green" />
                    </View>
                    <View className="items-end">
                      <Text className="text-base font-bold leading-none">
                        23
                      </Text>
                      <Text className="text-[10px] text-gray">kg CO2</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Waste Saving Card */}
              <View className="bg-[#DAEDEC] p-3 rounded-xl">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-white rounded-full p-1.5">
                      <Ionicons name="trash-outline" size={20} color="green" />
                    </View>
                    <Text className="font-bold text-sm">
                      Daily Waste Saving
                    </Text>
                  </View>
                  <Text className="text-base font-bold">
                    45 <Text className="text-[10px] text-gray">kg</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Right column: Mascot image */}
            <TouchableOpacity
              className="w-28 overflow-hidden justify-end "
              onPress={() => router.push("/greenie")}
            >
              <Image
                source={require("../assets/images/big-greenie.png")}
                className="w-28 h-[140px]"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 50-50 Cards */}
        <View className="flex-row px-4 gap-2">
          <View className="flex-1 bg-white border border-textBorder py-2 px-4 rounded-xl">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray">Badge</Text>
                <Text className="font-bold text-lg">Beginner</Text>
              </View>
              <Image
                source={require("../assets/images/medal.png")}
                className="w-12 h-12"
              />
            </View>
          </View>
          <View className="flex-1 bg-white border border-textBorder py-2 px-4 rounded-xl">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray">ecoCoin(s)</Text>
                <Text className="font-bold text-lg">500</Text>
              </View>
              <CoinIcon width={30} height={30} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-4 py-4">
          {/* First Row */}
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              onPress={() => router.push("/rideshare")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/rideshare-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">RideShare</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.push("/ecolens")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/ecolens-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">EcoLens</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.push("/wastewizard")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/wastewizard-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">WasteWizard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.push("/carbontraveller")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/carbontraveller-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center leading-none">CarbonTraveller</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push("/greenmart/list")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/greenmart-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">GreenMart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/citypulse")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/citypulse-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">CityPulse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/newfeature2")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/carbontraveller-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">New Feature 2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/newfeature3")}
              className="items-center w-[25%]"
            >
              <Image
                source={require("../assets/images/carbontraveller-home.png")}
                className="w-16 h-16"
              />
              <Text className="text-xs font-bold mt-1 text-center">New Feature 3</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Events Section */}
        <View className="px-3">
          <Text className="text-lg font-bold mb-3">Events</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={events}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="mr-4 bg-white rounded-xl w-60 mb-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5, // This is for Android
                }}
              >
                <Image
                  source={item.image}
                  className="w-full h-32 rounded-t-xl"
                />
                <View className="p-3">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-green text-xs">{item.date}</Text>
                    <Text className="text-green text-xs">{item.time}</Text>
                  </View>
                  <Text className="font-bold text-base mb-1">{item.title}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={14} color="gray" />
                    <Text
                      className="text-gray ml-1 flex-1"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Impact Section */}
        <View className="p-4">
          <Text className="text-lg font-bold">
            Small Steps, Big Impact
          </Text>
          <TouchableOpacity 
            onPress={() => router.push("/impact")}
            className="w-full rounded-xl overflow-hidden"
          >
            <Image
              source={require("../assets/images/quiz-button.png")}
              className="w-full h-40"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
