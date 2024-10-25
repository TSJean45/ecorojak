import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Header from "../components/Header";
import { Chip } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // For GPS and bookmark icons

type CategoryKey = "vending" | "recycle" | "car"; // Define the possible category keys

export default function Location() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );
  const [results, setResults] = useState<
    { id: string; name: string; status: string; distance: string; image: any }[]
  >([]);
  const [title, setTitle] = useState<string>("");

  const insets = useSafeAreaInsets();
  const categories = [
    { key: "recycle", label: "Recycle Stations" },
    { key: "vending", label: "Reverse Vending Machine" },
    { key: "car", label: "Carpooling" },
  ];

  const handleCategorySelect = (category: CategoryKey) => {
    setSelectedCategory(category);
    // Simulate fetching results based on category
    if (category === "vending") {
      setTitle("Reverse Vending Machine nearby");
      setResults([
        {
          id: "1",
          name: "Gas Station 1",
          status: "Open",
          distance: "200m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "2",
          name: "Gas Station 2",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "3",
          name: "Gas Station 3",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "4",
          name: "Gas Station 4",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "5",
          name: "Gas Station 5",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "6",
          name: "Gas Station 6",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "7",
          name: "Gas Station 7",
          status: "Closed",
          distance: "500m",
          image: require("../assets/images/recycle1.png"),
        },
      ]);
    } else if (category === "recycle") {
      setTitle("Recycle Stations nearby");
      setResults([
        {
          id: "8",
          name: "Recycle Station 1",
          status: "Open",
          distance: "300m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "9",
          name: "Recycle Station 2",
          status: "Closed",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "10",
          name: "Recycle Station 3",
          status: "Closed",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "11",
          name: "Recycle Station 4",
          status: "Closed",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "12",
          name: "Recycle Station 5",
          status: "Closed",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
        {
          id: "13",
          name: "Recycle Station 6",
          status: "Closed",
          distance: "600m",
          image: require("../assets/images/recycle1.png"),
        },
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Location" showBackButton={true} />
      <View
        className="flex-1 bg-transparent"
        style={{ paddingBottom: insets.bottom + 60 }}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
        <View className="absolute top-0 left-0 right-0 p-4">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View className="flex-row flex-1 items-center bg-white rounded-md p-2 shadow">
              <MaterialIcons
                name="search"
                size={20}
                color="gray"
                style={{ marginRight: 5 }}
              />
              <TextInput placeholder="Search" style={{ flex: 1 }} />
            </View>
            <TouchableOpacity className="ml-2 bg-white p-2.5 rounded-md">
              <MaterialIcons name="gps-fixed" size={24} color="gree" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                {categories.map((category) => (
                  <Chip
                    key={category.key}
                    selected={selectedCategory === category.key}
                    onPress={() => handleCategorySelect(category.key)}
                    style={{ marginRight: 5, backgroundColor: "white" }}
                  >
                    {category.label}
                  </Chip>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          className={`absolute bottom-0 left-0 right-0 rounded-t-3xl ${
            selectedCategory ? "bg-white" : "bg-transparent"
          }`}
          style={{ height: 200, paddingBottom: insets.bottom + 60 }}
        >
          <Text className="text-lg px-3 mt-3 font-bold">{title}</Text>
          <FlatList
            data={results}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row bg-white p-2 m-1 w-60 rounded-lg items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3,
                  elevation: 5,
                }}
              >
                <Image
                  source={item.image}
                  className="w-12 h-12 rounded-xl mr-2"
                />
                <View className="flex-1">
                  <Text className="font-bold">{item.name}</Text>
                  <Text
                    className={
                      item.status === "Open" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {item.status}
                  </Text>
                  <View className="flex-row items-center">
                    <MaterialIcons name="location-on" size={16} color="gray" />
                    <Text className="ml-1">{item.distance} away</Text>
                  </View>
                </View>
                <MaterialIcons name="bookmark-border" size={24} color="gray" />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<></>}
          />
        </View>
      </View>
    </View>
  );
}
