import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CoinIcon from "@/assets/images/coin.svg";
import Header from "@/components/Header";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function TrashArtify() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  const pickImage = async () => {
    // Request permissions and open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      // Redirect to results page after image selection
      router.push("/wastewizard/scanresults");
    }
  };

  return (
    <View
      className="flex-1 bg-[#F8FFFF]"
      style={{ paddingBottom: insets.bottom + 60 }}
    >
      {/* Background Image Container */}
      <View style={{ height: screenHeight * 0.25 }}>
        <ImageBackground
          source={require("@/assets/images/trashartify.png")}
          className="w-full h-full"
        />
      </View>

      {/* Move Header outside and position it absolutely */}
      <View className="absolute top-0 left-0 right-0">
        <Header title="TrashArtify" showBackButton={true} />
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Art Generator Container */}
        <View className="bg-[#F4F4F4] rounded-2xl p-3">
          <Text className="text-xl font-bold mb-2 text-center">
            Generate Your Own Art Ideas Through Trash!
          </Text>
          <View className="flex-col items-center gap-1">
            <TouchableOpacity className="w-[80%]" onPress={pickImage}>
              <Image
                source={require("@/assets/images/upload-image.png")}
                className="w-full h-24 rounded-lg"
                resizeMode="contain"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </TouchableOpacity>

            <Text className="text-sm text-gray">-or-</Text>

            <TouchableOpacity className="w-[80%]" onPress={pickImage}>
              <Image
                source={require("@/assets/images/turn-on-camera.png")}
                className="w-full h-24 rounded-lg"
                resizeMode="contain"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Challenge Section */}
        <Text className="text-lg font-bold">This Week's Challenge</Text>
        <View className="flex-row justify-between">
          {/* Challenge Card 1 */}
          <View className="w-[48%] p-1">
            <View
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                source={require("@/assets/images/jar.png")}
                className="w-full h-24 rounded-t-2xl mb-1"
                resizeMode="cover"
              />
              <View className="p-1">
                <Text className="font-bold mb-1">
                  Create your art using glassjar!
                </Text>
                <View className="flex-row items-center mb-2">
                  <Text className="text-sm mr-1">Reward 10</Text>
                  <CoinIcon width={16} height={16} />
                </View>
                <TouchableOpacity className="bg-green rounded-lg p-1">
                  <Text className="text-white text-center">Upload My Art</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Challenge Card 2 */}
          <View className="w-[48%] p-1">
            <View
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                source={require("@/assets/images/metal.png")}
                className="w-full h-24 rounded-t-2xl mb-1"
                resizeMode="cover"
              />
              <View className="p-1">
                <Text className="font-bold mb-1">
                  Create your art using Metal!
                </Text>
                <View className="flex-row items-center mb-2">
                  <Text className="text-sm mr-1">Reward 10</Text>
                  <CoinIcon width={16} height={16} />
                </View>
                <TouchableOpacity className="bg-green rounded-lg p-1">
                  <Text className="text-white text-center">Upload My Art</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
