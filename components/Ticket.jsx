import { View, Text, ImageBackground } from "react-native";

import QRCode from "react-native-qrcode-svg";

const Ticket = ({ qr, date, time, price, adress, title }) => {
  return (
    <View className="mt-5 items-center ">
      <ImageBackground
        resizeMode="contain"
        className="w-[410px] h-40 "
        source={require("../assets/images/ticket.png")}
      >
        <View className="flex-row">
          <View>
            <View className="mt-4 justify-center min-w-[150px] ml-10 max-w-[150px]">
              <Text className="font-pbold text-xl">{title}</Text>
            </View>
            <View className="absolute mt-28 ml-16">
              <Text className="font-psemibold">{date}</Text>
            </View>
          </View>
          <View>
            <View className="mt-5 ml-6 gap-y-2">
              <Text className="font-psemibold">time: {time}</Text>
              <Text className="font-psemibold">price: {price} </Text>
              <View className="max-w-[93px] min-w-[93px]">
                <Text>Adress</Text>
                <Text>{adress}</Text>
              </View>
            </View>
          </View>
          <View className="mt-10 ml-8">
            <QRCode value={qr ? JSON.stringify(qr) : "No Ticket"} size={75} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Ticket;
