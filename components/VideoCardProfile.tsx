import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import icons from "@/constants/icons";
import { getId, onDeletePress } from "@/lib/appwrite";

// Define types for props
interface Creator {
  username: string;
  avatar: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator | null;
}

interface VideoCardProps {
  videos: VideoData;
}

const VideoCardProfile: React.FC<VideoCardProps> = ({
  videos: { title, thumbnail, video, creator },
}) => {
  const [play, setPlay] = useState(false);

  // Use optional chaining and default values to avoid crashes
  const username = creator?.username || "Unknown Creator";
  const avatar = creator?.avatar || ""; // Add a default avatar if needed

  return (
    <View className="flex flex-col items-center px-4 mb-14">
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
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

          <TouchableOpacity className="pt-2 flex-row">
            <Image source={icons.menu} className="w-5 h-5 mr-2" resizeMode="contain"/>
          </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCardProfile;