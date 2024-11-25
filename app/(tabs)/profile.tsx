import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

import icons from "@/constants/icons";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "@/components/components/InfoBox";
import EmptyState  from "@/components/components/EmptState";
import { LinearGradient } from "expo-linear-gradient";
import ImgCardProfile from "@/components/components/ImgCardProfile";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    const res = await signOut();
    setUser(res);
    router.replace("/signIn");
  };

  return (
    <LinearGradient className="h-full"
      colors={['#208b3a','#6ede8a','white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      >
      <SafeAreaView className="h-screen">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ImgCardProfile
              video={item}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this profile"
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                <Text className="text-gray-100 text-2xl font-JakartaBold">Profile</Text>
              <TouchableOpacity
                onPress={logout}
                className="flex w-full items-end mb-10"
              >
                <Link href={'/Contact'} className="text-black/85 mb-14 underline decoration-solid">
                  Contact us.
                </Link>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6 right-2"
                />
                <Text className="text-gray-100 text-sm font-pmedium mt-2">Logout</Text>
              </TouchableOpacity>
              <View className="flex-row">
                <View className="text-center items-center mr-20">
                  <View className="w-16 h-16 border border-secondary rounded-full flex justify-center items-center">
                    <Image
                      source={{ uri: user?.avatar }}
                      className="w-[90%] h-[90%] rounded-full"
                      resizeMode="cover"
                    />
                  </View>
                  <InfoBox
                    title={user?.username}
                    containerStyles="mt-2"
                    titleStyles="text-lg font-MeriendaSemiBold"
                    subtitle=""
                  />
                </View>
                <View className="mt-5 flex flex-row">
                  <InfoBox
                    title={posts.length || 0}
                    subtitle="Posts"
                    titleStyles="text-xl"
                    containerStyles="mr-10"
                  />
                  <InfoBox
                    title="1.2k"
                    subtitle="views"
                    titleStyles="text-xl"
                    containerStyles=""
                  />
                </View>
              </View>
              <Text className="text-xl text-gray-100 mt-10 font-pregular">Your posts:</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  card:{
    backfaceVisibility:'hidden',
    borderRadius:20,
    marginBottom:10,
  }
})
export default Profile;
