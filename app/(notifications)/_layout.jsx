import React from "react";
import { Stack } from "expo-router";

const NotificationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="deneme" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NotificationsLayout;
