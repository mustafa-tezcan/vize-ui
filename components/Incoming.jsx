import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState } from "react";

const Incoming = ({ eventPoint, avatar, creator, title }) => {
  const [clicked, setClicked] = useState(true);
  const [text, setText] = useState("123");
  const [request, setRequest] = useState(true); //backende bu bilgi gidebilir.

  const handleRequest = (state) => {
    if (state) {
      // Handle accept logic here
      console.log("Request accepted");
      setClicked(false);
      setRequest(true);
      setText("Request accepted");
    } else {
      // Handle reject logic here
      console.log("Request rejected");
      setClicked(false);
      setRequest(false);
      setText("Request rejected");
    }
  };

  return (
    <ScrollView>
      <View className="w-screen">
        <View className="items-center mt-8 mx-4">
          <View className="h-40 w-full bg-[#1E1E2F] rounded-xl">
            <View className="items-center mt-3">
              <Text className="text-white font-pbold text-xl">{title}</Text>
            </View>
            <View className="flex-row">
              <View className="flex-row px-4 mt-4 gap-x-2 items-start">
                <View className="h-[50px] w-[50px] border rounded-lg">
                  <TouchableOpacity activeOpacity={0.7}>
                    <Image
                      source={{ uri: avatar }}
                      resizeMode="cover"
                      className="w-full h-full rounded-lg"
                    />
                  </TouchableOpacity>
                </View>
                <View className="gap-y-2">
                  <Text className="text-white font-psemibold">{creator}</Text>
                  <Text className="text-white font-pregular">
                    Etkinlik puanı: {eventPoint}
                  </Text>
                </View>
              </View>
              {clicked ? (
                <View className="flex-row px-4 mt-11 gap-x-4 items-start">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row"
                    onPress={() => handleRequest(true)}
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
              ) : (
                <View className="flex-row px-4 mt-11 gap-x-4 items-start">
                  <Text className="text-white font-psemibold">{text}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Incoming;
