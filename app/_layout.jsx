import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(organizor_tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TicketPage"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Notifications yazısını gizler
            headerBackTitle: "home",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
        <Stack.Screen
          name="(notifications)"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Notifications yazısını gizler
            headerBackTitle: "back",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
        <Stack.Screen
          name="(settings)"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Notifications yazısını gizler
            headerBackTitle: "profile",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
        <Stack.Screen
          name="(friends)"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Friends yazısını gizler
            headerBackTitle: "profile",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
        <Stack.Screen
          name="(employee_tabs)"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Events yazısını gizler
            headerBackTitle: "back",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
        <Stack.Screen
          name="(FriendProfile)"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#161622", // istediğiniz renk kodunu buraya yazabilirsiniz
            },
            headerTitle: "", // Events yazısını gizler
            headerBackTitle: "back",
            headerTintColor: "#FFA300", // geri butonunun rengi (ikon ve yazı)
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
