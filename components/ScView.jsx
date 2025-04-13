import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window"); // Cihazın genişliği

const CreateScreen = ({ data }) => {

  const handleImagePress = (imageUri) => {
    // Burada istediğiniz işlevi gerçekleştirebilirsiniz.
    console.log("image clicked");
  };

  return (
    <View style={styles.container}>


      {/* Yatay Kaydırılabilir Fotoğraf Alanı */}
      <ScrollView
        horizontal
        pagingEnabled // Sayfa sayfa geçiş yapacak
        showsHorizontalScrollIndicator={true} // Kaydırma göstergesini gizle
        style={styles.scrollView}
        indicatorStyle="white" 
      >
          {data.map((img,index) => (
          <TouchableOpacity
            
            key={index}
            activeOpacity={0.7}
            className="mt-4"
            onPress={handleImagePress}
            
          >
            <View style={styles.imageContainer}>
            <Image
              source={{ uri: `http://localhost:8000/eventphotos/${img}` }}
              className="w-[95%] h-[250px] rounded-3xl"
              resizeMode="cover"
            />
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width, 
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,  // Fotoğraf ekranın tamamını kaplayacak
  },
});

export default CreateScreen;
