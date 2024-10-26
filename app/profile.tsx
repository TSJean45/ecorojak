import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";
import { ProgressBar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Chip } from "@rneui/themed";
import CoinSvg from "../assets/images/coin.svg";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8FFFF]">
      <Header
        title="Profile"
        showBackButton={true}
        rightButton={{
          icon: "notifications-outline",
          onPress: () => console.log("Notifications button pressed"),
        }}
      />
      <View className="flex-row items-center mt-4 px-5">
        <View className="relative">
          <View
            className="absolute w-14 h-14 bg-tiffany rounded-full"
            style={{ top: 14, left: 13 }}
          />
          <Image
            source={require("../assets/images/tapir.png")}
            className="w-20 h-20 rounded-full"
          />
        </View>
        <View className="ml-2">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold">Tey Wei Zheng</Text>
            <View className="bg-gray-300 rounded-full px-2 py-1 ml-2">
              <Chip
                title="Beginner"
                type="outline"
                color="warning"
                containerStyle={{ width: 80 }}
                buttonStyle={{
                  borderColor: "#DB9744",
                  borderRadius: 20,
                  borderWidth: 2,
                  paddingVertical: 0,
                }}
                titleStyle={{ color: "#DB9744", fontSize: 12 }}
              />
            </View>
          </View>
          <Text className="text-xs text-gray-600">
            Location: Johor Bahru, Johor
          </Text>
        </View>
      </View>

      <ImageBackground
        source={require("../assets/images/profile-card.png")}
        className="mx-4"
        imageStyle={{ borderRadius: 25 }} // Keep the card rounded even with ImageBackground
      >
        <View className="px-4 py-2">
          <View className="flex-row justify-between">
            <View>
              <Image
                source={require("../assets/images/Logo.png")}
                className="w-32 h-20"
              />
              <View className="flex-row items-center">
                <Text
                  className="text-5xl font-bold mr-2 text-white"
                  style={{
                    textShadowColor: "rgba(11, 20, 24, 0.15)",
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 4,
                  }}
                >
                  500
                </Text>
                <CoinSvg width={30} height={30} />
              </View>
              <Text className="text-xs text-white font-sans">
                <Text className="font-bold">100</Text> ecoCoin(s) expiring on{" "}
                <Text className="font-bold">31-01-2025</Text>
              </Text>
            </View>
            <Image
              source={require("../assets/images/medal.png")}
              className="w-34 h-36 mt-2"
            />
          </View>
          <TouchableOpacity
            className="flex-row  justify-end items-center"
            onPress={() => router.push("/scan")}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm font-bold text-white">
              Scan to Earn Coins
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View className="mt-4 px-4">
        <ProgressBar
          progress={0.5}
          color="#73D1C0"
          style={{
            height: 10, 
            borderRadius: 5,
          }}
        />
        <Text className="text-xs font-sans text-gray-700 mt-2">
          Get <Text className="font-bold">500</Text> more eco coin(s) by{" "}
          <Text className="font-bold">31-01-2025</Text> to unlock{" "}
          <Text className="font-bold">Bronze</Text>
        </Text>
      </View>

      <View className="flex-row justify-between items-center bg-[#E8FFFD] rounded-lg shadow mt-4 mx-4 p-4">
        <Image
          source={require("../assets/images/referral.png")} // Replace with your referral image path
          className="w-16 h-16 mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-green  ">Referral</Text>
          <Text className="text-sm text-gray-700">
            <Text className="text-green">Invite your friends</Text> to join on{" "}
            <Text className="font-bold">ecoRojak</Text> and get{" "}
            <Text className="text-green">1,000 ecoCoins!</Text>
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} className="text-green" />
        </TouchableOpacity>
      </View>

      <View>
        <Text className="text-lg px-4 font-bold text-black mb-3">General</Text>
        <TouchableOpacity className="flex-row justify-between items-center mb-5 px-5">
          <View className="flex-row items-center">
            <Ionicons name="person-circle-outline" size={24} color="gray" />
            <Text className="ml-2 text-sm text-gray-700">
              Account and Security
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center mb-5 px-5">
          <View className="flex-row items-center">
            <Ionicons name="settings-outline" size={24} color="gray" />
            <Text className="ml-2 text-sm text-gray-700">Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="text-lg px-4 font-bold text-black mb-3">Support</Text>
        <TouchableOpacity className="flex-row justify-between items-center mb-5 px-5">
          <View className="flex-row items-center">
            <Ionicons name="help-circle-outline" size={24} color="gray" />
            <Text className="ml-2 text-sm text-gray-700">Help Center</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
