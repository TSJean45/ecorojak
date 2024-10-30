import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

const useTypewriter = (text: string, speed: number = 50) => {
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

const Message = ({ text, isBot, onComplete }: { text: string; isBot: boolean; onComplete: () => void }) => {
  const { displayedText, isComplete } = useTypewriter(text);

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete]);

  return (
    <View className={`flex-row ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <View 
        className={`rounded-lg p-3 max-w-[80%] ${
          isBot ? 'bg-[#EDEDED]' : 'bg-celeste'
        }`}
      >
        <Text>{displayedText}</Text>
      </View>
    </View>
  );
};

const conversations = [
  { text: "Hey, EcoBot! I'm at the recycling drive and I want to maximize my contribution. What should I focus on today?", isBot: false },
  { text: "Hello! Focus on sorting your items correctly. I can help you identify what materials to prioritize for recycling.", isBot: true },
  { text: "Awesome! Can you tell me what common household items are often not recyclable?", isBot: false },
  { text: "Certainly! Items like pizza boxes, plastic bags, and certain types of glass can't be recycled. Make sure to keep them separate!", isBot: true },
  { text: "Got it! What about this old battery? Is there a special way to dispose of that?", isBot: false },
  { text: "Yes! Batteries should not be placed in regular recycling bins. Check for designated drop-off locations for hazardous waste in your area.", isBot: true },
];

export default function TypewriterChat() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);

  const handleMessageComplete = () => {
    if (currentMessageIndex < conversations.length - 1) {
      setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
        setDisplayedMessages([...displayedMessages, conversations[currentMessageIndex]]);
      }, 1000); // Delay before showing next message
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      {displayedMessages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isBot={message.isBot}
          onComplete={() => {}}
        />
      ))}
      {currentMessageIndex < conversations.length && (
        <Message
          text={conversations[currentMessageIndex].text}
          isBot={conversations[currentMessageIndex].isBot}
          onComplete={handleMessageComplete}
        />
      )}
    </ScrollView>
  );
} 