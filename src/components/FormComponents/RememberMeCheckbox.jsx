import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RememberMeCheckbox = ({ isChecked, onToggle, onForgotPassword }) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <TouchableOpacity 
        className="flex-row items-center"
        onPress={onToggle}
      >
        <View
          className={`w-4 h-4 rounded-full border items-center justify-center ${
            isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
          }`}
        >
          {isChecked && (
            <MaterialIcons name="check" size={14} color="#fff" />
          )}
        </View>
        <Text className="text-gray-700 ml-2">Remember me</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onForgotPassword}>
        <Text className="text-blue-500 text-sm">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RememberMeCheckbox;