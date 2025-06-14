import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import SmallCard from "../../components/SmallCard";
import Slider from "@react-native-community/slider";
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
        endpoint: `/small/small-events/nearby?lat=${lat}&lng=${lng}&dist=${value}`,
        method: "GET",
      })
        .then((datas) => {
          setData(datas.data);
          console.log("Veri:", datas[0]);
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
        data={datas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SmallCard
            eventPoint={item.eventPoint}
            title={item.name}
            creator={item.owner.username}
            avatar={item.avatar}
            id={item._id}
            participant={item.quota}
            quota={item.quota}
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
