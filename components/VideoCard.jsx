import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import ScView from "../components/ScView"

const VideoCard = ({ title, creator, avatar ,price,location,pictures}) => {


  return (
    <View className="flex flex-col  mt-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1 mx-4">
          <View className="w-[46px] h-[46px] rounded-lg border flex justify-center items-center p-0.5">
            <Image
              source={{ uri: `http://localhost:8000/profilepicture/${avatar}`}}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      <ScView
      data={pictures}
      >

      </ScView>
        <View className="flex-row gap-x-4 mt-3 mx-5">
         <Text className="text-white font-psemibold text-sm">Konum: {location}</Text>
         <Text className="text-white font-psemibold text-sm">Ücret: {price}</Text>
        </View>
    </View>
  );
};

export default VideoCard;