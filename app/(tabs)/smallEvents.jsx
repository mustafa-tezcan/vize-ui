import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react';
import SmallCard from '../../components/SmallCard';
import Slider from '@react-native-community/slider';
import {data} from '../../GlobalData';


const smallEvents = () => {
  
  
const [value, setValue] = useState(0)
  

  return (
    <SafeAreaView className="bg-primary h-full"
    edges={['left','right']}>

      <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>(
        <SmallCard
        data={data}
        title={item.title}
        creator={item.creator}
        avatar={item.avatar}
        id={item.id}
        participant={item.participant}
        location={item.location}
        />
      )}
      ListHeaderComponent={(
        <View>
          <View className="mt-5 ml-5">
            <Text className="text-white text-psemibold text-m">Mesafe Seçin: {value}km</Text>
          </View>
          <View className="justify-center items-center mt-2">
          <Slider 
            style={{ width: 400, height: 40 }}
            minimumValue={0}
            maximumValue={40}
            //step={1}
            value={value} 
            onValueChange={(val) => setValue(Math.round(val))}
            minimumTrackTintColor="#FF8C00"
            maximumTrackTintColor="#000000"
          />
          </View>
        </View>
      )}>



      </FlatList>


      

    </SafeAreaView>
  )
}

export default smallEvents