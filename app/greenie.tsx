import React, { useState, useEffect, useRef } from "react";
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

const useTypewriter = (text: string, speed: number = 20) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
};

const TypewriterMessage = ({ text, onComplete }) => {
  const { displayedText, isComplete } = useTypewriter(text);

  useEffect(() => {
    if (isComplete) {
      onComplete?.();
    }
  }, [isComplete]);

  return <Text className="text-base">{displayedText}</Text>;
};

export default function Greenie() {
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const insets = useSafeAreaInsets();

  // Predefined conversation
  const conversationFlow = [
    {
      id: "1",
      text: "Hey, EcoBot! I'm at the recycling drive and I want to maximize my contribution. What should I focus on today?",
      sender: "user",
      isComplete: true,
    },
    {
      id: "2",
      text: "Hello! Focus on sorting your items correctly. I can help you identify what materials to prioritize for recycling.",
      sender: "bot",
      isComplete: false,
    },
    {
      id: "3",
      text: "Awesome! Can you tell me what common household items are often not recyclable?",
      sender: "user",
      isComplete: true,
    },
    {
      id: "4",
      text: "Certainly! Items like pizza boxes, plastic bags, and certain types of glass can't be recycled. Make sure to keep them separate!",
      sender: "bot",
      isComplete: false,
    },
    {
      id: "5",
      text: "Got it! What about this old battery? Is there a special way to dispose of that?",
      sender: "user",
      isComplete: true,
    },
    {
      id: "6",
      text: "Yes! Batteries should not be placed in regular recycling bins. Check for designated drop-off locations for hazardous waste in your area.",
      sender: "bot",
      isComplete: false,
    },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      displayNextMessage();
    }
  }, []);

  useEffect(() => {
    if (currentMessageIndex > 0 && currentMessageIndex < conversationFlow.length) {
      const currentMessage = conversationFlow[currentMessageIndex - 1];
      if (currentMessage.sender === "user") {
        const timer = setTimeout(() => {
          displayNextMessage();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentMessageIndex]);

  const displayNextMessage = () => {
    if (currentMessageIndex < conversationFlow.length) {
      const nextMessage = conversationFlow[currentMessageIndex];
      setMessages(prev => [...prev, nextMessage]);
      setIsTyping(nextMessage.sender === "bot");
      setCurrentMessageIndex(prev => prev + 1);
    }
  };

  const handleMessageComplete = (messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, isComplete: true } : msg
      )
    );
    setIsTyping(false);
    
    if (currentMessageIndex < conversationFlow.length) {
      displayNextMessage();
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        isComplete: true,
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText("");
      setIsTyping(true);

      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: "I understand your question. Let me help you with that! What specific information would you like to know about recycling?",
          sender: "bot",
          isComplete: false,
        };
        setMessages(prev => [...prev, botMessage]);
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
        {item.sender === "bot" && !item.isComplete ? (
          <TypewriterMessage 
            text={item.text} 
            onComplete={() => handleMessageComplete(item.id)}
          />
        ) : (
          <Text className="text-base">{item.text}</Text>
        )}
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
        source={require("@/assets/images/greenie-chat.jpg")}
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
                editable={!isTyping}
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
              disabled={isTyping || !inputText.trim()}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
