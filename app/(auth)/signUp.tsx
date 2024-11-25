import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@/constants/images';
import FormField from '@/components/components/FormField';
import CustomeButton from '@/components/components/CustomeButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({username:'', email: '', password: '' });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const submit = async ()=>{
    if (!form.username || !form.email || !form.password ) {
      Alert.alert('Error', 'Please fill in all the fileds !')
    }
    setIsSubmiting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    }finally{
      setIsSubmiting(false);
    }
  }
  return (
  <LinearGradient colors={['#c38e70','#e6ccb2', '#f8f9fa']}>
    <SafeAreaView>
          <View>
            <Image resizeMode="contain" className="w-[100px] absolute mt-6 h-[100px]" source={images.logo} />
            <Image source={images.shadow} resizeMode='contain' className='w-[100px] absolute mt-[2rem] h-[100px]'/>
          </View>
          <View className="w-full justify-center min-h-full px-4 my-6">
            <Text className="text-2xl text-white font-semibold mt-20 font-psemibold">
              Sign up to <Text className="text-[#066839] text-3xl">𝐸𝒸𝒶𝒻𝒻𝓁𝑒𝒾𝓃</Text>
            </Text>
            <FormField
            placeholder="Enter your username"
              title="Username"
              value={form.username}
              handleChangeText={(e: string) =>
                setForm({
                  ...form,
                  username: e,
                })
              }
              otherStyles="mt-10"
            />
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
              keyboardType='email-address'
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
            title="Sign Up"
            containerStyle="mt-7"
            isLoading={isSubmiting}
            textStyles={''}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-medium">have an account already ?</Text>
              <Link className="text-lg font-medium text-[#fb8500]" href={'/(auth)/signIn'}>Sign in</Link>
            </View>
          </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUp;
