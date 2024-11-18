import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";

export default function QuizResults() {
  const { score, total } = useLocalSearchParams();
  const percentage = (Number(score) / Number(total)) * 100;

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require("@/assets/images/impact-background.png")}
        className="absolute w-full h-full opacity-40"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center p-4">
        <View className="bg-white/80 rounded-3xl p-6">
          <View className="items-center">
            <View className="bg-green/10 w-24 h-24 rounded-full items-center justify-center mb-4">
              <Ionicons
                name={percentage >= 70 ? "trophy" : "refresh"}
                size={48}
                color="#22C55E"
              />
            </View>

            <Text className="text-2xl font-bold mt-4">
              {percentage >= 70 ? "Congratulations!" : "Keep Learning!"}
            </Text>

            <Text className="text-gray-600 text-center mt-2">
              You scored {score} out of {total} questions correctly
            </Text>

            <View className="bg-gray-100 w-full rounded-xl p-6 mt-8">
              <Text className="text-center text-4xl font-bold text-green">
                {percentage}%
              </Text>
              <Text className="text-center text-gray-600 mt-2">
                {percentage >= 70
                  ? "You're an eco-warrior! Keep up the great work!"
                  : "Don't worry! Practice makes perfect."}
              </Text>
            </View>

            <View className="w-full mt-8 space-y-4">
              <TouchableOpacity
                className="bg-green p-4 rounded-xl"
                onPress={() => router.back()}
              >
                <Text className="text-white text-center font-bold">
                  Try Again
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="border border-green p-4 rounded-xl"
                onPress={() => router.push("/impact")}
              >
                <Text className="text-green text-center font-bold">
                  Back to Levels
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
