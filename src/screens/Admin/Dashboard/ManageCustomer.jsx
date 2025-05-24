import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function ManageCustomer() {
  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+91 9876543210',
      location: 'Bhopal, MP',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      phone: '+91 8765432109',
      location: 'Indore, MP',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    {
      id: '3',
      name: 'Priya Sharma',
      phone: '+91 7654321098',
      location: 'Bhopal, MP',
      status: 'inactive',
      image: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    {
      id: '4',
      name: 'Raj Patel',
      phone: '+91 9988776655',
      location: 'Gwalior, MP',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '5',
      name: 'Emma Wilson',
      phone: '+91 8877665544',
      location: 'Jabalpur, MP',
      status: 'active',
      image: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  ]);

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl shadow-sm mb-3 p-4 flex-row items-center"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image }}
        className="w-14 h-14 rounded-full"
      />
      <View className="ml-4 flex-1">
        <Text className="font-bold text-heading-4 text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 text-subheading">{item.phone}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="location-on" size={13} color="#6B7280" />
          <Text className="text-gray-500 text-subheading ml-1">{item.location}</Text>
        </View>
      </View>
      <View className={`px-3 py-1.5 rounded-full ${item.status === 'active' ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Text className={`text-xs font-medium ${item.status === 'active' ? 'text-green-700' : 'text-gray-700'}`}>
          {item.status === 'active' ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800">Customers</Text>
          <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-lg flex-row items-center">
            <Icon name="add" size={20} color="#FFFFFF" />
            <Text className="text-white font-medium ml-1">Add New</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={customers}
          renderItem={renderCustomerItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}
