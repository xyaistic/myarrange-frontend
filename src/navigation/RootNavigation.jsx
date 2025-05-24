

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomerNavigation from './Customer/CustomerNavigation'
import { NavigationContainer } from '@react-navigation/native'
import useAuthStore from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import LoadingIndicator from '../components/Widgets/LoadingIndicator'
import AdminNavigation from './Admin/AdminNavigation'

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { checkAuth, isAuthenticated, role } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {role === 'ROLE_ADMIN' ? (
          <Stack.Screen name="Admin" component={AdminNavigation} />
        ) : (
          <Stack.Screen name="Customer" component={CustomerNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
