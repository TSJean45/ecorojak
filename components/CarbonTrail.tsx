import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from './SectionHeader';

const CarbonTrail: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;

  const activities = [
    { id: '1', name: 'Public Transport Usage', time: 'At 09:00 AM for 7 km', impact: -50, impactTime: '25 Oct, 2024', image: require('../assets/images/commuting.png') },
    { id: '2', name: 'Cycling', time: 'At 09:00 AM for 7 km', impact: -20, impactTime: '25 Oct, 2024', image: require('../assets/images/cycling.png') },
    { id: '3', name: 'Driving', time: 'At 09:00 PM for 10 km', impact: 60, impactTime: '25 Oct, 2024', image: require('../assets/images/driving.png') },
  ];
 
  const renderActivity = ({ item }) => (
    <View className="flex-row items-center py-3 bg-white p-2 mb-1 rounded-xl">
      <Image source={item.image} className="w-12 h-12" />
      <View className="flex-1 ml-3">
        <Text className="font-bold text-md">{item.name}</Text>
        <Text className="text-gray text-xs">{item.time}</Text>
      </View>
      <View className="items-end">
        <Text className={`font-bold text-md ${item.impact < 0 ? 'text-green' : 'text-red-500'}`}>
          {item.impact < 0 ? '-' : '+'}{Math.abs(item.impact)} kg CO2
        </Text>
        <Text className="text-gray text-xs font-bold">{item.impactTime}</Text>
      </View>
    </View>
  );

  const didYouKnowItems = [
    { key: '1', icon: 'leaf-outline', title: 'Plant Trees', description: 'One tree absorbs 22kg of CO2 annually', color: '#EBFFF8' },
    { key: '2', icon: 'car-outline', title: 'Electric Cars', description: 'Produce 50% less emissions than gas cars', color: '#F8F6F8' },
    { key: '3', icon: 'water-outline', title: 'Save Water', description: 'Saves energy used in water treatment', color: '#ECFCFC' },
    { key: '4', icon: 'bulb-outline', title: 'LED Lights', description: 'Use 75% less energy than incandescent', color: '#F8F3E7' },
  ];

  const renderDidYouKnowItem = (item) => (
    <View key={item.key} className="w-1/2 p-2">
      <View 
        className="flex-row rounded-xl p-3 h-24 items-center"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, 
          backgroundColor: item.color, 
        }}
      >
        <Ionicons name={item.icon} size={24} color="black" />
        <View className="ml-2 flex-1">
          <Text className="font-bold text-sm text-black">{item.title}</Text>
          <Text className="text-black font-sans text-xs"> 
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-transparent">
      <View className="px-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-lg">Total Carbon Emission</Text>
          <Text className="text-gray text-sm">21 - 27 Oct, 2024</Text>
        </View>
        <Text className="text-gray mb-1">Average</Text>
        <Text className="font-bold text-2xl py-2">
          120 <Text className="text-sm">kg CO2</Text>
        </Text>
      </View>
      <View>
        <Image
          source={require('../assets/images/bargraph.png')}
          style={{
            width: screenWidth - 16,
            height: 180, 
            resizeMode: 'contain',
            marginHorizontal: 8, 
          }}
        />
      </View>
      
      <View className="flex-row justify-between items-center px-4 my-2">
        <Text className="font-bold text-lg">Recent Activities</Text>
        <TouchableOpacity className="bg-green p-1 rounded-full">
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="px-4">
        {activities.map((item) => renderActivity({ item }))}
      </View>

      <View className="items-end px-4 py-1">
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-black text-xs font-bold mr-1">Show More</Text>
          <Ionicons name="chevron-down" size={16} color="black" />
        </TouchableOpacity>
      </View>

      
    <SectionHeader title="Did you know that...?" />
    <View className="flex-row flex-wrap px-2">
      {didYouKnowItems.map((item) => renderDidYouKnowItem(item))}
    </View>
    </View>
  );
};

export default CarbonTrail;