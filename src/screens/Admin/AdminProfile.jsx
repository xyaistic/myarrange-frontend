
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import useAuthStore from '../../context/AuthContext';

export default function AdminProfile() {
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dummy admin data
  const [adminData, setAdminData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@admin.com',
    phone: '+91 9876543210',
    role: 'System Administrator',
    profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    memberSince: 'January 2022',
    lastLogin: 'Today, 09:45 AM',
    stats: {
      usersManaged: 156,
      vendorsApproved: 42,
      reportsReviewed: 89,
      systemUpdates: 12
    },
    notifications: {
      newUsers: true,
      systemAlerts: true,
      reports: true,
      updates: false
    }
  });

  const renderHeader = () => (
    <View className="bg-indigo-900 pt-10 pb-6 px-4">
      <View className="flex-row items-center">
        <View className="bg-indigo-700 p-0.5 rounded-xl">
          <Image
            source={{ uri: adminData.profileImage }}
            className="w-16 h-16 rounded-lg"
          />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-white text-xl font-bold">{adminData.name}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="verified-user" size={14} color="#A5B4FC" />
            <Text className="text-indigo-200 ml-1">{adminData.role}</Text>
          </View>
          <Text className="text-indigo-200 text-xs mt-1">{adminData.email}</Text>
        </View>
        <TouchableOpacity 
          className="bg-indigo-700 p-2 rounded-full"
          onPress={() => {/* Edit profile action */}}
        >
          <Icon name="edit" size={20} color="#E0E7FF" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-between mt-6 bg-indigo-800 rounded-xl p-3">
        <TouchableOpacity 
          className={`py-2 px-4 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-600' : ''}`}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text className="text-white font-medium">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`py-2 px-4 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-600' : ''}`}
          onPress={() => setActiveTab('settings')}
        >
          <Text className="text-white font-medium">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`py-2 px-4 rounded-lg ${activeTab === 'security' ? 'bg-indigo-600' : ''}`}
          onPress={() => setActiveTab('security')}
        >
          <Text className="text-white font-medium">Security</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDashboard = () => (
    <View className="px-4 pt-4">
      <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <View className="bg-indigo-50 px-4 py-3 border-l-4 border-indigo-500">
          <Text className="text-indigo-900 font-bold">Admin Statistics</Text>
        </View>
        
        <View className="p-4">
          <View className="flex-row flex-wrap">
            <View className="w-1/2 p-2">
              <View className="bg-indigo-50 p-3 rounded-xl">
                <Icon name="people" size={24} color="#4F46E5" />
                <Text className="text-2xl font-bold text-indigo-900 mt-2">{adminData.stats.usersManaged}</Text>
                <Text className="text-indigo-700 text-xs">Users Managed</Text>
              </View>
            </View>
            
            <View className="w-1/2 p-2">
              <View className="bg-green-50 p-3 rounded-xl">
                <Icon name="store" size={24} color="#10B981" />
                <Text className="text-2xl font-bold text-green-900 mt-2">{adminData.stats.vendorsApproved}</Text>
                <Text className="text-green-700 text-xs">Vendors Approved</Text>
              </View>
            </View>
            
            <View className="w-1/2 p-2">
              <View className="bg-amber-50 p-3 rounded-xl">
                <Icon name="assessment" size={24} color="#F59E0B" />
                <Text className="text-2xl font-bold text-amber-900 mt-2">{adminData.stats.reportsReviewed}</Text>
                <Text className="text-amber-700 text-xs">Reports Reviewed</Text>
              </View>
            </View>
            
            <View className="w-1/2 p-2">
              <View className="bg-purple-50 p-3 rounded-xl">
                <Icon name="system-update" size={24} color="#8B5CF6" />
                <Text className="text-2xl font-bold text-purple-900 mt-2">{adminData.stats.systemUpdates}</Text>
                <Text className="text-purple-700 text-xs">System Updates</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <View className="bg-indigo-50 px-4 py-3 border-l-4 border-indigo-500">
          <Text className="text-indigo-900 font-bold">Account Information</Text>
        </View>
        
        <View className="p-4">
          <View className="flex-row items-center py-3 border-b border-gray-100">
            <Icon name="phone" size={20} color="#4F46E5" />
            <Text className="ml-3 text-gray-600">Phone</Text>
            <Text className="ml-auto text-gray-800 font-medium">{adminData.phone}</Text>
          </View>
          
          <View className="flex-row items-center py-3 border-b border-gray-100">
            <Icon name="event" size={20} color="#4F46E5" />
            <Text className="ml-3 text-gray-600">Member Since</Text>
            <Text className="ml-auto text-gray-800 font-medium">{adminData.memberSince}</Text>
          </View>
          
          <View className="flex-row items-center py-3">
            <Icon name="access-time" size={20} color="#4F46E5" />
            <Text className="ml-3 text-gray-600">Last Login</Text>
            <Text className="ml-auto text-gray-800 font-medium">{adminData.lastLogin}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View className="px-4 pt-4">
      <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <View className="bg-indigo-50 px-4 py-3 border-l-4 border-indigo-500">
          <Text className="text-indigo-900 font-bold">Notification Preferences</Text>
        </View>
        
        <View className="p-4">
          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center">
                <Icon name="person-add" size={16} color="#4F46E5" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">New User Registrations</Text>
                <Text className="text-gray-500 text-xs">Get notified when new users register</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => setAdminData({
                ...adminData, 
                notifications: {
                  ...adminData.notifications,
                  newUsers: !adminData.notifications.newUsers
                }
              })}
            >
              <View className={`w-12 h-6 rounded-full ${adminData.notifications.newUsers ? 'bg-indigo-500' : 'bg-gray-300'} flex-row items-center p-1`}>
                <View className={`w-4 h-4 rounded-full bg-white ${adminData.notifications.newUsers ? 'ml-6' : 'ml-0'}`} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center">
                <Icon name="warning" size={16} color="#EF4444" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">System Alerts</Text>
                <Text className="text-gray-500 text-xs">Critical system notifications</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => setAdminData({
                ...adminData, 
                notifications: {
                  ...adminData.notifications,
                  systemAlerts: !adminData.notifications.systemAlerts
                }
              })}
            >
              <View className={`w-12 h-6 rounded-full ${adminData.notifications.systemAlerts ? 'bg-indigo-500' : 'bg-gray-300'} flex-row items-center p-1`}>
                <View className={`w-4 h-4 rounded-full bg-white ${adminData.notifications.systemAlerts ? 'ml-6' : 'ml-0'}`} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
                <Icon name="assessment" size={16} color="#3B82F6" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">Reports</Text>
                <Text className="text-gray-500 text-xs">Weekly and monthly reports</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => setAdminData({
                ...adminData, 
                notifications: {
                  ...adminData.notifications,
                  reports: !adminData.notifications.reports
                }
              })}
            >
              <View className={`w-12 h-6 rounded-full ${adminData.notifications.reports ? 'bg-indigo-500' : 'bg-gray-300'} flex-row items-center p-1`}>
                <View className={`w-4 h-4 rounded-full bg-white ${adminData.notifications.reports ? 'ml-6' : 'ml-0'}`} />
              </View>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-purple-100 items-center justify-center">
                <Icon name="system-update" size={16} color="#8B5CF6" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">System Updates</Text>
                <Text className="text-gray-500 text-xs">Platform update notifications</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => setAdminData({
                ...adminData, 
                notifications: {
                  ...adminData.notifications,
                  updates: !adminData.notifications.updates
                }
              })}
            >
              <View className={`w-12 h-6 rounded-full ${adminData.notifications.updates ? 'bg-indigo-500' : 'bg-gray-300'} flex-row items-center p-1`}>
                <View className={`w-4 h-4 rounded-full bg-white ${adminData.notifications.updates ? 'ml-6' : 'ml-0'}`} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSecurity = () => (
    <View className="px-4 pt-4">
      <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <View className="bg-indigo-50 px-4 py-3 border-l-4 border-indigo-500">
          <Text className="text-indigo-900 font-bold">Security Settings</Text>
        </View>
        
        <View className="p-4">
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center">
                <Icon name="lock" size={16} color="#4F46E5" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">Change Password</Text>
                <Text className="text-gray-500 text-xs">Last changed 30 days ago</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center">
                <Icon name="verified-user" size={16} color="#4F46E5" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">Two-Factor Authentication</Text>
                <Text className="text-gray-500 text-xs">Enabled</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center">
                <Icon name="devices" size={16} color="#4F46E5" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-800 font-medium">Manage Devices</Text>
                <Text className="text-gray-500 text-xs">2 active devices</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#312E81" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'security' && renderSecurity()}
        
        <View className="px-4 py-6">
          <TouchableOpacity 
            onPress={logout} 
            className="flex-row items-center justify-center py-3 bg-red-50 rounded-xl"
          >
            <Icon name="logout" size={20} color="#EF4444" />
            <Text className="text-red-500 ml-2 font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

