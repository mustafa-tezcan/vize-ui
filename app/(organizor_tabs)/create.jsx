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
import SharePost from "../../components/organizorEvent";

const CreateScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
      <Text className="text-secondary font-pbold text-3xl text-center mt-4">
        Etkinlik Paylaş
      </Text>

      <SharePost />
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
