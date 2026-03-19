import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'
import { useAuth } from '@/context/useAuth'

const Home = () => {
  const {user} = useAuth()
  return (
    <Screen>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.followers}</Text>
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({})