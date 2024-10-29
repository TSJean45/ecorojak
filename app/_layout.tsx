import { Stack, usePathname } from "expo-router";
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomNavigationBar from '../components/navigation/BottomNavigationBar';
import ChatFAB from '../components/ChatFAB'; // Ensure the path is correct

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Regular': require('../assets/fonts/Inter_28pt-Regular.ttf'),
        'Inter-Bold': require('../assets/fonts/Inter_28pt-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="mission" />
        <Stack.Screen name="location" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="rideshare" />
        <Stack.Screen name="carbontraveller" />
        <Stack.Screen name="ecolens" />
        <Stack.Screen name="greenie" />
        <Stack.Screen name="rideshare/rideresults" />
        <Stack.Screen name="rideshare/ridedetails" />
        <Stack.Screen name="rideshare/cardetails" />
        <Stack.Screen name="rideshare/hostride" />
        <Stack.Screen name="ecolens/landmarkfinder" />
        <Stack.Screen name="authentication/signup" />
        <Stack.Screen name="authentication/verification" />
        <Stack.Screen name="authentication/avatar" />
        <Stack.Screen name="authentication/login" />
      </Stack>
      {pathname !== '/' && <BottomNavigationBar />}
      {pathname !== '/greenie' && pathname !== '/' && <ChatFAB />}
    </View>
  );
}
