

import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '../FormComponents/InputField';
import SubmitButton from '../FormComponents/SubmitButton';
import useAuthStore from '../../context/AuthContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignupForm = () => {
    const { signup, otpVerify,isLoading } = useAuthStore();
    const [email, setEmail] = useState('');
    const refRBSheet = useRef();
    const [error, setError] = useState(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const signupData = {
            fullName: data.name,
            email: data.email,
            phoneNo: data.phone,
            password: data.password,
        };

        const response = await signup(signupData);
        console.log(response.data?.message);
        if (response.status == 200) {
            setEmail(data.email);
            refRBSheet.current.open();
        } else {
            setError(response?.data?.message);
        }
    };

    const verifyOtp = (data) => {
        const verifyOtpData = {
            otp: data.otp,
            email: email,
        };
        const response = otpVerify(verifyOtpData);
        if (response.refreshToken) {
            refRBSheet.current.close();
        }
    };

    return (
        <>
            <View>
                <InputField
                    label="Full Name"
                    name="name"
                    iconName='person-outline'
                    control={control}
                    placeholder="John Doe"
                    rules={{
                        required: "Full name is required",
                        pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: "Name should only contain letters and spaces"
                        }
                    }}
                    errors={errors}
                />
                <InputField
                    label="Email"
                    name="email"
                    iconName='mail-outline'
                    control={control}
                    placeholder="john.doe@example.com"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email address"
                        }
                    }}
                    errors={errors}
                    keyboardType="email-address"
                />
                <InputField
                    label="Phone Number"
                    name="phone"
                    iconName='smartphone'
                    control={control}
                    placeholder="+91 XXXXXXXXXX"
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                            message: "Invalid phone number"
                        },
                        minLength: {
                            value: 10,
                            message: "Phone number must be at least 10 digits"
                        }
                    }}
                    errors={errors}
                    keyboardType="phone-pad"
                />
                <InputField
                    label="Password"
                    name="password"
                    iconName='lock-open'
                    control={control}
                    placeholder="**********"
                    secureTextEntry
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    }}
                    errors={errors}
                />
                {error && <Text className="text-red-500 text-xs mt-1 my-3">{error}</Text>}
                {
                    isLoading ? (
                        <View className='py-3 rounded-lg items-center justify-center border border-gray-200 '>
                            <ActivityIndicator size="small" color="#3c8b27" />
                        </View>

                    )
                        : (
                            <SubmitButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
                        )
                }


                <RBSheet
                    ref={refRBSheet}
                    height={400}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20
                        },
                        draggableIcon: {
                            backgroundColor: '#9CA3AF',
                            width: 60
                        }
                    }}>
                    <View className="flex-1">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-3">
                                <MaterialIcons name="email" size={30} color="#3c8b27" />
                            </View>
                            <Text className="text-xl font-bold">Verify Your Email</Text>
                            <Text className="text-gray-500 text-center mt-2">
                                We've sent a verification code to{'\n'}
                                <Text className="font-medium text-gray-700">{email || 'your email address'}</Text>
                            </Text>
                        </View>

                        <InputField
                            label="Enter Verification Code"
                            name="otp"
                            iconName='password'
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

                        {error && <Text className="text-red-500 text-xs mt-1 min-h-[16px]">{error}</Text>}
                        <SubmitButton title="Verify" onPress={handleSubmit(verifyOtp)} />

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-gray-500">Didn't receive the code? </Text>
                            <Pressable>
                                <Text className="text-blue-600 font-medium">Resend</Text>
                            </Pressable>
                        </View>
                    </View>
                </RBSheet>
            </View>
        </>
    );
};

export default SignupForm;
