import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function Pickup() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-[#F8FFFF]"
      style={{ paddingBottom: insets.bottom + 60 }}
    >
      <Header title="Pickup Details" showBackButton={true} />

      <ScrollView className="flex-1">
        <View className="bg-green p-2 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Image
              source={require("../../assets/images/lorry.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <Text className="text-white font-bold ml-3 flex-1">
              Your collector is on the way
            </Text>
          </View>
          <View className="bg-white px-3 py-1 rounded-full">
            <Text className="text-green font-bold">5 mins</Text>
          </View>
        </View>

        {/* Address Input */}
        <View className="mx-4 mt-1">
          <View className="bg-textInput rounded-lg p-3 flex-row items-center">
            <Ionicons name="location-outline" size={24} color="gray" />
            <Text
              className="ml-2 flex-1"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Menara Southpoint, Mid Valley City, Kuala Lumpur
            </Text>
          </View>
        </View>

        {/* Map View */}
        <View className="h-48 mx-4 mt-4 rounded-lg overflow-hidden">
          <MapView
            className="flex-1"
            initialRegion={{
              latitude: 3.118239,
              longitude: 101.676954,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
          >
            <Marker
              coordinate={{ latitude: 3.1155, longitude: 101.6748 }}
              title="Collector"
            >
              <Image
                source={require("../../assets/images/lorry.png")}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
            <Marker
              coordinate={{ latitude: 3.118239, longitude: 101.676954 }}
              title="Pickup Location"
            >
              <View>
                <Image
                  source={require("../../assets/images/tapir-pin.png")}
                  style={{ width: 40, height: 40 }}
                />
              </View>
            </Marker>
            <Polyline
              coordinates={[
                { latitude: 3.1155, longitude: 101.6748 },
                { latitude: 3.1162, longitude: 101.6755 },
                { latitude: 3.1173, longitude: 101.6762 },
                { latitude: 3.118239, longitude: 101.676954 },
              ]}
              strokeColor="#4CAF50"
              strokeWidth={3}
            />
          </MapView>
        </View>

        <View className="h-[1px] bg-gray my-3 mx-4" />

        {/* Driver Info */}
        <View className="mx-4">
          <Text className="text-lg font-bold mb-3">Driver Information</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Image
                source={require("../../assets/images/profile.png")}
                style={{ width: 50, height: 50 }}
                className="rounded-full"
              />
              <View className="ml-3">
                <Text className="font-bold">John Doe</Text>
                <Text className="text-gray-500">License: ABC123</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity className="bg-green p-2 rounded-full">
                <Ionicons name="chatbubble-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-green p-2 rounded-full">
                <Ionicons name="call-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="h-[1px] bg-gray my-3 mx-4" />

        {/* Reminders */}
        <View
          className="mx-4 mb-4 bg-[#FFA796] rounded-2xl"
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
          <Text className="text-white text-md font-bold p-2 ml-5">
            Reminder
          </Text>
          <View className="bg-white p-4 rounded-b-2xl">
            <View className="flex-row items-start mb-2">
              <Ionicons name="warning-outline" size={24} color="red" />
              <Text className="ml-2 flex-1">
                Please ensure all items are properly sorted and packaged
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Ionicons name="warning-outline" size={24} color="red" />
              <Text className="ml-2 flex-1">
                Keep hazardous materials separate and clearly labeled
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="warning-outline" size={24} color="red" />
              <Text className="ml-2 flex-1">
                Have someone available to assist with heavy items if needed
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
