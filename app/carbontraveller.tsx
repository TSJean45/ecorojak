import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import CarbonGrove from "@/components/CarbonGrove";
import CarbonTrail from "@/components/CarbonTrail";

const { width, height } = Dimensions.get("window");

const TabButton = ({
  title,
  isActive,
  onPress,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 items-center justify-center py-1 ${
      isActive ? "bg-green" : "bg-white"
    }`}
  >
    <Text className={`font-bold ${isActive ? "text-white" : "text-gray-600"}`}>
      {title}
    </Text>
  </TouchableOpacity>
);

const CarbonTraveller: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"grove" | "trail">("trail");

  const renderTabContent = () => {
    switch (activeTab) {
      case "grove":
        return <CarbonGrove />;
      case "trail":
        return <CarbonTrail />;
      default:
        return null;
    }
  };

  const backgroundContent = () => (
    <View
      className="flex-1 bg-transparent"
      style={{ paddingBottom: insets.bottom + 60 }}
    >
      <Header title="CarbonTraveller" showBackButton={true} />

      <View className="flex-row mx-4 mt-4 bg-gray-300 rounded-full overflow-hidden">
        <TabButton
          title="Carbon Trail"
          isActive={activeTab === "trail"}
          onPress={() => setActiveTab("trail")}
        />
        <TabButton
          title="Carbon Grove"
          isActive={activeTab === "grove"}
          onPress={() => setActiveTab("grove")}
        />
      </View>

      <ScrollView className="flex-1 mt-4">{renderTabContent()}</ScrollView>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {activeTab === "trail" ? (
        <View className="flex-1 bg-[#e3f4fe]">{backgroundContent()}</View>
      ) : (
        <ImageBackground
          source={require('../assets/images/forest-background.png')}
          style={{ flex: 1, width: width, height: height }}
          imageStyle={{
            opacity: 0.6,
            resizeMode: "cover",
          }}
        >
          {backgroundContent()}
        </ImageBackground>
      )}
    </>
  );
};

export default CarbonTraveller;
