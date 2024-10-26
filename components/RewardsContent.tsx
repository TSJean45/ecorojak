import React from "react";
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import CoinBanner from  './CoinBanner';
import SectionHeader from './SectionHeader';
import Card from './Card';
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RewardsContentProps {
  coinBalance?: number;
}

const backgroundImage = require("../assets/images/reward-background.png");

export default function RewardsContent({ coinBalance = 500 }: RewardsContentProps) {
  const insets = useSafeAreaInsets();

  const donateEcoCoinsData = [
    { id: '1', image: require("../assets/images/donate1.png"), title: "Donate ecoCoins", buttonText: "Donate", coins: 500 },
    { id: '2', image: require("../assets/images/donate2.png"), title: "Donate ecoCoins", buttonText: "Donate", coins: 500 },
  ];

  const ecoRojakRewardsData = [
    { id: '1', image: require("../assets/images/reward1.png"), title: "ecoRojak Reward 1", buttonText: "Redeem", coins: 500 },
    { id: '2', image: require("../assets/images/reward2.png"), title: "ecoRojak Reward 2", buttonText: "Redeem", coins: 500 },
    { id: '3', image: require("../assets/images/reward1.png"), title: "ecoRojak Reward 3", buttonText: "Redeem", coins: 500 },
    { id: '4', image: require("../assets/images/reward2.png"), title: "ecoRojak Reward 4", buttonText: "Redeem", coins: 500 },
    { id: '5', image: require("../assets/images/reward1.png"), title: "ecoRojak Reward 5", buttonText: "Redeem", coins: 500 },
    { id: '6', image: require("../assets/images/reward2.png"), title: "ecoRojak Reward 6", buttonText: "Redeem", coins: 500 },
    { id: '7', image: require("../assets/images/reward1.png"), title: "ecoRojak Reward 7", buttonText: "Redeem", coins: 500 },
  ];

  return (
    <ImageBackground source={backgroundImage} className="flex-1">
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.65)' }} />
      <ScrollView className="flex-1">
        <CoinBanner
          coinBalance={coinBalance}
          expiringCoins={10}
          expirationDate="2024-12-31"
        />
        <View
          className="flex-1 bg-transparent mt-2"
          style={{ paddingBottom: insets.bottom + 60 }}
        >
          <SectionHeader title="Donate ecoCoins"/>
          <View className="flex-row flex-wrap justify-between">
            {donateEcoCoinsData.map((item) => (
              <Card key={item.id} image={item.image} title={item.title} buttonText={item.buttonText} coins={item.coins} />
            ))}
          </View>
          <SectionHeader title="ecoRojak Rewards"/>
          <View className="flex-row flex-wrap justify-between">
            {ecoRojakRewardsData.map((item) => (
              <Card key={item.id} image={item.image} title={item.title} buttonText={item.buttonText} coins={item.coins} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
