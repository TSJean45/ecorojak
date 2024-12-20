   // app.config.js
   import 'dotenv/config'; // Ensure you have dotenv installed

   export default {
     expo: {
       name: "ecorojak",
       slug: "ecorojak",
       version: "1.0.0",
       orientation: "portrait",
       icon: "./assets/images/cover.png",
       scheme: "myapp",
       userInterfaceStyle: "automatic",
       splash: {
         image: "./assets/images/splash.png",
         resizeMode: "contain",
         backgroundColor: "#ffffff"
       },
       ios: {
         supportsTablet: true,
         userInterfaceStyle: "light",
         infoPlist: {
           NSCameraUsageDescription: "$(PRODUCT_NAME) needs access to your Camera.",
           NSMicrophoneUsageDescription: "$(PRODUCT_NAME) needs access to your Microphone."
         }
       },
       android: {
         package: "com.anonymous.ecorojak",
         permissions: [
           "CAMERA",
           "RECORD_AUDIO",
           "READ_EXTERNAL_STORAGE",
           "WRITE_EXTERNAL_STORAGE",
           "INTERNET"
         ],
         adaptiveIcon: {
           foregroundImage: "./assets/images/cover.png",
         },
         config: {
           googleMaps: {
             apiKey: process.env.GOOGLE_MAPS_API_KEY // Use the environment variable here
           }
         }
       },
       web: {
         bundler: "metro",
         output: "static",
         favicon: "./assets/images/favicon.png"
       },
       plugins: [
         "expo-router",
         "expo-font",
         [
           "expo-image-picker",
           {
             photosPermission: "The app accesses your photos to let you identify recyclable items."
           }
         ],
         [
           "expo-location",
           {
             locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location."
           }
         ],
         [
           "expo-camera",
           {
             cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
             microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone"
           }
         ],
         [
          "expo-sensors",
          {
            "motionPermission": "Allow $(PRODUCT_NAME) to access your device motion"
          }
        ]
       ],
       experiments: {
         typedRoutes: true
       },
       extra: {
         eas: {
           projectId: "5a9b5f3d-3d10-4bca-b779-29322c41c179"
         }
       }
     }
   };