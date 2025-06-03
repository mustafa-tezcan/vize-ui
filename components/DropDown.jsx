import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

const SelectCountryScreen = ({
  data,
  setFunction,
  selectedValue,
  isID,
  placeholder,
  disable,
}) => {
  let countryName = placeholder;
  if (selectedValue && isID) {
    countryName = data.find((country) => country.id === selectedValue)?.name;
  } else if (!isID && selectedValue) {
    countryName = selectedValue;
  }

  return (
    <SelectCountry
      disable={disable}
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      data={data}
      valueField="id"
      labelField="name"
      placeholder={countryName}
      searchPlaceholder="Search..."
      onChange={(e) => {
        isID ? setFunction(e.id) : setFunction(e.name);
      }}
    />
  );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
  dropdown: {
    margin: 7,
    height: 45,
    width: 110,
    backgroundColor: "#EEEEEE",
    borderRadius: 13,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 0,
    height: 0,
    borderRadius: 0,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
