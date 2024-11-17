import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CoinSVG from "../assets/images/coin.svg";
import WebView from "react-native-webview";

interface MissionItemProps {
  title: string;
  progress: number;
  remaining: number;
  image: any;
}

const missions = [
  {
    id: "1",
    title: "Mission 1",
    progress: 0.5,
    remaining: 5000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "2",
    title: "Mission 2",
    progress: 0.3,
    remaining: 3000,
    image: require("../assets/images/mission1.png"),
  },
  {
    id: "3",
    title: "Mission 3",
    progress: 0.7,
    remaining: 2000,
    image: require("../assets/images/mission1.png"),
  },
];

const MissionItem = ({
  title,
  progress,
  remaining,
  image,
}: MissionItemProps) => (
  <View className="w-[90%] flex-row items-center px-2 py-2 bg-white mx-4 my-1 rounded-lg shadow">
    <Image source={image} style={{ width: 35, height: 70, marginRight: 10 }} />
    <View className="flex-1">
      <View className="flex-row items-center">
        <Ionicons name="flame" size={20} color="orange" />
        <Text className="text-md font-bold ml-1">{title}</Text>
      </View>
      <View className="flex-row items-center py-1">
        <Text className="text-xs text-black mr-1">Reward 2</Text>
        <CoinSVG width={15} height={15} />
      </View>
      <ProgressBar
        progress={0.5}
        color="#73D1C0"
        style={{
          height: 10,
          borderRadius: 5,
        }}
      />
      <Text className="text-[10px] text-gray-500">
        {remaining} more to complete the challenges
      </Text>
    </View>
    <TouchableOpacity className="bg-green px-4 py-1 rounded-2xl">
      <Text className="text-xs text-white font-bold">Go!</Text>
    </TouchableOpacity>
  </View>
);

const CarbonGrove: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderDayCard = (day: number) => {
    const isClaimed = day === 1;
    const isToday = day === 2;

    return (
      <View
        key={day}
        className="w-10 h-16 bg-white rounded-full mx-0.5 py-2 flex flex-col justify-start items-center"
      >
        <Text className="text-center font-bold text-[10px] mb-0">
          Day {day}
        </Text>
        <View className="relative flex-grow flex justify-center items-center">
          <Image
            source={require("../assets/images/droplet2.png")}
            className="w-5 h-10"
            resizeMode="contain"
          />
          {isClaimed ? (
            <View className="absolute inset-0 flex items-center justify-center">
              <View className="bg-[#D9D9D9] rounded-full px-3">
                <Text className="text-green text-xs">✓</Text>
              </View>
            </View>
          ) : isToday ? (
            <View className="absolute inset-0 flex items-center justify-center top-[13px] left-[-8px]">
              <TouchableOpacity className="bg-[#E3CA93] rounded-full px-1">
                <Text className="text-white text-[10px]">Claim</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <View className="flex-row mb-4">
        <View className="flex-row items-center w-[70%] bg-[#C57D53] p-3 rounded-r-xl mr-2">
          <Image
            source={require("../assets/images/levelbadge.png")}
            className="w-8 h-8 mr-2"
          />
          <View className="flex-1">
            <ProgressBar
              progress={0.5}
              color="#E3CA93"
              style={{
                marginBottom: 4,
                height: 12,
                borderRadius: 6,
              }}
            />
            <Text className="text-white font-sans text-xs">
              500 more water drop(s) to grow up!
            </Text>
          </View>
        </View>
        <View className="w-[30%] bg-[#a5ddf0] p-3 rounded-l-xl">
          <View className="flex-row items-center justify-center">
            <Image
              source={require("../assets/images/waterdroplet.png")}
              className="w-6 h-8 mr-2"
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-bold">100</Text>
          </View>
        </View>
      </View>

      <View className="flex items-center">
        <View
          className="w-[90%] bg-green p-3 rounded-2xl shadow-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <View
            className="absolute inset-0 rounded-2xl"
            style={{
              shadowColor: "#45a049",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 5,
            }}
          />
          <Text className="text-white font-bold text-center mb-1">
            You’ve successfully reduced CO2 emissions by
          </Text>

          <View className="flex-row justify-center items-end">
            <View className="flex-row">
              {["", "", "", "", "2", "5"].map((item, index) => {
                return (
                  <View
                    key={index}
                    className="w-10 h-14 bg-white mx-0.5 rounded-sm justify-center items-center"
                  >
                    <Text className="font-bold text-4xl">{item}</Text>
                  </View>
                );
              })}
            </View>
            <Text className="ml-1 font-bold self-end text-white">kg</Text>
          </View>

          <Text className="text-white text-xs mt-2 text-center">
            You’ve outperformed 90% of CarbonTravelers nationwide
          </Text>
        </View>
      </View>
      <View className="flex-row justify-end mx-3">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require("../assets/images/watermission.png")}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="h-[250px] w-full">
        <View className="flex-1">
          <WebView
            source={{
              uri: "https://my.spline.design/farm-0495a762ba12d9912145142e5f957465/",
            }}
            style={{ flex: 1, backgroundColor: "transparent" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={true}
            bounces={false}
            injectedJavaScript={`
              // Remove watermark using shadow DOM
              window.onload = function() {
                setTimeout(() => {
                  const viewer = document.querySelector('spline-viewer');
                  if (viewer) {
                    const shadowRoot = viewer.shadowRoot;
                    if (shadowRoot) {
                      const logo = shadowRoot.querySelector('#logo');
                      if (logo) {
                        logo.remove();
                      }
                    }
                  }
                }, 1000);  // Small delay to ensure elements are loaded
              }
              true;  // Required for injectedJavaScript
            `}
          />
        </View>
      </View>

      <View className="mt-5 items-center">
        <View className="w-[60%]">
          <TouchableOpacity
            className="bg-green p-3 rounded-2xl"
            onPress={() => {}}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-center font-bold text-md mr-2">
                Water Plant with 1 Water Drop
              </Text>
              <Image
                source={require("../assets/images/waterdroplet.png")}
                className="w-4 h-5"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.5)"
              barStyle="dark-content"
              translucent
            />
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={{ flex: 1 }} />
              <View
                style={{
                  backgroundColor: "#B2D270",
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  height: "60%",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>Daily Mission</Text>
                <View className="w-full items-center">
                  <View className="mt-3 flex-row justify-center bg-[#C3E9E9] p-3 w-[90%] rounded-xl mb-2">
                    {[1, 2, 3, 4, 5, 6, 7].map(renderDayCard)}
                  </View>
                </View>
                <View className="w-full">
                  {missions.map((mission) => (
                    <MissionItem key={mission.id} {...mission} />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#68A61D",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});

export default CarbonGrove;
