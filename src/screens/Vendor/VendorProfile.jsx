import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function VendorProfile() {
  // Dummy vendor data
  const [vendorData, setVendorData] = useState({
    name: 'John Carpenter',
    email: 'john.carpenter@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Bhopal, India',
    bio: 'Professional carpenter with over 10 years of experience in custom furniture, home renovations, and woodworking projects.',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    reviewCount: 47,
    completedJobs: 86,
    memberSince: 'January 2022',
    services: [
      { id: '1', name: 'Furniture Assembly', price: '$50/hr' },
      { id: '2', name: 'Custom Cabinets', price: '$75/hr' },
      { id: '3', name: 'Home Repairs', price: '$45/hr' }
    ],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    notifications: {
      newRequests: true,
      messages: true,
      jobUpdates: true,
      promotions: false
    },
    documents: [
      { id: '1', name: 'ID Proof', verified: true },
      { id: '2', name: 'Business License', verified: true },
      { id: '3', name: 'Insurance Certificate', verified: false }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const toggleAvailability = (day) => {
    setVendorData({
      ...vendorData,
      availability: {
        ...vendorData.availability,
        [day]: !vendorData.availability[day]
      }
    });
  };

  // Toggle notification setting
  const toggleNotification = (type) => {
    setVendorData({
      ...vendorData,
      notifications: {
        ...vendorData.notifications,
        [type]: !vendorData.notifications[type]
      }
    });
  };

  // Save profile changes
  const saveChanges = () => {
    // In a real app, you would send the updated data to your API
    Alert.alert('Success', 'Profile updated successfully');
    setIsEditing(false);
  };

  // Render profile information tab
  const renderProfileTab = () => (
    <View className="mt-4">
      {/* Basic Info Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Basic Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text className="text-blue-500">{isEditing ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-500 text-sm mb-1">Full Name</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={vendorData.name}
                onChangeText={(text) => setVendorData({...vendorData, name: text})}
              />
            ) : (
              <Text className="text-gray-800">{vendorData.name}</Text>
            )}
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1">Email</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={vendorData.email}
                onChangeText={(text) => setVendorData({...vendorData, email: text})}
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-gray-800">{vendorData.email}</Text>
            )}
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1">Phone</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={vendorData.phone}
                onChangeText={(text) => setVendorData({...vendorData, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-gray-800">{vendorData.phone}</Text>
            )}
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1">Address</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={vendorData.address}
                onChangeText={(text) => setVendorData({...vendorData, address: text})}
                multiline
              />
            ) : (
              <Text className="text-gray-800">{vendorData.address}</Text>
            )}
          </View>

          <View>
            <Text className="text-gray-500 text-sm mb-1">Bio</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={vendorData.bio}
                onChangeText={(text) => setVendorData({...vendorData, bio: text})}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            ) : (
              <Text className="text-gray-800">{vendorData.bio}</Text>
            )}
          </View>

          {isEditing && (
            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-md items-center mt-2"
              onPress={saveChanges}
            >
              <Text className="text-white font-medium">Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Stats Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Stats & Achievements</Text>
        
        <View className="flex-row justify-between mb-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-500">{vendorData.rating}</Text>
            <Text className="text-gray-500 text-sm">Rating</Text>
          </View>
          
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-500">{vendorData.reviewCount}</Text>
            <Text className="text-gray-500 text-sm">Reviews</Text>
          </View>
          
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-500">{vendorData.completedJobs}</Text>
            <Text className="text-gray-500 text-sm">Jobs Done</Text>
          </View>
        </View>
        
        <View className="flex-row items-center">
          <Icon name="event" size={16} color="#666" />
          <Text className="text-gray-500 ml-2">Member since {vendorData.memberSince}</Text>
        </View>
      </View>

      {/* Services Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Services Offered</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">Add New</Text>
          </TouchableOpacity>
        </View>
        
        {vendorData.services.map(service => (
          <View key={service.id} className="flex-row justify-between items-center py-2 border-b border-gray-100">
            <Text className="text-gray-800">{service.name}</Text>
            <View className="flex-row items-center">
              <Text className="text-gray-600 mr-2">{service.price}</Text>
              <TouchableOpacity>
                <Icon name="edit" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // Render settings tab
  const renderSettingsTab = () => (
    <View className="mt-4">
      {/* Availability Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Availability</Text>
        
        {Object.entries(vendorData.availability).map(([day, isAvailable]) => (
          <View key={day} className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-800 capitalize">{day}</Text>
            <Switch
              value={isAvailable}
              onValueChange={() => toggleAvailability(day)}
              trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
              thumbColor={isAvailable ? "#3B82F6" : "#9CA3AF"}
            />
          </View>
        ))}
      </View>

      {/* Notifications Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Notification Settings</Text>
        
        {Object.entries(vendorData.notifications).map(([type, isEnabled]) => (
          <View key={type} className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <View>
              <Text className="text-gray-800 capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</Text>
              <Text className="text-gray-500 text-xs">
                {type === 'newRequests' ? 'Get notified about new service requests' :
                 type === 'messages' ? 'Get notified about new messages' :
                 type === 'jobUpdates' ? 'Get notified about job status changes' :
                 'Get notified about promotions and offers'}
              </Text>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={() => toggleNotification(type)}
              trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
              thumbColor={isEnabled ? "#3B82F6" : "#9CA3AF"}
            />
          </View>
        ))}
      </View>

      {/* Documents Section */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Documents & Verification</Text>
        
        {vendorData.documents.map(doc => (
          <View key={doc.id} className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Icon name="description" size={20} color="#666" />
              <Text className="text-gray-800 ml-2">{doc.name}</Text>
            </View>
            <View className="flex-row items-center">
              {doc.verified ? (
                <>
                  <Icon name="verified" size={16} color="#4CAF50" />
                  <Text className="text-green-600 ml-1">Verified</Text>
                </>
              ) : (
                <>
                  <Icon name="pending" size={16} color="#FFC107" />
                  <Text className="text-yellow-600 ml-1">Pending</Text>
                </>
              )}
            </View>
          </View>
        ))}
        
        <TouchableOpacity className="flex-row items-center justify-center mt-4 p-2 border border-dashed border-gray-300 rounded-md">
          <Icon name="add" size={20} color="#3B82F6" />
          <Text className="text-blue-500 ml-1">Upload New Document</Text>
        </TouchableOpacity>
      </View>

      {/* Account Actions */}
      <View className="bg-white rounded-lg p-4 mb-4">
        <Text className="text-lg font-bold mb-4">Account</Text>
        
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
          <Icon name="lock" size={20} color="#666" />
          <Text className="text-gray-800 ml-2">Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
          <Icon name="help" size={20} color="#666" />
          <Text className="text-gray-800 ml-2">Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
          <Icon name="privacy-tip" size={20} color="#666" />
          <Text className="text-gray-800 ml-2">Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center py-3">
          <Icon name="logout" size={20} color="#F44336" />
          <Text className="text-red-500 ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-blue-500 pt-4 pb-20">
          <View className="px-4">
            <Text className="text-white text-xl font-bold">My Profile</Text>
          </View>
        </View>
        
        {/* Profile Card */}
        <View className="px-4 -mt-16 mb-4">
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <View className="flex-row">
              <View className="mr-4">
                <Image
                  source={{ uri: vendorData.profileImage }}
                  className="w-20 h-20 rounded-full border-2 border-white"
                />
                <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <Icon name="camera-alt" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
              
              <View className="flex-1 justify-center">
                <Text className="text-xl font-bold">{vendorData.name}</Text>
                <View className="flex-row items-center mt-1">
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text className="text-gray-700 ml-1">{vendorData.rating} Rating</Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Icon name="location-on" size={14} color="#666" />
                  <Text className="text-gray-500 text-sm ml-1">
                    {vendorData.address.split(',').pop().trim()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Tab Navigation */}
        <View className="px-4 mb-4">
          <View className="flex-row bg-gray-100 rounded-lg p-1">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${activeTab === 'profile' ? 'bg-white' : ''}`}
              onPress={() => setActiveTab('profile')}
            >
              <Text className={`text-center uppercase text-subheading ${activeTab === 'profile' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                Profile
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${activeTab === 'settings' ? 'bg-white' : ''}`}
              onPress={() => setActiveTab('settings')}
            >
              <Text className={`text-center uppercase text-subheading ${activeTab === 'settings' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Tab Content */}
        <View className="px-4 pb-6">
          {activeTab === 'profile' ? renderProfileTab() : renderSettingsTab()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}