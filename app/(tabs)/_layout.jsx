import { View, Text, ScrollView,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Tabs, Redirect, router} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import {icons} from '../../constants/'




const TabsLayout = () => {



  const TabIcon = ({ icon, color , style}) => {
    return (
      <View className="flex items-center justify-center">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className={" "+style}
        />
      </View>
    );
  };



  return (

    <SafeAreaView className="bg-primary h-full">
    <View className="w-full h-20 bg-primary flex flex-row justify-between items-center px-3">

      <Image
      source={images.logoSmall}
      className="w-[50px] h-[50px] items-left"
      resizeMode='contain'/>

    <TouchableOpacity
    onPress={() => router.push('/profile')}
    >
            <Image 
            source={icons.chat}
            className="w-[30px] h-[30px] items-right "
            resizeMode='contain'></Image>
    </TouchableOpacity>
    </View>
    
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#FFA001',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 0,
        height:60,
        borderTopColor: "#232533",
      }

    }}
    
    >
      <Tabs.Screen name='bigEvents'
      options={{
        headerShown: false,
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          icon={icons.home}
          color={color}
          name='bigEvents'
          focused={focused}
          style={'w-6 h-6'}
          />
        )
      }}/>

      <Tabs.Screen name='smallEvents'
      options={{
        headerShown: false,
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          icon={icons.discovery}
          color={color}
          name='smallEvents'
          focused={focused}
          style={'w-7 h-7'}
          />
        )
      }}/>

      <Tabs.Screen name='create'
      options={{
        headerShown: false,
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          icon={icons.plus}
          color={color}
          name='create'
          focused={focused}
          style={'w-7 h-7'}
          />
        )
      }}/>

      <Tabs.Screen name='posts'
      options={{
        headerShown: false,
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          icon={icons.bookmark}
          color={color}
          name='posts'
          focused={focused}
          style={'w-7 h-7'}/>
        )

      }}/>

      <Tabs.Screen name='profile'
      options={{
        headerShown: false,
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          icon={icons.profile}
          color={color}
          name='profile'
          focused={focused}
          style={'w-7 h-7'}/>
        )

      }}/>

    </Tabs>
    <StatusBar backgroundColor="#161622" style="light"/> 
    </SafeAreaView>
  )
}

export default TabsLayout