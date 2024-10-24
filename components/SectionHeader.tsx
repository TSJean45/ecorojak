 import React from 'react';
import { View, Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View className="py-2 px-4 bg-gray-200">
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
    </View>
  );
};

export default SectionHeader;