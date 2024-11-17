import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { generateAIResponse } from "@/utils/greenieAI";

export default function Greenie() {
  const [messages, setMessages] = useState([
    {
      id: "initial",
      text: "Hi! I'm Greenie, your eco-assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const userMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: "user",
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsLoading(true);

      try {
        const aiResponse = await generateAIResponse(inputText);

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            sender: "bot",
          },
        ]);
      } catch (error) {
        console.error("Error in chat:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "I'm having trouble responding right now. Please try again.",
            sender: "bot",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const quickActions = [
    { title: "Show my daily tasks", icon: "task" },
    { title: "Check carbon footprint", icon: "eco" },
    { title: "Recycling progress", icon: "recycling" },
    { title: "View eco status", icon: "insights" },
  ];

  const renderMessage = ({ item, index }) => (
    <View>
      <View
        className={`flex-row ${
          item.sender === "user" ? "justify-end" : "justify-start"
        } mb-4`}
      >
        {item.sender === "bot" && (
          <View className="w-8 h-8 rounded-full mr-2 overflow-hidden">
            <Image
              source={require("@/assets/images/greenie-chat.png")}
              className="w-full h-full"
            />
          </View>
        )}
        <View
          className={`rounded-2xl px-4 py-3 max-w-[80%] ${
            item.sender === "user" ? "bg-green" : "bg-white"
          }`}
        >
          <Text
            className={item.sender === "user" ? "text-white" : "text-gray-800"}
          >
            {item.text}
          </Text>
        </View>
      </View>

      {index === 0 && item.sender === "bot" && showQuickActions && (
        <View className="ml-10 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 mr-2 flex-row items-center"
                onPress={() => {
                  setInputText(action.title);
                  handleSend();
                }}
              >
                <MaterialIcons name={action.icon} size={16} color="#22C55E" />
                <Text className="text-sm text-gray-700 ml-2">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const renderDropdown = () =>
    showDropdown && (
      <View className="absolute bottom-24 right-4 bg-white rounded-lg shadow-lg z-50">
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center px-4 py-3 border-b border-gray-100"
            onPress={() => {
              setInputText(action.title);
              setShowDropdown(false);
              handleSend();
            }}
          >
            <MaterialIcons name={action.icon} size={20} color="#22C55E" />
            <Text className="ml-3 text-gray-700">{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/greenie-background.png")}
        className="h-[92%] flex-1 justify-center"
      >
        <Header
          title="Chat"
          rightButton={{
            icon: "time-outline",
            onPress: () => console.log("History button pressed"),
          }}
        />
        <View
          className="flex-1 bg-transparent"
          style={{ paddingBottom: insets.bottom + 66 }}
        >
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: 10,
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          />
          {renderDropdown()}
          <View
            className="flex-row h-24 items-center p-3"
          >
            <View className="flex-1 flex-row items-center bg-white border border-gray-300 rounded-full px-3">
              <TouchableOpacity>
                <Ionicons name="mic-outline" size={24} color="gray" />
              </TouchableOpacity>
              <TextInput
                className="flex-1 mx-2 p-2"
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message..."
                editable={!isLoading}
              />
              <TouchableOpacity>
                <Ionicons name="happy-outline" size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity className="ml-2">
                <Ionicons name="image-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="bg-tiffany rounded-full p-3 ml-2 justify-center items-center"
              onPress={handleSend}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="send" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
