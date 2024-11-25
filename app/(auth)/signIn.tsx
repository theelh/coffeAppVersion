import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@/constants/images';
import FormField from '@/components/components/FormField';
import CustomeButton from '@/components/components/CustomeButton';
import { Link, router } from 'expo-router';
import {  getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import '@/global.css'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <LinearGradient colors={['#c38e70','#e6ccb2', '#f8f9fa']}>
      <SafeAreaView>
          <View>
            <Image resizeMode="contain" className="w-[100px] absolute mt-6 h-[100px]" source={images.logo} />
            <Image source={images.shadow} resizeMode='contain' className='w-[100px] absolute mt-[2rem] h-[100px]'/>
          </View>
          <View className="w-full justify-center min-h-[82vh] px-4">
            <Text className="text-2xl text-black font-semibold mt-4 font-psemibold">
              Log in to <Text className="text-[#066839] text-3xl">𝐸𝒸𝒶𝒻𝒻𝓁𝑒𝒾𝓃</Text>
            </Text>
            <FormField
            placeholder="Enter your email"
              title="Email"
              value={form.email}
              handleChangeText={(e: string) =>
                setForm({
                  ...form,
                  email: e,
                })
              }
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
            placeholder="Enter your password"
              title="Password"
              value={form.password}
              handleChangeText={(e: string) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
              otherStyles="mt-7"
            />
            <CustomeButton
            handlePress={submit}
            title="Sign-in"
            containerStyle="mt-7"
            isLoading={isSubmitting}
            textStyles={''}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-medium">Don't have account ?</Text>
              <Link className="text-lg font-medium text-[#fb8500]" href={'/(auth)/signUp'}>Sign Up</Link>
            </View>
          </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignIn;
