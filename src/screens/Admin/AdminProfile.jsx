import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useAuthStore from '../../context/AuthContext';

export default function AdminProfile() {
    const { logout } = useAuthStore();
 
  

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
  
          <TouchableOpacity 
            onPress={()=>{logout()}} 
            className="flex-row items-center justify-center py-3 bg-red-50 rounded-lg"
          >
            <Icon name="logout" size={20} color="#F44336" />
            <Text className="text-red-500 ml-2 font-semibold">Logout</Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}
