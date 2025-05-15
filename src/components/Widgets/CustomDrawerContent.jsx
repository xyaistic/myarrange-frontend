import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthStore from '../../context/AuthContext';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuthStore();
  
  return (
    <DrawerContentScrollView {...props} className="flex-1">
      <View className="p-4 border-b border-gray-200 mb-2">
        <View className="items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden mb-2">
            {user?.profileImage ? (
              <Image 
                source={{ uri: user.profileImage }} 
                className="w-full h-full" 
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-full items-center justify-center">
                <Icon name="person" size={40} color="#666" />
              </View>
            )}
          </View>
          <Text className="font-bold text-lg">{user?.name || 'Vendor Name'}</Text>
          <Text className="text-gray-500 text-sm">{user?.email || 'vendor@example.com'}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="star" size={16} color="#FFD700" />
            <Text className="text-sm ml-1">{user?.rating || '4.8'} Rating</Text>
          </View>
        </View>
      </View>
      
      <DrawerItemList {...props} />
      
      <View className="p-4 border-t border-gray-200 mt-2">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={logout}
        >
          <Icon name="logout" size={24} color="#FF3B30" />
          <Text className="ml-3 text-red-600 font-medium">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}