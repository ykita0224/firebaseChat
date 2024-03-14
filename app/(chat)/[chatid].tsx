import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Yolo = () => {
  const { chatid  } = useLocalSearchParams();
  console.log(chatid);
  return (
    <View>
      <Text>Yolo</Text>
    </View>
  )
}

export default Yolo