import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Greenie() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: inputText, sender: "user" },
      ]);
      setInputText("");
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: (Date.now() + 1).toString(),
            text: "Welcome to ecoRojak! I’m Greenie, your dedicated assistant, here to guide you on your green journey. How can I help you today?",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      className={`flex-row items-center m-2 ${
        item.sender === "user" ? "self-end" : "self-start"
      }`}
    >
      {item.sender === "bot" && (
        <Image
          source={require("@/assets/images/greenie-chat.png")}
          className="w-12 h-12 rounded-full mr-2"
        />
      )}
      <View
        className={`p-3 rounded-lg max-w-[80%] ${
          item.sender === "user" ? "bg-celeste" : "bg-[#EDEDED]"
        }`}
      >
        <Text className="text-base">{item.text}</Text>
      </View>
      {item.sender === "user" && (
        <Image
          source={require("@/assets/images/greenie-tapir.png")}
          className="w-12 h-12 rounded-full ml-2"
        />
      )}
    </View>
  );

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: "rgba(115, 209, 192, 0.5)",
      }}
    >
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
          <View
            className="flex-row h-24 items-center p-3"
            style={{
              backgroundColor: "rgba(115, 209, 192, 0.5)",
            }}
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
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
