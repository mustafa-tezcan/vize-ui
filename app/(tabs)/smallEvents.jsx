import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import SmallCard from "../../components/SmallCard";
import Slider from "@react-native-community/slider";
import { data } from "../../GlobalData";
import { apiRequest } from "../../CustomFetch";

const smallEvents = () => {
  const [value, setValue] = useState(5);
  const [slidingValue, setSlidingValue] = useState(5);
  const [datas, setData] = useState([]);
  console.log("data", datas);

  const getLocationAndFetchData = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Konum izni reddedildi.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);

      // Konum alındıktan sonra fetch
      apiRequest({
        endpoint: `/api/smallevent/nearby-locations?lat=${41.001}&lng=${28.6414}&dist=${value}`,
        method: "GET",
      })
        .then((datas) => {
          setData(datas);
          console.log("Veri:", datas);
        })
        .catch((err) => console.error("Hata:", err));
    } catch (error) {
      console.error("Konum alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    getLocationAndFetchData();
  }, [value]);

  return (
    <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SmallCard
            eventPoint={item.eventPoint}
            title={item.title}
            creator={item.creator}
            avatar={item.avatar}
            id={item.id}
            participant={item.participant}
            location={item.location}
          />
        )}
        ListHeaderComponent={
          <View>
            <View className="mt-5 ml-5">
              <Text className="text-white text-psemibold text-m">
                Mesafe Seçin: {slidingValue}km
              </Text>
            </View>
            <View className="justify-center items-center mt-2">
              <Slider
                style={{ width: 400, height: 40 }}
                minimumValue={1}
                maximumValue={10}
                value={value}
                step={1}
                onValueChange={(val) => setSlidingValue(Math.round(val))}
                onSlidingComplete={(val) => setValue(Math.round(val))}
                minimumTrackTintColor="#FF8C00"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default smallEvents;
