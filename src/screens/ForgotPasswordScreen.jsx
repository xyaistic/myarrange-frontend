import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useForm } from 'react-hook-form';
import InputField from '../components/FormComponents/InputField';
import SubmitButton from '../components/FormComponents/SubmitButton';
import useAuthStore from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { forgotPassword, isLoading, error,otpVerify } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const email = watch('email', '');

  const onSendOtp = async (data) => {
    const response = await forgotPassword(data.email);
    if (response?.status === 200) {
      setOtpSent(true);
    }
  };

  const onVerifyOtp = async (data) => {
    const response = await otpVerify(data, 'forgotPassword');
    if (response?.status === 200) {
      setIsSuccess(true);
    }
   
  };


  return (
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={['#3c8b27', '#17350F']}
        start={{ x: 0.60, y: 0.99 }}
        end={{ x: 0.40, y: 0.01 }}
        className="h-1/3 items-center justify-center"
      >
        <TouchableOpacity 
          className="absolute top-12 left-4 bg-white/20 p-2 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="mt-10 p-4 items-center">
          <Icon name="lock-reset" size={60} color="white" />
          <Text className="text-heading-2 font-bold text-center text-white mt-2">
            Forgot Password
          </Text>
          <Text className="text-heading-4 text-center text-white opacity-80 mt-1">
            {otpSent ? "Enter the OTP sent to your email" : "Enter your email to reset your password"}
          </Text>
        </View>
      </LinearGradient>

      <View className="bg-white p-6 rounded-t-3xl -mt-5 flex-1 shadow-lg">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          {isSuccess ? (
            <View className="items-center py-8">
              <Icon name="check-circle" size={80} color="#3c8b27" />
              <Text className="text-heading-3 font-bold text-center mt-6 text-gray-800">
                Password Reset Successful!
              </Text>
              <Text className="text-center text-gray-600 mt-2 px-4">
                Your password has been reset successfully.
              </Text>
              <TouchableOpacity 
                className="mt-8 bg-primary py-3 px-8 rounded-lg" 
                onPress={() => navigation.navigate('Login')}
              >
                <Text className="text-white font-semibold">Back to Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className="bg-primary/10 p-4 rounded-lg mb-6 flex-row items-center">
                <Icon name="info" size={24} color="#3c8b27" />
                <Text className="text-primary ml-2 flex-1">
                  {otpSent 
                    ? "Enter the verification code we sent to your email."
                    : "Enter the email associated with your account and we'll send you a verification code."}
                </Text>
              </View>
              
              <InputField
                label="Email"
                iconName="mail-outline"
                name="email"
                control={control}
                placeholder="example@email.com"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address"
                  }
                }}
                errors={errors}
                editable={!otpSent}
              />

              {otpSent && (
                <InputField
                  label="Verification Code"
                  iconName="password"
                  name="otp"
                  control={control}
                  placeholder="Enter 6-digit code"
                  rules={{
                    required: "Verification code is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Code should only contain numbers"
                    },
                    minLength: {
                      value: 6,
                      message: "Please enter a valid 6-digit code"
                    },
                    maxLength: {
                      value: 6,
                      message: "Please enter a valid 6-digit code"
                    }
                  }}
                  errors={errors}
                  keyboardType="number-pad"
                />
              )}

              {error && (
                <View className="bg-red-50 p-3 rounded-lg mb-4 flex-row items-center">
                  <Icon name="error" size={20} color="#ef4444" />
                  <Text className="text-red-500 ml-2">{error}</Text>
                </View>
              )}

              {isLoading ? (
                <View className="py-3 rounded-lg items-center justify-center border border-gray-200">
                  <ActivityIndicator size="small" color="#3c8b27" />
                </View>
              ) : (
                <SubmitButton 
                  title={otpSent ? "Continue" : "Send OTP"} 
                  onPress={handleSubmit(otpSent ? onVerifyOtp : onSendOtp)} 
                />
              )}

              {otpSent && (
                <TouchableOpacity 
                  className="mt-4 items-center flex-row justify-center" 
                  onPress={() => handleSubmit(onSendOtp)()}
                >
                  <Icon name="refresh" size={16} color="#3c8b27" />
                  <Text className="text-primary font-medium ml-1">Resend OTP</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                className="mt-6 items-center flex-row justify-center" 
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={16} color="#3c8b27" />
                <Text className="text-primary font-medium ml-1">Back to Login</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
