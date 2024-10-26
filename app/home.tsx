import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Rideshare"
        onPress={() => {
          router.push('/rideshare')
        }}
      />
      <Button
        title="Go to Carbon Traveller"
        onPress={() => {
          router.push('/carbontraveller')
        }}
      />
      <Button
        title="Go to EcoLens"
        onPress={() => {
          router.push('/ecolens')
        }}
      />
    </View>
  );
}
