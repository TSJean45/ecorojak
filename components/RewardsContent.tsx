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
    { 
      id: '1', 
      image: require("../assets/images/donate1.png"), 
      title: "Donate to Food Bank", 
      description: "Help provide meals to the needy",
      buttonText: "Donate", 
      coins: 300,
      isValid: coinBalance >= 300 
    },
    { 
      id: '2', 
      image: require("../assets/images/donate2.png"), 
      title: "Support Animal Shelters", 
      description: "Help our furry friends",
      buttonText: "Donate", 
      coins: 400,
      isValid: coinBalance >= 400 
    },
  ];

  const ecoRojakRewardsData = [
    { 
      id: '1', 
      image: require("../assets/images/reward1.png"), 
      title: "RM5 Touch 'n Go Credit", 
      description: "Add to your TNG eWallet",
      buttonText: "Redeem", 
      coins: 500,
      isValid: coinBalance >= 500 
    },
    { 
      id: '2', 
      image: require("../assets/images/reward2.png"), 
      title: "KL Tower Entry Ticket", 
      description: "Single entry pass",
      buttonText: "Redeem", 
      coins: 800,
      isValid: coinBalance >= 800 
    },
    { 
      id: '3', 
      image: require("../assets/images/reward1.png"), 
      title: "RM10 Touch 'n Go Credit", 
      description: "Add to your TNG eWallet",
      buttonText: "Redeem", 
      coins: 1000,
      isValid: coinBalance >= 1000 
    },
    { 
      id: '4', 
      image: require("../assets/images/reward2.png"), 
      title: "Aquaria KLCC Ticket", 
      description: "Single entry pass",
      buttonText: "Redeem", 
      coins: 1500,
      isValid: coinBalance >= 1500 
    },
    { 
      id: '5', 
      image: require("../assets/images/reward1.png"), 
      title: "RM25 Touch 'n Go Credit", 
      description: "Add to your TNG eWallet",
      buttonText: "Redeem", 
      coins: 2500,
      isValid: coinBalance >= 2500 
    },
    { 
      id: '6', 
      image: require("../assets/images/reward2.png"), 
      title: "Genting Day Pass", 
      description: "Theme park entry ticket",
      buttonText: "Redeem", 
      coins: 3000,
      isValid: coinBalance >= 3000 
    },
    { 
      id: '7', 
      image: require("../assets/images/reward1.png"), 
      title: "RM50 Touch 'n Go Credit", 
      description: "Add to your TNG eWallet",
      buttonText: "Redeem", 
      coins: 5000,
      isValid: coinBalance >= 5000 
    },
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
              <Card 
                key={item.id} 
                image={item.image} 
                title={item.title} 
                description={item.description}
                buttonText={item.buttonText} 
                coins={item.coins}
                disabled={!item.isValid} 
              />
            ))}
          </View>
          <SectionHeader title="ecoRojak Rewards"/>
          <View className="flex-row flex-wrap justify-between">
            {ecoRojakRewardsData.map((item) => (
              <Card 
                key={item.id} 
                image={item.image} 
                title={item.title} 
                description={item.description}
                buttonText={item.buttonText} 
                coins={item.coins}
                disabled={!item.isValid} 
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
