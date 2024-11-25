import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '@/global.css'

const CustomeButton = ({title, handlePress, containerStyle, textStyles, isLoading}) => {
  return (
    <TouchableOpacity className={`min-h-[62px] rounded-xl bg-[#fb8500] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading} onPress={handlePress} activeOpacity={0.7}>
        <Text className={`text-lg font-semibold text-[#03071e] ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomeButton