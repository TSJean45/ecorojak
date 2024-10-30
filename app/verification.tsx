import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Verification() {
  const [code, setCode] = React.useState(['', '', '', '', '']);
  const inputRefs = React.useRef<Array<TextInput | null>>([null, null, null, null, null]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Move to next input if there's a value and next input exists
    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="flex-1 justify-center">
          <View className="items-center">
            <View 
              className="w-16 h-16 bg-white rounded-xl items-center justify-center mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // This is for Android
              }}
            >
              <Text className="text-3xl">💬</Text>
            </View>
            <Text className="text-2xl font-bold text-center">
              Phone Verification
            </Text>
          </View>

          <View className="space-y-5">
            <Text className="text-center text-gray">
              We sent a 5-digit code to <Text className="font-bold text-black">+6012-3456789</Text>
            </Text>

            <View className="flex-row justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => inputRefs.current[index] = ref}
                  className="w-12 h-12 bg-[#F6F9F9] rounded-lg text-bold text-2xl text-center"
                  maxLength={1}
                  keyboardType="number-pad"
                  value={code[index]}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                />
              ))}
            </View>

            <TouchableOpacity>
              <Text className="text-center text-black font-sans">
                Didn't receive it? <Text className="font-bold text-green">Resend again</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-green p-2 rounded-2xl mt-6"
              onPress={() => router.push('/home')}
            >
              <Text className="text-white text-lg text-center font-bold">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}