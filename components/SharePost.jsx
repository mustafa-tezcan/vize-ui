import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import FormField from "./FormField";
import icons from "../constants/icons";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";
import { apiRequest } from "../CustomFetch";
import { getToken, saveToken } from "../AuthService";

const SharePost = () => {
  const openPicker = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Galeriye erişim izni gerekiyor!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const updatedThumbnails = [...form.thumbnail];
      updatedThumbnails[index] = result.assets[0]; // ya da sadece { uri: result.assets[0].uri }
      setForm({ ...form, thumbnail: updatedThumbnails });
    }
  };

  const removeImage = (index) => {
    const updatedThumbnails = [...form.thumbnail];
    updatedThumbnails[index] = null;
    setForm({ ...form, thumbnail: updatedThumbnails });
  };

  const submit = async () => {
    console.log("Form submitted:", filteredThumbnails);
    if (!form.prompt.trim()) {
      alert("Please enter a caption!");
      return;
    }

    if (filteredThumbnails.length !== 3) {
      alert("Choose at least three pictures!");
      return;
    }
    const formData = new FormData();

    formData.append("caption", form.prompt);

    // 1. görsel
    if (filteredThumbnails[0]) {
      formData.append("post1", {
        uri: filteredThumbnails[0].uri,
        name: filteredThumbnails[0].uri.split("/").pop(),
        type: filteredThumbnails[0].mimeType || "image/jpeg",
      });
    }

    // 2. görsel
    if (filteredThumbnails[1]) {
      formData.append("post2", {
        uri: filteredThumbnails[1].uri,
        name: filteredThumbnails[1].uri.split("/").pop(),
        type: filteredThumbnails[1].mimeType || "image/jpeg",
      });
    }

    // 3. görsel
    if (filteredThumbnails[2]) {
      formData.append("post3", {
        uri: filteredThumbnails[2].uri,
        name: filteredThumbnails[2].uri.split("/").pop(),
        type: filteredThumbnails[2].mimeType || "image/jpeg",
      });
    }

    await fetch("http://192.168.1.6:8080/api/posts/posts", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "BEARER " + (await getToken()),
      },
      body: formData,
    })
      .then((response) => {
        console.log("Response:", response);
        setForm({ thumbnail: [null, null, null], prompt: "" });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    thumbnail: [null, null, null],
    prompt: "",
  });
  const filteredThumbnails = form.thumbnail.filter((file) => file !== null);

  return (
    <SafeAreaView
      className="w-screen flex justify-center"
      edges={["left", "right"]}
    >
      <ScrollView className="px-4 my-6">
        <View className="mt-2 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload a Photo:
          </Text>

          <View className="flex-row space-x-4 mt-3">
            {form.thumbnail.map((thumb, index) => (
              <TouchableOpacity key={index} onPress={() => openPicker(index)}>
                {thumb ? (
                  <Image
                    source={{ uri: thumb.uri }}
                    resizeMode="cover"
                    className="w-36 h-36 rounded-2xl ml-2"
                  />
                ) : (
                  <View className="w-36 h-36 border border-secondary border-dashed items-center justify-center rounded-2xl ml-2">
                    <Image className="w-10 h-10" source={icons.plus} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-4">
          <FormField
            title="Caption:"
            value={form.prompt}
            placeholder={"Enter a caption for your post"}
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
          />
        </View>

        <CustomButton
          title="Share"
          handlePress={submit}
          containerStyles={"mt-7 "}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SharePost;
