import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Image, Animated } from "react-native";
import { Camera } from "expo-camera/legacy";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GOOGLE_VISION_API_KEY } from "@/key";

const ALLOWED_OBJECTS = {
  PLASTIC: {
    keywords: [
      'Plastic bottle', 'Plastic container', 'Bottle', 'Container', 'Plastic',
      'Water bottle', 'Beverage container', 'Cup', 'Plastic cup', 'Packaging'
    ],
    color: 'rgba(255, 0, 0, OPACITY)'  // Red
  },
  PAPER: {
    keywords: [
      'Paper', 'Newspaper', 'Magazine', 'Document', 'Book',
      'Printed material', 'Paper product', 'Writing paper'
    ],
    color: 'rgba(0, 255, 0, OPACITY)'  // Green
  },
  CARDBOARD: {
    keywords: [
      'Cardboard', 'Box', 'Cardboard box', 'Package',
      'Shipping box', 'Carton', 'Storage box'
    ],
    color: 'rgba(139, 69, 19, OPACITY)'  // Brown
  },
  METAL: {
    keywords: [
      'Can', 'Aluminum can', 'Metal container', 'Tin can',
      'Metal', 'Aluminum', 'Steel can', 'Food can'
    ],
    color: 'rgba(128, 128, 128, OPACITY)'  // Gray
  },
  GLASS: {
    keywords: [
      'Glass bottle', 'Glass jar', 'Glass container',
      'Glass', 'Bottle', 'Jar'
    ],
    color: 'rgba(0, 255, 255, OPACITY)'  // Cyan
  }
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Add simple categories at the top
const WASTE_CATEGORIES = {
  PLASTIC: ['bottle', 'container', 'plastic', 'cup', 'drink'],
  PAPER: ['paper', 'newspaper', 'book', 'magazine'],
  CARDBOARD: ['box', 'cardboard', 'carton'],
  METAL: ['can', 'tin', 'aluminum'],
  GLASS: ['glass', 'jar']
};

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const processingTimeoutRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isStable, setIsStable] = useState(false);
  const previousObjectsRef = useRef([]);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Add detection zone dimensions (centered rectangle)
  const DETECTION_ZONE = {
    x: 10,      // 20% from left
    y: 10,      // 25% from top
    width: 80,  // 60% of screen width
    height: 70  // 50% of screen height
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  const onCameraReady = () => {
    console.log("Camera is ready");
    setIsCameraReady(true);
  };

  useEffect(() => {
    if (isCameraReady && hasPermission && isCameraActive) {
      console.log("Starting detection");
      startRealTimeDetection();
    }
  }, [isCameraReady, hasPermission, isCameraActive]);

  const isObjectInZone = (vertices) => {
    // Calculate object's center point
    const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
    const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;
    
    // Make zone check more lenient
    const zoneX = DETECTION_ZONE.x / 100;
    const zoneY = DETECTION_ZONE.y / 100;
    const zoneWidth = DETECTION_ZONE.width / 100;
    const zoneHeight = DETECTION_ZONE.height / 100;
    
    return (
      centerX >= zoneX - 0.1 &&  // Add some tolerance
      centerX <= (zoneX + zoneWidth + 0.1) &&
      centerY >= zoneY - 0.1 &&
      centerY <= (zoneY + zoneHeight + 0.1)
    );
  };

  const getWasteCategory = (name) => {
    const lowerName = name.toLowerCase();
    for (const [category, keywords] of Object.entries(WASTE_CATEGORIES)) {
      if (keywords.some(keyword => lowerName.includes(keyword))) {
        return category;
      }
    }
    return null;
  };

  const handleCapture = async () => {
    if (detectedObjects.length > 0 && currentPhoto) {
      // Stop the detection loop
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      
      // Stop the camera
      setIsCameraActive(false);
      setIsProcessing(false);

      // Prepare the data - only send necessary information
      const filteredObjects = detectedObjects.map(obj => ({
        label: obj.label,
        category: obj.category,
        confidence: obj.confidence,
        isRecyclable: obj.isRecyclable
      }));

      // Navigate
      router.push({
        pathname: "/wastewizard/detection/results",
        params: { 
          imageBase64: currentPhoto.base64,
          detectedObjects: JSON.stringify(filteredObjects)
        },
      });
    }
  };

  const startRealTimeDetection = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        setIsProcessing(true);
        
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
          skipProcessing: true,
          exif: false,
        });

        setCurrentPhoto(photo);

        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requests: [{
                image: { content: photo.base64 },
                features: [{ 
                  type: 'OBJECT_LOCALIZATION',
                  maxResults: 5
                }]
              }]
            })
          }
        );

        const data = await response.json();
        console.log("API Response:", data); // Debug log

        if (data.responses?.[0]?.localizedObjectAnnotations) {
          const objects = data.responses[0].localizedObjectAnnotations;
          console.log("Detected Objects:", objects); // Debug log
          
          const filteredObjects = objects
            .filter(obj => {
              const isValidScore = obj.score > 0.3;
              const isInZone = obj.boundingPoly?.normalizedVertices && 
                             isObjectInZone(obj.boundingPoly.normalizedVertices);
              return isValidScore && isInZone;
            })
            .map(obj => {
              // Initialize with NON_RECYCLABLE
              let matchedCategory = 'NON_RECYCLABLE';
              let isRecyclable = false;

              // Check against ALLOWED_OBJECTS categories
              for (const [category, data] of Object.entries(ALLOWED_OBJECTS)) {
                if (data.keywords.some(keyword => 
                  obj.name?.toLowerCase().includes(keyword.toLowerCase())
                )) {
                  matchedCategory = category;
                  isRecyclable = true;
                  break;
                }
              }

              // Calculate bounds from normalized vertices
              const vertices = obj.boundingPoly.normalizedVertices;
              const minX = Math.min(...vertices.map(v => v.x));
              const maxX = Math.max(...vertices.map(v => v.x));
              const minY = Math.min(...vertices.map(v => v.y));
              const maxY = Math.max(...vertices.map(v => v.y));

              return {
                label: obj.name || matchedCategory,
                confidence: obj.score,
                category: matchedCategory,
                isRecyclable: isRecyclable,
                bounds: {
                  x: minX * 100,
                  y: minY * 100,
                  width: (maxX - minX) * 100,
                  height: (maxY - minY) * 100
                }
              };
            });

          // Only update if we have new objects or if objects have changed significantly
          const shouldUpdate = !isStable || hasObjectsChanged(filteredObjects, previousObjectsRef.current);
          
          if (shouldUpdate) {
            setDetectedObjects(filteredObjects);
            previousObjectsRef.current = filteredObjects;
            setIsStable(true);
          }
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsProcessing(false);
        processingTimeoutRef.current = setTimeout(startRealTimeDetection, 1000); // Increased to 1 second
      }
    }
  };

  // Helper function to check if objects have changed significantly
  const hasObjectsChanged = (newObjects, oldObjects) => {
    if (newObjects.length !== oldObjects.length) return true;
    
    return newObjects.some((newObj, index) => {
      const oldObj = oldObjects[index];
      if (!oldObj) return true;
      
      // Check if category has changed
      const categoryChanged = newObj.category !== oldObj.category;
      
      // Check if confidence has changed significantly
      const confidenceChanged = Math.abs(newObj.confidence - oldObj.confidence) > 0.1;
      
      return categoryChanged || confidenceChanged;
    });
  };

  // Reset stability when component unmounts or when camera is not ready
  useEffect(() => {
    return () => {
      setIsStable(false);
      previousObjectsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isCameraReady) {
      setIsStable(false);
      previousObjectsRef.current = [];
    }
  }, [isCameraReady]);

  // Add cleanup for camera
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      setIsProcessing(false);
      setIsCameraActive(false);
      setDetectedObjects([]);
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <Camera 
          ref={cameraRef} 
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ratio="16:9"
          onCameraReady={onCameraReady}
        >
          <View style={styles.overlay}>
            {/* Detection Zone */}
            <View 
              style={[
                styles.detectionZone,
                {
                  left: `${DETECTION_ZONE.x}%`,
                  top: `${DETECTION_ZONE.y}%`,
                  width: `${DETECTION_ZONE.width}%`,
                  height: `${DETECTION_ZONE.height}%`,
                }
              ]}
            >
              <Text style={styles.guideText}>Place object here</Text>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>

            {/* Detection Frames */}
            {detectedObjects.map((obj, index) => (
              <View
                key={index}
                style={[
                  styles.detectionFrame,
                  {
                    left: `${obj.bounds.x}%`,
                    top: `${obj.bounds.y}%`,
                    width: `${obj.bounds.width}%`,
                    height: `${obj.bounds.height}%`,
                    borderColor: obj.category ? getCategoryColor(obj.category) : '#00FF00'
                  }
                ]}
              >
                <View style={[
                  styles.labelContainer, 
                  { backgroundColor: obj.category ? getCategoryColor(obj.category, 0.7) : 'rgba(0, 255, 0, 0.7)' }
                ]}>
                  <Text style={styles.labelText}>
                    {obj.category}
                  </Text>
                </View>
              </View>
            ))}

            {/* Camera Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.captureButton,
                  detectedObjects.length === 0 && styles.buttonDisabled
                ]}
                onPress={handleCapture}
                disabled={detectedObjects.length === 0}
              >
                <Ionicons name="camera" size={32} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.loadingContainer}>
          {/* Logo */}
          <Image 
            source={require('@/assets/images/Logo.png')} 
            style={styles.logo}
          />
          
          {/* Loading Animation */}
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons 
                name="leaf-outline" 
                size={24} 
                color="#4CAF50" 
                style={styles.leafIcon}
              />
            </Animated.View>
          </View>

          {/* Loading Text */}
          <Text style={styles.loadingText}>Processing your item...</Text>
          <Text style={styles.subText}>Identifying recyclable materials</Text>
        </View>
      )}
    </View>
  );
}

const getCategoryColor = (category: string, opacity = 1) => {
  const colors = {
    PLASTIC: `rgba(255, 0, 0, ${opacity})`,    // Red
    PAPER: `rgba(0, 255, 0, ${opacity})`,      // Green
    CARDBOARD: `rgba(139, 69, 19, ${opacity})`, // Brown
    METAL: `rgba(128, 128, 128, ${opacity})`,   // Gray
    GLASS: `rgba(0, 255, 255, ${opacity})`,     // Cyan
    DEFAULT: `rgba(255, 255, 0, ${opacity})`    // Yellow
  };
  return colors[category] || colors.DEFAULT;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  detectionZone: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'dashed',
  },
  detectionFrame: {
    position: 'absolute',
    borderWidth: 3,  // Make border more visible
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
    borderRadius: 4, // Add slight rounding
  },
  labelContainer: {
    position: 'absolute',
    top: -35,  // Move label up slightly
    left: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    padding: 6,  // Increase padding
    borderRadius: 4,
    minWidth: 100,  // Minimum width for better readability
  },
  labelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',  // Center text
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'white',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  guideText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    top: -30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FFFF',  // Light eco-friendly background
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  leafIcon: {
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',  // Darker green
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#66BB6A',  // Lighter green
    textAlign: 'center',
  },
}); 