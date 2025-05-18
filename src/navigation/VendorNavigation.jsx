
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import VendorDashboard from '../screens/Vendor/VendorDashboard';
import CustomDrawerContent from '../components/Widgets/CustomDrawerContent';
import VendorBids from '../screens/Vendor/VendorBids';
import VendorProfile from '../screens/Vendor/VendorProfile';
import VendorManageService from '../screens/Vendor/VendorManageService';
import VendorCategory from '../screens/Vendor/VendorCategory';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function VendorDrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: '#3c8b27',
        drawerInactiveTintColor: 'gray',
        headerShown: true,
        drawerPosition: 'right',
        drawerStyle: {
          width: 280,
        },
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()}
            style={{ marginRight: 15 }}
          >
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        ),
        headerLeft: () => null,
      })}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={VendorDashboard} 
        options={{ 
          headerBlurEffect: "dark",
          drawerIcon: ({color, size}) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="My Bids" 
        component={VendorBids} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="gavel" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={VendorProfile} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Manage Services" 
        component={VendorManageService} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="build" size={size} color={color} />
          )
        }} 
      />
    </Drawer.Navigator>
  );
}

export default function VendorNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="VendorCategory" 
        component={VendorCategory} 
        options={{ 
          headerShown: true,
          title: "Select Categories",
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen 
        name="VendorDrawer" 
        component={VendorDrawerNavigation} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
