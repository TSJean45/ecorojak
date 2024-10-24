import React from "react";
import { View, Text, Image } from "react-native";
import { Banner } from "react-native-paper";
import CoinSvg from "../assets/images/coin.svg";

// Import the PNG version of the logo
const logoPng = require("../assets/images/Logo.png");

interface CoinBannerProps {
  coinBalance: number;
  expiringCoins: number;
  expirationDate: string;
  hasExtension?: boolean;
}

const CoinBanner: React.FC<CoinBannerProps> = ({
  coinBalance,
  expiringCoins,
  expirationDate,
  hasExtension = false,
}) => {
  return (
    <Banner
      visible={true}
      className={`bg-tiffany ${hasExtension ? "pb-12" : ""} px-2`}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <View className="flex-row items-end">
            <Text className="text-5xl text-white font-bold mr-2">
              {coinBalance}
            </Text>
            <CoinSvg width={30} height={30} />
          </View>
          <Text className="text-xs text-white font-sans">
            <Text className="font-bold">{expiringCoins}</Text> ecoCoin(s)
            expiring on <Text className="font-bold">{expirationDate}</Text>
          </Text>
        </View>
        <View className="ml-10">
          {/* Use the PNG logo */}
          <Image source={logoPng} style={{ width: 110, height: 80 }} />
        </View>
      </View>
    </Banner>
  );
};

export default CoinBanner;
