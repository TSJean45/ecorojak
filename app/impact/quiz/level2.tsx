import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useState } from "react";

const energyQuestions = [
  {
    id: 1,
    question: "Which unexpected factor contributes most to a home's energy waste?",
    options: [
      { text: "Old light bulbs", isCorrect: false },
      { text: "Phantom energy loads", isCorrect: true },
      { text: "Running dishwasher", isCorrect: false },
      { text: "Open windows", isCorrect: false },
    ],
    explanation: "Phantom loads (devices using power when 'off') can account for up to 20% of your energy bill! Even chargers with nothing connected still draw power.",
  },
  {
    id: 2,
    question: "What's the most efficient temperature setting for a water heater?",
    options: [
      { text: "140°F (60°C)", isCorrect: false },
      { text: "120°F (49°C)", isCorrect: true },
      { text: "160°F (71°C)", isCorrect: false },
      { text: "100°F (38°C)", isCorrect: false },
    ],
    explanation: "120°F provides optimal efficiency while still killing harmful bacteria. Every 10°F reduction saves 3-5% on water heating costs!",
  },
  {
    id: 3,
    question: "Which home improvement has the highest energy-saving ROI?",
    options: [
      { text: "Solar panels", isCorrect: false },
      { text: "Smart thermostat", isCorrect: false },
      { text: "Air sealing", isCorrect: true },
      { text: "Energy-star appliances", isCorrect: false },
    ],
    explanation: "Air sealing can reduce heating/cooling costs by 15-30% with minimal investment. Most homes leak enough air to fill a hot air balloon every day!",
  },
  {
    id: 4,
    question: "What's the hidden energy cost of cloud storage?",
    options: [
      { text: "No energy impact", isCorrect: false },
      { text: "Data center consumption", isCorrect: true },
      { text: "Device charging only", isCorrect: false },
      { text: "Internet router usage", isCorrect: false },
    ],
    explanation: "Data centers for cloud storage consume 1% of global electricity! One email with attachment has the carbon footprint of driving a car 16 feet.",
  },
  {
    id: 5,
    question: "Which cooling myth actually increases energy use?",
    options: [
      { text: "Closing unused vents", isCorrect: true },
      { text: "Using ceiling fans", isCorrect: false },
      { text: "Programming thermostat", isCorrect: false },
      { text: "Night ventilation", isCorrect: false },
    ],
    explanation: "Closing vents creates pressure imbalances, making your HVAC system work harder and potentially causing damage. It can increase energy use by up to 25%!",
  }
];

export default function Level2Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAnswer = (isCorrect, index) => {
    setSelectedIndex(index);
    if (isCorrect) setScore(score + 1);
    setSelectedAnswer(isCorrect);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < energyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      router.push({
        pathname: "/impact/quiz/results",
        params: { score, total: energyQuestions.length },
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require("@/assets/images/impact-background.png")}
        className="absolute w-full h-full opacity-40"
        resizeMode="cover"
      />
      <Header
        title="Stage 2"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <View className="h-2 w-full bg-[#73D1C0] rounded-full mb-6 flex-row overflow-hidden">
            {[...Array(energyQuestions.length)].map((_, index) => (
              <View
                key={index}
                className="flex-1 h-full"
                style={{
                  backgroundColor:
                    index <= currentQuestion ? "#1F8B65" : "#73D1C0",
                }}
              />
            ))}
          </View>
          <Text className="text-xl mb-6">
            {energyQuestions[currentQuestion].question}
          </Text>

          {energyQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`p-4 rounded-xl mb-3 ${
                selectedAnswer !== null
                  ? option.isCorrect
                    ? "bg-green border-green"
                    : selectedAnswer === false && index === selectedIndex
                    ? "bg-red-100 border-red-500"
                    : "bg-white"
                  : "bg-white"
              }`}
              onPress={() => handleAnswer(option.isCorrect, index)}
              disabled={selectedAnswer !== null}
            >
              <Text
                className={`text-lg ${
                  selectedAnswer !== null && option.isCorrect
                    ? "text-white"
                    : selectedAnswer === false && index === selectedIndex
                    ? "text-red-500"
                    : "text-gray-800"
                }`}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}

          {showExplanation && (
            <View>
              <View className="bg-[#73D1C0] p-4 rounded-xl mt-4">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="bulb-outline" size={24} color="white" />
                  <Text className="text-white font-bold ml-2">
                    Did you know?
                  </Text>
                </View>
                <Text className="text-white">
                  {energyQuestions[currentQuestion].explanation}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-green mt-4 p-3 rounded-xl"
                onPress={nextQuestion}
              >
                <Text className="text-white text-center font-bold">
                  {currentQuestion === energyQuestions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
