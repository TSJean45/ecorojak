import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Stack, router } from 'expo-router';
import Header from "@/components/Header";
import { GOOGLE_VISION_API_KEY } from "@/key";
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockScans from '@/data/recentScans.json';

const ALLOWED_OBJECTS = {
  PLASTIC: ['Plastic bottle', 'Plastic container', 'Bottle', 'Container', 'Plastic'],
  PAPER: ['Paper', 'Newspaper', 'Magazine', 'Document', 'Book'],
  CARDBOARD: ['Cardboard', 'Box', 'Cardboard box', 'Package'],
  METAL: ['Can', 'Aluminum can', 'Metal container', 'Tin can', 'Metal'],
  GLASS: ['Glass bottle', 'Glass jar', 'Glass container', 'Glass']
};

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  return 'Just now';
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function Detection() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

  // Load recent scans on component mount
  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    try {
      const savedScans = await AsyncStorage.getItem('recentScans');
      if (savedScans) {
        setRecentScans(JSON.parse(savedScans));
      } else {
        // Use mock data for first time
        setRecentScans(mockScans.scans);
        await AsyncStorage.setItem('recentScans', JSON.stringify(mockScans.scans));
      }
    } catch (error) {
      console.error('Error loading recent scans:', error);
    }
  };

  const saveNewScan = async (imageBase64, detectedObjects) => {
    try {
      const newScan = {
        id: Date.now().toString(),
        imageUri: `data:image/jpeg;base64,${imageBase64}`,
        timestamp: new Date().toISOString(),
        items: JSON.parse(detectedObjects)
      };

      const updatedScans = [newScan, ...recentScans].slice(0, 5); // Keep only last 5 scans
      setRecentScans(updatedScans);
      await AsyncStorage.setItem('recentScans', JSON.stringify(updatedScans));
    } catch (error) {
      console.error('Error saving scan:', error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: false,
        quality: 0.5,
        exif: false,
      });

      if (!result.canceled) {
        setIsProcessing(true);
        
        try {
          const response = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                requests: [{
                  image: { content: result.assets[0].base64 },
                  features: [
                    { 
                      type: 'OBJECT_LOCALIZATION',
                      maxResults: 5
                    },
                    {
                      type: 'LABEL_DETECTION',
                      maxResults: 5
                    }
                  ]
                }]
              })
            }
          );

          const data = await response.json();
          console.log("API Response:", JSON.stringify(data, null, 2));

          if (data.responses && data.responses[0]?.localizedObjectAnnotations) {
            const objects = data.responses[0].localizedObjectAnnotations;
            const labels = data.responses[0]?.labelAnnotations || [];

            const filteredObjects = objects
              .map(obj => {
                let matchedCategory = 'NON_RECYCLABLE';
                let isRecyclable = false;

                for (const [category, keywords] of Object.entries(ALLOWED_OBJECTS)) {
                  if (keywords.some(keyword => 
                    obj.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    labels.some(label => 
                      label.description.toLowerCase().includes(keyword.toLowerCase())
                    )
                  )) {
                    matchedCategory = category;
                    isRecyclable = true;
                    break;
                  }
                }

                return {
                  label: obj.name,
                  confidence: obj.score,
                  category: matchedCategory,
                  isRecyclable: isRecyclable,
                  bounds: {
                    x: obj.boundingPoly.normalizedVertices[0].x * 100,
                    y: obj.boundingPoly.normalizedVertices[0].y * 100,
                    width: (obj.boundingPoly.normalizedVertices[2].x - obj.boundingPoly.normalizedVertices[0].x) * 100,
                    height: (obj.boundingPoly.normalizedVertices[2].y - obj.boundingPoly.normalizedVertices[0].y) * 100
                  }
                };
              })
              .filter(obj => obj.confidence > 0.3);

            const topResults = filteredObjects
              .sort((a, b) => b.confidence - a.confidence)
              .slice(0, 3);

            await saveNewScan(result.assets[0].base64, JSON.stringify(topResults));
            router.push({
              pathname: "/wastewizard/detection/results",
              params: { 
                imageBase64: result.assets[0].base64,
                detectedObjects: JSON.stringify(topResults)
              },
            });
          }
        } catch (error) {
          console.log("Detection error:", error);
          alert("Error detecting objects. Please try again.");
        }
      }
    } catch (error) {
      console.log("Image picker error:", error);
      alert("Error selecting image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      router.push("/wastewizard/detection/camera");
    } else {
      alert('Camera permission is required to use this feature');
    }
  };

  return (
    <View
      className="flex-1 bg-[#F8FFFF]"
      style={{ paddingBottom: insets.bottom + 60 }}
    >
      {/* Background Image Container */}
      <View style={{ height: screenHeight * 0.25 }}>
        <ImageBackground
          source={require("@/assets/images/trashscanify.png")}
          className="w-full h-full"
        />
      </View>

      {/* Header */}
      <View className="absolute top-0 left-0 right-0">
        <Header title="TrashScanify" showBackButton={true} />
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Scanner Container */}
        <View className="bg-[#F4F4F4] rounded-2xl p-3">
          <Text className="text-xl font-bold mb-2 text-center">
            Scan Your Trash and Learn How to Recycle!
          </Text>
          <View className="flex-col items-center gap-1">
            <TouchableOpacity 
              className="w-[80%]" 
              onPress={pickImage}
              disabled={isProcessing}
            >
              <Image
                source={require("@/assets/images/upload-image.png")}
                className="w-full h-24 rounded-lg"
                resizeMode="contain"
                style={{ backgroundColor: "#F4F4F4" }}
              />
              {isProcessing && (
                <Text className="text-center text-gray-500 mt-2">
                  Processing image...
                </Text>
              )}
            </TouchableOpacity>

            <Text className="text-sm text-gray">-or-</Text>

            <TouchableOpacity className="w-[80%]" onPress={startCamera}>
              <Image
                source={require("@/assets/images/turn-on-camera.png")}
                className="w-full h-24 rounded-lg"
                resizeMode="contain"
                style={{ backgroundColor: "#F4F4F4" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Scans Section */}
        <View className="mt-4 mb-6">
          <Text className="text-lg font-bold mb-2">Recent Scans</Text>
          {recentScans.length > 0 ? (
            <View className="space-y-3">
              {recentScans.map((scan) => (
                <TouchableOpacity
                  key={scan.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                  onPress={() => router.push({
                    pathname: "/wastewizard/detection/results",
                    params: {
                      imageBase64: scan.imageUri.split(',')[1],
                      detectedObjects: JSON.stringify(scan.items)
                    }
                  })}
                >
                  <View className="flex-row h-24">
                    {/* Scan Image */}
                    <Image
                      source={{ uri: scan.imageUri }}
                      className="w-24 h-full"
                      resizeMode="cover"
                    />
                    
                    {/* Scan Details */}
                    <View className="flex-1 p-3">
                      <View className="flex-row justify-between items-start">
                        <Text className="text-sm text-gray-500">
                          {formatTimeAgo(scan.timestamp)}
                        </Text>
                        <Text className="text-xs text-gray-400">
                          {formatDate(scan.timestamp)}
                        </Text>
                      </View>
                      
                      {/* Items Found */}
                      <View className="flex-row flex-wrap mt-1">
                        {scan.items.map((item, index) => (
                          <View
                            key={index}
                            className={`rounded-full px-2 py-1 mr-1 mb-1 ${
                              item.isRecyclable ? 'bg-green-100' : 'bg-red-100'
                            }`}
                          >
                            <Text className={`text-xs ${
                              item.isRecyclable ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {item.label}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-lg p-4">
              <Text className="text-center text-gray-500">
                Your recent scans will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
} 