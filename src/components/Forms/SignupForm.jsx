import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '../FormComponents/InputField';
import SubmitButton from '../FormComponents/SubmitButton';
import useAuthStore from '../../context/AuthContext';


const SignupForm = () => {
    const { signup } = useAuthStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = {
        role: 'USER',  
    };

    const onSubmit = (data) => {
        const signupData = {
            // ...user,  
            fullname: data.name,
            email: data.email, 
            phone: data.phone,
            password: data.password,  
        };

        signup(signupData);
        console.log("Signup Data:", signupData);
    };

    return (
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
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
            <SubmitButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default SignupForm;