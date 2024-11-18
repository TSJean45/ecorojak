import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Svg, { Line } from "react-native-svg";

export default function Impact() {
  const router = useRouter();

  const [lines, setLines] = React.useState([]);
  const viewRef = React.useRef(null);

  const buttonRefs = {
    topLeft: React.useRef(null),
    topCenter: React.useRef(null),
    midCenter1: React.useRef(null),
    midCenter2: React.useRef(null),
    midRight: React.useRef(null),
    bottomCenter1: React.useRef(null),
    bottomCenter2: React.useRef(null),
  };

  const measureButton = (ref) => {
    return new Promise((resolve) => {
      if (!ref.current) {
        resolve(null);
        return;
      }

      ref.current.measureInWindow((x, y, width, height) => {
        const verticalOffset = 12;
        const horizontalLineOffset = 50;

        resolve({
          x: x + width / 2,
          y: y + height / 2 - verticalOffset,
          horizontalY: y + height / 2 - horizontalLineOffset,
        });
      });
    });
  };

  const updateLinePositions = async () => {
    try {
      const positions = await Promise.all([
        measureButton(buttonRefs.topLeft),
        measureButton(buttonRefs.topCenter),
        measureButton(buttonRefs.midCenter1),
        measureButton(buttonRefs.midCenter2),
        measureButton(buttonRefs.midRight),
        measureButton(buttonRefs.bottomCenter1),
        measureButton(buttonRefs.bottomCenter2),
      ]);

      const [
        topLeft,
        topCenter,
        midCenter1,
        midCenter2,
        midRight,
        bottomCenter1,
        bottomCenter2,
      ] = positions;

      if (
        topLeft &&
        topCenter &&
        midCenter1 &&
        midCenter2 &&
        midRight &&
        bottomCenter1 &&
        bottomCenter2
      ) {
        setLines([
          {
            x1: topLeft.x,
            y1: topLeft.horizontalY,
            x2: topCenter.x,
            y2: topCenter.horizontalY,
          },
          {
            x1: topCenter.x,
            y1: topCenter.y,
            x2: midCenter1.x,
            y2: midCenter1.y,
          },
          {
            x1: midCenter1.x,
            y1: midCenter1.y,
            x2: midCenter2.x,
            y2: midCenter2.y,
          },
          {
            x1: midCenter2.x,
            y1: midCenter2.horizontalY,
            x2: midRight.x,
            y2: midRight.horizontalY,
          },
          {
            x1: midCenter2.x,
            y1: midCenter2.y,
            x2: bottomCenter1.x,
            y2: bottomCenter1.y,
          },
          {
            x1: bottomCenter1.x,
            y1: bottomCenter1.y,
            x2: bottomCenter2.x,
            y2: bottomCenter2.y,
          },
        ]);
      }
    } catch (error) {
      console.log("Error measuring buttons:", error);
    }
  };

  React.useEffect(() => {
    updateLinePositions();
    const timer = setTimeout(updateLinePositions, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1" ref={viewRef}>
      <ImageBackground
        source={require("@/assets/images/impact-background.png")}
        className="absolute w-full h-full opacity-40"
        resizeMode="cover"
      />
      <Header
        title="Eco-Commissions"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <View className="flex-1">
        <Svg style={{ position: "absolute", width: "100%", height: "100%" }}>
          {lines.map((line, index) => (
            <Line
              key={index}
              {...line}
              stroke={index === 5 ? "#1F8B65" : "#6B7280"}
              strokeWidth="4"
              strokeDasharray="10,10"
            />
          ))}
        </Svg>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          scrollEnabled={false}
        >
          <View className="items-center p-4 mt-2">
            <View className="items-center">
              <View className="flex-row mb-10 z-10 w-full">
                <View className="flex-1 items-center">
                  <TouchableOpacity ref={buttonRefs.topLeft}>
                    <Image
                      source={require("@/assets/images/gift-level.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-1 items-center">
                  <TouchableOpacity ref={buttonRefs.topCenter} disabled={true}>
                    <Image
                      source={require("@/assets/images/lock-level.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-1" />
              </View>

              <TouchableOpacity
                ref={buttonRefs.midCenter1}
                className="mb-10 z-10"
                disabled={true}
              >
                <Image
                  source={require("@/assets/images/lock-level.png")}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View className="flex-row mb-10 z-10 w-full">
                <View className="flex-1" />
                <View className="flex-1 items-center">
                  <TouchableOpacity ref={buttonRefs.midCenter2} disabled={true}>
                    <Image
                      source={require("@/assets/images/lock-level.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-1 items-center">
                  <TouchableOpacity ref={buttonRefs.midRight}>
                    <Image
                      source={require("@/assets/images/gift-level.png")}
                      className="w-24 h-24"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                ref={buttonRefs.bottomCenter1}
                className="mb-10 z-10"
                onPress={() => router.push("/impact/quiz/level2")}
              >
                <Image
                  source={require("@/assets/images/2-level.png")}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                ref={buttonRefs.bottomCenter2}
                className="z-10"
                onPress={() => router.push("/impact/quiz/level1")}
              >
                <Image
                  source={require("@/assets/images/1-level.png")}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
