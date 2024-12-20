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
import { HUGGING_FACE_API_KEY } from "@/key";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

const generateInstructions = async (category: string, prompt: string) => {
  try {
    console.log("Generating instructions for:", category, "with prompt:", prompt);
    
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2-large",  // Changed model
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `Create a DIY craft tutorial.

          Material: ${category}
          Project: ${prompt}

          MATERIALS NEEDED:
          1. Clean ${category.toLowerCase()}
          2. Scissors
          3. Strong glue
          4. Paint or markers
          5. Decorative items

          STEP-BY-STEP INSTRUCTIONS:
          1. Clean and prepare your ${category.toLowerCase()}
          2. Cut according to your design
          3. Assemble the main structure
          4. Add decorative elements
          5. Let it dry completely

          END`,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9,
            num_return_sequences: 1,
            stop_sequence: "END"
          }
        }),
      }
    );

    const result = await response.json();
    console.log("Raw response:", result);

    // Parse the response text into materials and steps
    const text = result[0]?.generated_text || '';
    
    // Extract materials between "MATERIALS NEEDED:" and "STEP-BY-STEP"
    const materialsMatch = text.match(/MATERIALS NEEDED:([\s\S]*?)STEP-BY-STEP/);
    const materials = materialsMatch ? 
      materialsMatch[1]
        .trim()
        .split('\n')
        .filter(item => item.trim())
        .map(item => item.replace(/^\d+\.\s*/, '').trim())
      : ['Clean ' + category, 'Scissors', 'Glue'];

    // Extract steps between "STEP-BY-STEP INSTRUCTIONS:" and "END"
    const stepsMatch = text.match(/STEP-BY-STEP INSTRUCTIONS:([\s\S]*?)END/);
    const steps = stepsMatch ?
      stepsMatch[1]
        .trim()
        .split('\n')
        .filter(item => item.trim())
        .map(item => ({
          title: item.replace(/^\d+\.\s*/, '').trim(),
          details: []
        }))
      : [
          { title: 'Clean and prepare materials', details: [] },
          { title: 'Create your design', details: [] },
          { title: 'Assemble your project', details: [] }
        ];

    return { materials, steps };
  } catch (error) {
    console.error('Error generating instructions:', error);
    throw error;
  }
};

const getImageDescription = async (imageUrl: string) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: imageUrl.split(",")[1], // Remove the data:image/jpeg;base64, part
      }
    );

    const result = await response.json();
    return result[0]?.generated_text || "";
  } catch (error) {
    console.error("Error getting image description:", error);
    return "";
  }
};

const ResultDetails = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { category, generatedImage, prompt } = params;
  const [materials, setMaterials] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInstructions = async () => {
      try {
        const { materials: mats, steps: stps } = await generateInstructions(
          category,
          prompt
        );
        setMaterials(mats);
        setSteps(stps);
      } catch (error) {
        console.error("Failed to load instructions:", error);
        // Set some default instructions if generation fails
        setMaterials(["Main material", "Scissors", "Glue"]);
        setSteps([
          { title: "Prepare materials", details: ["Gather all materials"] },
          { title: "Create your design", details: ["Plan your project"] },
          { title: "Assemble", details: ["Put everything together"] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructions();
  }, [category, prompt]);

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
            paddingBottom: insets.bottom + 80,
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
            <View className="bg-[#E3CA93] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Materials</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              {materials.map((material, index) => (
                <Text key={index} className="text-xs">
                  {material}
                </Text>
              ))}
            </View>
          </View>

          {/* Steps Section */}
          <View
            className="mb-2"
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
            <View className="bg-[#FBB271] px-4 py-2 rounded-t-lg">
              <Text className="font-bold text-white">Steps</Text>
            </View>
            <View className="bg-white px-4 py-3 rounded-b-lg">
              {steps.map((step, index) => (
                <View key={index} className="mb-2">
                  <Text style={{ fontWeight: "bold" }} className="text-xs">
                    {step.title}
                  </Text>
                  {step.details.map((detail, detailIndex) => (
                    <Text key={detailIndex} className="text-xs">
                      {detail}
                    </Text>
                  ))}
                </View>
              ))}
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
