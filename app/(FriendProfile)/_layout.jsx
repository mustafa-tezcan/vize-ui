import React from "react";
import { Stack } from "expo-router";

const EmployeeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="FriendProfile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default EmployeeLayout;
