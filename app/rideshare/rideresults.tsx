import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ResultCard = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/rideshare/ridedetails");
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-lg p-4 mb-4 shadow-md"
      onPress={handlePress}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gray-300 rounded-full mr-2 justify-center items-center">
            <MaterialIcons name="account-circle" size={36} color="#4A5568" />
          </View>
          <Text className="font-semibold">John Doe</Text>
        </View>
        <View className="items-end">
          <Text className="text-md font-semibold">Perodua Viva</Text>
          <Text className="text-[10px] text-gray">3 seats available</Text>
        </View>
      </View>
      <View className="mt-2 flex-row items-center px-0">
        <View className="flex-1">
          <Text className="text-lg font-bold text-center">8:00 AM</Text>
          <Text className="text-xs text-gray text-center">Melaka Sentral</Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between">
          <View className="w-3 h-3 bg-green rounded-full" />
          <View className="flex-1 h-0.5 bg-green" />
          <View className="w-3 h-3 bg-green rounded-full" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-center">2:00 PM</Text>
          <Text className="text-xs text-gray text-center">TBS</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function RideResults() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="w-10">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-xs font-bold">
            Melaka Sentral → TBS (Terminal Bersepadu Selatan)
          </Text>
          <Text className="text-sm text-green">Today, 1 Passenger</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../../assets/images/result.png")}
        style={{ flex: 1 }}
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
          <ScrollView className="flex-1 px-4 pt-4">
            <ResultCard />
            <ResultCard />
            <ResultCard />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
