import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LocationIcon from "../../assets/images/location.svg";
import { useRouter, usePathname } from 'expo-router';

export default function BottomNavigationBar() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { key: "home", icon: "home", iconOutline: "home-outline" },
    { key: "mission", icon: "flag", iconOutline: "flag-outline" },
    { key: "location", customIcon: LocationIcon },
    { key: "leaderboard", icon: "trophy", iconOutline: "trophy-outline" },
    { key: "profile", icon: "person", iconOutline: "person-outline" },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 h-14 bg-white rounded-t-3xl flex-row justify-between items-center px-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => {
              setActiveTab(tab.key);
              router.push(`/${tab.key}`);
            }}
            className={`flex-1 items-center justify-center`}
          >
            {tab.customIcon ? (
              <View className="absolute bottom-[-46px]">
                <LocationIcon width={110} height={110} />
              </View>
            ) : (
              <View className="items-center">
                <Ionicons
                  name={isActive ? tab.icon : tab.iconOutline}
                  size={25}
                  color={isActive ? "#1F8B65" : "#666666"}
                />
                {isActive && <View className="w-6 h-0.5 bg-green mt-1" />}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
