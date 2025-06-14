import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { data } from "../GlobalData";
import ProfilePicture from "./ProfilePicture";
import { icons } from "../constants";
import { apiRequest } from "../CustomFetch";

const FriendsRequest = () => {
  const handleRequest = () => {
    Alert.alert(
      "Onay", // Başlık
      "Silmek istediğinize emin misiniz?", // Mesaj
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: () => {
            console.log("Silme işlemi gerçekleşti.");
            // Burada silme işlemini yap
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const accept = (friendID) => {
    apiRequest({
      endpoint: "/api/friendship/approve/" + friendID,
      method: "PATCH",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    Alert.alert(
      "Başarılı", // Başlık
      "Arkadaşlık isteği kabul edildi", // Mesaj
      [
        {
          text: "Tamam",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      {data.map((item, index) => (
        <View className="flex-row mt-4 h-24 bg-[#1E1E2F] mx-3 rounded-lg">
          <View className="flex-row ">
            <View className="mt-3 ml-3">
              <ProfilePicture style="w-[60px] h-[60px]" />
            </View>
            <View className="ml-3 mt-3 gap-y-1">
              <Text className="text-white font-pregular text-lg">
                {item.creator}
              </Text>
              <Text className="text-white font-pregular">iletişim</Text>
            </View>
          </View>
          <View className="right-3 absolute">
            <View className="flex-row flex px-4  mt-11 gap-x-4 items-start">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row"
                onPress={() => accept(item.id)}
              >
                <Image
                  source={icons.accept}
                  className="h-6 w-6"
                  resizeMode="cover"
                />
                <Text className="text-white font-pregular">KABUL ET</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row"
                onPress={() => handleRequest(false)}
              >
                <Image
                  source={icons.reject}
                  className="h-6 w-6"
                  resizeMode="cover"
                />
                <Text className="text-white font-pregular">REDDET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default FriendsRequest;
