import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function VendorDashboard() {
  // Dummy data for stats
  const stats = [
    { id: '1', title: 'Total Bids', value: '24', icon: 'gavel', color: '#4CAF50' },
    { id: '2', title: 'Active Jobs', value: '3', icon: 'work', color: '#2196F3' },
    { id: '3', title: 'Completed', value: '18', icon: 'check-circle', color: '#9C27B0' },
    { id: '4', title: 'Earnings', value: '$1,240', icon: 'attach-money', color: '#FF9800' },
  ];

  // Dummy data for recent requests
  const recentRequests = [
    { 
      id: '1', 
      title: 'AC Repair Needed', 
      customer: 'John Doe',
      location: 'Bhopal, India',
      time: '2 hours ago',
      status: 'new'
    },
    { 
      id: '2', 
      title: 'Plumbing Work', 
      customer: 'Jane Smith',
      location: 'Bhopal, India',
      time: '5 hours ago',
      status: 'new'
    },
    { 
      id: '3', 
      title: 'Electrical Wiring', 
      customer: 'Mike Johnson',
      location: 'Bhopal, India',
      time: '1 day ago',
      status: 'new'
    },
  ];

  // Dummy data for active jobs
  const activeJobs = [
    { 
      id: '1', 
      title: 'Kitchen Renovation', 
      customer: 'Sarah Williams',
      location: 'Bhopal, India',
      progress: 75,
      dueDate: 'Oct 15, 2023'
    },
    { 
      id: '2', 
      title: 'Bathroom Plumbing', 
      customer: 'Robert Brown',
      location: 'Bhopal, India',
      progress: 40,
      dueDate: 'Oct 20, 2023'
    },
    { 
      id: '3', 
      title: 'Living Room Painting', 
      customer: 'Emily Davis',
      location: 'Bhopal, India',
      progress: 90,
      dueDate: 'Oct 12, 2023'
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

  // Render recent request item
  const renderRequestItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white p-3 rounded-lg shadow-sm mb-3 flex-row items-center"
      onPress={() => {/* Navigate to request details */}}
    >
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: '#E3F2FD' }}
      >
        <Icon name="assignment" size={20} color="#2196F3" />
      </View>
      
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold">{item.title}</Text>
          <View className="bg-green-100 px-2 py-0.5 rounded">
            <Text className="text-green-800 text-xs">New</Text>
          </View>
        </View>
        
        <View className="flex-row items-center mt-1">
          <Text className="text-gray-600 text-xs">{item.customer}</Text>
          <Text className="text-gray-400 text-xs mx-1">•</Text>
          <Text className="text-gray-400 text-xs">{item.time}</Text>
        </View>
        
        <View className="flex-row items-center mt-1">
          <Icon name="location-on" size={12} color="#666" />
          <Text className="text-gray-500 text-xs ml-1">{item.location}</Text>
        </View>
      </View>
      
      <Icon name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  // Render active job item
  const renderActiveJobItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white p-3 rounded-lg shadow-sm mb-3"
      onPress={() => {/* Navigate to job details */}}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-bold">{item.title}</Text>
        <Text className="text-xs text-gray-500">Due: {item.dueDate}</Text>
      </View>
      
      <View className="flex-row items-center mb-2">
        <Icon name="person" size={14} color="#666" />
        <Text className="text-gray-600 text-xs ml-1">{item.customer}</Text>
        <Text className="text-gray-400 text-xs mx-1">•</Text>
        <Icon name="location-on" size={14} color="#666" />
        <Text className="text-gray-500 text-xs ml-1">{item.location}</Text>
      </View>
      
      <View className="mt-1">
        <View className="flex-row justify-between mb-1">
          <Text className="text-xs text-gray-600">Progress</Text>
          <Text className="text-xs font-medium">{item.progress}%</Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full rounded-full" 
            style={{ 
              width: `${item.progress}%`,
              backgroundColor: item.progress > 75 ? '#4CAF50' : item.progress > 40 ? '#FFC107' : '#2196F3'
            }} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome section */}
        <View className="p-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold">Welcome back!</Text>
          <Text className="text-gray-600">Here's what's happening with your business today.</Text>
        </View>
        
        {/* Stats section */}
        <View className="p-4">
          <Text className="text-lg font-bold mb-3">Overview</Text>
          <FlatList
            data={stats}
            renderItem={renderStatItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
        
        {/* Recent requests section */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">Recent Requests</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentRequests.map(item => (
            <View key={item.id}>
              {renderRequestItem({ item })}
            </View>
          ))}
        </View>
        
        {/* Active jobs section */}
        <View className="p-4 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">Active Jobs</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          
          {activeJobs.map(item => (
            <View key={item.id}>
              {renderActiveJobItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}