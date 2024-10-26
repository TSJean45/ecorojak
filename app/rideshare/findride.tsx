import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // For icons
import Header from "@/components/Header";
import * as eva from "@eva-design/eva";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ApplicationProvider,
  Datepicker,
  Input,
  Icon,
  IconElement,
  Layout,
} from "@ui-kitten/components";
import { useRouter } from "expo-router";

const CalendarIcon = () => (
  <MaterialIcons name="calendar-today" size={24} color="black" />
);

const renderCarIcon = () => (
  <MaterialIcons name="directions-car" size={24} color="black" />
);

export default function FindRide() {
  const [seats, setSeats] = useState(1);
  const insets = useSafeAreaInsets();
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [isFocused1, setIsFocused1] = React.useState(false);
  const [isFocused2, setIsFocused2] = React.useState(false);
  const [isFocused3, setIsFocused3] = React.useState(false);
  const router = useRouter();

  const increaseSeats = () => setSeats(seats + 1);
  const decreaseSeats = () => setSeats(seats > 1 ? seats - 1 : 1);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View className="flex-1 px-4 bg-white">
        <View
          className="flex-1 bg-transparent"
          style={{ paddingBottom: insets.bottom + 60 }}
        >
          <Header title="Find a Ride" showBackButton={true} />

          <Image
            source={require("../../assets/images/findride.png")}
            className="w-full h-52 mb-4"
            resizeMode="contain"
          />

          <Text className="text-lg font-bold mb-1">Where are you going?</Text>

          <Input
            value={text1}
            onChangeText={(text) => setText1(text)}
            placeholder="From"
            accessoryLeft={renderCarIcon}
            style={{
              marginBottom: 16,
              borderColor: isFocused1 ? "black" : "gray",
              borderWidth: 1,
            }}
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
          />

          <Input
            value={text2}
            onChangeText={(text) => setText2(text)}
            placeholder="To"
            accessoryLeft={renderCarIcon}
            style={{
              marginBottom: 16,
              borderColor: isFocused2 ? "black" : "gray",
              borderWidth: 1,
            }}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
          />

          {/* Subheader: When? */}
          <Text className="text-lg font-bold mb-1">When?</Text>

          {/* Input: Calendar Date and Day */}
          <Datepicker
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryLeft={CalendarIcon}
            style={{
              marginBottom: 16,
              borderColor: isFocused2 ? "black" : "gray",
            }}
            onFocus={() => setIsFocused3(true)}
            onBlur={() => setIsFocused3(false)}
          />

          {/* Subheader: Seat needed? */}
          <Text className="text-lg font-bold mb-1">Seat needed?</Text>

          {/* Seat Selector */}
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={decreaseSeats}
              className="p-2 border border-gray-300 rounded-md"
            >
              <MaterialIcons name="remove" size={24} color="black" />
            </TouchableOpacity>
            <Text className="mx-4 text-lg">{seats}</Text>
            <TouchableOpacity
              onPress={increaseSeats}
              className="p-2 border border-gray-300 rounded-md"
            >
              <MaterialIcons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity
            onPress={() => router.push("/rideshare/ridedetails")}
            className="w-full py-3 bg-green rounded-md"
          >
            <Text className="text-center text-white font-bold">Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ApplicationProvider>
  );
}
