import { useState } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import ProfilePicture from "./ProfilePicture";

const SmallCard = ({
  title,
  creator,
  avatar,
  participant,
  location,
  eventPoint,
}) => {
  const handleJoinPress = () => {
    Alert.alert(
      "İstek Gönderildi",
      "Etkinliğe katılma isteğiniz gönderildi.",
      [
        {
          text: "Tamam",
          onPress: () => console.log("Uyarı kapatıldı"),
          style: "default",
        },
      ],
      { cancelable: true }
    );
  };

  /*

  const openMaps = () => {
    if (!location || location.trim() === "") {
      Alert.alert("Hata", "Lütfen bir adres girin!");
      return;
    }

    const formattedLocation = encodeURIComponent(location).replace(/%20/g, "+"); // Ensure full query is recognized
    const url = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Hata", "Google Haritalar açılamıyor!");
        }
      })
      .catch((err) => console.error("Hata:", err));
  };
  */

  return (
    <View className="flex flex-col px-4 mt-4  pb-4 bg-[#1E1E2F] rounded-lg">
      <View className="flex flex-row items-start mt-2">
        {/* Sol taraf: Avatar + Kullanıcı Bilgileri */}
        <View className="flex-1 flex-row">
          <ProfilePicture source={avatar} style="w-[60px] h-[60px]" />
          {/* Kullanıcı Bilgileri */}
          <View className="ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {creator}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {eventPoint} Etkinlik Puanı
            </Text>
          </View>
        </View>

        {/* Sağ taraf: Konum ve Kota */}
        <View className="flex-1 justify-start ml-4">
          <View className="flex-row items-center gap-x-1">
            <Image source={icons.location} className="w-6 h-6" />
            <Text
              className="text-white font-psemibold text-l"
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Image source={icons.joined} className="w-6 h-6" />
            <Text
              className="text-white font-psemibold text-l"
              numberOfLines={1}
            >
              {participant}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row mt-10">
        <View className=" mt-3 ">
          <Text>
            <Text className="text-white font-psemibold text-lg">{title}</Text>
          </Text>
          <Text className="text-white font-psemibold text-sm mt-2 max-w-[220px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos,
            soluta.
          </Text>
        </View>
        <View className="flex-1  items-center ">
          <TouchableOpacity onPress={handleJoinPress}>
            <View className="mx-2 mt-3 items-center">
              <Image source={icons.send} className="w-10 h-10" />
              <Text className="text-white">istek gönder</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SmallCard;
