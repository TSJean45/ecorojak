import React from "react";
import { View, Text, Image, Button } from 'react-native';
import CoinSvg from "../assets/images/coin.svg";

interface CardProps {
  image: any; 
  title: string;
  buttonText: string;
  coins: number;
}

const Card: React.FC<CardProps> = ({ image, title, buttonText, coins }) => (
  <View className="w-1/2 p-2">
    <View className="bg-white rounded-lg shadow items-center p-4">
      <Image source={image} className="w-full h-20 mb-2" />
      <Text className="text-md text-left font-bold mb-2">{title}</Text>
      <View className="flex-row items-center">
        <Text className="mr-1">{coins}</Text> 
        <CoinSvg width={20} height={20} className="mr-2" />
        <Button title={buttonText} />
      </View>
    </View>
  </View>
);

export default Card;
