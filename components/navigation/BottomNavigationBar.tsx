import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import HomeIcon from "../../assets/images/home.svg";
import MissionIcon from "../../assets/images/mission.svg";
import LocationIcon from "../../assets/images/location.svg";
import LeaderboardIcon from "../../assets/images/leaderboard.svg";
import ProfileIcon from "../../assets/images/profile.svg";
import { useRouter, usePathname } from 'expo-router';

export default function BottomNavigationBar() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { key: "home", icon: HomeIcon },
    { key: "mission", icon: MissionIcon },
    { key: "location", icon: LocationIcon }, // Central fancy tab
    { key: "leaderboard", icon: LeaderboardIcon },
    { key: "profile", icon: ProfileIcon },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 h-14 bg-white rounded-t-3xl flex-row justify-between items-center px-1">
      {tabs.map((tab) => {
        const isFancy = tab.key === "location";
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => {
              setActiveTab(tab.key);
              router.push(`/${tab.key}`);
            }}
            className={`flex-1 items-center justify-center`}
          >
            {tab.key === "location" ? (
              <View className="absolute bottom-[-46px]">
                <Icon width={110} height={110} />
              </View>
            ) : (
              <View className="items-center">
                <Icon
                  width={25}
                  height={25}
                  stroke={isActive ? "#1F8B65" : undefined}
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
