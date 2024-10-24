import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

// Import or create separate components for each tab
import MissionContent from '../components/MissionContent';
import RewardsContent from '../components/RewardsContent';
import MyRewardsContent from '../components/MyRewardsContent';

const tabs = ['Mission', 'Rewards', 'My Rewards'];

export default function Mission() {
  const [activeTab, setActiveTab] = useState(tabs[0]); // Set the default active tab

  const handleHistoryPress = () => {
    // Handle history button press
    console.log('History button pressed');
  };

  // Function to render the active tab's content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'Mission':
        return <MissionContent />;
      case 'Rewards':
        return <RewardsContent />;
      case 'My Rewards':
        return <MyRewardsContent />;
      default:
        return <Text>No content available</Text>;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header 
        title="Mission & Rewards" 
        showBackButton={true}
        rightButton={{
          icon: "time-outline",
          onPress: handleHistoryPress
        }}
      />
      <View className="flex-row justify-around px-5">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="flex-1 items-center py-2"
          >
            <Text
              className={`text-md ${activeTab === tab ? 'font-bold text-black' : 'text-gray-400'}`}
            >
              {tab}
            </Text>
            {activeTab === tab && (
              <View className="w-full h-0.5 bg-green" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-1">
        {renderActiveTabContent()}
      </View>
    </View>
  );
}
