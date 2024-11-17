import React from "react";
import { View, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CityPulse() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#8AD1FF', '#A4DBFF', '#DAEEFB', '#D2FFF7']}
        locations={[0.03, 0.27, 0.46, 0.74]}
        className="absolute w-full h-full"
      />
      <Header
        title="City Pulse"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
        theme="light"
      />
      
      <View 
        style={{ 
          flex: 1,
          paddingBottom: 60,
          paddingHorizontal: 6, // padding 2 in tailwind equals 8px
        }}
      >
        <Image 
          source={require("@/assets/images/citypulse.png")}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}