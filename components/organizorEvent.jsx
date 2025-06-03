import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import FormField from "./FormField";
import icons from "../constants/icons";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";

const SharePost = () => {
  const openPicker = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Galeriye erişim izni gerekiyor!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const updatedThumbnails = [...form.thumbnail];
      updatedThumbnails[index] = result.assets[0]; // ya da sadece { uri: result.assets[0].uri }
      setForm({ ...form, thumbnail: updatedThumbnails });
    }
  };

  const removeImage = (index) => {
    const updatedThumbnails = [...form.thumbnail];
    updatedThumbnails[index] = null;
    setForm({ ...form, thumbnail: updatedThumbnails });
  };

  const submit = () => {};

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    thumbnail: [null, null, null],
    prompt: "",
    id: 0,
  });

  return (
    <SafeAreaView
      className="w-screen flex justify-center"
      edges={["left", "right"]}
    >
      <ScrollView className="px-4 my-6 h-full">
        <FormField
          title="Etkinlik Adı:"
          value={form.title}
          placeholder={"Bir Etkinlik Adı Giriniz"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Fotoğraf Yükle
          </Text>

          <View className="flex-row space-x-4 mt-3">
            {form.thumbnail.map((thumb, index) => (
              <TouchableOpacity key={index} onPress={() => openPicker(index)}>
                {thumb ? (
                  <Image
                    source={{ uri: thumb.uri }}
                    resizeMode="cover"
                    className="w-36 h-36 rounded-2xl ml-2"
                  />
                ) : (
                  <View className="w-36 h-36 border border-secondary border-dashed items-center justify-center rounded-2xl ml-2">
                    <Image className="w-10 h-10" source={icons.plus} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-4">
          <FormField
            title="Etkinlik Adı:"
            value={form.prompt}
            placeholder={"Bir Etkinlik Adı Giriniz"}
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
          />
        </View>

        <CustomButton
          title="Paylaş"
          handlePress={submit}
          containerStyles={"mt-7 "}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SharePost;
