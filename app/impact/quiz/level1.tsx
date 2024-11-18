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

const wasteQuestions = [
  {
    id: 1,
    question: "Which item should surprisingly NOT go in the recycling bin?",
    options: [
      { text: "Clean aluminum foil", isCorrect: false },
      { text: "Paper coffee cups", isCorrect: true },
      { text: "Empty aerosol cans", isCorrect: false },
      { text: "Flattened cardboard", isCorrect: false },
    ],
    explanation: "Paper coffee cups have a plastic lining that makes them non-recyclable in most facilities. This hidden plastic layer contaminates paper recycling!",
  },
  {
    id: 2,
    question: "Which combination creates the most effective compost?",
    options: [
      { text: "All green waste materials", isCorrect: false },
      { text: "Only fruit and vegetable scraps", isCorrect: false },
      { text: "3 parts brown to 1 part green waste", isCorrect: true },
      { text: "Equal parts green and brown waste", isCorrect: false },
    ],
    explanation: "The 3:1 ratio of brown (carbon-rich) to green (nitrogen-rich) materials creates optimal conditions for decomposition and prevents odors!",
  },
  {
    id: 3,
    question: "Which plastic recycling number is most commonly rejected by recycling facilities?",
    options: [
      { text: "#1 (PET/PETE)", isCorrect: false },
      { text: "#2 (HDPE)", isCorrect: false },
      { text: "#6 (PS)", isCorrect: true },
      { text: "#4 (LDPE)", isCorrect: false },
    ],
    explanation: "#6 (Polystyrene) is rarely accepted due to its low density and contamination risk. It often breaks into small pieces that jam sorting machines!",
  },
  {
    id: 4,
    question: "What's the hidden danger of 'wishcycling'?",
    options: [
      { text: "Takes up bin space", isCorrect: false },
      { text: "Contaminates other recyclables", isCorrect: true },
      { text: "Creates bad odors", isCorrect: false },
      { text: "Makes bins too heavy", isCorrect: false },
    ],
    explanation: "'Wishcycling' (recycling questionable items hoping they're recyclable) can contaminate entire batches of recyclables, causing them to end up in landfills!",
  },
  {
    id: 5,
    question: "Which waste disposal myth is actually harmful?",
    options: [
      { text: "Crushing cans saves space", isCorrect: false },
      { text: "Biodegradable bags are always eco-friendly", isCorrect: true },
      { text: "Glass should be sorted by color", isCorrect: false },
      { text: "Rinse containers before recycling", isCorrect: false },
    ],
    explanation: "Many 'biodegradable' bags only break down under specific industrial conditions and can actually contaminate regular compost or recycling streams!",
  }
];

export default function Level1Quiz() {
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
    if (currentQuestion < wasteQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      router.push({
        pathname: "/impact/quiz/results",
        params: { score, total: wasteQuestions.length },
      });
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/impact-background.png")}
        className="absolute w-full h-full opacity-40"
        resizeMode="cover"
      />
      <Header
        title="Stage 1"
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <View className="h-2 w-full bg-[#73D1C0] rounded-full mb-6 flex-row overflow-hidden">
            {[...Array(wasteQuestions.length)].map((_, index) => (
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
            {wasteQuestions[currentQuestion].question}
          </Text>

          {wasteQuestions[currentQuestion].options.map((option, index) => (
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
                  <Text className="text-white font-bold ml-2">Did you know?</Text>
                </View>
                <Text className="text-white">
                  {wasteQuestions[currentQuestion].explanation}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-green mt-4 p-3 rounded-xl"
                onPress={nextQuestion}
              >
                <Text className="text-white text-center font-bold">
                  {currentQuestion === wasteQuestions.length - 1
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
