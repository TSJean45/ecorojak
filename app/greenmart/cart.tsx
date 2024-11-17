import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Cart() {
  const insets = useSafeAreaInsets();
  // Mock cart data with your actual images
  const cartItems = [
    {
      id: "1",
      name: "Bamboo Straw Set",
      price: 12.99,
      quantity: 2,
      image: require("@/assets/images/bamboo-straw.png"),
      ecoPoints: 30,
    },
    {
      id: "2",
      name: "Eco Tote Bag",
      price: 15.99,
      quantity: 1,
      image: require("@/assets/images/totebag.png"),
      ecoPoints: 40,
    },
    {
      id: "3",
      name: "Zus Reusable Cup",
      price: 24.99,
      quantity: 1,
      image: require("@/assets/images/zuscups.png"),
      ecoPoints: 50,
    },
  ];

  // Add address data
  const address = "Kepong Metropolitan, Kuala Lumpur, Malaysia";

  // Add selection state
  const [selectedItems, setSelectedItems] = React.useState(new Set());
  const [selectAll, setSelectAll] = React.useState(false);

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center mb-4">
      <TouchableOpacity
        onPress={() => {
          /* Toggle item selection */
        }}
        className="mr-2"
      >
        <Ionicons
          name={selectedItems.has(item.id) ? "checkbox" : "square-outline"}
          size={24}
          color="#22C55E"
        />
      </TouchableOpacity>
      <Image source={item.image} className="w-14 h-14 rounded-lg" />
      <View className="flex-1 ml-3">
        <Text className="text-md font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-gray">Color: Black</Text>
        <Text className="text-green font-bold">${item.price}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-gray-200 rounded-full w-6 h-6 items-center justify-center"
          onPress={() => {
            /* Decrease quantity */
          }}
        >
          <Ionicons name="remove" size={16} color="black" />
        </TouchableOpacity>
        <Text className="mx-3">{item.quantity}</Text>
        <TouchableOpacity
          className="bg-gray-200 rounded-full w-6 h-6 items-center justify-center"
          onPress={() => {
            /* Increase quantity */
          }}
        >
          <Ionicons name="add" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalEcoPoints = cartItems.reduce(
    (sum, item) => sum + item.ecoPoints * item.quantity,
    0
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white">
        <Header
          title="Shopping Cart"
          leftButton={{
            icon: "arrow-back",
            onPress: () => {
              /* Navigate back */
            },
          }}
          rightButton={{
            icon: "notifications",
            onPress: () => {
              /* Handle notifications */
            },
          }}
        />
      </View>

      {/* Address Section */}
      <View className="mx-5 ">
        <TouchableOpacity className="flex-row rounded-xl items-center bg-white mt-2 p-4">
          <MaterialIcons name="location-on" size={24} color="red" />
          <Text className="flex-1 ml-2" numberOfLines={1}>
            {address}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Container for Selection Header and Cart Items */}
      <View className="bg-white mt-2 mx-5 rounded-xl mb-24">
        {/* Selection Header */}
        <View className="flex-row justify-between items-center px-5 pt-5 pb-3">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setSelectAll(!selectAll)}
          >
            <Ionicons
              name={selectAll ? "checkbox" : "square-outline"}
              size={24}
              color="#22C55E"
            />
            <Text className="ml-2 font-bold">Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          className="px-5 "
        />
      </View>

      <View 
        className="absolute bottom-0 left-0 right-0 p-4" 
        style={{ paddingBottom: insets.bottom + 80 }}
      >
        <TouchableOpacity
          className="bg-green py-3 rounded-full items-center"
          onPress={() => {
            /* Proceed to checkout */
          }}
        >
          <Text className="text-white font-bold text-lg">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
