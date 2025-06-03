import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex items-center h-full justify-center">
          <View className="flex-row items-center">
            <Image
              source={images.logoSmall}
              className="w-[85px] h-[100px]"
              resizeMode="contain"
            />
            <Text className="text-[50px] text-secondary font-pblack">ize</Text>
          </View>
          <Image
            source={images.cards}
            className="w-[500px]  h-[300px]"
            resizeMode="contain"
          />

          <View className="relative">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Events with <Text className="text-secondary">Vize</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <View className="mt-5 px-5">
            <Text className="text-sm font-pregular text-gray-100 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              cupiditate!
            </Text>

            <CustomButton
              title={"Get Started"}
              handlePress={() => router.push("(tabs)/bigEvents")}
              //handlePress={() => router.push("(settings)/account")}
              containerStyles="w-full mt-7"
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;
