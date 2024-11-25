import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import images from '@/constants/images'
import '@/global.css'
import CustomeButton from '@/components/components/CustomeButton'
import { router } from 'expo-router'

const index = () => {
  return (
    <ScrollView>
      <LinearGradient
      colors={['#e6ccb2','#e6ccb2', '#ede0d4']}
      className='h-full'
      >
        <SafeAreaView>
          <View className='flex items-center'>
            <Text className='text-center text-2xl text-white font-JakartaSemiBold'>Welcome to</Text>
            <Text className='text-black font-JakartaBold text-2xl'>Ecafflein</Text>
            <Image source={images.logo} resizeMode='contain' width={50} height={50}/>
          </View>
          <View className='px-4 mt-6'>
            <Text className='text-base font-JakartaSemiBold'> Stay up-to-date with all things coffee on 𝐸𝒸𝒶𝒻𝒻𝓁𝑒𝒾𝓃! Get daily updates on coffee trends, brewing tips, new roasts, and unique cafes from around the world. Whether you’re a coffee pro or a casual enthusiast, CoffeeConnect is your go-to app for everything coffee. Join the community and fuel your passion today!</Text>
          </View>
          <CustomeButton
            title="Continue with Email"
            handlePress={()=>router.push('/signIn')}
            containerStyle= "w-full mt-[7rem]"
            textStyles=""
            isLoading={false}
            />
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  )
}

export default index