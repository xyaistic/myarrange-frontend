import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function VendorCategory() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { id: '1', name: 'Car Service', icon: 'directions-car' },
    { id: '2', name: 'AC Service', icon: 'ac-unit' },
    { id: '3', name: 'Plumbing', icon: 'plumbing' },
    { id: '4', name: 'Electrical', icon: 'electrical-services' },
    { id: '5', name: 'Cleaning', icon: 'cleaning-services' },
    { id: '6', name: 'Painting', icon: 'format-paint' },
    { id: '7', name: 'Carpentry', icon: 'handyman' },
    { id: '8', name: 'Gardening', icon: 'grass' },
    { id: '9', name: 'Moving', icon: 'local-shipping' },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      className={`h-24 m-2 rounded-lg items-center justify-center flex-1 
        ${selectedCategory === item.id ? 'bg-green-100 border border-primary' : 'bg-white shadow-sm'}`}
    >
      <Icon name={item.icon} size={28} color={selectedCategory === item.id ? 'green' : '#666'} />
      <Text className={`mt-2 text-sm ${selectedCategory === item.id ? 'font-bold text-primary' : 'text-gray-700'}`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleContinue = () => {
    if (selectedCategory) {

      navigation.navigate('VendorDrawer');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Select Your Service Category</Text>
        <Text className="text-gray-600 mb-6">Choose the categories you want to offer services in</Text>
        
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        
        {selectedCategory && (
          <TouchableOpacity 
            className="bg-primary py-3 rounded-lg mt-4 items-center"
            onPress={handleContinue}
          >
            <Text className="text-white font-bold">Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
