import React, { useRef, useState, useEffect } from "react";
import { Text, View, StatusBar, Animated, Image, StatusBarStyle, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import "nativewind"; // Ensure NativeWind is imported
import { PaperProvider } from "react-native-paper";
import { Stack, Redirect, router } from "expo-router";

export default function SplashScreen() {
  const video = useRef(null);
  const [backgroundOpacity] = useState(new Animated.Value(0)); // Dark background opacity
  const [showLogo, setShowLogo] = useState(false);

  // Fade in the dark background after component mounts
  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: 0.6, // Dark background at 60% opacity
      duration: 4000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1">
        <Video
          ref={video}
          source={require("../assets/video/city paning.mp4")}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          shouldPlay
          isLooping
          resizeMode={ResizeMode.COVER}
        />
        

        <Animated.View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black"
          style={{ opacity: backgroundOpacity }}
        />

        {showLogo && (
          <View className="flex-1 items-center justify-center">
            <Image
              source={require("../assets/images/logo2.png")}
              className="w-80 h-80"
              resizeMode="contain"
            />
            
            <TouchableOpacity 
              className="bg-green px-8 py-3 rounded-full"
              onPress={() => router.push('/login')}
            >
              <Text className="text-white font-semibold text-lg">Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PaperProvider>
  );
}
