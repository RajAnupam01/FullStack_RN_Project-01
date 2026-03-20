import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'
import { useAuth } from '@/context/useAuth'




const Account = () => {
  const {logout} = useAuth()


  const handleLogout = () =>{
     logout()
  }

  return (
    <Screen>
      <Text>Profile
      </Text>
      <TouchableOpacity onPress={handleLogout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </Screen>
  )
}

export default Account

const styles = StyleSheet.create({})