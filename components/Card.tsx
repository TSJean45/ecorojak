import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CoinSvg from "../assets/images/coin.svg";

interface CardProps {
  image: any; 
  title: string;
  description?: string;
  buttonText: string;
  coins: number;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({ image, title, description, buttonText, coins, disabled = false }) => (
  <View className="w-1/2 p-2">
    <View className="bg-white rounded-lg shadow items-center p-2">
      <Image source={image} className="w-full h-20 mb-2" />
      <Text className="text-md text-left font-bold mb-1">{title}</Text>
      {description && (
        <Text className="text-xs text-gray-600 mb-2 text-left w-full">{description}</Text>
      )}
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-row items-center">
          <Text className={`mr-1 ${disabled ? 'text-gray-400' : ''}`}>{coins}</Text> 
          <CoinSvg width={20} height={20} opacity={disabled ? 0.5 : 1} />
        </View>
        <TouchableOpacity 
          className={`px-3 py-1 rounded-lg ${disabled ? 'bg-gray' : 'bg-green'}`}
          disabled={disabled}
        >
          <Text className={`text-xs font-bold ${disabled ? 'text-white' : 'text-white'}`}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Card;
