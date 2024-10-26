import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarIcon = (props) => (
  <MaterialIcons {...props} name="calendar-today" size={24} color="#4A4A4A" />
);

const CarIcon = (props) => (
  <MaterialIcons {...props} name="directions-car" size={24} color="#4A4A4A" />
);

export default function FindRide() {
  const [seats, setSeats] = useState(1);
  const insets = useSafeAreaInsets();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <Header title="Find a Ride" showBackButton={true} />

        <Image
          source={require("../assets/images/findride.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.sectionTitle}>Where are you going?</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={24} color="#4A4A4A" style={styles.inputIcon} />
          <TextInput
            value={fromLocation}
            onChangeText={setFromLocation}
            placeholder="From"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={24} color="#4A4A4A" style={styles.inputIcon} />
          <TextInput
            value={toLocation}
            onChangeText={setToLocation}
            placeholder="To"
            style={styles.input}
          />
        </View>

        <Text style={styles.sectionTitle}>When?</Text>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <MaterialIcons name="calendar-today" size={24} color="#4A4A4A" style={styles.inputIcon} />
          <Text style={styles.datePickerText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.sectionTitle}>Seats needed?</Text>

        <View style={styles.seatSelector}>
          <TouchableOpacity
            onPress={() => setSeats(Math.max(1, seats - 1))}
            style={styles.seatButton}
          >
            <MaterialIcons name="remove" size={24} color="#4A4A4A" />
          </TouchableOpacity>
          <Text style={styles.seatCount}>{seats}</Text>
          <TouchableOpacity
            onPress={() => setSeats(seats + 1)}
            style={styles.seatButton}
          >
            <MaterialIcons name="add" size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/rideshare/ridedetails")}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 10,
    fontSize: 16,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  seatSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  seatButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  seatCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
