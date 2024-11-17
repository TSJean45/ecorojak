import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '@/components/Header';

const SplineTest = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <View className="flex-1 bg-white">
      <Header title="Spline Test" showBackButton={true} />
      
      <WebView
        source={{ uri: 'https://harmonious-kleicha-ea05de.netlify.app/' }}
        style={{ width, height: height * 0.8 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default SplineTest;