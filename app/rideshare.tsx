import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionHeader from "@/components/SectionHeader";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../key';

export default function RideShare() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");

  // States
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [seats, setSeats] = useState(1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      // Preserve the existing time
      newDateTime.setHours(dateTime.getHours());
      newDateTime.setMinutes(dateTime.getMinutes());
      setDateTime(newDateTime);
      // Show time picker after date is selected
      setShowTimePicker(true);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDateTime = new Date(dateTime);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setDateTime(newDateTime);
    }
  };

  // Add this mock data after your state declarations
  const recentRides = [
    {
      id: "1",
      image: require("../assets/images/profile.png"),
      title: "Ride to Campus",
      fromAddress: "Sunway Geo Residences",
      toAddress: "Sunway University",
      dateTime: "2024-03-20T09:00:00",
    },
    {
      id: "2",
      image: require("../assets/images/profile.png"),
      title: "Going to Mall",
      fromAddress: "Sunway Geo Avenue",
      toAddress: "Sunway Pyramid",
      dateTime: "2024-03-21T14:30:00",
    },
    {
      id: "3",
      image: require("../assets/images/profile.png"),
      title: "Going to Mall",
      fromAddress: "Sunway Geo Avenue",
      toAddress: "Sunway Pyramid",
      dateTime: "2024-03-21T14:30:00",
    },
    {
      id: "4",
      image: require("../assets/images/profile.png"),
      title: "Going to Mall",
      fromAddress: "Sunway Geo Avenue",
      toAddress: "Sunway Pyramid",
      dateTime: "2024-03-21T14:30:00",
    },
    // Add more items as needed
  ];

  const renderRideCard = ({ item }) => (
    <TouchableOpacity
      className="flex-row bg-white mx-5 my-1 p-2 rounded-xl"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
      }}
      onPress={() => router.push("/rideshare/ridedetails")}
    >
      <Image
        source={item.image}
        className="w-12 h-12 rounded-full"
        resizeMode="cover"
      />

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <Text className="text-base font-bold text-black">{item.title}</Text>
          <Text className="text-xs text-gray">
            {new Date(item.dateTime).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <Text className="text-xs text-gray">
          {item.fromAddress} to {item.toAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require("../assets/images/rideshare1.png")}
        style={{ flex: 1, width: width, height: height * 0.3 }}
        resizeMode="cover"
      >
        <View
          className="flex-1 bg-transparent"
          style={{ paddingBottom: insets.bottom + 60 }}
        >
          <Header title="RideShare" showBackButton={true} theme="light" />
          <View className="flex-1">
            <View
              className="bg-white mx-5 mt-32 rounded-2xl p-3 shadow-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // for Android
              }}
            >
              <View className="relative mb-2">
                <GooglePlacesAutocomplete
                  placeholder="From where?"
                  onPress={(data, details = null) => {
                    setFromLocation(data.description);
                  }}
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                  }}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    textInput: {
                      height: 40,
                      marginLeft: 35, // Space for the icon
                      borderBottomWidth: 1,
                      borderBottomColor: '#e2e2e2',
                    },
                    listView: {
                      position: 'absolute',
                      top: 45,
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      zIndex: 1000,
                      elevation: 3,
                    },
                  }}
                  enablePoweredByContainer={false}
                />
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#FF3B30"
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              </View>

              <View className="relative mb-2">
                <GooglePlacesAutocomplete
                  placeholder="Where to?"
                  onPress={(data, details = null) => {
                    setToLocation(data.description);
                  }}
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'en',
                  }}
                  styles={{
                    container: {
                      flex: 0,
                    },
                    textInput: {
                      height: 40,
                      marginLeft: 35, // Space for the icon
                      borderBottomWidth: 1,
                      borderBottomColor: '#e2e2e2',
                    },
                    listView: {
                      position: 'absolute',
                      top: 45,
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      zIndex: 1000,
                      elevation: 3,
                    },
                  }}
                  enablePoweredByContainer={false}
                />
                <MaterialCommunityIcons
                  name="map-marker"
                  size={24}
                  color="#34C759"
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 0,
                    zIndex: 1,
                  }}
                />
              </View>

              <View className="flex-row justify-between mb-2">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="flex-row items-center bg-gray-100 p-3 rounded-xl flex-1 mr-2"
                >
                  <MaterialCommunityIcons
                    name="calendar-clock"  // Changed icon to include clock
                    size={24}
                    color="#666"
                  />
                  <Text className="ml-2">
                    {dateTime.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                </TouchableOpacity>

                <View className="flex-row items-center bg-gray-100 p-3 rounded-xl">
                  <TouchableOpacity
                    onPress={() => setSeats(Math.max(1, seats - 1))}
                  >
                    <MaterialCommunityIcons
                      name="minus"
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                  <View className="flex-row items-center mx-3">
                    <Text className="text-base font-medium">{seats}</Text>
                    <MaterialCommunityIcons
                      name="account"
                      size={24}
                      color="#666"
                      className="ml-1"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setSeats(Math.min(4, seats + 1))}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className="bg-green p-2 rounded-xl items-center mb-3"
                onPress={() => router.push("/rideshare/rideresults")}
              >
                <Text className="text-white font-bold">Find a Ride</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dateTime}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={dateTime} 
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>

            <TouchableOpacity
              className="items-center mt-2"
              onPress={() => router.push("/rideshare/hostride")}
            >
              <Image
                source={require("../assets/images/rideshare-banner.png")}
                className="w-full h-28"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <SectionHeader title="Recent RideShare" />
            <FlatList
              data={recentRides}
              renderItem={renderRideCard}
              keyExtractor={(item) => item.id}
              className="mt-1"
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
