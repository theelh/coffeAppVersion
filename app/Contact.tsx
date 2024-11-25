import { View, Text, SafeAreaView, Alert, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput } from 'react-native';

const Contact = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message:""
  });
  const handleSubmit = () => {
    if (form.name === "" || form.email  === "" || form.message  === "") {
      Alert.alert("Error", "Please fill in all fields !");
      setEmail("");
      setName("");
      setMessage("");
    }else{
      Alert.alert("Message Sent", "Your message has been sent successfully!");
    }
  };

  return (
    <LinearGradient className="h-full"
      colors={['#775144','#ffffff','#f4dbd8']}
      start={{ x: -0.5, y: 0 }}
      end={{ x: 1, y: 1 }}
      >
          <View className="mb-4 mt-6">
            <Text className="text-2xl mt-10 font-semibold text-center text-gray-900">Contact Us</Text>
            <Text className="text-base my-3 mt-10 text-center font-MeriendaSemiBold text-gray-600">Ecafflein Support.</Text>
          </View>

          <View className="space-y-4 h-screen mt-20">
            {/* Name Input */}
            <View>
              <Text className="text-sm left-3 text-gray-600 mb-2">Name</Text>
              <TextInput
                placeholder="Enter your name"
                value={form.name}
                onChangeText={(e: string) =>
                  setForm({
                    ...form,
                    name: e,
                  })}
                className="w-72 left-3 rounded-xl border bg-white border-gray-300 h-12 focus:border-indigo-500 text-gray-700 py-2 px-4"
              />
            </View>

            {/* Email Input */}
            <View className='mt-5'>
              <Text className="text-sm left-3 text-gray-600 mb-1">Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(e: string) =>
                  setForm({
                    ...form,
                    email: e,
                  })}
                keyboardType="email-address"
                className="w-72 rounded-xl border bg-white left-3 border-gray-300 focus:border-indigo-500 text-gray-700 h-12 py-2 px-4"
              />
            </View>

            {/* Message Input */}
            <View className='mt-5'>
              <Text className="text-sm left-3 text-gray-600 mb-1">Message</Text>
              <TextInput
                placeholder="Write your message here"
                value={form.message}
                onChangeText={(e: string) =>
                  setForm({
                    ...form,
                    message: e,
                  })}
                multiline
                className="rounded-xl border w-72 left-3 bg-white border-gray-300 focus:border-indigo-500 text-gray-700 py-2 px-4 mr-4 h-20"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} className="py-3 left-3 border w-72 rounded-xl mt-20">
              <Text className="text-center text-black text-lg">Submit</Text>
            </TouchableOpacity>
          </View>
    </LinearGradient>
  )
}

export default Contact