import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoritesDrawer = ({ onClose, favorites = [] }) => {
  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-xl shadow-sm mb-3 p-3 flex-row items-center">
      <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
      <View className="ml-3 flex-1">
        <Text className="font-bold">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="star" size={14} color="#FFD700" />
          <Text className="text-gray-700 ml-1 text-xs">{item.rating}</Text>
        </View>
      </View>
      <Icon name="favorite" size={20} color="#FF3B30" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">My Favorites</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Icon name="favorite-border" size={60} color="#CCCCCC" />
          <Text className="text-gray-400 mt-4 text-center">No favorites yet</Text>
          <Text className="text-gray-400 text-center">Services you like will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoritesDrawer;