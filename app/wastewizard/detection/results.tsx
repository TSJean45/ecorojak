import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import wasteCategories from "../../../data/wasteCategories.json";

export default function Results() {
  const insets = useSafeAreaInsets();
  const { imageBase64, detectedObjects } = useLocalSearchParams();
  const parsedObjects = detectedObjects ? JSON.parse(detectedObjects) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentObject = parsedObjects[currentIndex];
  
  const goNext = () => {
    if (currentIndex < parsedObjects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  console.log('Detected Objects:', parsedObjects);
  parsedObjects.forEach(obj => {
    console.log('Object Category:', obj.category);
    console.log('Is Recyclable:', obj.isRecyclable);
    console.log('Label:', obj.label);
  });

  return (
    <View className="flex-1 bg-gray-100">
      {/* Back Button - Fixed at top */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 z-50 bg-white p-2 rounded-full shadow-md"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Image Section (30%) */}
      <View className="relative h-[65%]">
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          className="w-full h-full"
          resizeMode="stretch"
        />
        
        {/* Navigation Arrows */}
        {parsedObjects.length > 1 && (
          <>
            {/* Left Arrow */}
            <TouchableOpacity 
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50
                ${currentIndex === 0 ? 'opacity-50' : 'opacity-100'}`}
              onPress={goPrevious}
              disabled={currentIndex === 0}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Right Arrow */}
            <TouchableOpacity 
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50
                ${currentIndex === parsedObjects.length - 1 ? 'opacity-50' : 'opacity-100'}`}
              onPress={goNext}
              disabled={currentIndex === parsedObjects.length - 1}
            >
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>

            {/* Page Indicator */}
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2">
              {parsedObjects.map((_, index) => (
                <View 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`} 
                />
              ))}
            </View>
          </>
        )}
      </View>

      {/* Results Container (70%) */}
      {currentObject && (
        <ScrollView className="flex-1 h-[35%] -mt-10 rounded-t-3xl">
          {/* Green Header with Object and Recyclable Status */}
          <View className={`${currentObject.category === 'NON_RECYCLABLE' ? 'bg-[#FF4444]' : 'bg-green'} px-4 py-2 rounded-t-3xl `}>
            {/* Draggable Line Indicator */}
            <View className="items-center mb-3">
              <View className="w-16 h-1 bg-white rounded-t-full" />
            </View>
            
            {/* Category and Recyclable Status Row */}
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold">
                {currentObject.category === 'NON_RECYCLABLE' 
                  ? `${currentObject.label}`
                  : currentObject.category.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')
                }
              </Text>
              <View className="flex-row items-center">
                <Text className="text-white mr-2">
                  {currentObject.category === 'NON_RECYCLABLE' ? 'Not Recyclable' : 'Recyclable'}
                </Text>
                <Ionicons 
                  name={currentObject.category === 'NON_RECYCLABLE' ? 'close-circle' : 'checkmark-circle'} 
                  size={24} 
                  color="white" 
                />
              </View>
            </View>
          </View>

          {/* Steps and Information */}
          <View className="bg-white p-4">
            {wasteCategories[currentObject.category]?.steps ? (
              wasteCategories[currentObject.category].steps.map((step, stepIndex) => (
                <View key={stepIndex} className="flex-row items-center mb-3">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                    currentObject.category !== 'NON_RECYCLABLE' ? 'bg-[#4CAF50]' : 'bg-[#FF4444]'
                  }`}>
                    <Ionicons name={step.icon} size={20} color="white" />
                  </View>
                  <Text className="flex-1 text-gray-700">
                    {step.description}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-600 italic">
                No disposal information available for this item
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
