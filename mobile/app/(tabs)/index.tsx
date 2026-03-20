import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '@/components/Screen'
import { getAllPins } from '@/services/pinApi'


const Home = () => {
  const [pins, setPin] = useState<any[]>([])

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await getAllPins();
        setPin(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPin()
  }, [])

  return (
    <Screen>
      <ScrollView style={{ marginTop: 5 }}>
        {pins.map((pin) => (
          <View key={pin._id} style={{ marginBottom: 20 }}>
            <Text>{pin.title}</Text>
            <Text>{pin.description}</Text>
            <Text>{pin.category}</Text>
            <Image
              source={{ uri: pin.image }}
              style={{ width: 300, height: 300 }}
            />
          </View>
        ))}
      </ScrollView>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({})