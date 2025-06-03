import { View, FlatList, Text, TextInput } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import DropdownComponent from "../../components/DropDown";
import { apiRequest } from "../../CustomFetch";

const BigEvents = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    setLoading(true);
    apiRequest({
      endpoint:
        "/api/bigevent/filter?countryID=" +
        selectedCountry +
        "&cityID=" +
        selectedCity +
        "&type=" +
        selectedType,
      method: "GET",
    }).then((datas) => {
      setData(datas);
      setLoading(false);
    });
  }, [selectedCountry, selectedCity, selectedType]);

  useEffect(() => {
    setLoading(true);
    apiRequest({
      endpoint: "/api/countries",
      method: "GET",
    }).then((datas) => {
      setCountries(datas);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    setLoading(true);
    apiRequest({
      endpoint: "/api/cities/" + selectedCountry,
      method: "GET",
    }).then((datas) => {
      setCities(datas);
      setLoading(false);
    });
  }, [selectedCountry]);

  const filteredData = useMemo(() => {
    if (!datas?.data) return [];
    if (!searchText.trim()) return datas.data;
    return datas.data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, datas]);

  const headerComponent = useMemo(() => {
    return (
      <View>
        <View className="flex-row gap-x-2 justify-center items-center w-full h-16">
          <DropdownComponent
            disable={false}
            placeholder={"Ülke Seçin"}
            isID={true}
            selectedValue={selectedCountry}
            data={countries}
            setFunction={setSelectedCountry}
          />
          <DropdownComponent
            disable={selectedCountry.length === 0}
            placeholder={"Şehir Seçin"}
            isID={true}
            selectedValue={selectedCity}
            data={cities}
            setFunction={setSelectedCity}
          />
          <DropdownComponent
            disable={false}
            placeholder={"Tür Seçin"}
            selectedValue={selectedType}
            isID={false}
            data={[
              { id: 1, name: "Concert" },
              { id: 2, name: "Sergi" },
              { id: 3, name: "Seminer" },
              { id: 4, name: "Tiyatro" },
            ]}
            setFunction={setSelectedType}
          />
        </View>

        <View className="mt-4 px-4">
          <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex flex-row items-center">
            <TextInput
              className="flex-1 text-white font-psemibold text-base"
              placeholder="Etkinlik Ara..."
              placeholderTextColor="#7B7B8B"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>
    );
  }, [
    countries,
    cities,
    selectedCountry,
    selectedCity,
    selectedType,
    searchText,
  ]);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
        <Text className="text-white text-center font-psemibold text-lg">
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full" edges={["left", "right"]}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            isDisabled={true}
            pictures={item.picture}
            title={item.name}
            creator={item.Organization.organizationName}
            avatar={item.Organization.profilePicture}
            id={item.id}
            price={item.price}
            location={item.district}
          />
        )}
        ListHeaderComponent={headerComponent}
      />
    </SafeAreaView>
  );
};

export default BigEvents;
