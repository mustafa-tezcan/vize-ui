import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";

const ProfilePicture = ({ source, style, disabled }) => {
  return (
    <View
      className={
        "rounded-lg border justify-center  items-center p-0.5 " + style
      }
    >
      <TouchableOpacity disabled={disabled} activeOpacity={0.7}>
        <Image
          source={{ uri: source }}
          className={"rounded-lg   " + style}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
