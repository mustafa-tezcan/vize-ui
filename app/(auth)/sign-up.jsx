import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
            Sign Up to Vize
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
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Are you an organizer?
            </Text>
            <Link
              href="/sign-up-organizer"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
            <Text className="text-lg text-gray-100 font-pregular">or</Text>
            <Link
              href="/sign-in-organizer"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
