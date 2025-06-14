import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "../../components/Posts";
import { useEffect } from "react";
import { apiRequest } from "../../CustomFetch";
import { useState } from "react";

const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    apiRequest({
      endpoint: "/api/friendship/posts",
      method: "GET",
    }).then((data) => {
      setData(data);
      console.log(data[0]);
    });
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full " edges={["left", "right"]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Posts
            data={item.picturePaths}
            liked={item.isLiked}
            likeCount={item._count.PostLikes}
            title={item.caption}
            creator={item.user.username}
            avatar={item.user.profilepicture}
            id={item.id}
            comments={item.comment}
            userID={item.userID}
          />
        )}
        ListHeaderComponent={() => <></>}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Post;
