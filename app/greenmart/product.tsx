import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const colorImages = [
    require('@/assets/images/zus1.png'),
    require('@/assets/images/zus2.png'),
    require('@/assets/images/zus3.png'),
    require('@/assets/images/zus4.png'),
  ];

  return (
    <View className="flex-1 bg-white">
      <Header 
        title="Product Details"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
        rightButton={{
          icon: "cart-outline",
          onPress: () => router.push("/greenmart/cart"),
        }}
      />
      <ScrollView>
        <Image 
          source={colorImages[selectedColor]}
          className="w-full h-72"
          resizeMode="contain"
        />
        
        <View className="p-4">
          {/* Name and Sold Count */}
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-800">Zus Reusable Cup</Text>
            <Text className="text-gray-500">2.5k sold</Text>
          </View>

          {/* Price and Eco Points */}
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-green text-xl font-bold">$24.99</Text>
            <View className="flex-row items-center">
              <Ionicons name="leaf" size={20} color="#22C55E" />
              <Text className="text-green ml-1">+50 points</Text>
            </View>
          </View>

          {/* Review Summary */}
          <View className="flex-row items-center mt-2">
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons 
                  key={star}
                  name="star" 
                  size={16} 
                  color="#FFB800"
                />
              ))}
            </View>
            <Text className="ml-2 text-gray-600">4.8 (2,439 reviews)</Text>
          </View>

          {/* Color Selection */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-3">Colors</Text>
            <View className="flex-row space-x-3">
              {colorImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(index)}
                  className={`w-16 h-16 rounded-lg border-2 ${
                    selectedColor === index ? 'border-green' : 'border-gray-200'
                  }`}
                >
                  <Image 
                    source={image}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View className="flex-row items-center justify-between mt-6">
            <Text className="text-lg font-semibold">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center"
                onPress={() => quantity > 1 && setQuantity(q => q - 1)}
              >
                <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text className="mx-4 text-lg">{quantity}</Text>
              <TouchableOpacity 
                className="bg-gray-100 rounded-full w-8 h-8 items-center justify-center"
                onPress={() => setQuantity(q => q + 1)}
              >
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-2">Description</Text>
            <Text className="text-gray-600 leading-5">
              Premium reusable coffee cup with leak-proof lid. Made from sustainable materials, 
              this cup helps reduce single-use plastic waste. Perfect for your daily coffee routine 
              while contributing to environmental conservation.
            </Text>
          </View>

          {/* Reviews Section */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-2">Reviews</Text>
            {/* Sample Review */}
            <View className="bg-gray-50 p-3 rounded-lg mb-2">
              <View className="flex-row items-center">
                <Text className="font-medium">John D.</Text>
                <View className="flex-row ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star}
                      name="star" 
                      size={12} 
                      color="#FFB800"
                    />
                  ))}
                </View>
              </View>
              <Text className="text-gray-600 mt-1">
                Great quality cup! Keeps my coffee hot for hours and no leaks.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Add to Cart Button */}
      <View className="p-4 border-t border-gray-200" 
        style={{ paddingBottom: insets.bottom + 80 }}
      >
        <TouchableOpacity 
          className="bg-green py-2 rounded-full items-center"
          onPress={() => {/* Add to cart */}}
        >
          <Text className="text-white font-bold text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}