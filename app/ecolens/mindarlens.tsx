import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MindarLens: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get('window');

  const injectedJavaScript = `
    (function() {
      const style = document.createElement('style');
      style.textContent = \`
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          overflow: hidden !important;
        }
        iframe {
          width: 100vw !important;
          height: 100vh !important;
          border: none !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
        }
      \`;
      document.head.appendChild(style);
    })();
    true;
  `;

  return (
    <View className="flex-1 bg-black">
      <StatusBar translucent backgroundColor="transparent" />
      
      <View className="flex-1 w-full h-full bg-transparent">
        <WebView
          source={{ uri: 'https://0c42-180-75-249-108.ngrok-free.app/ar-content/index.html' }}
          className="flex-1"
          style={{
            width: width,
            height: height,
            backgroundColor: 'transparent',
          }}
          injectedJavaScript={injectedJavaScript}
          onMessage={(event) => {
            console.log('WebView message:', event.nativeEvent.data);
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          originWhitelist={['*']}
          mixedContentMode="always"
          androidLayerType="hardware"
          bounces={false}
          scrollEnabled={false}
          scalesPageToFit={false}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
          useWebKit={true}
        />
      </View>

      <SafeAreaView className="absolute top-0 left-0 right-0">
        <View className="flex-row justify-between items-center m-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/80 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MindarLens; 