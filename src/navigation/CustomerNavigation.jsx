import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Customer/Home';
import MyRequest from '../screens/Customer/MyRequest';
import Profile from '../screens/Customer/Profile';
import VendorNavigation from './VendorNavigation';
import useAuthStore from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import LoginNavigation from './LoginNavigation';

// import VendorNavigation from './VendorNavigation';


export default function CustomerNavigation() {
  const CustomerTab = createBottomTabNavigator();
  const { checkAuth, isAuthenticated } = useAuthStore();

  return (
    <CustomerTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Requests':
              iconName = 'list'; 
              break;
            case 'Vendor':
              iconName = 'store'; 
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Login':
              iconName = 'fingerprint';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3c8b27',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <CustomerTab.Screen name="Home" component={Home} />
      <CustomerTab.Screen name="Requests" component={MyRequest}/>
      <CustomerTab.Screen name="Vendor" component={VendorNavigation} />
      {isAuthenticated?(
        <CustomerTab.Screen name="Profile" component={Profile} />
      ):(
        <CustomerTab.Screen name="Login" component={LoginNavigation} />
      )}
    </CustomerTab.Navigator>
  );
}