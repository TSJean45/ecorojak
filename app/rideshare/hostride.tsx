import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Dropdown } from 'react-native-element-dropdown';

export default function HostRide() {
  const insets = useSafeAreaInsets();
  const [seats, setSeats] = useState(1);
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Requirements options formatted for dropdown
  const requirementOptions = [
    { label: 'Female passengers only', value: 'female_only' },
    { label: 'No smoking', value: 'no_smoking' },
    { label: 'No pets', value: 'no_pets' },
    { label: 'No food/drinks', value: 'no_food' },
    { label: 'Luggage space needed', value: 'luggage' },
    { label: 'Quiet ride preferred', value: 'quiet' },
    { label: 'Vaccination required', value: 'vaccination' },
    { label: 'Student only', value: 'student' }
  ];

  const addRequirement = (item) => {
    if (!selectedRequirements.find(r => r.value === item.value)) {
      setSelectedRequirements([...selectedRequirements, item]);
    }
  };

  const removeRequirement = (itemToRemove) => {
    setSelectedRequirements(selectedRequirements.filter(item => 
      item.value !== itemToRemove.value
    ));
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    if (event.type === "set") {
      setSelectedDate(currentDate);
      if (Platform.OS === 'android') {
        setShowTimePicker(true);
      }
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || selectedDate;
    setShowTimePicker(Platform.OS === 'ios');
    if (event.type === "set") {
      setSelectedDate(currentTime);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title="Host a Ride" />

      {/* Content Container */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ 
          paddingBottom: insets.bottom + 80 
        }}
      >
        {/* Image */}
        <View className="items-center justify-center">
          <Image
            source={require("../../assets/images/hostshare.png")}
            className="w-48 h-48 object-contain"
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View className="px-4 pt-6">
          {/* Location Inputs */}
          <Text className="text-lg font-bold mb-2">Where are you going?</Text>
          
          <View className="flex-row items-center border rounded-lg p-3 mb-3">
            <Ionicons name="car-outline" size={24} color="gray" />
            <TextInput 
              placeholder="From"
              className="flex-1 ml-2"
            />
          </View>

          <View className="flex-row items-center border rounded-lg p-3 mb-4">
            <Ionicons name="location-outline" size={24} color="gray" />
            <TextInput 
              placeholder="To"
              className="flex-1 ml-2"
            />
          </View>

          {/* Date and Time */}
          <Text className="text-lg font-bold mb-2">When?</Text>
          <TouchableOpacity 
            className="border rounded-lg p-3 mb-4"
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{selectedDate.toLocaleString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedDate}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onTimeChange}
            />
          )}

          {/* Seats */}
          <Text className="text-lg font-bold mb-2">Seats Available</Text>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity 
              onPress={() => setSeats(Math.max(1, seats - 1))}
              className="bg-gray-200 p-2 rounded-full"
            >
              <Ionicons name="remove" size={24} />
            </TouchableOpacity>
            <Text className="text-xl">{seats}</Text>
            <TouchableOpacity 
              onPress={() => setSeats(Math.min(6, seats + 1))}
              className="bg-gray-200 p-2 rounded-full"
            >
              <Ionicons name="add" size={24} />
            </TouchableOpacity>
          </View>

          {/* Requirements Section */}
          <View className="mt-4">
            <Text className="text-lg font-bold mb-2">Trip Requirements</Text>
            
            {/* Selected Requirements Chips */}
            <View className="flex-row flex-wrap gap-2 mb-2">
              {selectedRequirements.map((item) => (
                <View key={item.value} className="bg-green px-3 py-1 rounded-full flex-row items-center">
                  <Text className="text-white">{item.label}</Text>
                  <TouchableOpacity onPress={() => removeRequirement(item)} className="ml-2">
                    <Ionicons name="close" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Dropdown */}
            <Dropdown
              data={requirementOptions}
              labelField="label"
              valueField="value"
              onChange={item => addRequirement(item)}
              className="border border-[#EDEDED] rounded-lg p-3 mb-5 bg-white"
              placeholder="Select requirements"
            />
          </View>

          {/* Post Button */}
          <TouchableOpacity 
            className="bg-green py-3 rounded-full mb-6"
            onPress={() => {/* handle post */}}
          >
            <Text className="text-white text-center font-semibold">
              Post Ride
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}