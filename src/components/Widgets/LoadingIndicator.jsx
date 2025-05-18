import React from 'react';
import LottieView from 'lottie-react-native';
import { View, Text } from 'react-native';

export default function LoadingIndicator({ color }) {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView 

        source={require('../../assets/primaryloader.json')} 
        autoPlay 
        loop 
        style={{  width: 200, height: 200 }}
      />
    </View>
  );
}
