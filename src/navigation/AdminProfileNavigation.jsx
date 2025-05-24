import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AdminProfile from '../screens/Admin/profile/AdminProfile';
import CustomDrawerContent from '../components/Widgets/CustomDrawerContent';

// Import placeholder screens (you'll need to create these)
const AdminVendors = () => <AdminPlaceholder title="Vendors" />;
const AdminCustomers = () => <AdminPlaceholder title="Customers" />;
const AdminCategories = () => <AdminPlaceholder title="Categories" />;
const AdminServices = () => <AdminPlaceholder title="Services" />;
const AdminDashboard = () => <AdminPlaceholder title="Dashboard" />;

const AdminPlaceholder = ({ title }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>{title} Screen</Text>
    <Text>Create this screen in src/screens/Admin/{title}.jsx</Text>
  </View>
);

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AdminDrawerNavigation() {
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
        component={AdminDashboard} 
        options={{ 
          headerBlurEffect: "dark",
          drawerIcon: ({color, size}) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Vendors" 
        component={AdminVendors} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="store" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Customers" 
        component={AdminCustomers} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="people" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Categories" 
        component={AdminCategories} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="category" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Services" 
        component={AdminServices} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="miscellaneous-services" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={AdminProfile} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          )
        }} 
      />
    </Drawer.Navigator>
  );
}

export default function AdminProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AdminDrawer" 
        component={AdminDrawerNavigation} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
