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
import { router } from "expo-router";

const EcoLens: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="h-[25%] relative">
        <ImageBackground
          source={require("../assets/images/ecolens-background.png")}
          className="w-full h-full"
        >
          <SafeAreaView>
            <Header title="EcoLens" />
            <View className="items-center justify-center mt-4">
              <View className="bg-white/70 px-6 py-3 mt-10 rounded-full">
                <Text className="text-black font-bold text-lg">
                See the World Through a Greener Lens
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      <View className="flex-1 p-5">
        <Image
          source={require("../assets/images/ecolens-feature.png")}
          className="w-full h-[450px] rounded-lg mb-4"
          resizeMode="cover"
        />

        <TouchableOpacity
          className="bg-green rounded-2xl py-2 items-center"
          onPress={() => {
            router.push("/ecolens/landmarkfinder");
          }}
        >
          <Text className="text-white font-bold text-lg">
            Start AR Experience
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default EcoLens;
