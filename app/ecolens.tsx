import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';

const EcoLens: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Header title="EcoLens" theme="dark" />
      <View className="flex-1 p-5">
        {/* Your main content goes here */}
        <Text>EcoLens Content</Text>
      </View>
    </SafeAreaView>
  );
};

export default EcoLens;
