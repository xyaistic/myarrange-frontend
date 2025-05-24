import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import AdminHome from '../screens/Admin/AdminHome';
import AdminAuctions from '../screens/Admin/AdminAuctions';
import AdminManage from '../screens/Admin/AdminManage';
import AdminProfile from '../screens/Admin/profile/AdminProfile';
import AdminProfileNavigation from './AdminProfileNavigation';



export default function AdminNavigation() {
  const AdminTab = createBottomTabNavigator();

  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Auctions':
              iconName = 'gavel'; 
              break;
            case 'Manage':
              iconName = 'settings'; 
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
      <AdminTab.Screen name="Home" component={AdminHome} />
      <AdminTab.Screen name="Auctions" component={AdminAuctions} />
      <AdminTab.Screen name="Manage" component={AdminManage} />
      <AdminTab.Screen name="Profile" component={AdminProfileNavigation} />
    </AdminTab.Navigator>
  );
}
