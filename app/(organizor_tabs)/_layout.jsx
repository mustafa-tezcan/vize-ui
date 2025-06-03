import { View, Image, TouchableOpacity, Text } from "react-native";
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { icons } from "../../constants";
import { Animated, TextInput } from "react-native";
import { useRef, useState, useMemo } from "react";

const TabsLayout = () => {
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);

    Animated.timing(inputWidth, {
      toValue: isSearchOpen ? 0 : 250, // genişlik: aç -> 200, kapa -> 0
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputWidth = useRef(new Animated.Value(0)).current;

  const TabIcon = ({ icon, color, style }) => {
    return (
      <View className="flex items-center justify-center">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className={" " + style}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-20 bg-primary flex flex-row justify-between items-center px-3">
        <Image
          source={images.logoSmall}
          className="w-[50px] h-[50px] items-left"
          resizeMode="contain"
        />
        <View className="flex-row mr-4 items-center">
          {/* Animasyonlu TextInput */}
          <Animated.View
            className="bg-black-100"
            style={{
              width: inputWidth,
              height: 40,
              marginRight: inputWidth.interpolate({
                inputRange: [0, 300],
                outputRange: [0, 20],
              }), // animasyona göre margin-right ekle
              overflow: "hidden",
              borderRadius: 12,
              justifyContent: "center",
            }}
          >
            {isSearchOpen && (
              <TextInput
                className="text-white bg-black-100 ml-3"
                placeholderTextColor="#7B7B8B"
                placeholder="Ara..."
              />
            )}
          </Animated.View>

          {/* Search Icon */}
          <TouchableOpacity onPress={toggleSearch}>
            <Image
              source={icons.search}
              className="w-[28px] h-[28px]"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Chat Icon */}
          <TouchableOpacity
            onPress={() => router.push("../(notifications)/notifications")}
            className="ml-3"
          >
            <Image
              source={icons.chat}
              className="w-[30px] h-[30px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 0,
            height: 60,
            borderTopColor: "#232533",
          },
        }}
      >
        <Tabs.Screen
          name="bigEvents"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="bigEvents"
                focused={focused}
                style={"w-6 h-6"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="create"
                focused={focused}
                style={"w-7 h-7"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="profile"
                focused={focused}
                style={"w-7 h-7"}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default TabsLayout;
