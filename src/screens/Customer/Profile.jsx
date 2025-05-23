import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import LoginScreen from '../LoginScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useAuthStore from '../../context/AuthContext';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('personal');
 
  const [customerData, setCustomerData] = useState({
    name: user?.username || 'Sarah Johnson',
    email: user?.email || 'sarah.johnson@example.com',
    phone: user?.phone || '+91 9876543210',
    address: user?.address || '456 Park Avenue, Bhopal, India',
    profileImage: user?.profileImage || 'https://randomuser.me/api/portraits/women/44.jpg',
    memberSince: user?.memberSince || 'March 2023',
    completedRequests: user?.completedRequests || 12,
    notifications: user?.notifications || {
      newServices: true,
      messages: true,
      updates: true,
      promotions: false
    }
  });

  useEffect(() => {
    if (user) {
      setCustomerData({
        name: user.name || customerData.name,
        email: user.email || customerData.email,
        phone: user.phone || customerData.phone,
        address: user.address || customerData.address,
        profileImage: user.profileImage || customerData.profileImage,
        memberSince: user.memberSince || customerData.memberSince,
        completedRequests: user.completedRequests || customerData.completedRequests,
        notifications: user.notifications || customerData.notifications
      });
    }
  }, [user]);

  const renderPersonalInfo = () => (
    <View className="mt-4">
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Basic Information</Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
              Full Name
            </Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
              <Icon name="person-outline" size={22} color="#888" style={{ marginRight: 10 }} />
              <Text className="flex-1 text-base text-gray-800">{customerData.name}</Text>
            </View>
          </View>

          <View>
            <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
              Email
            </Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
              <Icon name="mail-outline" size={22} color="#888" style={{ marginRight: 10 }} />
              <Text className="flex-1 text-base text-gray-800">{customerData.email}</Text>
            </View>
          </View>

          <View>
            <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
              Phone
            </Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
              <Icon name="phone" size={22} color="#888" style={{ marginRight: 10 }} />
              <Text className="flex-1 text-base text-gray-800">{customerData.phone}</Text>
            </View>
          </View>

          <View>
            <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
              Address
            </Text>
            <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
              <Icon name="location-on" size={22} color="#888" style={{ marginRight: 10 }} />
              <Text className="flex-1 text-base text-gray-800">{customerData.address}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Activity</Text>
        <View className="flex-row justify-between mb-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-500">{customerData.completedRequests}</Text>
            <Text className="text-gray-500 text-sm">Requests</Text>
          </View>
          
          <View className="items-center">
            <Icon name="event" size={24} color="#3B82F6" />
            <Text className="text-gray-500 text-sm">Member since</Text>
            <Text className="text-gray-700">{customerData.memberSince}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSecurity = () => (
    <View className="mt-4">
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Account Security</Text>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-row items-center">
            <Icon name="lock" size={20} color="#666" />
            <Text className="text-gray-800 ml-2">Change Password</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-row items-center">
            <Icon name="phone-android" size={20} color="#666" />
            <Text className="text-gray-800 ml-2">Two-Factor Authentication</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center">
            <Icon name="security" size={20} color="#666" />
            <Text className="text-gray-800 ml-2">Privacy Settings</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render notifications tab
  const renderNotifications = () => (
    <View className="mt-4">
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Notification Settings</Text>
        
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
          <Text className="text-gray-800">New Services</Text>
          <Switch
            value={customerData.notifications.newServices}
            onValueChange={(value) => setCustomerData({
              ...customerData,
              notifications: {...customerData.notifications, newServices: value}
            })}
            trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
            thumbColor={customerData.notifications.newServices ? "#3B82F6" : "#9CA3AF"}
          />
        </View>
        
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
          <Text className="text-gray-800">Messages</Text>
          <Switch
            value={customerData.notifications.messages}
            onValueChange={(value) => setCustomerData({
              ...customerData,
              notifications: {...customerData.notifications, messages: value}
            })}
            trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
            thumbColor={customerData.notifications.messages ? "#3B82F6" : "#9CA3AF"}
          />
        </View>
        
        <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
          <Text className="text-gray-800">Updates</Text>
          <Switch
            value={customerData.notifications.updates}
            onValueChange={(value) => setCustomerData({
              ...customerData,
              notifications: {...customerData.notifications, updates: value}
            })}
            trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
            thumbColor={customerData.notifications.updates ? "#3B82F6" : "#9CA3AF"}
          />
        </View>
        
        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800">Promotions</Text>
          <Switch
            value={customerData.notifications.promotions}
            onValueChange={(value) => setCustomerData({
              ...customerData,
              notifications: {...customerData.notifications, promotions: value}
            })}
            trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
            thumbColor={customerData.notifications.promotions ? "#3B82F6" : "#9CA3AF"}
          />
        </View>
      </View>
    </View>
  );

  return (
    <>
      {isAuthenticated ? (
        <SafeAreaView className="flex-1 bg-gray-50">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="bg-primary pt-4 pb-20">
              <View className="px-4">
                <Text className="text-white text-xl font-bold">My Profile</Text>
              </View>
            </View>
            
            <View className="px-4 -mt-16 mb-4">
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <View className="flex-row">
                  <View className="mr-4">
                    <Image
                      source={{ uri: customerData.profileImage }}
                      className="w-20 h-20 rounded-full border-2 border-white"
                    />
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                      <Icon name="camera-alt" size={14} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 justify-center">
                    <Text className="text-xl font-bold">{customerData.name}</Text>
                    <Text className="text-gray-500">{customerData.email}</Text>
                  </View>
                  <TouchableOpacity className="bg-blue-500 px-3 py-2 rounded-lg self-center">
                    <Text className="text-white font-semibold">Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* Tab Navigation */}
            <View className="px-4 mb-4">
              <View className="flex-row bg-gray-100 rounded-lg p-1">
                <TouchableOpacity
                  className={`flex-1 py-2 rounded-md ${activeTab === 'personal' ? 'bg-white' : ''}`}
                  onPress={() => setActiveTab('personal')}
                >
                  <Text className={`text-center font-semibold text-subheading ${activeTab === 'personal' ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}>
                    Personal
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className={`flex-1 py-2 rounded-md ${activeTab === 'security' ? 'bg-white' : ''}`}
                  onPress={() => setActiveTab('security')}
                >
                  <Text className={`text-center text-subheading ${activeTab === 'security' ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}>
                    Security
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className={`flex-1 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-white' : ''}`}
                  onPress={() => setActiveTab('notifications')}
                >
                  <Text className={`text-center text-subheading ${activeTab === 'notifications' ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}>
                    Notifications
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Tab Content */}
            <View className="px-4 pb-6">
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'security' && renderSecurity()}
              {activeTab === 'notifications' && renderNotifications()}
            </View>
            
            {/* Logout Button */}
            <View className="px-4 pb-8">
              <TouchableOpacity onPress={logout} className="flex-row items-center justify-center py-3 bg-red-50 rounded-lg">
                <Icon name="logout" size={20} color="#F44336" />
                <Text className="text-red-500 ml-2 font-semibold">Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <LoginScreen/>
      )}
    </>
  )
}
