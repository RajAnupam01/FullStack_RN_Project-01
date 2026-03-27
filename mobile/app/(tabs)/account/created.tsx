import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '@/components/Screen'
import PinList from '@/components/pinList'
import { useLocalSearchParams } from 'expo-router'
import { getCreatedPin } from '@/services/pinApi'


type Pin = {
  _id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
}


const created = () => {

  const [pins, setPins] = useState<Pin[]>([])
  const { refresh } = useLocalSearchParams()

  useEffect(() => {
     if (pins.length > 0) return;
    const fetchPins = async () => {
      try {
        const res = await getCreatedPin();
        console.log('db called2')
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, [refresh]);




  return (
    <Screen>
      <PinList data={pins} />
    </Screen>
  )
}

export default created

