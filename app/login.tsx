import React from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  return (
    <LinearGradient colors={["#ACF2EC", "#F8FFFF"]} className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 p-4 justify-center items-center">
        <Image 
          source={require('../assets/images/login.png')} 
          className="w-72 h-72 mb-8"
          resizeMode="contain"
        />

        <View className="w-full mb-8">
          <Text className="text-2xl font-bold text-center">
            Welcome Back!
          </Text>
          <Text className="text-gray-600 text-center">
            Log in to continue
          </Text>
        </View>

        <TouchableOpacity
          className="bg-green p-3 rounded-2xl w-full"
          onPress={() => router.push("/verification")}
        >
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push("/signup")}
          className="mt-4"
        >
          <Text className="text-center font-bold text-black">
            New to ecoRojak? <Text className="text-green">Sign Up</Text> here!
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}