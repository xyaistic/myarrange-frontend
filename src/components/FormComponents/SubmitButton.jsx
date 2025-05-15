

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SubmitButton({ title, onPress, disabled = false }) {
    return (
        <TouchableOpacity
            className={`py-3 rounded-lg items-center ${disabled ? 'bg-primary/70' : 'bg-primary'} `}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className="text-white font-semibold text-base ">{title}</Text>
        </TouchableOpacity>
    )
}