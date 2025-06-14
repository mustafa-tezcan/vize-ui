import { View, Text, Image } from "react-native";
import { icons } from "../constants";
import ScView from "../components/ScView";

const VideoCard = ({
  title,
  creator,
  avatar,
  price,
  location,
  pictures,
  id,
  isDisabled,
}) => {
  return (
    <View className="flex flex-col  mt-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1 mx-4">
          <View className="w-[46px] h-[46px] rounded-lg border flex justify-center items-center p-0.5">
            <Image
              source={{
                uri: `http://192.168.1.6:8080/media${avatar}`,
              }}
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

      <View className="w-full h-[250px] ">
        <ScView data={pictures} id={id} isDisabled={isDisabled}></ScView>
      </View>
      <View className="flex-row gap-x-4 mt-3 mx-5">
        <View className="flex-row gap-x-2">
          <Image
            source={icons.location}
            className="w-7 h-7"
            resizeMode="contain"
          />

          <Text className="text-white font-psemibold text-sm mt-1">
            {location}
          </Text>
        </View>
        <Text className="text-white font-psemibold text-sm mt-1">
          Ücret: {price} TL
        </Text>
      </View>
    </View>
  );
};

export default VideoCard;
