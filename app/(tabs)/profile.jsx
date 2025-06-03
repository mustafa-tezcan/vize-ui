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
import { data } from "../../GlobalData";
import Posts from "../../components/Posts";
import Ticket from "../../components/Ticket";
import Modal from "react-native-modal";
import { router } from "expo-router";
import ProfilePicture from "../../components/ProfilePicture";

const { width } = Dimensions.get("window"); // Cihazın genişliği

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [currentPage, setCurrentPage] = useState(1); // Başlangıçta 1. sayfa
  const scrollRef = useRef(null);

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / width) + 1; // Hangi sayfada olduğumuzu hesapla
    setCurrentPage(page);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollRef.current?.scrollTo({ x: (page - 1) * width, animated: true });
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

      {/* Sayfa Seçme İkonları */}
      <View className="flex-row justify-center items-center space-x-6 mt-4 mb-1 gap-x-20">
        <TouchableOpacity onPress={() => goToPage(1)}>
          <Image
            source={icons.discovery}
            className={"w-10 h-10"}
            resizeMode="contain"
            style={{ tintColor: currentPage === 1 ? "#FF8C00" : "gray" }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToPage(2)}>
          <Image
            source={icons.bookmark}
            className={"w-10 h-10 "}
            style={{ tintColor: currentPage === 2 ? "#FF8C00" : "gray" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToPage(3)}>
          <Image
            source={icons.ticket}
            className={"w-10 h-10"}
            resizeMode="contain"
            style={{ tintColor: currentPage === 3 ? "#FF8C00" : "gray" }}
          />
        </TouchableOpacity>
      </View>

      {/* Sayfa İçeriği */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.scrollView}
      >
        {/* Sayfa 1 */}
        <View style={[styles.page]}>
          <FlatList
            className="w-full"
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SmallCard
                data={data}
                title={item.title}
                creator={item.creator}
                avatar={item.avatar}
                participant={item.participant}
                id={item.id}
                price={item.price}
                location={item.location}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyState
                title="No Videos Found"
                subtitle="No videos found for this profile"
              />
            )}
          />
        </View>

        {/* Sayfa 2 */}
        <View style={[styles.page]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Posts
                data={item.thumbnails}
                liked={item.liked}
                likeCount={item.likeCount}
                title={item.title}
                creator={item.creator}
                avatar={item.avatar}
                id={item.id}
                comments={item.comment}
              />
            )}
            ListHeaderComponent={() => <></>}
          ></FlatList>
        </View>

        {/* Sayfa 3 */}
        <View style={[styles.page]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Ticket
                qr={item.qr}
                title={item.title}
                price={item.price}
                adress={item.location}
                date={item.date}
                time={item.time}
              />
            )}
            ListHeaderComponent={() => <></>}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  page: {
    width: width,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Profile;
