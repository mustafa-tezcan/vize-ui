import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, Linking } from "react-native";
import { icons } from "../constants";
import CustomButton from "../components/CustomButton";


const SmallCard = ({ title, creator, avatar, participant, location, data, id }) => {
  
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
      
  return (
    
    <View className="flex flex-col px-4 mt-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {/* Button to open Google Maps */}
      <CustomButton title={"Konumu Aç"}
       handlePress={openMaps}
       containerStyles={"mt-3"}
        />

      <View className="flex-row gap-x-4 mt-3">
        <Text className="text-white font-psemibold text-sm">Konum: {location}</Text>
        <Text className="text-white font-psemibold text-sm">Kota: {participant}</Text>
      </View>
    </View>
  );
};

export default SmallCard;
