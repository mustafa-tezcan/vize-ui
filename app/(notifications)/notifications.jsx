import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import Incoming from "../../components/Incoming";
import Outgoing from "../../components/Outgoing";
import { FlatList } from "react-native";
import { data } from "../../GlobalData";

const { width } = Dimensions.get("window");

const CreateScreen = () => {
  const [activePage, setActivePage] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    setActivePage(pageIndex);
  };

  const goToPage = (pageIndex) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: pageIndex * width, animated: true });
      setActivePage(pageIndex);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
      {/* Üst Menü */}
      <View className="flex-row justify-between mt-4 mx-4 items-center py-2">
        <TouchableOpacity activeOpacity={0.7} onPress={() => goToPage(0)}>
          <Text
            style={[activePage === 0 && styles.activeMenuText]}
            className={
              "text-base leading-normal " +
              (activePage === 0
                ? "text-secondary font-psemibold"
                : "text-white font-psemibold")
            }
          >
            Gelen İstekler
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={() => goToPage(1)}>
          <Text
            style={[activePage === 1 && styles.activeMenuText]}
            className={
              "text-base leading-normal " +
              (activePage === 1
                ? "text-secondary font-psemibold"
                : "text-white font-psemibold")
            }
          >
            Gönderilen İstekler
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sayfa İçeriği */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        className="flex-1"
      >
        {/* Sayfa 1 */}
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Incoming
                eventPoint={item.eventPoint}
                title={item.title}
                creator={item.creator}
                avatar={item.avatar}
                id={item.id}
                participant={item.participant}
              />
            )}
          />
        </View>

        {/* Sayfa 2 */}
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Outgoing
                eventPoint={item.eventPoint}
                title={item.title}
                creator={item.creator}
                avatar={item.avatar}
                id={item.id}
                participant={item.participant}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activeMenuText: {
    fontSize: 22, // Aktif olan daha büyük olacak
    fontWeight: "bold",
  },
});

export default CreateScreen;
