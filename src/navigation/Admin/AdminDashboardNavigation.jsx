import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawerContent from '../../components/Widgets/CustomDrawerContent';
import AdminDashboad from '../../screens/Admin/Dashboard/AdminDashboad';
import ManageCustomer from '../../screens/Admin/Dashboard/ManageCustomer';
import ManageVendor from '../../screens/Admin/Dashboard/ManageVendor';
import ManageService from '../../screens/Admin/Dashboard/ManageService';



const Drawer = createDrawerNavigator();

export default function AdminDashboardNavigation() {
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
        name="Insights" 
        component={AdminDashboad} 
        options={{ 
          headerBlurEffect: "dark",
          drawerIcon: ({color, size}) => (
            <Icon name="insights" size={size} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Customers" 
        component={ManageCustomer} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="people" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Vendors" 
        component={ManageVendor} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="store" size={size} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Services" 
        component={ManageService} 
        options={{ 
          drawerIcon: ({color, size}) => (
            <Icon name="miscellaneous-services" size={size} color={color} />
          )
        }} 
      />
    </Drawer.Navigator>
  );
}
