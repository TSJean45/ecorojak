import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";

export default function GameStart() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/ecoroll-background.png")}
        className="absolute w-full h-full opacity-40"
        resizeMode="cover"
      />
      
      <Header
        title="EcoRoll"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <View className="flex-1 items-center justify-center px-4">
        {/* Game Image */}
        <Image 
          source={require("@/assets/images/ecoroll.png")}
          className="w-72 h-72"
          resizeMode="contain"
        />

        {/* Game Instructions Card */}
        <View className="bg-green backdrop-blur-lg rounded-2xl p-6 mb-8 w-full max-w-sm">
          <Text className="text-white text-center mb-4 font-semibold text-lg">
            How to Play
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text className="text-white ml-2">
                Roll into recyclable items to score
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="close-circle" size={20} color="white" />
              <Text className="text-white ml-2">
                Avoid non-recyclable waste
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="timer-outline" size={20} color="white" />
              <Text className="text-white ml-2">
                Complete before time runs out
              </Text>
            </View>
          </View>
        </View>

        {/* Play Button */}
        <TouchableOpacity
          className="bg-white rounded-full px-12 py-4 shadow-lg"
          onPress={() => router.push("/splinetest")}
        >
          <View className="flex-row items-center">
            <Ionicons name="play" size={24} color="#059669" />
            <Text className="text-green-700 font-bold text-xl ml-2">
              PLAY NOW
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}