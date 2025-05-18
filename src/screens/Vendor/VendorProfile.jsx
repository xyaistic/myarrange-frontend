import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm } from 'react-hook-form';
import InputField from '../../components/FormComponents/InputField';
import SubmitButton from '../../components/FormComponents/SubmitButton';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      name: vendorData.name,
      email: vendorData.email,
      phone: vendorData.phone,
      address: vendorData.address,
      bio: vendorData.bio
    }
  });

  // Set form values when editing starts
  useEffect(() => {
    if (isEditing) {
      setValue('name', vendorData.name);
      setValue('email', vendorData.email);
      setValue('phone', vendorData.phone);
      setValue('address', vendorData.address);
      setValue('bio', vendorData.bio);
    }
  }, [isEditing, setValue, vendorData]);

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
  const saveChanges = (data) => {
    // Update vendorData with form values
    setVendorData({
      ...vendorData,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio
    });
    
    // In a real app, you would send the updated data to your API
    Alert.alert('Success', 'Profile updated successfully');
    setIsEditing(false);
  };

  // Render profile information tab
  const renderProfileTab = () => (
    <View className="mt-4">
      <View className="bg-white rounded-lg p-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Basic Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text className="text-blue-500">{isEditing ? 'Cancel' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <View className="space-y-4">
            <InputField
              label="Full Name"
              name="name"
              control={control}
              placeholder="Enter your full name"
              iconName="person-outline"
              rules={{ required: 'Name is required' }}
              errors={errors}
            />
            
            <InputField
              label="Email"
              name="email"
              control={control}
              placeholder="Enter your email"
              iconName="mail-outline"
              keyboardType="email-address"
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              errors={errors}
            />
            
            <InputField
              label="Phone"
              name="phone"
              control={control}
              placeholder="Enter your phone number"
              iconName="phone"
              keyboardType="phone-pad"
              rules={{ required: 'Phone number is required' }}
              errors={errors}
            />
            
            <InputField
              label="Address"
              name="address"
              control={control}
              placeholder="Enter your address"
              iconName="location-on"
              rules={{ required: 'Address is required' }}
              errors={errors}
            />
            
            <InputField
              label="Bio"
              name="bio"
              control={control}
              placeholder="Tell us about yourself"
              iconName="description"
              rules={{ required: 'Bio is required' }}
              errors={errors}
            />
            
            <SubmitButton 
              title="Save Changes" 
              onPress={handleSubmit(saveChanges)} 
            />
          </View>
        ) : (
          <View className="space-y-4">
            <View>
              <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
                Full Name
              </Text>
              <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
                <Icon name="person-outline" size={22} color="#888" style={{ marginRight: 10 }} />
                <Text className="flex-1 text-base text-gray-800">{vendorData.name}</Text>
              </View>
            </View>

            <View>
              <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
                Email
              </Text>
              <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
                <Icon name="mail-outline" size={22} color="#888" style={{ marginRight: 10 }} />
                <Text className="flex-1 text-base text-gray-800">{vendorData.email}</Text>
              </View>
            </View>

            <View>
              <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
                Phone
              </Text>
              <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
                <Icon name="phone" size={22} color="#888" style={{ marginRight: 10 }} />
                <Text className="flex-1 text-base text-gray-800">{vendorData.phone}</Text>
              </View>
            </View>

            <View>
              <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
                Address
              </Text>
              <View className="flex-row items-center border rounded-lg px-4 py-3 bg-white border-gray-300">
                <Icon name="location-on" size={22} color="#888" style={{ marginRight: 10 }} />
                <Text className="flex-1 text-base text-gray-800">{vendorData.address}</Text>
              </View>
            </View>

            <View>
              <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
                Bio
              </Text>
              <View className="flex-row border rounded-lg px-4 py-3 bg-white border-gray-300">
                <Icon name="description" size={22} color="#888" style={{ marginRight: 10, marginTop: 2 }} />
                <Text className="flex-1 text-base text-gray-800">{vendorData.bio}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

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
        <View className="bg-primary pt-4 pb-20">
          <View className="px-4">
            <Text className="text-white text-xl font-bold">Vendor Profile</Text>
          </View>
        </View>
        
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
              <Text className={`text-center font-semibold uppercase text-subheading ${activeTab === 'profile' ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}>
                Profile
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${activeTab === 'settings' ? 'bg-white' : ''}`}
              onPress={() => setActiveTab('settings')}
            >
              <Text className={`text-center uppercase text-subheading ${activeTab === 'settings' ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}>
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
