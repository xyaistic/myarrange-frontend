import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginForm from '../components/Forms/LoginForm';
import SignupForm from '../components/Forms/SignupForm';

const AuthTabs = ({ activeTab, setActiveTab }) => {
    return (
        <View className="flex-row w-full bg-gray-100 p-1 rounded-md">
            <TouchableOpacity
                className={`flex-1 items-center p-2 ${activeTab === 'login' ? 'bg-white border border-gray-200 rounded' : ''}`}
                onPress={() => setActiveTab('login')}
            >
                <Text className={`text-xs uppercase ${activeTab === 'login' ? 'font-semibold' : 'text-gray-500'}`}>
                    Log In
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className={`flex-1 items-center p-2 ${activeTab === 'signup' ? 'bg-white border border-gray-200 rounded' : ''}`}
                onPress={() => setActiveTab('signup')}
            >
                <Text className={`text-xs uppercase ${activeTab === 'signup' ? 'font-semibold' : 'text-gray-500'}`}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default function LoginScreen() {
    const [showOtpField, setShowOtpField] = useState(false);
    const [activeTab, setActiveTab] = useState('login');


    return (
        <View className="flex-1 bg-white">

            <LinearGradient
                colors={['#3c8b27', '#17350F']}
                start={{ x: 0.60, y: 0.99 }}
                end={{ x: 0.40, y: 0.01 }}
                className=" h-1/3 items-center justify-center"
            >
                
                <View className="mt-10 p-4">
                    <Text className="text-heading-2 font-bold text-center text-white">
                        {activeTab === 'login' ? 'Welcome back.' : 'Welcome.'}
                    </Text>
                    <Text className="text-heading-4 text-center text-white opacity-80 mt-1">
                        {activeTab === 'login' ? 'Log in to explore our app' : 'Creat an account to get started'}
                    </Text>
                </View>
            </LinearGradient>

            <View className="bg-white p-4 rounded-t-3xl -mt-5 flex-1">
                <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <View className='p-[.8px] bg-gray-100 w-full my-5' />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {activeTab === 'login' ? <LoginForm /> : 
                    <SignupForm/>}

                </ScrollView>
            </View>
        </View>
    );
}