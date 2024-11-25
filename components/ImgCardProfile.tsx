import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import icons from "@/constants/icons";

// Define types for props
interface Creator {
  username: string;
  avatar: string;
}

interface VideoData {
  title: string;
  image: string;
  description:string;
  creator: Creator | null;
}

interface VideoCardProps {
  video: VideoData;
}

const ImgCardProfile: React.FC<VideoCardProps> = ({
  video: { title, image, creator, description },
}) => {

  // Use optional chaining and default values to avoid crashes
  const username = creator?.username || "Unknown Creator";
  const avatar = creator?.avatar || ""; // Add a default avatar if needed
  const [likes, setLikes] = useState(true);

  return (
    <View className="flex flex-col mx-3 p-3 rounded-2xl bg-white  px-4 mb-5">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-full border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-JakartaBold text-sm text-black"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-black/85 font-pregular"
              numberOfLines={1}
            >
              {creator?.username}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Image
            source={{ uri: image }}
            className="w-full h-56 rounded-xl mt-3"
            resizeMode="cover"
      />
        <Text className="text-sm mt-5 font-MeriendaMedium text-black/80">
          {description}
        </Text>
    </View>
  );
};

export default ImgCardProfile;