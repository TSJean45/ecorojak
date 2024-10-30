import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import { FontAwesome } from '@expo/vector-icons';

export default function Signup() {
  const [gender, setGender] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const genderData = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const getDisplayDate = () => {
    if (!birthDate) return "Birthday";
    return birthDate.toLocaleDateString();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 pb-8">
        {/* Paw prints */}
        <Image
          source={require("../assets/images/pawleft.png")}
          className="absolute left-0 top-[85px]"
          style={{ width: 80, height: 100 }}
        />
        <Image
          source={require("../assets/images/pawright.png")}
          className="absolute right-0 top-[50px]"
          style={{ width: 80, height: 120 }}
        />

        {/* Header texts */}
        <Text className="text-2xl font-bold text-center mt-20 text-black">
          Let's Get Started
        </Text>
        <Text className="text-center text-black mt-2 mb-8">
          Create an account to ecoRojak
        </Text>

        {/* Form inputs */}
        <View className="space-y-4 mt-10">
          {/* Name inputs */}
          <TextInput
            className="flex-1 border border-gray p-2 rounded-lg"
            placeholder="First Name"
          />
          <TextInput
            className="flex-1 border border-gray p-2 rounded-lg"
            placeholder="Last Name"
          />

          <PhoneInput
            containerStyle={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 8,
              height: 45,
              marginTop: 15,
              padding: 5
            }}
            textContainerStyle={{
              borderRadius: 8,
              backgroundColor: 'transparent',
              paddingVertical: 0,
            }}
            textInputStyle={{
              height: 40,
              padding: 0,
              fontSize: 14,
            }}
            codeTextStyle={{
              height: 20,
              padding: 0,
              fontSize: 16,
            }}
            flagButtonStyle={{
              width: 50,
            }}
            defaultCode="MY"
            layout="first"
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme={false}
            withShadow={false}
            autoFocus={false}
          />

          {/* Email input */}
          <TextInput
            className="border border-gray p-2 rounded-lg"
            placeholder="Email"
            keyboardType="email-address"
          />

          {/* Gender and Birthday */}
          <View className="flex-row space-x-2">
            <View className="flex-1">
              <Dropdown
                data={genderData}
                labelField="label"
                valueField="value"
                placeholder="Gender"
                value={gender}
                onChange={(item) => setGender(item.value)}
                className="border border-gray p-2 rounded-lg"
              />
            </View>

            <TouchableOpacity
              className="flex-1 border border-gray p-2 rounded-lg flex-row items-center justify-between"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className={`${!birthDate ? 'text-gray-500' : 'text-black'}`}>
                {getDisplayDate()}
              </Text>
              <FontAwesome 
                name="calendar" 
                size={16} 
                color="gray"
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={birthDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setBirthDate(selectedDate);
                }
              }}
            />
          )}

          {/* Verify button */}
          <TouchableOpacity
            className="bg-green p-3 rounded-2xl mt-6"
            onPress={() => router.push("/avatar")}
          >
            <Text className="text-white text-center font-bold">Verify</Text>
          </TouchableOpacity>

          {/* Login link */}
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="mt-4"
          >
            <Text className="text-center text-gray-600 font-bold">
              Already have an account?{" "}
              <Text className="text-green">Log in </Text>here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
