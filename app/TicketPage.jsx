import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import VideoCard from "../components/VideoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import uuid from "react-native-uuid";
import Comments from "../components/Comments";
import { apiRequest } from "../CustomFetch";

const TicketPage = () => {
  const [ticket, setTicket] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  {
    /* Parlaklık animasyonunu başlat 
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState(initialComments);
  const [highlightedId, setHighlightedId] = useState(null);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  */
  }

  const route = useRoute();
  const { eventId } = route.params;
  const { data } = route.params;

  const handleSendComment = () => {
    console.log("yorum gönderildi");
  };

  useEffect(() => {
    setLoading(true);
    apiRequest({
      endpoint: `/api/bigevent/${eventId}`,
      method: "GET",
    })
      .then((res) => {
        setPageData(res);
      })
      .then((err) => {
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching event data:", err));
  }, []);

  const buyTicket = () => {
    const ticketId = uuid.v4();
    const newTicket = {
      id: eventId,
      createdAt: new Date().toISOString(),
    };
    setTicket(newTicket);
    console.log(newTicket);
  };

  {
    /* Parlaklık animasyonunu başlat 

  const handleSendComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: uuid.v4(),
      creator: "Mustafa",
      avatar: "https://shorturl.at/pClE3",
      comment: commentText,
    };

    setCommentList((prev) => [newComment, ...prev]);
    setCommentText("");
    setHighlightedId(newComment.id);

    // Parlaklık animasyonunu başlat
    opacityAnim.setValue(1);
    Animated.timing(opacityAnim, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setHighlightedId(null));
  };
  */
  }

  //loading screen
  if (!pageData?.data) {
    return (
      <SafeAreaView
        className="bg-primary h-full justify-center items-center"
        edges={["left", "right"]}
      >
        <Text className="text-white text-center font-psemibold text-lg">
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary w-full h-full">
      <View>
        <View className="gap-4">
          <VideoCard
            pictures={data}
            title={pageData.data.name}
            creator={pageData.data.Organization.organizationName}
            avatar={pageData.data.Organization.profilePicture}
            price={pageData.data.price}
            location={pageData.data.district}
            isDisabled={true}
          />
          <CustomButton
            title="Bilet Satın Al"
            handlePress={buyTicket}
            containerStyles="mx-3"
          />
        </View>

        <View className="h-[350px] w-full mb-2">
          <Text className="text-white text-center mt-3 font-psemibold text-m">
            Yorumlar
          </Text>
          <FlatList
            data={pageData.data.BigEventComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Comments
                creator={item.user.username}
                avatar={item.user.profilePicture}
                comments={item.commentBody}
              />
            )}
          />
        </View>
      </View>
      <View className="absolute bottom-0 mb-10 w-full px-3 py-2">
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center ">
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            placeholder={"Yorumunuzu yazın..."}
            placeholderTextColor="#7B7B8B"
            onChangeText={setCommentText}
          />
          <TouchableOpacity onPress={handleSendComment}>
            <Text className="text-white font-psemibold text-base ">Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TicketPage;
