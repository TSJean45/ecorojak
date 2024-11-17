import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useRouter } from "expo-router";

// Mock categories
const categories = [
  "All",
  "Kitchen",
  "Bathroom",
  "Living Room",
  "Accessories",
  "Furniture"
];

// Mock data with your actual images
const products = [
  {
    id: '1',
    name: 'Bamboo Straw Set',
    price: 12.99,
    rating: 4.8,
    image: require('@/assets/images/bamboo-straw.png'),
    ecoPoints: 30,
    description: 'Reusable bamboo straws with cleaning brush, perfect alternative to plastic straws'
  },
  {
    id: '2',
    name: 'Eco Tote Bag',
    price: 15.99,
    rating: 4.7,
    image: require('@/assets/images/totebag.png'),
    ecoPoints: 40,
    description: 'Durable cotton tote bag for your daily shopping needs'
  },
  {
    id: '3',
    name: 'Zus Reusable Cup',
    price: 24.99,
    rating: 4.9,
    image: require('@/assets/images/zuscups.png'),
    ecoPoints: 50,
    description: 'Premium reusable coffee cup with leak-proof lid'
  },
  {
    id: '4',
    name: 'Woven Storage Basket',
    price: 29.99,
    rating: 4.6,
    image: require('@/assets/images/woven-basket.png'),
    ecoPoints: 45,
    description: 'Handcrafted woven basket for sustainable storage solutions'
  },
  {
    id: '5',
    name: 'Eco Bamboo Chair',
    price: 89.99,
    rating: 4.5,
    image: require('@/assets/images/chair.png'),
    ecoPoints: 100,
    description: 'Sustainable bamboo chair with ergonomic design'
  },
  {
    id: '6',
    name: 'Modern Bamboo Chair',
    price: 99.99,
    rating: 4.7,
    image: require('@/assets/images/chair2.png'),
    ecoPoints: 120,
    description: 'Contemporary bamboo chair with minimalist design'
  }
];

export default function GreenMartList() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white">
        <Header 
          title="GreenMart"
          rightButton={{
            icon: "cart-outline",
            onPress: () => {/* Navigate to cart */},
          }}
        />
      </View>

      {/* Search Bar */}
      <View className="mx-4 mt-4 mb-3">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search eco-friendly products..."
            className="flex-1 ml-2"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-2"
      >
        <View className="flex-row px-4 space-x-2">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className={`${index === 0 ? 'bg-green' : 'bg-white'} px-4 py-2 rounded-full`}
            >
              <Text className={`${index === 0 ? 'text-white' : 'text-gray-700'}`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="w-[48%] bg-white rounded-lg shadow-sm mb-4"
            onPress={() => router.push("/greenmart/product")}
          >
            <Image 
              source={item.image}
              className="w-full h-32 rounded-t-lg"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-gray-800 font-medium" numberOfLines={2}>
                {item.name}
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-green font-bold">${item.price}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="leaf" size={14} color="#22C55E" />
                  <Text className="text-green text-sm ml-1">+{item.ecoPoints}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16
        }}
        contentContainerStyle={{ 
          padding: 8,
          paddingTop: 16
        }}
      />
    </View>
  );
}