import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../FormComponents/InputField';
import RememberMeCheckbox from '../FormComponents/RememberMeCheckbox';
import SubmitButton from '../FormComponents/SubmitButton';


const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data) => {
    console.log('Login Data:', { ...data, rememberMe });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <View>
      <InputField
        label="Email / Mobile"
        iconName='mail-outline'
        name="email"
        control={control}
        placeholder="example@email.com"
        rules={{ required: 'Email is required' }}
        errors={errors}
      />
      <InputField
        label="Password"
        name="password"
        iconName='lock-open'
        control={control}
        placeholder="**********"
        secureTextEntry
        rules={{ required: 'Password is required' }}
        errors={errors}
      />

      <RememberMeCheckbox
        isChecked={rememberMe}
        onToggle={() => setRememberMe(!rememberMe)}
        onForgotPassword={() => {}}
      />

      <SubmitButton title="Log In" onPress={handleSubmit(onSubmit)} />

      {/* Divider with "Or" */}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-3 text-gray-500">Or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Social Login Buttons */}
      <TouchableOpacity
        className="flex-row items-center justify-center border border-gray-300 rounded-md py-3 mb-3"
        activeOpacity={0.7}
        onPress={handleGoogleLogin}
      >
        <MaterialIcons name="mail" size={20} color="#DB4437" />
        <Text className="ml-2 text-gray-700 text-base">Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center justify-center border border-gray-300 rounded-md py-3"
        activeOpacity={0.7}
        onPress={handleFacebookLogin}
      >
        <MaterialIcons name="facebook" size={20} color="#4267B2" />
        <Text className="ml-2 text-gray-700 text-base">Continue with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;