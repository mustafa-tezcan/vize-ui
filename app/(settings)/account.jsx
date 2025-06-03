import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const account = () => {
  const changeProfilePicture = async () => {
    // Kullanıcıdan izin al
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Galeriye erişim izni gerekli!");
      return;
    }

    // Galeriyi aç
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    // Kullanıcı seçim yaptıysa resmi kaydet
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full items-center mt-10">
        <View className="w-20 h-20 border rounded-lg items-center justify-center border ">
          <TouchableOpacity
            onPress={() => {
              changeProfilePicture();
            }}
          >
            <Image
              source={{ uri: profilePicture }}
              className="w-20 h-20 rounded-lg bg-white"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-lg text-white  mt-3">Profil Resmi Güncelle</Text>
      </View>
      <CustomButton
        title="kaydet"
        containerStyles="mb-10 mt-3 mx-4"
      ></CustomButton>

      <View className="mx-4">
        <FormField
          title="kullanıcı adını güncelle"
          placeholder="kullanıcı adını giriniz..."
        ></FormField>
        <CustomButton title="kaydet" containerStyles="mt-5"></CustomButton>
      </View>

      <View className="mx-4 mt-10">
        <FormField
          title="Password"
          placeholder="kullanıcı adını giriniz..."
        ></FormField>
      </View>
      <View className="mx-4 mt-10">
        <FormField
          title="Confirm Password"
          placeholder="kullanıcı adını giriniz..."
        ></FormField>
        <CustomButton title="kaydet" containerStyles="mt-5"></CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default account;
