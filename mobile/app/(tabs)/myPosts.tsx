import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'
import { useAuth } from '@/context/useAuth'
 
const MyPosts = () => {
   const {logout} = useAuth()


  const handleLogout = () =>{
     logout()
  }
  return (
   <Screen>
    <Text>MyPosts</Text>
     <TouchableOpacity onPress={handleLogout} >
            <Text>Logout</Text>
          </TouchableOpacity>
   </Screen>
  )
}

export default MyPosts

const styles = StyleSheet.create({})