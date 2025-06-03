import { View, Text } from "react-native";
import Friend from "../../components/Friend";
import { FlatList } from "react-native";
import { data } from "../../GlobalData";
const friends = () => {
  return (
    <View className="bg-primary h-full w-full">
      <Text className="mt-4 text-white font-pbold text-2xl mx-5">Friends</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Friend picture={item.avatar} name={item.creator} />
        )}
      />
    </View>
  );
};

export default friends;
