import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePicture from "../../components/ProfilePicture";
import { data } from "../../GlobalData";
import InfoBox from "../../components/InfoBox";
import { useState } from "react";
import Posts from "../../components/Posts";
import { FlatList } from "react-native";

const FriendProfile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="flex-row items-center w-full mb-5">
        <View className=" ml-4">
          <ProfilePicture source={data[0].avatar} style="w-[60px] h-[60px]" />
        </View>

        <View className="items-center justify-center flex-1 mr-20">
          <Text className="text-lg text-white text-center">
            {data[0].creator}
          </Text>
          <View className="flex-row mt-5">
            <InfoBox
              title={data.length || 0}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <TouchableOpacity
              disabled={true}
              activeOpacity={0.7}
              onPress={() => router.push("../(friends)/friends")}
            >
              <InfoBox title="1.2k" subtitle="Friends" titleStyles="text-xl" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Posts
              data={item.thumbnails}
              liked={item.liked}
              likeCount={item.likeCount}
              title={item.title}
              creator={item.creator}
              avatar={item.avatar}
              id={item.id}
              comments={item.comment}
            />
          )}
          ListHeaderComponent={() => <></>}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default FriendProfile;
