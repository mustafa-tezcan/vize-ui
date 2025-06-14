import { View, Text } from "react-native";
import Friend from "../../components/Friend";
import { FlatList } from "react-native";
import { data } from "../../GlobalData";
import FriendsRequest from "../../components/FriendsRequest";
import { useEffect } from "react";
import { useState } from "react";
import { apiRequest } from "../../CustomFetch";

const friends = () => {
  const [FriendData, setData] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    apiRequest({
      endpoint: "/api/location/cities/",
      method: "GET",
    }).then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    apiRequest({
      endpoint: "/api/friendship/requests",
      method: "GET",
    }).then((data) => {
      setFriendRequests(data);
      console.log(data);
    });
  }, []);
  return (
    <View className="bg-primary h-full w-full">
      <Text className="mt-4 text-white font-pbold text-2xl mx-5">Friends</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Friend picture={item.avatar} name={item.creator} />
          </>
        )}
        ListHeaderComponent={() => (
          <>
            <FriendsRequest friendID></FriendsRequest>
          </>
        )}
      />
    </View>
  );
};

export default friends;
