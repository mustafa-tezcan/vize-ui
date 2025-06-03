import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState } from "react";

const Outgoing = ({ eventPoint, avatar, creator, title }) => {
  const [isWaiting, setisWaiting] = useState(false);

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
              {isWaiting ? (
                <View className="flex-row px-4 mt-11 gap-x-4 items-start">
                  <Text className="text-white font-psemibold">Bekliyor</Text>
                </View>
              ) : (
                <View className="flex-column px-4 mt-6 gap-x-4 items-start">
                  <Text className="text-white font-psemibold">
                    istek onaylandı
                  </Text>
                  <Text className="text-white font-psemibold">
                    iletişim : xxxxx
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Outgoing;
