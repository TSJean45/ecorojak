import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChatFAB() {
  const router = useRouter();

  return (
    <View style={{ position: 'absolute', top: '12%', right: -8, zIndex: 50 }}>
      <TouchableOpacity 
        className="w-12 h-12 justify-center items-center rounded-xl"
        onPress={() => router.push('/greenie')} // Adjust this route as needed
      >
        <Image 
          source={require('@/assets/images/greenie.png')} 
          className="w-full h-full"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
