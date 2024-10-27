import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";

const EcoLens: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("../assets/images/forest-background.png")}
      className="flex-1"
    >
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <SafeAreaView className="flex-1">
        <Header title="EcoLens" theme="dark" />
        <View className="bg-white rounded-lg p-4 mb-2 mt-4">
          <Text className="text-black font-bold text-lg text-center">
            What is included?
          </Text>
        </View>
        <View className="flex-1 p-5">
          <Image
            source={require("../assets/images/ecolens-feature.png")}
            className="w-full h-[450px] rounded-lg mb-4"
            resizeMode="cover"
          />

          <TouchableOpacity
            className="bg-green-500 rounded-full py-3 px-6 items-center"
            onPress={() => {
              /* Handle AR Experience start */
            }}
          >
            <Text className="text-white font-bold text-lg">
              Start AR Experience
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ height: insets.bottom }} />
    </ImageBackground>
  );
};

export default EcoLens;
