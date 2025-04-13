import { View, Text, SafeAreaView, ScrollView, TouchableOpacity,Image } from 'react-native'
import { useState } from 'react'
import React from 'react'
import FormField from './FormField'
import icons from '../constants/icons'
import CustomButton from './CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native'


const SharePost = () => {

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

    const submit = () => {}

    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        thumbnail: null,
        prompt: '',
        id: 0
    })

  return (
    <SafeAreaView className="w-screen flex justify-center"
    edges={['left','right']}>
        <ScrollView className="px-4 my-6">
            <FormField
            title="Etkinlik Adı:"
            value={form.title}
            placeholder={'Bir Etkinlik Adı Giriniz'}
            handleChangeText={(e) => setForm({...form, title: e})}
            />

            <View className="mt-7 space-y-2">
                <Text className="text-base text-gray-100 font-pmedium">
                    Fotoğraf Yükle
                </Text>
                <TouchableOpacity onPress={() => openPicker('image')}>
                    {form.thumbnail ? (
                        <Image
                        source={{ uri: form.thumbnail.uri }}
                        resizeMode="cover"
                        className="w-full h-64 rounded-2xl"
                        />
                    ) : (
                        <View className='w-full h-40 px-4 bg-black-100 rounded-2xl
                        justify-center items-center flex-row'>
                            <View className='w-14 h-14 border border-dashed
                            border-secondary-100 justify-center items-center mx-3'>
                                <Image
                                source={icons.upload}
                                resizeMode='contain'
                                className='w-1/2 h-1/2'
                                />
                            </View>
                            <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
                        </View>
                    )}
                    
                    

                </TouchableOpacity>
            </View>
            <View>

            </View>
            <View className="mt-4">
            <FormField
            title="Etkinlik Adı:"
            value={form.prompt}
            placeholder={'Bir Etkinlik Adı Giriniz'}
            handleChangeText={(e) => setForm({...form, prompt: e})}
            />
            </View>

            <CustomButton
            title='Paylaş'
            handlePress={submit}
            containerStyles={'mt-7 '}
            isLoading={uploading}

            />

        </ScrollView>
    </SafeAreaView>
  )
}

export default SharePost