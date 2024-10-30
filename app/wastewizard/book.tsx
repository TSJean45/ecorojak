import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Platform, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function Book() {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeOption, setTimeOption] = useState('rightAway');
  const [selectedItems, setSelectedItems] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Sample data for dropdown
  const disposalItems = [
    { label: 'Paper', value: 'paper' },
    { label: 'Plastic', value: 'plastic' },
    { label: 'Can', value: 'can' },
    { label: 'Glass', value: 'glass' },
    { label: 'Metal', value: 'metal' },
    { label: 'Electronics', value: 'electronics' },
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const addItem = (item) => {
    if (!selectedItems.find(i => i.value === item.value)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter(item => item.value !== itemToRemove.value));
  };

  const searchAddress = async (text) => {
    setAddress(text);
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}&limit=5`,
          {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'YourApp/1.0', // OpenStreetMap requires a User-Agent header
            }
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <View 
      className="flex-1 bg-[#F8FFFF]"
      style={{ paddingBottom: insets.bottom + 60}}
    >
      <Header
        title="Place Order"
        showBackButton={true}
      />
      
      {/* Banner Image */}
      <Image
        source={require("../../assets/images/book.png")}
        style={{ width: "80%", height: 195, alignSelf: "center" }}
        resizeMode="cover"
      />

      <ScrollView className="flex-1 px-4">
        {/* Pickup Location */}
        <View className="mt-4">
          <Text className="text-lg font-bold">Pickup at?</Text>
          <View className="relative">
            <View className="absolute left-3 top-3 z-10">
              <Ionicons name="location-outline" size={24} color="gray" />
            </View>
            <TextInput
              className="rounded-lg p-3 bg-textInput pl-12"
              placeholder="Enter your address"
              value={address}
              onChangeText={searchAddress}
            />
            
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <View className="absolute top-full left-0 right-0 bg-textInput border border-gray-300 rounded-lg mt-1 z-50">
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-3 border-b border-gray-200"
                    onPress={() => {
                      setAddress(suggestion.display_name);
                      setShowSuggestions(false);
                    }}
                  >
                    <Text numberOfLines={1}>{suggestion.display_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Date Selection */}
        <View className="mt-4">
          <Text className="text-lg font-bold">When?</Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            className="rounded-lg p-3 bg-textInput flex-row items-center"
          >
            <Ionicons name="calendar-outline" size={24} color="gray" className="mr-2" />
            <Text className="ml-2">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Time Options */}
        <View className="mt-4">
          <Text className="text-lg font-bold">What time?</Text>
          <RadioButton.Group onValueChange={value => setTimeOption(value)} value={timeOption}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <RadioButton value="rightAway" color="#4CAF50" />
                <Text>Right away</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton value="schedule" color="#4CAF50" />
                <Text>Schedule for later</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        {/* Items for Disposal */}
        <View className="mt-4">
          <Text className="text-lg font-bold mb-2">Items for disposal</Text>
          
          {/* Selected Items Chips */}
          <View className="flex-row flex-wrap gap-2 mb-2">
            {selectedItems.map((item) => (
              <View key={item.value} className="bg-green px-3 py-1 rounded-full flex-row items-center">
                <Text className="text-white">{item.label}</Text>
                <TouchableOpacity onPress={() => removeItem(item)} className="ml-2">
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Dropdown */}
          <Dropdown
            data={disposalItems}
            labelField="label"
            valueField="value"
            onChange={item => addItem(item)}
            className="border border-[#EDEDED] rounded-lg p-3 bg-white"
          />
        </View>

        {/* Remarks */}
        <View className="mt-4">
          <Text className="text-lg font-bold">Remarks</Text>
          <TextInput
            className="border border-[#EDEDED] rounded-lg p-3 bg-white"
            multiline
            numberOfLines={1}
            value={remarks}
            onChangeText={setRemarks}
          />
        </View>

        {/* Place Order Button */}
        <TouchableOpacity 
          className="bg-green p-2 rounded-2xl mt-6 mb-4"
          onPress={() => router.push("/wastewizard/pickup")}
        >
          <Text className="text-white text-center font-bold text-lg">Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
