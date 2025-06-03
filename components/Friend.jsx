import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { data } from "../GlobalData";
import ProfilePicture from "./ProfilePicture";
import { icons } from "../constants";

const Friend = ({ picture, name }) => {
  const handlePress = () => {
    Alert.alert(
      "Onay", // Başlık
      "Silmek istediğinize emin misiniz?", // Mesaj
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: () => {
            console.log("Silme işlemi gerçekleşti.");
            // Burada silme işlemini yap
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View>
      <View className=" mt-4 h-24 bg-[#1E1E2F] mx-3 rounded-lg">
        <View className="flex-row">
          <View className="mt-3 ml-3">
            <ProfilePicture source={picture} style="w-[60px] h-[60px]" />
          </View>
          <View className="ml-3 mt-3 gap-y-1">
            <Text className="text-white font-pregular text-lg">{name}</Text>
            <Text className="text-white font-pregular">iletişim</Text>
          </View>
        </View>
        <View className="absolute w-8 h-8 right-0 mr-3 mt-8">
          <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
            <Image
              source={icons.bin}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Friend;
