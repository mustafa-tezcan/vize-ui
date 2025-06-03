import { View, SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import FormField from "./FormField";
import CustomButton from "./CustomButton";
import { Platform, Text } from "react-native";
//import DateTimePicker from "@react-native-community/datetimepicker";

const ShareEvent = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const submit = () => {};

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // iOS'da date picker genelde inline olur, Android'de kapanır
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    location: "",
    quota: "",
    prompt: "",
  });

  return (
    <SafeAreaView
      className="w-screen flex justify-center"
      edges={["left", "right"]}
    >
      <ScrollView className="px-4 my-6">
        <View className="mt-4 gap-10">
          <FormField
            title="Etkinlik Adı:"
            value={form.title}
            placeholder={"Bir Etkinlik Adı Giriniz"}
            handleChangeText={(e) => setForm({ ...form, title: e })}
          />
          <FormField
            title="Konum:"
            value={form.location}
            placeholder={"Bir Etkinlik Adı Giriniz"}
            handleChangeText={(e) => setForm({ ...form, location: e })}
          />
          {/** 
          
            
            <View>
              <Text className="text-white font-pregular">
                Etkinlik tarihi seçiniz:
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
            
          
          */}
          <FormField
            title="Kota:"
            value={form.quota}
            placeholder={"Bir Etkinlik Adı Giriniz"}
            handleChangeText={(e) => setForm({ ...form, quota: e })}
          />

          <FormField
            title="Ek açıklama:"
            value={form.prompt}
            placeholder={"Bir Etkinlik Adı Giriniz"}
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
          />
        </View>

        <CustomButton
          title="Paylaş"
          handlePress={submit}
          containerStyles={"mt-7 "}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareEvent;
