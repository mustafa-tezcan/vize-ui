import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { icons } from "../constants";

const Comments = ({ comments, avatar, creator }) => {
  return (
    <View className="flex-row gap-x-3 bg-[#1E1E2F] mt-4 mx-3 rounded-lg">
      <View className="w-[46px] h-[46px] rounded-lg border flex  mt-2 mb-2 ml-1">
        <Image
          source={{
            uri: `http://localhost:8000/profilepicture/${avatar}`,
          }}
          className="w-full h-full rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex flex-1 ml-3 justify-center mt-2 mb-2 gap-y-1">
        <Text className="text-white font-psemibold">{creator}</Text>
        <Text className="text-white">{comments}</Text>
      </View>
    </View>
  );
};

export default Comments;
