import { useState } from "react";
import { ResizeMode } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
  View,
  Text,
} from "react-native";

import icons from "@/constants/icons";

// Define types for props
interface PostItem {
  id: string; // Unique identifier for each post
  title: string;
  image: string;
}

interface TrendingItemProps {
  activeItem: string | null;
  item: PostItem;
}

interface TrendingProps {
  posts: PostItem[] | null;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
        <TouchableOpacity
          className="relative flex justify-center mt-5 items-center"
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: item.image }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text className="w-52 h-72 rounded-[33px] text-white text-center absolute text-lg mt-2 font-JakartaSemiBold">
          {item.title}
        </Text>
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  // Ensure posts is not null and that it has at least one item
  const [activeItem, setActiveItem] = useState(
    posts && posts.length > 0 ? posts[0].id : null
  );

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  if (!posts || posts.length === 0) {
    return <Text>No posts available</Text>; // Handle empty or null posts
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;