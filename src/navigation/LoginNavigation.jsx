import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export default function LoginNavigation() {
    const Stack = createNativeStackNavigator();
  return (
   <Stack.Navigator 
     screenOptions={{ headerShown: false }}
   >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" options={{presentation: 'modal'}} component={ForgotPasswordScreen} />
   </Stack.Navigator>
  )
}