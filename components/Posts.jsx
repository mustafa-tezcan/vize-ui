import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import ScView from "../components/ScView";
import { toggleLike } from '../GlobalData';

const Posts = ({ title, creator, avatar, location, data, id, likeCount, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(likeCount);

  const handlePress = () => {
    toggleLike(0);
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes  -1 : likes  +1);
  };

  return (
    <View className="flex flex-col mt-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1 mx-4">
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

      <ScView data={data} selectedId={id} />

      <View className="flex-row gap-x-2 mt-3 mx-5 items-center">
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={isLiked ? (icons.like) : (icons.unlike)} 
            className="h-10 w-10"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-white font-psemibold text-sm">
          {likes} Beğenme
        </Text>
      </View>
    </View>
  );
};

export default Posts;