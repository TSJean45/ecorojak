import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomNavigationBar from '../components/navigation/BottomNavigationBar';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="mission" />
        <Stack.Screen name="location" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="profile" />
      </Stack>
      <BottomNavigationBar />
    </>
  );
}
