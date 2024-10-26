import React from "react";
import { View, ImageBackground, Image } from "react-native";
import Header from "../components/Header";

export default function Scan() {
  return (
    <ImageBackground
      source={require("../assets/images/scan-background.png")}
      className="flex-1"
    >
      <Header title="Scan" showBackButton={true} />
      <View className="flex-1 justify-center items-center mt-[-60px]">
        <Image
          source={require("../assets/images/scan.png")}
          className="w-4/5 h-full"
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}
