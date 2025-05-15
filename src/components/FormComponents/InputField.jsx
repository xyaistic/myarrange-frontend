import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const InputField = ({
  label,
  name,
  control,
  placeholder,
  secureTextEntry = false,
  rules = {},
  errors,
  iconName = 'person',
  keyboardType = 'default'
}) => {
  const errorMessage = errors?.[name]?.message || '';
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View className="">
      {label && (
        <Text className="text-subheading font-semibold uppercase text-gray-700 mb-2">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center border rounded-lg px-4 py-3 bg-white ${errors?.[name] ? 'border-red-500' : 'border-gray-300'
              }`}
          >
            <MaterialIcons
              name={iconName}
              size={22}
              color={errors?.[name] ? 'red' : '#888'}
              style={{ marginRight: 10 }}
            />
            <TextInput
              className="flex-1 text-base text-gray-800 "
              style={{ lineHeight: 20 }} // adjust this to suit your font size
              placeholder={placeholder}
              placeholderTextColor="#999"
              secureTextEntry={hidePassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType={keyboardType}
            />
            {secureTextEntry && (
              <Pressable onPress={() => setHidePassword(!hidePassword)}>
                <MaterialIcons
                  name={hidePassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#888"
                />
              </Pressable>
            )}
          </View>
        )}
      />

      <Text className="text-red-500 text-xs mt-1 min-h-[16px]">
        {errorMessage || ' '}
      </Text>
    </View>
  );
};

export default InputField;