import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AdminAuctions from '../../screens/Admin/AdminAuctions';
import AdminManage from '../../screens/Admin/AdminManage';
import AdminDashboad from '../../screens/Admin/Dashboard/AdminDashboad';
import AdminProfile from '../../screens/Admin/AdminProfile';
import AdminDashboardNavigation from './AdminDashboardNavigation';



export default function AdminNavigation() {
  const AdminTab = createBottomTabNavigator();

  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
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
      <AdminTab.Screen name="Dashboard" component={AdminDashboardNavigation} />
      <AdminTab.Screen name="Auctions" component={AdminAuctions} />
      <AdminTab.Screen name="Manage" component={AdminManage} />
      <AdminTab.Screen name="Profile" component={AdminProfile} />
    </AdminTab.Navigator>
  );
}
