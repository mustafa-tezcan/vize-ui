import { FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../../GlobalData";
import Posts from "../../components/Posts";

const Post = () => {
  return (
    <SafeAreaView className="bg-primary h-full " edges={["left", "right"]}>
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
    </SafeAreaView>
  );
};

export default Post;
