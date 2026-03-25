import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '@/components/Screen'
import { router } from 'expo-router'
import Saved from './saved'
import Created from './created'

const Index = () => {
  const [activeTab, setActiveTab] = useState(1)
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.avatar} >
          <Image source={{ uri: 'https://nationaltoday.com/wp-content/uploads/2022/11/456841263-min-1200x834.jpg' }} style={styles.avatarimg} />
        </View>
        <Text style={styles.txt1} >Alexa Bliss</Text>
        <Text style={styles.txt2} >BlissAlexa@gmail.com</Text>
        <View style={styles.subtxtstyle} >
          <Text style={styles.subtxt}>Followers:05  |</Text>
          <Text style={styles.subtxt} >  Following:12</Text>
        </View>
        <View style={styles.card1}>
          <TouchableOpacity style={styles.btn1} onPress={() => router.push('/(tabs)/account/profile')} >
            <Text style={styles.btntxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1} >
            <Text style={styles.btntxt}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1} >
            <Text style={styles.btntxt}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card2}>
          <TouchableOpacity
            style={[
              styles.btn2,
              { backgroundColor: activeTab === 0 ? '#e60023' : '#b3b1b1' }
            ]}
            onPress={() => setActiveTab(0)}
          >
            <Text style={styles.btntxt}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btn2,
              { backgroundColor: activeTab === 1 ? '#e60023' : '#b3b1b1' }
            ]}
            onPress={() => setActiveTab(1)}
          >
            <Text style={styles.btntxt}>Created</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 0 && <Created />}
        {activeTab === 1 && <Saved />}
      </View>
    </Screen>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: "100%",
    height: "16%",
    backgroundColor: '#b3b1b1'
  },
  avatar: {
    height: 150,
    width: 150,
    backgroundColor: '#b3b1b1',
    borderRadius: 75,
    marginTop: -75,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden'
  },
  avatarimg: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    resizeMode: 'cover'
  },
  txt1: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 600,
  },
  txt2: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  subtxtstyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  subtxt: {
    fontSize: 14,
  },

  card1: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',

  },
  card2: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 25,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  btn1: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e60023',
    borderRadius: 8
  },
  btn2: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '49%',
    borderRadius: 8,
  },
  btntxt: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  }

})