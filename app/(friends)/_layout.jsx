import React from "react";
import { Stack } from "expo-router";

const FriendsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="friends" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FriendsLayout;
