import { View, Text, FlatList, Image, Alert, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import SearchInput from '@/components/components/SearchInput';
import Trending from '@/components/components/Trending';
import EmptState from '@/components/components/EmptState';
import { LinearGradient } from 'expo-linear-gradient';
import { RefreshControl } from 'react-native';
import { getAllPosts, getLatestPosts, getLatestUsers } from '@/lib/appwrite';
import  useAppwrite  from '@/lib/useAppwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import ImgCard from '@/components/components/ImgCard';
import '@/global.css';
import { Models } from 'react-native-appwrite';
import { Avatar, Button, Card, ListItem, SpeedDial } from '@rneui/themed';
import { router } from 'expo-router';
import ThemedCard from '@rneui/themed/dist/Card';

// Define types for props
interface Creator {
  username: string;
  avatar: string;
}

interface UserData {
  creator: Creator;
}

interface VideoCardProps {
  user: UserData;
}


const Home: React.FC<VideoCardProps> = () => {

  const [expanded, setExpanded] = React.useState(false);
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts} = useAppwrite(getLatestPosts);
  const { data: latestUsers} = useAppwrite(getLatestUsers);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async ()=>{
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <LinearGradient className="h-full"
    colors={['#208b3a','#6ede8a','white']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
      >
        <SafeAreaView className='h-screen'>
          <FlatList
          //data={[]}
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ImgCard video={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start border-2 p-3 rounded-2xl bg-black/90 shadow-lg shadow-black/70 flex-row mb-6">
                <SearchInput/>
                <View>
                  <Text className="font-MeriendaSemiBold text-xl text-[#EFE7D2]">
                    Welcome
                  </Text>
                  <Text className="text-2xl font-MeriendaBold text-white">
                    {user.username}
                  </Text>
                </View>
              </View>
              <View className='flex-row'>
                <Image source={images.logo}
                className="w-20 translate-x-100 h-20 mr-3 mt-3"
                resizeMode='contain'
                />
              </View>
              <View className="w-full flex-1 pt-5 border-2 rounded-3xl shadow-inner shadow-slate-300 bg-black/90 p-2 pb-8">
                <Text className="text-[#EFE7D2] font-MeriendaMedium text-xl mb-3">
                  Latest posts
                </Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptState
              title='No posts Found'
              subtitle='No posts created yet'
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
        </SafeAreaView>
      </LinearGradient>
  )
}

export default Home
