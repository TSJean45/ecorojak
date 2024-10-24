 import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View className="px-4">
      <Text className="text-xl font-bold text-black">{title}</Text>
    </View>
  );
};

export default SectionHeader;