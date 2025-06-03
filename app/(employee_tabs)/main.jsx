import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);

  const handlePress = (data) => {
    Alert.alert(
      "Onay",
      `Bu kodu silmek istediğinize emin misiniz?\n\n${data}`,
      [
        {
          text: "Vazgeç",
          style: "cancel",
          onPress: () => setHasScanned(false),
        },
        {
          text: "Sil",
          onPress: () => {
            console.log("Silme işlemi gerçekleşti.");
            setHasScanned(false);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = (barcode) => {
    if (!hasScanned) {
      setHasScanned(true);
      console.log("Barcode scanned:", barcode);
      handlePress(barcode.data);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full items-center justify-center">
      <View className="w-full h-20 bg-primary items-center mt-4">
        <Text className="text-white text-2xl">Bileti Okutun</Text>
      </View>
      <View className="w-full h-80">
        <CameraView
          barcodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
          style={styles.camera}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
