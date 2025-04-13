import React, { useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import SharePost from "../../components/SharePost";
import ShareEvent from "../../components/ShareEvent";

const { width } = Dimensions.get("window");

const CreateScreen = () => {

  const [user, setUser] = useState(true); // true ise SharePost, false ise CreatePost

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
    <SafeAreaView className="bg-primary h-full" edges={['left', 'right']}>

      {/* Üst Menü */}
      <View className="flex-row justify-between mt-4 mx-4 items-center py-2">
        <TouchableOpacity onPress={() => goToPage(0)}>
          <Text 
            style={[activePage === 0 && styles.activeMenuText]}
            className={"text-base leading-normal " + (activePage === 0 ? "text-secondary font-psemibold" : "text-white font-psemibold")}
            >
            Post Paylaş
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToPage(1)}>
          <Text 
            style={[activePage === 1 && styles.activeMenuText]}
            className={"text-base leading-normal " + (activePage === 1 ? "text-secondary font-psemibold" : "text-white font-psemibold")}
            >
            Etkinlik Paylaş
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
        {/**bu sayfanın içeriğini user mı yoksa creator mu olduğuna göre farklı renderlıycam */}
        {/* Sayfa 1 */}
        {user ? <SharePost /> : <ShareEvent />}

        {/* Sayfa 2 */}
        <ShareEvent/>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create ({
  activeMenuText: {
    fontSize: 22, // Aktif olan daha büyük olacak
    fontWeight: "bold",
  }
})

export default CreateScreen;
