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

const ResultCard = ({ 
  driver, 
  car, 
  seats, 
  departureTime, 
  arrivalTime, 
  from, 
  to 
}) => {
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
          <Text className="font-bold">{driver}</Text>
        </View>
        <View className="items-end">
          <Text className="text-md font-bold">{car}</Text>
          <Text className="text-[10px] text-gray">{seats} seats available</Text>
        </View>
      </View>
      <View className="mt-2 flex-row items-center px-0">
        <View className="flex-1">
          <Text className="text-lg font-bold text-center">{departureTime}</Text>
          <Text className="text-xs text-gray text-center">{from}</Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between">
          <View className="w-3 h-3 bg-green rounded-full" />
          <View className="flex-1 h-0.5 bg-green" />
          <View className="w-3 h-3 bg-green rounded-full" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-center">{arrivalTime}</Text>
          <Text className="text-xs text-gray text-center">{to}</Text>
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
            Kepong Central → Metro Prima
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
            <ResultCard 
              driver="Sarah Lee"
              car="Myvi"
              seats="3"
              departureTime="10:15 AM"
              arrivalTime="10:30 AM"
              from="Kepong Central"
              to="Metro Prima"
            />
            <ResultCard 
              driver="Ahmad Razak"
              car="Axia"
              seats="2"
              departureTime="10:45 AM"
              arrivalTime="11:00 AM"
              from="Kepong Central"
              to="Jinjang"
            />
            <ResultCard 
              driver="Michelle Tan"
              car="Bezza"
              seats="3"
              departureTime="11:30 AM"
              arrivalTime="11:45 AM"
              from="Kepong Central"
              to="Taman Metropolitan"
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
