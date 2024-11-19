import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const staticMaterials = [
  "Clean cardboard box",
  "Scissors",
  "Craft knife",
  "Ruler or measuring tape",
  "Pencil for marking",
  "Strong glue or hot glue gun",
  "Paint or markers",
  "Decorative items (optional)",
  "Clear varnish (optional)"
];

const staticSteps = [
  {
    title: "Prepare Your Materials",
    details: [
      "Clean your cardboard and remove any tape or labels",
      "Flatten the cardboard if needed",
      "Gather all your tools and materials"
    ]
  },
  {
    title: "Plan Your Design",
    details: [
      "Draw your design on paper first",
      "Mark measurements on the cardboard",
      "Consider the structural integrity of your design"
    ]
  },
  {
    title: "Cut and Shape",
    details: [
      "Carefully cut along your marked lines",
      "Create fold lines where needed",
      "Sand rough edges if necessary"
    ]
  },
  {
    title: "Assembly",
    details: [
      "Join pieces together with glue",
      "Hold pieces in place until glue sets",
      "Add reinforcements where needed"
    ]
  },
  {
    title: "Decorating",
    details: [
      "Paint or color your creation",
      "Add any decorative elements",
      "Apply varnish for protection if desired"
    ]
  }
];

const ResultDetails = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { generatedImage } = params;

  return (
    <View className="flex-1 bg-white">
      {/* Background Image with Header */}
      <View className="h-[20%] relative">
        <Image
          source={require("@/assets/images/scandetails.png")}
          className="absolute w-full h-full"
        />
        <StatusBar barStyle="dark-content" />
        <Header title="TrashArtify" />

        {/* Material Chip */}
        <View className="absolute bottom-4 left-4">
          <View className="bg-black px-4 py-2 rounded-full">
            <Text className="font-bold text-white">Cardboard</Text>
          </View>
        </View>
      </View>

      {/* Content Container */}
      <View className="flex-1 bg-white rounded-t-2xl">
        <ScrollView 
          className="px-4 pt-6"
          contentContainerStyle={{ 
            paddingBottom: insets.bottom + 80 
          }}
        >
          {/* Title and Main Image */}
          <Text className="text-lg font-bold mb-2">
            Generated Ideas With Cardboard:
          </Text>
          <Image
            source={{ uri: generatedImage }}
            className="w-full h-48 rounded-lg mb-2"
            resizeMode="contain"
          />

          {/* Materials Section */}
          <View
            className="mb-2"
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="bg-[#E3CA93] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Materials</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              {staticMaterials.map((material, index) => (
                <Text key={index} className="text-xs mb-1">{material}</Text>
              ))}
            </View>
          </View>

          {/* Steps Section */}
          <View
            className="mb-2"
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="bg-[#FBB271] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Steps</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              {staticSteps.map((step, index) => (
                <View key={index} className="mb-3">
                  <Text className="text-sm font-bold mb-1">{step.title}</Text>
                  {step.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} className="text-xs text-gray-600 ml-3 mb-1">
                      • {detail}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Generate Other Ideas Button */}
          <TouchableOpacity
            className="bg-green py-3 rounded-full mb-6"
            onPress={() => router.push("/wastewizard/trashartify")}
          >
            <Text className="text-white text-center font-bold">
              Generate Other Ideas
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResultDetails;
