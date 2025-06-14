import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { apiRequest } from "../CustomFetch";

const ShareEvent = () => {
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const [selectedLocation, setselectedLocation] = useState(null);
  const [userCoordinates, setuserCoordinates] = useState(null);
  const submit = () => {};

  const onChange = (_, selectedDate) => {
    setShow(Platform.OS === "ios"); // iOS'da date picker genelde inline olur, Android'de kapanır
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const fetchUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    console.log(lat);
    await setuserCoordinates({ lat, lng });
  };

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setselectedLocation({ latitude, longitude });
    setForm({
      ...form,
      location: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
    });
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: {},
    address: "",
    quota: "",
    caption: "",
    eventDate: new Date(),
  });

  const handleShareButton = async () => {
    // Validation kontrolleri
    if (!form.name.trim()) {
      alert("Lütfen etkinlik adı girin.");
      return;
    }
    if (!form.address.trim()) {
      alert("Lütfen etkinlik adresi girin.");
      return;
    }
    if (!form.location.coordinates || form.location.coordinates.length < 2) {
      alert("Lütfen haritadan bir konum seçin.");
      return;
    }
    if (!form.quota.trim()) {
      alert("Lütfen kota bilgisi girin.");
      return;
    }

    console.log(form);
    apiRequest({
      endpoint: "/small/small-events/create",
      method: "POST",
      body: form,
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <SafeAreaView
      className="w-screen flex justify-center"
      edges={["left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0} // Header varsa offset ekle
      >
        <ScrollView className="px-4 my-6 h-[100%]">
          <View className="mt-4 gap-10">
            <FormField
              title="Event Name:"
              value={form.name}
              placeholder={"Enter the name of event"}
              handleChangeText={(e) => setForm({ ...form, name: e })}
            />
            <FormField
              title="Adress:"
              value={form.address}
              placeholder={"Enter the visible adress"}
              handleChangeText={(e) => setForm({ ...form, address: e })}
            />

            <View className="h-[250px] w-full rounded-lg overflow-hidde gap-y-3">
              <Text className="text-gray-200 font-pbold text-l">
                Choose the location(it will be hidden)
              </Text>
              {userCoordinates && (
                <MapView
                  style={{ width: "100%", height: "100%" }}
                  onPress={handleMapPress}
                  initialRegion={{
                    latitude: userCoordinates.lat,
                    longitude: userCoordinates.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
              )}
            </View>

            <View>
              <Text className="text-gray-100 font-pbold text-lg mt-4">
                Choose event date:
              </Text>
              <View className="items-center justify-center rounded-xl">
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  textColor="white"
                  display="spinner"
                  onChange={onChange}
                />
              </View>
            </View>
            <View>
              <Text className="text-gray-100 font-pbold text-lg">
                Choose event time:
              </Text>
              <View className="items-center justify-center rounded-xl">
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  textColor="white"
                  display="spinner"
                  onChange={onChange}
                />
              </View>
            </View>

            <FormField
              title="Quota:"
              keyboardType="numeric"
              inputMode="numeric"
              value={form.quota}
              placeholder={"Quota"}
              handleChangeText={(e) => setForm({ ...form, quota: e })}
            />

            <FormField
              title="Caption:"
              value={form.caption}
              placeholder={"Tell me about your post"}
              handleChangeText={(e) => setForm({ ...form, caption: e })}
            />
          </View>

          <CustomButton
            title="Share"
            handlePress={handleShareButton}
            containerStyles={"mt-7 "}
            isLoading={uploading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ShareEvent;
