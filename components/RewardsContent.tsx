import React from "react";
import { View, Text, ScrollView } from 'react-native';
import CoinBanner from './CoinBanner';

interface RewardsContentProps {
    coinBalance: number;
  }

export default function RewardsContent({ coinBalance = 500 }: RewardsContentProps) {
  return (
    <ScrollView className="flex-1">
      <CoinBanner
        coinBalance={coinBalance}
        expiringCoins={10}
        expirationDate="2024-12-31"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Available Missions</Text>
        {/* Add your mission list or other content here */}
        <Text>Mission Content Goes Here</Text>
      </View>
    </ScrollView>
  );
}
