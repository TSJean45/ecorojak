import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const ResultDetails = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* Background Image with Header */}
      <View className="h-[20%] relative">
        <Image
          source={require("../../assets/images/scandetails.png")}
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
            source={require("../../assets/images/paper.png")}
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
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="bg-[#E3CA93] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Materials</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              <Text className="text-xs">• Cardboard boxes (various sizes)</Text>
              <Text className="text-xs">• Craft knife or scissors</Text>
              <Text className="text-xs">• Ruler and pencil</Text>
              <Text className="text-xs">• Hot glue gun or strong glue</Text>
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
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="bg-[#FBB271] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Steps</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              <Text style={{ fontWeight: 'bold' }} className="text-xs">1. Design the Castle Layout:</Text>
              <Text className="text-xs">• Plan the design of your castle, including the main structure, towers, and walls.</Text>
              <Text className="text-xs">• Sketch a rough layout on paper, noting the size and shapes for each part.</Text>
              
              <Text style={{ fontWeight: 'bold', marginTop: 10 }} className="text-xs">2. Cut Out the Castle Base:</Text>
              <Text className="text-xs">• Cut a large piece of cardboard for the base of the castle.</Text>
              <Text className="text-xs">• Mark where you want each wall, tower, and entrance to go.</Text>
              
              <Text style={{ fontWeight: 'bold', marginTop: 10 }} className="text-xs">3. Build the Walls:</Text>
              <Text className="text-xs">• Use rectangular cardboard pieces for the castle walls.</Text>
              <Text className="text-xs">• Cut the tops of each wall piece into a zig-zag pattern to mimic battlements (the notched top edges of castle walls).</Text>
              <Text className="text-xs">• Attach the walls to the base using hot glue.</Text>
            </View>
          </View>

          {/* Generate Other Ideas Button */}
          <TouchableOpacity
            className="bg-green py-3 rounded-full mb-6"
            onPress={() => {
              router.push("/wastewizard/trashartify"); 
            }}
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
