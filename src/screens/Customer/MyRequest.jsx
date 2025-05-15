import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image,
  RefreshControl,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MyRequest() {
  const [activeTab, setActiveTab] = useState('active');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dummy data for requests
  const requests = {
    active: [
      {
        id: '1',
        title: 'AC Repair Service',
        description: 'My AC is not cooling properly and making strange noises',
        category: 'Appliance Repair',
        location: 'Bhopal, MP',
        date: '2023-10-15',
        time: '10:00 AM - 12:00 PM',
        status: 'pending',
        bids: 3,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
        urgency: 'high'
      },
      {
        id: '2',
        title: 'Plumbing Work',
        description: 'Need to fix leaking pipe under kitchen sink',
        category: 'Plumbing',
        location: 'Bhopal, MP',
        date: '2023-10-18',
        time: '02:00 PM - 04:00 PM',
        status: 'accepted',
        bids: 5,
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1974&auto=format&fit=crop',
        urgency: 'medium',
        acceptedVendor: {
          name: 'Rajesh Kumar',
          rating: 4.8,
          image: 'https://randomuser.me/api/portraits/men/44.jpg'
        }
      },
      {
        id: '3',
        title: 'House Cleaning',
        description: 'Need deep cleaning for 2BHK apartment',
        category: 'Cleaning',
        location: 'Bhopal, MP',
        date: '2023-10-20',
        time: '09:00 AM - 01:00 PM',
        status: 'scheduled',
        bids: 2,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
        urgency: 'low',
        acceptedVendor: {
          name: 'Cleaning Pro Services',
          rating: 4.5,
          image: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
      },
    ],
    completed: [
      {
        id: '4',
        title: 'Furniture Assembly',
        description: 'Needed help assembling a new bookshelf',
        category: 'Furniture',
        location: 'Bhopal, MP',
        date: '2023-09-28',
        time: '11:00 AM - 01:00 PM',
        status: 'completed',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2070&auto=format&fit=crop',
        vendor: {
          name: 'Amit Singh',
          rating: 4.9,
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
      },
      {
        id: '5',
        title: 'Electrical Wiring',
        description: 'Fixed faulty wiring in living room',
        category: 'Electrical',
        location: 'Bhopal, MP',
        date: '2023-09-15',
        time: '10:00 AM - 12:00 PM',
        status: 'completed',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop',
        vendor: {
          name: 'Suresh Electricals',
          rating: 4.7,
          image: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
      },
    ],
    cancelled: [
      {
        id: '6',
        title: 'Painting Service',
        description: 'Wanted to paint living room walls',
        category: 'Painting',
        location: 'Bhopal, MP',
        date: '2023-09-10',
        time: '09:00 AM - 05:00 PM',
        status: 'cancelled',
        reason: 'Vendor unavailable on requested date',
        image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=2070&auto=format&fit=crop'
      },
    ]
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#FF9800';
      case 'accepted': return '#2196F3';
      case 'scheduled': return '#9C27B0';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return 'hourglass-empty';
      case 'accepted': return 'check-circle';
      case 'scheduled': return 'event';
      case 'completed': return 'verified';
      case 'cancelled': return 'cancel';
      default: return 'info';
    }
  };

  const getUrgencyLabel = (urgency) => {
    switch(urgency) {
      case 'high': return 'Urgent';
      case 'medium': return 'Standard';
      case 'low': return 'Flexible';
      default: return '';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
      onPress={() => {/* Navigate to request details */}}
      activeOpacity={0.9}
    >
      <View className="relative">
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-40" 
          resizeMode="cover" 
        />
        
        <View 
          className="absolute top-3 right-3 px-3 py-1 rounded-full flex-row items-center"
          style={{ backgroundColor: `${getStatusColor(item.status)}20` }}
        >
          <Icon name={getStatusIcon(item.status)} size={14} color={getStatusColor(item.status)} />
          <Text 
            className="ml-1 font-medium capitalize" 
            style={{ color: getStatusColor(item.status) }}
          >
            {item.status}
          </Text>
        </View>
        
        <View className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-full">
          <Text className="text-white text-xs">{item.category}</Text>
        </View>
        
        {activeTab === 'active' && item.urgency && (
          <View 
            className="absolute bottom-3 right-3 px-3 py-1 rounded-full"
            style={{ backgroundColor: `${getUrgencyColor(item.urgency)}20` }}
          >
            <Text 
              className="text-xs font-medium" 
              style={{ color: getUrgencyColor(item.urgency) }}
            >
              {getUrgencyLabel(item.urgency)}
            </Text>
          </View>
        )}
      </View>
      
      {/* Request Content */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-1">{item.title}</Text>
        <Text className="text-gray-600 mb-3" numberOfLines={2}>{item.description}</Text>
        
        <View className="flex-row items-center mb-3">
          <Icon name="location-on" size={16} color="#666" />
          <Text className="text-gray-500 ml-1">{item.location}</Text>
          <Text className="text-gray-400 mx-2">•</Text>
          <Icon name="event" size={16} color="#666" />
          <Text className="text-gray-500 ml-1">{item.date}</Text>
        </View>
        
        {/* For active requests with bids */}
        {activeTab === 'active' && item.bids > 0 && item.status === 'pending' && (
          <View className="bg-blue-50 p-3 rounded-lg flex-row justify-between items-center">
            <View>
              <Text className="text-blue-800 font-medium">{item.bids} Bids Received</Text>
              <Text className="text-blue-600 text-xs">Tap to view and accept</Text>
            </View>
            <Icon name="arrow-forward" size={20} color="#2196F3" />
          </View>
        )}
        
        {/* For accepted or scheduled requests */}
        {activeTab === 'active' && (item.status === 'accepted' || item.status === 'scheduled') && item.acceptedVendor && (
          <View className="bg-purple-50 p-3 rounded-lg flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image 
                source={{ uri: item.acceptedVendor.image }} 
                className="w-10 h-10 rounded-full" 
              />
              <View className="ml-3">
                <Text className="text-purple-800 font-medium">{item.acceptedVendor.name}</Text>
                <View className="flex-row items-center">
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text className="text-purple-600 text-xs ml-1">{item.acceptedVendor.rating} Rating</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-purple-100 p-2 rounded-full"
              onPress={() => {/* Open chat or call */}}
            >
              <Icon name="chat" size={20} color="#9C27B0" />
            </TouchableOpacity>
          </View>
        )}
        
        {/* For completed requests */}
        {activeTab === 'completed' && (
          <View className="bg-green-50 p-3 rounded-lg">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Image 
                  source={{ uri: item.vendor.image }} 
                  className="w-10 h-10 rounded-full" 
                />
                <View className="ml-3">
                  <Text className="text-green-800 font-medium">{item.vendor.name}</Text>
                  <View className="flex-row items-center">
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text className="text-green-600 text-xs ml-1">{item.vendor.rating} Rating</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i} 
                    name="star" 
                    size={16} 
                    color={i < item.rating ? "#FFD700" : "#E0E0E0"} 
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity 
              className="bg-green-100 py-2 rounded-lg items-center"
              onPress={() => {/* Book again */}}
            >
              <Text className="text-green-700 font-medium">Book Again</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* For cancelled requests */}
        {activeTab === 'cancelled' && (
          <View className="bg-red-50 p-3 rounded-lg">
            <View className="flex-row items-center mb-1">
              <Icon name="info" size={16} color="#F44336" />
              <Text className="text-red-800 font-medium ml-1">Cancellation Reason:</Text>
            </View>
            <Text className="text-red-600">{item.reason}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View className="items-center justify-center py-10">
      <Icon name={
        activeTab === 'active' ? 'assignment' : 
        activeTab === 'completed' ? 'check-circle' : 'cancel'
      } size={60} color="#BDBDBD" />
      <Text className="text-gray-400 text-lg mt-4 text-center">
        {activeTab === 'active' ? "No active requests found" : 
         activeTab === 'completed' ? "No completed requests yet" : 
         "No cancelled requests"}
      </Text>
      {activeTab === 'active' && (
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-6 py-3 rounded-full"
          onPress={() => {/* Navigate to create request */}}
        >
          <Text className="text-white font-medium">Create New Request</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#2196F3" />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">My Requests</Text>
          <TouchableOpacity 
            className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
            onPress={() => {/* Navigate to create request */}}
          >
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Tab Navigation */}
      <View className="bg-white px-4 py-2">
        <View className="flex-row">
          <TouchableOpacity 
            className={`flex-1 py-2 ${activeTab === 'active' ? 'border-b-2 border-blue-500' : ''}`}
            onPress={() => setActiveTab('active')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'active' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              Active
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 ${activeTab === 'completed' ? 'border-b-2 border-blue-500' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'completed' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              Completed
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 ${activeTab === 'cancelled' ? 'border-b-2 border-blue-500' : ''}`}
            onPress={() => setActiveTab('cancelled')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'cancelled' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={requests[activeTab]}
        renderItem={renderRequestItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }
      />
    </SafeAreaView>
  );
}