import { View, FlatList , Text} from 'react-native'
import React from 'react'
import { useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '../../components/VideoCard'
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';








const BigEvents = () => {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDM2NzU3ZjFhNWVmNmNmMTNiYjcwMCIsInVzZXJuYW1lIjoicHB2YXIyMyIsImlhdCI6MTc0NDQ2MjM2MX0.4ahhQ2uNRpK30HLzN_H2_ULbYzl9esZWRY4JE4F0yec';

  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Ülkeleri al
  useEffect(() => {
    setLoading(true)
    fetch('http://192.168.1.2:8000/api/countries', {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`,
      }
      })
      .then((res) => 
        {res.json()
          console.log(res)
        })
        .then(datas => {
          
          setCountries(datas)
          
          setLoading(false)
       })
  }, []);

  // Ülke değiştiğinde şehirleri al
  useEffect(() => {
    if (!selectedCountry) return;
    fetch(`http://192.168.1.2:8000/api/cities?countryId=${selectedCountry}`)
      .then((res) => res.json())
      .then(setCities);
  }, [selectedCountry]);

  // Etkinlik türlerini al (enum)
  useEffect(() => {
    fetch('http://192.168.1.2:8000/api/event-types')
      .then((res) => res.json())
      .then(setEventTypes);
  }, []);


        
    useEffect(() => {
      setLoading(true)
      fetch('http://192.168.1.2:8000/api/bigevent/filter', {
        method: 'GET',
        headers: {
        
        'Authorization': `Bearer ${token}`,
     
        }
        })
       .then(res => res.json()) // önce .json yerine .text ile bak
        .then(datas => {
          
          setData(datas)
          
          setLoading(false)
       })
        .catch(err => console.error('Hata:', err));    
    }, []);



    //loading screen
    if (loading) {
      return (
        <SafeAreaView className="bg-primary h-full "
        edges={['left', 'right']}>
          <Text className="text-white text-center font-psemibold text-lg">Loading...</Text>
        </SafeAreaView>
      )
    }


  return (

    <SafeAreaView className="bg-primary h-full "
    edges={['left', 'right']}>

      <FlatList 
      data={datas.data}
      keyExtractor={(item) => item.id}
      renderItem={({item}) =>(
        <VideoCard
        pictures={item.picture}
       
        title={item.name}
        creator={item.Organization.organizationName}
        avatar={item.Organization.profilePicture}
        id={item.id}
        price={item.price}
        location={item.district}
        />
      )}
  
      ListHeaderComponent={()=> (
        <View className="flex-row gap-x-2 justify-center items-center w-full h-16 ">
          <View>
  <Text>Ülke:</Text>
  <Picker
    selectedValue={selectedCountry}
    onValueChange={(value) => {
      setSelectedCountry(value);
      setSelectedCity('');
    }}
  >
    <Picker.Item label="Ülke seçin" value="" />
    {countries.map((country) => (
      <Picker.Item key={country.id} label={country.name} value={country.id} />
    ))}
  </Picker>

  <Text>Şehir:</Text>
  <Picker
    selectedValue={selectedCity}
    onValueChange={(value) => setSelectedCity(value)}
    enabled={!!selectedCountry}
  >
    <Picker.Item label="Şehir seçin" value="" />
    {cities.map((city) => (
      <Picker.Item key={city.id} label={city.name} value={city.id} />
    ))}
  </Picker>

  <Text>Etkinlik Türü:</Text>
  <Picker
    selectedValue={selectedType}
    onValueChange={(value) => setSelectedType(value)}
  >
    <Picker.Item label="Tür seçin" value="" />
    {eventTypes.map((type) => (
      <Picker.Item key={type} label={type} value={type} />
    ))}
  </Picker>
</View>

        </View>
        )}>
          



      </FlatList>
    </SafeAreaView>
    
  
      )
}



export default BigEvents