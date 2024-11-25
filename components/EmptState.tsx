import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import CustomeButton from './CustomeButton'
import { router } from 'expo-router'

const EmptState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode='contain'/>
        <Text className="text-xl text-center font-semibold text-gray-100 mt-2">
            {title}
        </Text>
        <Text className="font-pmedium text-sm text-[#2a9d8f]">
            {subtitle}
        </Text>
        <CustomeButton
        title="Create post"
        handlePress={() => router.push('/create')}
        containerStyle="w-full my-7"
        textStyles=""
        isLoading={true}
        />
    </View>
  )
}

export default EmptState