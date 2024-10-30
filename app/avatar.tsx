import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';

export default function Avatar() {
  const [selectedAvatar, setSelectedAvatar] = useState(1); // Default avatar ID

  // Sample avatar data - replace URLs with your actual avatar images
  const avatars = [
    { id: 1, url: require('../assets/images/tapir.png') },
    { id: 2, url: require('../assets/images/hornbill.png') },
    { id: 3, url: require('../assets/images/panda.png') },
    { id: 4, url: require('../assets/images/dog.png') },
    { id: 5, url: require('../assets/images/elephant.png') },
    { id: 6, url: require('../assets/images/lion.png') },
    { id: 7, url: require('../assets/images/cat.png') },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header title="Select Your Avatar" showBackButton={true} />
      
      {/* Large selected avatar display */}
      <View className="items-center mt-10">
        <View className="w-44 h-44 rounded-full bg-celeste justify-center items-center">
          <Image 
            source={avatars.find(a => a.id === selectedAvatar)?.url}
            className="w-56 h-56"
          />
        </View>
      </View>

      {/* Select button */}
      <TouchableOpacity 
        className="bg-green mx-14 p-3 rounded-2xl mt-10"
        onPress={() => router.push("/home")}
      >
        <Text className="text-white text-center font-bold">Select</Text>
      </TouchableOpacity>

      {/* Avatar grid container */}
      <View className="flex-1 mt-5 p-4 bg-[#DAEDEC] rounded-t-3xl">
        <View className="flex-row flex-wrap justify-between">
          {avatars.map((avatar) => (
            <TouchableOpacity 
              key={avatar.id}
              className={`w-[30%] aspect-square border border-gray mb-4 rounded-full bg-white justify-center items-center
                ${selectedAvatar === avatar.id ? 'border-2 border-green' : ''}`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5, // This is for Android
              }}
              onPress={() => setSelectedAvatar(avatar.id)}
            >
              <Image 
                source={avatar.url}
                className="w-[80%] h-[80%]"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </View>
  );
}
