import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Cross-platform safe area
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightButton?: {
    icon: keyof typeof Ionicons.glyphMap; // This allows any valid Ionicons name
    onPress: () => void;
  };
  theme?: 'light' | 'dark';
};

export default function Header({
  title,
  showBackButton = true,
  rightButton,
  theme = 'light',
}: HeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "left", "right"]} className={`${theme === 'dark' ? 'bg-black' : 'bg-transparent'}`}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="w-10">
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
          )}
        </View>

        <Text className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} flex-1 text-center`}>
          {title}
        </Text>

        <View className="w-10 items-end">
          {rightButton && (
            <TouchableOpacity
              onPress={rightButton.onPress}
              className="rounded-full p-2 bg-white"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
              }}
            >
              <Ionicons name={rightButton.icon} size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
