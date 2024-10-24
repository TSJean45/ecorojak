import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";
import { Chip, ProgressBar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8FFFF]">
      <Header
        title="Profile"
        showBackButton={true}
        rightButton={{
          icon: "notifications",
          onPress: () => console.log("Notifications button pressed"),
        }}
      />
      <View className="flex-row items-center mt-4 px-4">
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
                mode="outlined"
                style={{
                  borderColor: "#cd7f32",
                }}
                textStyle={{
                  color: "#cd7f32",
                  fontWeight: "bold",
                }}
              >
                Bronze
              </Chip>
            </View>
          </View>
          <Text className="text-xs text-gray-600">
            Location: Johor Bahru, Johor
          </Text>
        </View>
      </View>

      <ImageBackground
        source={require("../assets/images/profile-card.png")}
        className="mx-4 mt-4" // NativeWind margin and rounded corners
        imageStyle={{ borderRadius: 25 }} // Keep the card rounded even with ImageBackground
      >
        <View className="p-4">
          <View className="flex-row justify-between">
            <View>
              <Image
                source={require("../assets/images/Logo.png")}
                className="w-16 h-16"
              />
              <Text>500</Text>
              <Text className="text-sm text-gray-700">
                100 ecoCoin(s) expiring on 31-01-2025
              </Text>
            </View>
            <Image
              source={require("../assets/images/medal.png")}
              className="w-24 h-24"
            />
          </View>
          <TouchableOpacity
            className="flex-row justify-end items-center mt-2"
            onPress={() => router.push("/scan")}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              color="gray"
              style={{ marginRight: 8 }}
            />
            <Text className="text-sm text-gray-700">Scan to Earn Coins</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View className="mt-4 px-4">
        <ProgressBar progress={0.5} color="#73D1C0" />
        <Text className="text-xs font-sans text-gray-700 mt-2">
          Get <Text style={{ fontWeight: "bold" }}>500</Text> more eco coin(s)
          by <Text style={{ fontWeight: "bold" }}>31-01-2025</Text> to unlock{" "}
          <Text style={{ fontWeight: "bold" }}>Bronze</Text>
        </Text>
      </View>

      <View className="flex-row justify-between items-center bg-[#E8FFFD] rounded-lg shadow mt-4 mx-4 p-4">
        <Image
          source={require("../assets/images/referral.png")} // Replace with your referral image path
          className="w-16 h-16 mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">Referral</Text>
          <Text className="text-sm text-gray-700">
            <Text style={{ color: "green" }}>Invite your friends</Text> to join
            on <Text style={{ fontWeight: "bold" }}>ecoRojak</Text> and get{" "}
            <Text style={{ color: "green" }}>1,000 ecoCoins!</Text>
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
