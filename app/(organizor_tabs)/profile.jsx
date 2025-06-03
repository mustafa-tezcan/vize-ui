import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import { useState, useRef } from "react";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import SmallCard from "../../components/SmallCard";
import Posts from "../../components/Posts";
import Ticket from "../../components/Ticket";
import Modal from "react-native-modal";
import { router } from "expo-router";
import { data } from "../../GlobalData";
import ProfilePicture from "../../components/ProfilePicture";
import { useEffect } from "react";
import VideoCard from "../../components/VideoCard";
import { apiRequest } from "../../CustomFetch";

const { width } = Dimensions.get("window"); // Cihazın genişliği

const Profile = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    apiRequest({
      endpoint:
        "/api/bigevent/filter?countryID=" +
        selectedCountry +
        "&cityID=" +
        selectedCity +
        "&type=" +
        selectedType,
      method: "GET",
    }).then((datas) => {
      setData(datas);
      setLoading(false);
    });
  }, [selectedCountry, selectedCity, selectedType]);

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const goAccountSettings = () => {
    setModalVisible(false);
    setTimeout(() => {
      router.push("../(settings)/account");
    }, 180);
  };

  return (
    <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
      {/* Profil Header */}
      <View className="flex-row items-center w-full mt-3 mb-5">
        <View className=" ml-4">
          <ProfilePicture source={data[0].avatar} style="w-[60px] h-[60px]" />
        </View>

        <View className="items-center justify-center flex-1 mr-20">
          <Text className="text-lg text-white text-center">
            {data[0].creator}
          </Text>
          <View className="flex-row mt-5">
            <InfoBox
              title={data.length || 0}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("../(friends)/friends")}
            >
              <InfoBox title="1.2k" subtitle="Friends" titleStyles="text-xl" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hesap butonu */}
        <View className="absolute right-0 top-0 mr-4 mt-4">
          <TouchableOpacity onPress={toggleModal} className="flex w-full">
            <Image
              source={icons.profile}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View className="w-full bg-primary rounded-lg">
          <View className="items-center mt-3">
            <Text className="text-white font-pregular text-xl">
              Ayarlar ve Hareketler
            </Text>
          </View>

          {/* Hesap Ayarları */}
          <View className="mt-8 ml-2">
            <TouchableOpacity onPress={goAccountSettings}>
              <View className="flex-row gap-x-3">
                <Image
                  source={icons.settings}
                  className="w-8 h-8"
                  resizeMode="cover"
                />
                <Text className="text-white font-pregular text-lg">
                  Hesap Ayarları
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Çıkış Yap */}
          <View className="mt-8 ml-3 mb-4">
            <TouchableOpacity
              onPress={() => router.push("../(notifications)/deneme")}
            >
              <View className="flex-row gap-x-3">
                <Image
                  source={icons.logout}
                  className="w-8 h-8"
                  resizeMode="cover"
                />
                <Text className="text-white font-pregular text-lg">
                  Çıkış Yap
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={datas.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            isDisabled={true}
            pictures={item.picture}
            title={item.name}
            creator={item.Organization.organizationName}
            avatar={item.Organization.profilePicture}
            id={item.id}
            price={item.price}
            location={item.district}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
