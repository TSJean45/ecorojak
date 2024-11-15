import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function WasteWizard() {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");

  return (
    <View
      className="flex-1 bg-[#F8FFFF]"
      style={{ paddingBottom: insets.bottom + 60 }}
    >
      <ScrollView className="flex-1">
        {/* Image Background Container */}
        <ImageBackground
          source={require("../assets/images/wastewizard.png")}
          style={{ width: width, height: height * 0.3 }}
          resizeMode="cover"
        >
          <View className="h-full">
            <Header
              title="WasteWizard"
              showBackButton={true}
              rightButton={{
                icon: "time-outline",
                onPress: () => console.log("Right button pressed"),
              }}
            />
          </View>
        </ImageBackground>
        <View className="px-4 mt-2">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg">Total Waste Saving</Text>
            <Text className="text-gray text-sm">21 - 27 Oct, 2024</Text>
          </View>
          <Text className="text-gray mb-1">Average</Text>
          <Text className="font-bold text-2xl py-2">
            30 <Text className="text-sm">kg</Text>
          </Text>
        </View>

        <View className="w-full mx-2 mt-[-32]">
          <Image
            source={require("../assets/images/wastewizard-stat.png")}
            style={{ width: width, height: 190 }}
            resizeMode="cover"
          />
        </View>

        <View className="bg-[#F8F8F8]">
          {/* Container with Description, Image, and Button */}
          <View
            className="bg-white p-4 mx-4 rounded-lg mt-4"
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text className="text-xs mb-1 text-center font-sans">
              Still worrying about how to bring all that waste to the recycling
              center? No worries! Now waste can be picked up for free from home!
            </Text>
            <Image
              source={require("../assets/images/wastewizard-flow.png")}
              style={{ width: "100%", height: 75 }}
              resizeMode="cover"
              className="rounded-lg mb-2"
            />
            <TouchableOpacity
              className="bg-green p-1 mx-10 rounded-2xl"
              onPress={() => router.push("/wastewizard/book")}
            >
              <Text className="text-white text-center font-bold">
                Booking Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Other Magic Section */}
          <View className="px-4">
            <Text className="font-bold text-lg mb-4">Other Magic</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="bg-white rounded-2xl w-[48%] overflow-hidden"
                onPress={() => router.push("/wastewizard/detection")}
              >
                <Image
                  source={require("../assets/images/trashscanify.png")}
                  style={{ width: '100%', height: 120 }}
                  resizeMode="cover"
                />
                <View className="bg-green p-1 rounded-b-2xl">
                  <Text className="font-bold text-lg text-white text-center">TrashScanify</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-white rounded-lg w-[48%] overflow-hidden"
                onPress={() => router.push("/wastewizard/trashartify")}
              >
                <Image
                  source={require("../assets/images/trashartify-home.png")}
                  style={{ width: '100%', height: 120 }}
                  resizeMode="cover"
                />
                <View className="bg-green p-1 rounded-b-2xl">
                  <Text className="font-bold text-lg text-white text-center">TrashArtify</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
