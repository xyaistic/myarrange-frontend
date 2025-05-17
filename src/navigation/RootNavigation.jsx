import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminNavigation from './AdminNavigation';
import useAuthStore from '../context/AuthContext';
import CustomerNavigation from './CustomerNavigation';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <NavigationContainer>
      
      <Stack.Navigator>
        {!isAuthenticated ? (
          // Authenticated screens
          <>
            {role === 'admin' ? (
              <Stack.Screen 
                name="Admin" 
                component={AdminNavigation} 
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen 
                name="Customer" 
                component={CustomerNavigation} 
                options={{ headerShown: false }}
              />
            )}
          </>
        ) : (
        
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
         
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}