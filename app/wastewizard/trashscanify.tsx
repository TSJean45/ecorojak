import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TrashScanify() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View
        className="flex-1 bg-transparent"
        style={{ paddingBottom: insets.bottom + 60 }}
      >
        {/* Back Button */}
        <TouchableOpacity
          className="absolute z-10 left-4 top-4 bg-white rounded-full p-2"
          style={{ marginTop: insets.top }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Can Image (70% height) */}
        <Image
          source={require("@/assets/images/can.png")}
          className="w-full"
          style={{ height: screenHeight * 0.75  }}
          resizeMode="cover"
        />

        {/* Bottom Container */}
        <View className="flex-1 bg-white rounded-t-3xl -mt-8">
          {/* Header - Fixed */}
          <View className="bg-green rounded-t-2xl">
            {/* Draggable Indicator */}
            <View className="w-16 h-1 bg-gray rounded-full mx-auto mt-2" />
            <View className="flex-row justify-between items-center mx-4 p-2">
              <Text className="text-white font-bold">Aluminium Can</Text>
              <Text className="text-white font-bold">Recyclable</Text>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView className="flex-1 mt-4">
            <View className="px-5 space-y-3 pb-4">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="trash-bin" size={24} color="black" />
                <Text>
                  The can should be placed in the yellow recycling bin.
                </Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <Ionicons name="water" size={24} color="black" />
                <Text>If the can has a lid, remove it before recycling.</Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <Ionicons name="resize" size={24} color="black" />
                <Text>
                  If possible, crush the can to save space in the recycling bin,
                  but make sure it’s not too crushed for sorting.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
