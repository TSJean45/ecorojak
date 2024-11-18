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
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { GOOGLE_VISION_API_KEY } from "@/key";

const WASTE_CATEGORIES = {
  PLASTIC: ['bottle', 'container', 'plastic', 'cup', 'drink'],
  PAPER: ['paper', 'newspaper', 'book', 'magazine'],
  CARDBOARD: ['box', 'cardboard', 'carton'],
  METAL: ['can', 'tin', 'aluminum'],
  GLASS: ['glass', 'jar']
};

export default function TrashArtify() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;

  const detectObjects = async (base64Image) => {
    try {
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;
      
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image
            },
            features: [
              {
                type: "OBJECT_LOCALIZATION",
                maxResults: 5
              }
            ]
          }
        ]
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (data.responses && data.responses[0].localizedObjectAnnotations) {
        const objects = data.responses[0].localizedObjectAnnotations.map(obj => ({
          label: obj.name,
          confidence: obj.score,
          category: getWasteCategory(obj.name),
          vertices: obj.boundingPoly.normalizedVertices,
        }));

        return objects;
      }
      return [];
    } catch (error) {
      console.error('Object detection error:', error);
      return [];
    }
  };

  const getWasteCategory = (name) => {
    const lowerName = name.toLowerCase();
    for (const [category, keywords] of Object.entries(WASTE_CATEGORIES)) {
      if (keywords.some(keyword => lowerName.includes(keyword))) {
        return category;
      }
    }
    return null;
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // Show loading state if needed
        const detectedObjects = await detectObjects(result.assets[0].base64);
        
        if (detectedObjects.length > 0) {
          router.push({
            pathname: "/wastewizard/trashartify/scanresults",
            params: {
              imageBase64: result.assets[0].base64,
              detectedObjects: JSON.stringify(detectedObjects)
            }
          });
        } else {
          alert('No recyclable items detected. Please try another image.');
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      alert('Error selecting image. Please try again.');
    }
  };

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      router.push("/wastewizard/trashartify/camera");
    } else {
      alert('Camera permission is required to use this feature');
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
            <TouchableOpacity 
              className="w-[80%] bg-[#E3F2F1] rounded-xl p-4 mb-2" 
              onPress={pickImage}
            >
              <View className="items-center">
                <Ionicons name="images-outline" size={40} color="#2E7D32" />
                <Text className="text-center mt-2 font-semibold">
                  Choose from Gallery
                </Text>
              </View>
            </TouchableOpacity>

            <Text className="text-sm text-gray">-or-</Text>

            <TouchableOpacity 
              className="w-[80%] bg-[#E3F2F1] rounded-xl p-4 mt-2" 
              onPress={startCamera}
            >
              <View className="items-center">
                <Ionicons name="camera-outline" size={40} color="#2E7D32" />
                <Text className="text-center mt-2 font-semibold">
                  Take a Photo
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Challenge Section */}
        <Text className="text-lg font-bold mt-4">This Week's Challenge</Text>
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
