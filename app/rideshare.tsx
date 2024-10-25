import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // For icons
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function RideShare() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="RideShare" />
      <ImageBackground
        source={require("../assets/images/rideshare-background.png")}
        style={{ flex: 1, width: width, height: height }}
        imageStyle={{
          opacity: 0.4,
          resizeMode: "cover",
          position: "absolute",
          right: 0,
        }}
      >
        <View
          className="absolute top-0 left-0 right-0 p-4 flex-row items-center justify-start bg-white"
          style={{ paddingTop: insets.top }}
        >
          <Image
            source={require("../assets/images/tapir.png")} // Replace with your profile icon path
            className="w-10 h-10 rounded-full mr-2"
          />
          <Text className="text-lg font-bold mr-2">Hi, Tey Wei Zheng</Text>
          <MaterialIcons name="verified" size={24} color="blue" />
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="items-center w-full px-4">
            <Image
              source={require("../assets/images/rideshare1.png")} // Replace with your image path
              className="w-84 h-64" // Adjust size as needed
              resizeMode="contain"
            />
            <Text className="text-xl font-bold text-green-600 mb-4">
              Share the ride, green tomorrow!
            </Text>
            <View className="mb-2 w-full">
              <TouchableOpacity
                className="w-full py-3 border-2 border-green bg-white rounded-2xl"
                onPress={() => router.push("/rideshare/findride")}
              >
                <Text className="text-center text-green font-bold">
                  Find a Ride
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full">
              <TouchableOpacity
                className="w-full py-3 border-2 border-green bg-white rounded-2xl"
                onPress={() => router.push("/rideshare/hostride")}
              >
                <Text className="text-center text-green font-bold">
                  Host a Ride
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
