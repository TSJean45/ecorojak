import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HUGGING_FACE_API_KEY } from "@/key";

const IMAGE_MODELS = [
  "black-forest-labs/FLUX.1-dev",
  "stabilityai/stable-diffusion-xl-base-1.0",
  "runwayml/stable-diffusion-v1-5",
  "prompthero/openjourney-v4",
];

const getCraftPrompt = (category: string) => {
  const baseStyles = [
    "creative DIY craft project, professional photo, Pinterest style",
    "artistic upcycling project, magazine quality photo, Instagram worthy",
    "modern recycled art piece, studio lighting, professional photography",
    "innovative eco-friendly design, artistic composition, high quality"
  ];
  
  const baseStyle = baseStyles[Math.floor(Math.random() * baseStyles.length)];
  
  const prompts = {
    'PLASTIC': [
      `beautiful upcycled art using plastic bottles and containers, ${baseStyle}`,
      `creative plastic bottle sculpture, ${baseStyle}`,
      `modern plastic recycled home decor, ${baseStyle}`,
      `artistic plastic container transformation, ${baseStyle}`
    ],
    'PAPER': [
      `artistic creation using recycled paper and newspapers, ${baseStyle}`,
      `paper quilling wall art design, ${baseStyle}`,
      `3D paper sculpture from recycled materials, ${baseStyle}`,
      `modern paper collage artwork, ${baseStyle}`
    ],
    'CARDBOARD': [
      `creative art project made from recycled cardboard boxes, ${baseStyle}`,
      `sculptural cardboard wall piece, ${baseStyle}`,
      `modern cardboard home decor, ${baseStyle}`,
      `artistic cardboard relief sculpture, ${baseStyle}`
    ],
    'METAL': [
      `artistic creation from recycled metal cans and materials, ${baseStyle}`,
      `metal can wall art design, ${baseStyle}`,
      `sculptural metal recycled piece, ${baseStyle}`,
      `modern metal upcycled decor, ${baseStyle}`
    ],
    'GLASS': [
      `beautiful art piece made from recycled glass bottles, ${baseStyle}`,
      `glass bottle light installation, ${baseStyle}`,
      `modern glass recycled sculpture, ${baseStyle}`,
      `artistic glass bottle garden feature, ${baseStyle}`
    ]
  };

  const categoryPrompts = prompts[category] || [`creative recycled ${category} art project, ${baseStyle}`];
  return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateWithHuggingFace = async (prompt: string, retries = 5) => {
  try {
    const model = IMAGE_MODELS[Math.floor(Math.random() * IMAGE_MODELS.length)];
    console.log("Using model:", model);
    
    console.log("Starting generation with prompt:", prompt);
    
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            height: 512,
            width: 512,
            guidance_scale: 7.5,
            num_inference_steps: 30,
          }
        }),
      }
    );

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      
      if (responseData.error?.includes("loading")) {
        console.log(`Model is loading. Waiting ${responseData.estimated_time || 20} seconds...`);
        
        if (retries > 0) {
          const waitTime = (responseData.estimated_time || 20) * 1000;
          await wait(waitTime + 2000);
          
          console.log(`Retrying... ${retries} attempts left`);
          return generateWithHuggingFace(prompt, retries - 1);
        }
      }
      throw new Error(responseData.error || 'Unknown API error');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    
    const imageUrl = `data:image/jpeg;base64,${base64}`;
    console.log("Successfully generated image URL");
    
    return imageUrl;
  } catch (error) {
    console.error("Hugging Face API error:", error);
    throw error;
  }
};

export default function ScanResults() {
  const insets = useSafeAreaInsets();
  const { imageBase64, detectedObjects } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [artIdeas, setArtIdeas] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [category, setCategory] = useState("");
  const [craftPrompt, setCraftPrompt] = useState("");

  useEffect(() => {
    if (detectedObjects) {
      const parsedObjects = JSON.parse(detectedObjects);
      if (parsedObjects.length > 0) {
        // Get the first detected object's category
        setCategory(parsedObjects[0].category || "UNKNOWN");
      }
    }
    generateArtContent();
  }, []);

  const generateArtContent = async () => {
    try {
      console.log("Starting art generation process...");
      setIsLoading(true);
      
      if (!detectedObjects) {
        throw new Error("No detected objects");
      }
      
      const parsedObjects = JSON.parse(detectedObjects);
      if (parsedObjects.length === 0) {
        throw new Error("No objects in parsed array");
      }

      const category = parsedObjects[0].category;
      console.log("Category detected:", category);
      const prompt = getCraftPrompt(category);
      setCraftPrompt(prompt);
      console.log("Generated prompt:", prompt);

      // Show loading message
      alert("The AI model is warming up. This might take about 20-30 seconds for the first generation.");

      const imageUrl = await generateWithHuggingFace(prompt);
      console.log("Received image URL");
      
      setGeneratedImage(imageUrl);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in art generation:', error);
      alert(`Error generating art: ${error.message}`);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F8FFFF]">
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text className="mt-4 text-gray-600">Generating creative ideas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Dynamic background image from camera */}
      <ImageBackground
        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
        className="flex-1"
        resizeMode="stretch"
      >
        {/* Back button */}
        <TouchableOpacity
          className="absolute top-12 left-4 bg-white p-2 rounded-full"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Bottom container */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-[#DAEDEC] rounded-3xl p-2 m-5"
          style={{
            paddingBottom: insets.bottom + 60,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* Dynamic category chip */}
          <View className="flex-row mb-1">
            <View className="bg-[#000000] px-4 py-1 rounded-full">
              <Text className="text-white font-medium">{category}</Text>
            </View>
          </View>

          {/* Dynamic title */}
          <Text className="text-xl font-bold mb-1">
            Generated Ideas With {category}:
          </Text>

          {/* Preview Image - will be replaced with generated image */}
          {generatedImage ? (
            <Image
              source={{ uri: generatedImage }}
              className="w-full h-36"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-36 bg-gray-200 justify-center items-center">
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text className="mt-2 text-gray-600">Generating art...</Text>
            </View>
          )}

          {/* View More Button */}
          <TouchableOpacity
            className="bg-green py-1 rounded-xl mt-1 mx-auto w-1/2"
            onPress={() => router.push({
              pathname: "/wastewizard/trashartify/resultdetails",
              params: { 
                category: category,
                generatedImage: generatedImage,
                prompt: craftPrompt,
              }
            })}
          >
            <Text className="text-white text-center font-bold text-lg">
              View More Details
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
