import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
//EmptyState, SearchInput, VideoCard
import EmptState from "@/components/components/EmptState";
import SearchInput from "@/components/components/SearchInput";
import VideoCard from "@/components/components/ImgCard";
import { LinearGradient } from "expo-linear-gradient";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <LinearGradient className="h-full"
    colors={['#c38e70','#e6ccb2', '#f8f9fa']}>
      <SafeAreaView className="h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <>
              <View className="flex my-6 px-4">
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white mt-1">
                  {query}
                </Text>

                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} refetch={refetch} />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={() => (
            <EmptState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
