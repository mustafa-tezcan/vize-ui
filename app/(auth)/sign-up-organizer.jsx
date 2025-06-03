import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { icons } from "../../constants";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import * as DocumentPicker from "expo-document-picker";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    applicationForm: null, // Başvuru formu
  });

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        console.log("Kullanıcı seçim yapmadı.");
        return;
      }

      setForm((prevForm) => ({
        ...prevForm,
        applicationForm: result.assets[0],
      }));
    } catch (error) {
      console.log("Dosya seçme hatası:", error);
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.username) {
      alert("Lütfen bir kullanıcı adı girin.");
      return false;
    }

    if (!form.email || !emailRegex.test(form.email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return false;
    }

    if (!form.password) {
      alert("Lütfen bir parola girin.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      alert("Parolalar eşleşmiyor.");
      return false;
    }

    if (!form.applicationForm) {
      alert("Lütfen gerekli dosyayı yükleyin.");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (validateForm()) {
      // Form geçerli, backend'e gönderilebilir
      console.log("Form gönderiliyor:", form);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-row items-center">
            <Image
              source={images.logoSmall}
              className="w-[45px] h-[100px]"
              resizeMode="contain"
            />
            <Text className="text-[25px] text-secondary font-pblack">ize</Text>
          </View>

          <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
            Become an Organizor
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Application Form
            </Text>
            <TouchableOpacity onPress={() => openPicker()}>
              {form.applicationForm ? (
                <View
                  className="w-full h-40 px-4 bg-black-100 rounded-2xl
                                justify-center items-center flex-row"
                >
                  <View className="flex-column items-center">
                    <Text className="text-sm text-gray-100 font-pmedium">
                      File Uploaded Succesfully!
                    </Text>
                    <Text className="text-sm text-gray-100 font-pmedium">
                      {form.applicationForm.name}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  className="w-full h-40 px-4 bg-black-100 rounded-2xl
                                  justify-center items-center flex-row"
                >
                  <View
                    className="w-14 h-14 border border-dashed
                                      border-secondary-100 justify-center items-center mx-3"
                  >
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in-organizer"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Sign-up As a
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              User
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
