import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import icons from "@/constants/icons";
import { createPost } from "@/lib/appwrite";
import  CustomButton  from "@/components/components/CustomeButton";
import FormField from "@/components/components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { LinearGradient } from "expo-linear-gradient";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    description: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:["image/png", "image/jpg", "image/jpeg"]
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.description === "") | (form.title === "") | !form.image
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        image: null,
        description: "",
      });

      setUploading(false);
    }
  };

  return (
    <LinearGradient className="h-full"
      colors={['#11001c', '#220135','#11001c']}>
        <SafeAreaView className="bg-primary h-full">
          <ScrollView className="px-4 my-6">
            <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

            <FormField
              title="Post Title"
              value={form.title}
              placeholder="Give your post a special title..."
              handleChangeText={(e) => setForm({ ...form, title: e })}
              otherStyles="mt-10"
            />

            <View className="mt-7 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">
                Upload image
              </Text>

              <TouchableOpacity onPress={() => openPicker("image")}>
                {form.image ? (
                  <Image
                    source={{ uri: form.image.uri }}
                    resizeMode="cover"
                    className="w-full h-64 rounded-2xl"
                  />
                ) : (
                  <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <FormField
              title="Description"
              value={form.description}
              placeholder="Description of your video...."
              handleChangeText={(e: any) => setForm({ ...form, description: e })}
              otherStyles="mt-7 mb-10"
            />

            <CustomButton
              title="Submit & Publish"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={uploading}
            />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
};

export default Create;