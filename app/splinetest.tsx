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
        source={{ uri: 'https://my.spline.design/ecorojak-dbe5871171c1ba0ccb7348c659e01db7/' }}
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