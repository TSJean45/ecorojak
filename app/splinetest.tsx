import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SplineTest = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: 'https://my.spline.design/ecorojak-dbe5871171c1ba0ccb7348c659e01db7/' }}
        style={{ width, height }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default SplineTest;