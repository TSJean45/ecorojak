import React, { useState, useCallback, useMemo, Suspense } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "@/components/Header";
import * as eva from "@eva-design/eva";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ApplicationProvider } from "@ui-kitten/components"; // Only import ApplicationProvider
import { useRouter } from "expo-router";

// Lazy load heavy components from UI Kitten
const Input = React.lazy(() => import("@ui-kitten/components").then((m) => ({ default: m.Input })));
const Datepicker = React.lazy(() => import("@ui-kitten/components").then((m) => ({ default: m.Datepicker })));

const CalendarIcon = React.memo(() => (
  <MaterialIcons name="calendar-today" size={24} color="black" />
));

const CarIcon = React.memo(() => (
  <MaterialIcons name="directions-car" size={24} color="black" />
));

export default function FindRide() {
  const [seats, setSeats] = useState(1);
  const insets = useSafeAreaInsets();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const increaseSeats = useCallback(() => setSeats((prev) => prev + 1), []);
  const decreaseSeats = useCallback(() => setSeats((prev) => (prev > 1 ? prev - 1 : 1)), []);

  const inputStyle = useMemo(
    () => ({
      marginBottom: 16,
      borderColor: "gray",
      borderWidth: 1,
    }),
    []
  );

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

          <Suspense fallback={<Text>Loading Input...</Text>}>
            <Input
              value={text1}
              onChangeText={setText1}
              placeholder="From"
              accessoryLeft={CarIcon}
              style={inputStyle}
            />
          </Suspense>

          <Suspense fallback={<Text>Loading Input...</Text>}>
            <Input
              value={text2}
              onChangeText={setText2}
              placeholder="To"
              accessoryLeft={CarIcon}
              style={inputStyle}
            />
          </Suspense>

          <Text className="text-lg font-bold mb-1">When?</Text>

          <Suspense fallback={<Text>Loading Datepicker...</Text>}>
            <Datepicker
              placeholder="Pick Date"
              date={date}
              onSelect={setDate}
              accessoryLeft={CalendarIcon}
              style={inputStyle}
            />
          </Suspense>

          <Text className="text-lg font-bold mb-1">Seat needed?</Text>

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

          <TouchableOpacity
            onPress={() => router.push("/rideshare/rideresults")}
            className="w-full py-3 bg-green rounded-md"
          >
            <Text className="text-center text-white font-bold">Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ApplicationProvider>
  );
}
