import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";
import ScView from "../components/ScView";
import ProfilePicture from "./ProfilePicture";
import { apiRequest } from "../CustomFetch";

const Posts = ({
  title,
  creator,
  avatar,
  data,
  id,
  likeCount,
  liked,
  comments,
  userID,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(likeCount);

  const handlePress = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    apiRequest({
      endpoint: "/api/posts/posts/" + id + "/like",
      method: "PATCH",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <View className="flex flex-col mt-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex flex-row flex-1 mx-4">
          <ProfilePicture
            source={avatar}
            style="w-[60px] h-[60px]"
          ></ProfilePicture>

          <View className="flex  flex-1 ml-3 gap-y-1">
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

      <ScView data={data} selectedId={id} isDisabled={true} />

      <View className="ml-4 mt-3 gap-y-1">
        <Text className="text-white font-psemibold">{creator}</Text>
        <Text className="text-white font-pregular text-sm">{comments}</Text>
      </View>

      <View className="flex-row gap-x-2 mt-2 ml-4 items-center">
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={isLiked ? icons.like : icons.unlike}
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
