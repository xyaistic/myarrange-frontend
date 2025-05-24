import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AdminDashboad() {
  // Dummy data for stats
  const stats = [
    { id: '1', title: 'Total Users', value: '1,245', icon: 'people', color: '#3c8b27' },
    { id: '2', title: 'Active Vendors', value: '87', icon: 'store', color: '#106099' },
    { id: '3', title: 'Services', value: '156', icon: 'miscellaneous-services', color: '#FFA828' },
    { id: '4', title: 'Revenue', value: '$12,450', icon: 'attach-money', color: '#EF4444' },
  ];

  // Dummy data for recent activities
  const recentActivities = [
    { 
      id: '1', 
      title: 'New Vendor Registration', 
      user: 'John Smith',
      time: '2 hours ago',
      type: 'vendor'
    },
    { 
      id: '2', 
      title: 'New Service Added', 
      user: 'AC Repair Services',
      time: '5 hours ago',
      type: 'service'
    },
    { 
      id: '3', 
      title: 'Customer Complaint', 
      user: 'Sarah Johnson',
      time: '1 day ago',
      type: 'customer'
    },
  ];

  // Render stat item
  const renderStatItem = ({ item }) => (
    <View className="flex-1 bg-white rounded-lg p-4 m-1 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Icon name={item.icon} size={20} color={item.color} />
        </View>
        <Text className="text-lg font-bold">{item.value}</Text>
      </View>
      <Text className="text-gray-600 mt-2 text-sm">{item.title}</Text>
    </View>
  );

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch(type) {
      case 'vendor': return 'store';
      case 'service': return 'miscellaneous-services';
      case 'customer': return 'person';
      default: return 'info';
    }
  };

  // Get color for activity type
  const getActivityColor = (type) => {
    switch(type) {
      case 'vendor': return '#106099';
      case 'service': return '#FFA828';
      case 'customer': return '#3c8b27';
      default: return '#666';
    }
  };

  // Render activity item
  const renderActivityItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white p-3 rounded-lg shadow-sm mb-3 flex-row items-center"
    >
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${getActivityColor(item.type)}20` }}
      >
        <Icon name={getActivityIcon(item.type)} size={20} color={getActivityColor(item.type)} />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-heading-default">{item.title}</Text>
        <View className="flex-row items-center">
          <Text className="text-subheading-default text-xs">{item.user}</Text>
          <Text className="text-gray-400 text-xs mx-1">•</Text>
          <Text className="text-gray-500 text-xs">{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome section */}
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-heading-default">Admin Dashboard</Text>
          <Text className="text-subheading-default">Here's what's happening with your platform today.</Text>
        </View>
        
        {/* Stats section */}
        <View className="p-4">
          <Text className="text-lg font-bold mb-3 text-heading-default">Overview</Text>
          <FlatList
            data={stats}
            renderItem={renderStatItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
        
        {/* Recent activities section */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-heading-default">Recent Activities</Text>
            <TouchableOpacity>
              <Text className="text-primary">See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentActivities.map(item => (
            <View key={item.id}>
              {renderActivityItem({ item })}
            </View>
          ))}
        </View>
        
        {/* Quick actions section */}
        <View className="p-4 mb-4">
          <Text className="text-lg font-bold mb-3 text-heading-default">Quick Actions</Text>
          <View className="flex-row justify-between bg-white p-4 rounded-lg shadow-sm">
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-1">
                <Icon name="person-add" size={24} color="#106099" />
              </View>
              <Text className="text-xs text-gray-700">Add User</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-1">
                <Icon name="add-business" size={24} color="#3c8b27" />
              </View>
              <Text className="text-xs text-gray-700">Add Vendor</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-1">
                <Icon name="add-circle" size={24} color="#FFA828" />
              </View>
              <Text className="text-xs text-gray-700">Add Service</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-1">
                <Icon name="settings" size={24} color="#EF4444" />
              </View>
              <Text className="text-xs text-gray-700">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}