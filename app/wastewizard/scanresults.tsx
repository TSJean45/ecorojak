import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ScanResults() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Full screen background image */}
      <ImageBackground
        source={require("@/assets/images/cardboard-result.png")}
        className="flex-1"
      >
        {/* Back button */}
        <TouchableOpacity
          className="absolute top-12 left-4 bg-white p-2 rounded-full"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Bottom container */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#DAEDEC] rounded-3xl p-2 m-5"
          style={{
            paddingBottom: insets.bottom + 60,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* Category chip */}
          <View className="flex-row mb-1">
            <View className="bg-[#000000] px-4 py-1 rounded-full">
              <Text className="text-white font-medium">Cardboard</Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-xl font-bold mb-1">
            Generated Ideas With Cardboard :
          </Text>

          {/* Preview Image */}
          <ImageBackground
            source={require("@/assets/images/paper.png")}
            className="w-full h-36"
            resizeMode="contain"
          />

          {/* View More Button */}
          <TouchableOpacity
            className="bg-green py-1 rounded-xl mt-1 mx-auto w-1/2"
            onPress={() => router.push("/wastewizard/resultdetails")}
          >
            <Text className="text-white text-center font-bold text-lg">
              View More Details
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
