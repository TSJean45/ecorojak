import React, { useRef, useState, useEffect } from "react";
import { View, StatusBar, Animated, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import "nativewind"; // Ensure NativeWind is imported
import { PaperProvider } from "react-native-paper";
import { Stack, Redirect } from "expo-router";

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
      <Redirect href="/leaderboard" />
      {/* <View className="flex-1">
        <StatusBar hidden />
        <Video
          ref={video}
          source={require("../assets/video/city paning.mp4")}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          shouldPlay
          isLooping
          resizeMode={ResizeMode.COVER}
        />

        {showLogo && (
          <View className="absolute inset-0 justify-center items-center">
            <Image
              source={require("../assets/images/Logo.png")}
              className="w-36 h-36 mb-4"
            />
          </View>
        )}

        <Animated.View
          className="absolute top-0 left-0 right-0 bottom-0 bg-black"
          style={{ opacity: backgroundOpacity }}
        />
      </View> */}
    </PaperProvider>
  );
}
