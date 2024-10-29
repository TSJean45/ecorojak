import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LandmarkFinder: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const imageUrl = "https://i.imgur.com/l9M0tUU.jpeg";

  const pannellumContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>360 View</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
        <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
        <style>
          body, html { margin: 0; height: 100%; width: 100%; }
          #panorama { width: 100%; height: 100vh; }
          .custom-hotspot {
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            border: 2px solid white;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }
          .custom-hotspot::before {
            content: '!';
            font-size: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        </style>
      </head>
      <body>
        <div id="panorama"></div>
        <script>
          const viewer = pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: '${imageUrl}',
            autoLoad: true,
            autoRotate: -2,
            compass: true,
            showZoomCtrl: false,
            showFullscreenCtrl: false,
            draggable: true,
            mouseZoom: true,
            touchPanSpeedCoeffFactor: 1,
            hotSpots: [
              {
                pitch: 0,    // Vertical position
                yaw: -100,      // Horizontal position
                cssClass: 'custom-hotspot',
                createTooltipFunc: hotspot => {
                  hotspot.addEventListener('click', () => {
                    window.ReactNativeWebView.postMessage('OPEN_MODAL');
                  });
                },
                createTooltipArgs: 'Restaurant'
              },
              
              {
                pitch: 0,    // Vertical position
                yaw: -20,      // Horizontal position
                cssClass: 'custom-hotspot',
                createTooltipFunc: hotspot => {
                  hotspot.addEventListener('click', () => {
                    window.ReactNativeWebView.postMessage('OPEN_MODAL');
                  });
                },
                createTooltipArgs: 'Restaurant'
              }
              // Add more hotspots as needed
            ]
          });

          // Optional: Function to help find coordinates
          viewer.on('mousedown', function(event) {
            console.log('Pitch:', viewer.getPitch(), 'Yaw:', viewer.getYaw());
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View className="flex-1">
      {/* WebView as background */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <WebView
          source={{ html: pannellumContent }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
          bounces={false}
          onMessage={(event) => {
            if (event.nativeEvent.data === "OPEN_MODAL") {
              setModalVisible(true);
            }
          }}
          onError={(syntheticEvent) => {
            console.warn("WebView error:", syntheticEvent.nativeEvent);
          }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Content layer */}
      <View
        className="flex-1"
        style={{
          zIndex: 2,
          pointerEvents: "box-none",
        }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <SafeAreaView className="flex-1" style={{ pointerEvents: "box-none" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white rounded-full p-2"
            style={{ elevation: 3 }} // Add shadow for Android
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Main content */}
          <View className="flex-1" style={{ pointerEvents: "box-none" }}>
            <TouchableOpacity
              className="absolute bottom-6 right-6 bg-green-500 rounded-full p-4"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-bold">🌿</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-end mx-2"
          style={{ paddingBottom: insets.bottom + 80 }}
        >
          <View>
            <TouchableOpacity
              className="absolute right-2 top-3 z-10 bg-black/10 rounded-full p-2"
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>

            <Image
              source={require("../../assets/images/modal.png")}
              className="w-full h-72 rounded-lg mb-4"
              resizeMode="cover"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LandmarkFinder;
