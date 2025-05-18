import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../context/AuthContext';
import { Drawer } from 'react-native-drawer-layout';
import FavoritesDrawer from '../../components/Drawers/FavoritesDrawer';

export default function Home() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleFavoritePress = () => {
    if (isAuthenticated) {
      setIsDrawerOpen(true);
    } else {
      navigation.navigate('Profile');
    }
  };

  const banners = [
    { id: '1', url: 'https://images.unsplash.com/photo-1618242579640-44870fefec88?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '2', url: 'https://images.unsplash.com/photo-1618243357602-ccba303a3fd6?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', url: 'https://images.unsplash.com/photo-1618243615611-f64ebcb16f36?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  const categories = [
    { id: '1', name: 'Cab', icon: 'directions-car' },
    { id: '2', name: 'AC Service', icon: 'ac-unit' },
    { id: '3', name: 'Plumber', icon: 'plumbing' },
    { id: '4', name: 'Electrician', icon: 'electrical-services' },
    { id: '5', name: 'Cleaning', icon: 'cleaning-services' },
    { id: '6', name: 'Painting', icon: 'format-paint' },
  ];

  const popularServices = [
    {
      id: '1',
      title: 'AC Repair & Service',
      rating: 4.8,
      reviews: 124,
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Home Cleaning',
      rating: 4.6,
      reviews: 98,
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Plumbing Services',
      rating: 4.7,
      reviews: 112,
      price: '₹399',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1974&auto=format&fit=crop'
    },
  ];

  const topVendors = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      profession: 'Electrician',
      rating: 4.9,
      jobs: 86,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      profession: 'House Cleaner',
      rating: 4.8,
      jobs: 124,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '3',
      name: 'Amit Singh',
      profession: 'Plumber',
      rating: 4.7,
      jobs: 92,
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
  ];

  const specialOffers = [
    {
      id: '1',
      title: 'AC Service',
      discount: '30% OFF',
      code: 'SUMMER30',
      validTill: 'Valid till 30 June',
      colors: ['#4CAF50', '#2E7D32']
    },
    {
      id: '2',
      title: 'Home Cleaning',
      discount: '25% OFF',
      code: 'CLEAN25',
      validTill: 'Valid till 15 June',
      colors: ['#2196F3', '#0D47A1']
    },
    {
      id: '3',
      title: 'Plumbing',
      discount: '20% OFF',
      code: 'PLUMB20',
      validTill: 'Valid till 20 June',
      colors: ['#9C27B0', '#4A148C']
    },
  ];

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('1');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setActiveCategory(item.id)}
      className={`h-20 m-1 rounded-lg flex-1 items-center justify-center 
        ${activeCategory === item.id ? 'bg-green-100 border border-primary' : 'bg-gray-50'}`}
    >
      <Icon name={item.icon} size={24} color={activeCategory === item.id ? 'green' : 'gray'} />
      <Text className={`mt-2 text-xs ${activeCategory === item.id ? 'font-bold text-primary' : 'text-gray-600'}`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPopularServiceItem = ({ item }) => (
    <TouchableOpacity
      className="mr-4 bg-white rounded-xl shadow-sm overflow-hidden w-64"
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-32"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-base">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="star" size={16} color="#FFD700" />
          <Text className="text-gray-700 ml-1">{item.rating}</Text>
          <Text className="text-gray-500 ml-1">({item.reviews} reviews)</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="font-bold text-green-600">{item.price}</Text>
          <TouchableOpacity className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 font-medium">Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopVendorItem = ({ item }) => (
    <TouchableOpacity
      className="mr-4 bg-white rounded-xl shadow-sm p-3 w-64 flex-row items-center"
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-full"
      />
      <View className="ml-3 flex-1">
        <Text className="font-bold text-base">{item.name}</Text>
        <Text className="text-gray-500">{item.profession}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="star" size={14} color="#FFD700" />
          <Text className="text-gray-700 ml-1 text-xs">{item.rating}</Text>
          <Text className="text-gray-500 ml-3 text-xs">{item.jobs} jobs</Text>
        </View>
        <TouchableOpacity className="bg-blue-100 px-3 py-1 rounded-full mt-2 self-start">
          <Text className="text-blue-700 font-medium text-xs">Hire Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSpecialOfferItem = ({ item }) => (
    <TouchableOpacity
      className="mr-4 rounded-xl overflow-hidden w-64 h-36 "
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
      >
        <View className='p-3 space-y-3'>

          <View>
            <Text className="text-white font-bold text-lg">{item.title}</Text>
            <Text className="text-white font-bold text-xl">{item.discount}</Text>
          </View>
          <View>
            <Text className="text-white font-medium bg-white/20 px-2 py-1 rounded self-start">
              Use code: {item.code}
            </Text>
            <Text className="text-white/80 text-xs mt-1">{item.validTill}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
      renderDrawerContent={() => (
        <FavoritesDrawer 
          
          onClose={() => setIsDrawerOpen(false)} 
        />
      )}
      drawerPosition="right"
      drawerType="slide"
      drawerWidth={300}
    >
      <SafeAreaView className='flex-1 bg-white'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='p-4 space-y-5'>
            {/* Header */}
            <View className='pb-3 flex-row items-center justify-between border-b border-gray-300'>
              <View className='flex-row gap-2'>
                <Icon name="location-pin" size={16} />
                <View>
                  <Text className='text-gray-500 text-xs'>Location</Text>
                  <Text className='font-semibold text-sm'>Bhopal, India</Text>
                </View>
              </View>
              <View className='flex-row gap-6'>
                <Icon name="notifications" size={24} />
                <Pressable onPress={handleFavoritePress}>
                  <Icon name="favorite-outline" size={24} />
                </Pressable>
                <Icon name="search" size={24} />
              </View>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <Icon name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search for services..."
                className="ml-2 flex-1 text-base"
                placeholderTextColor="gray"
              />
              <TouchableOpacity>
                <Icon name="mic" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Banner with auto carousel */}
            <View className='h-40 rounded-xl w-full overflow-hidden'>
              <Image
                source={{ uri: banners[activeBannerIndex].url }}
                className='w-full h-full'
                resizeMode='cover'
                onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
              />
              {/* Banner Indicators */}
              <View className="absolute bottom-3 left-0 right-0 flex-row justify-center">
                {banners.map((_, index) => (
                  <View
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${index === activeBannerIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">Special Offers</Text>
                <TouchableOpacity>
                  <Text className="text-green-600">View All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={specialOffers}
                renderItem={renderSpecialOfferItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            </View>

            {/* Categories */}
            <View className='space-y-3'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-2'>
                  <Text className='font-bold text-lg'>Top Categories</Text>
                  <Icon name="star" color={'green'} />
                </View>
                <TouchableOpacity>
                  <Text className="text-green-600">View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </View>

            {/* Popular Services */}
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">Popular Services</Text>
                <TouchableOpacity>
                  <Text className="text-green-600">View All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={popularServices}
                renderItem={renderPopularServiceItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            </View>

            {/* Top Vendors */}
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">Top Professionals</Text>
                <TouchableOpacity>
                  <Text className="text-green-600">View All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={topVendors}
                renderItem={renderTopVendorItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
              />
            </View>

            {/* Recent Bookings */}
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-lg">Recent Bookings</Text>
                <TouchableOpacity>
                  <Text className="text-green-600">View All</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="font-bold text-base">AC Service</Text>
                    <Text className="text-gray-500 text-sm">Today, 2:00 PM</Text>
                  </View>
                  <View className="bg-green-100 px-2 py-1 rounded">
                    <Text className="text-green-700 text-xs font-medium">Confirmed</Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-3">
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    className="w-10 h-10 rounded-full"
                  />
                  <View className="ml-3">
                    <Text className="font-medium">Rajesh Kumar</Text>
                    <View className="flex-row items-center">
                      <Icon name="star" size={14} color="#FFD700" />
                      <Text className="text-gray-700 ml-1 text-xs">4.9</Text>
                    </View>
                  </View>
                  <View className="flex-row ml-auto">
                    <TouchableOpacity className="bg-blue-100 w-8 h-8 rounded-full items-center justify-center mr-2">
                      <Icon name="message" size={16} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-green-100 w-8 h-8 rounded-full items-center justify-center">
                      <Icon name="call" size={16} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <Text className="font-bold text-lg mb-3">Quick Actions</Text>
              <View className="flex-row justify-between">
                <TouchableOpacity className="items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-1">
                    <Icon name="history" size={24} color="#2196F3" />
                  </View>
                  <Text className="text-xs text-gray-700">History</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                  <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-1">
                    <Icon name="support-agent" size={24} color="#9C27B0" />
                  </View>
                  <Text className="text-xs text-gray-700">Support</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                  <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center mb-1">
                    <Icon name="payment" size={24} color="#FF9800" />
                  </View>
                  <Text className="text-xs text-gray-700">Payments</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Drawer>
  );
}



