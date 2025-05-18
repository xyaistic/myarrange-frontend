// import { View, Text } from 'react-native';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AdminNavigation from './AdminNavigation';
// import useAuthStore from '../context/AuthContext';
// import CustomerNavigation from './CustomerNavigation';
// import LoginScreen from '../screens/LoginScreen';

// const Stack = createNativeStackNavigator();

// export default function RootNavigation() {
//   const { isAuthenticated, role } = useAuthStore();

//   return (
//     <NavigationContainer>
      
//       <Stack.Navigator>
//         {!isAuthenticated ? (
//           <>
//             {role === 'admin' ? (
//               <Stack.Screen 
//                 name="Admin" 
//                 component={AdminNavigation} 
//                 options={{ headerShown: false }}
//               />
//             ) : (
//               <Stack.Screen 
//                 name="Customer" 
//                 component={CustomerNavigation} 
//                 options={{ headerShown: false }}
//               />
//             )}
//           </>
//         ) : (
        
//           <>
//             <Stack.Screen 
//               name="Login" 
//               component={LoginScreen} 
//               options={{ headerShown: false }}
//             />
         
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomerNavigation from './CustomerNavigation'
import { NavigationContainer } from '@react-navigation/native'
import useAuthStore from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import LoadingIndicator from '../components/Widgets/LoadingIndicator'

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { checkAuth, isAuthenticated } = useAuthStore();
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
        {isAuthenticated ? (
          // Authenticated routes
          <Stack.Screen name="Main" component={CustomerNavigation} />
        ) : (
          // Public routes
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* Add other public screens here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
