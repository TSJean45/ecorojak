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
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../assets/images/scan.png")}
          style={{ width: "80%", height: "100%" }} 
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}
