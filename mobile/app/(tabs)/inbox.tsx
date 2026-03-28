import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'

const Inbox = () => {
  return (
    <Screen>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Inbox</Text>
          <FontAwesome name="pencil-square-o" size={22} color="black" />
        </View>

        {/* Messages Header */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Messages</Text>

          <View style={styles.row}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-thin-right" size={16} color="black" />
          </View>
        </View>

        {/* Message Item */}
        <View style={styles.messageRow}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5PrH8T969Xabc4RqVzfW_V8ZPMp7sM8cSyg&' }}
            style={styles.avatar}
          />

          <View style={styles.messageText}>
            <Text style={styles.messageTitle}>PinSphere India</Text>
            <Text style={styles.messageSubtitle}>Sent a Pin</Text>
          </View>

          <Text style={styles.time}>2yr</Text>
        </View>

        {/* Invite Section */}
        <View style={styles.inviteRow}>
          <View style={styles.iconBox}>
            <AntDesign name="user-add" size={24} color="black" />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bold}>Invite your friends</Text>
            <Text style={styles.light}>Connect to start chatting</Text>
          </View>
        </View>

        {/* Updates */}
        <Text style={styles.updateTitle}>Updates</Text>

        {/* Update Item */}
        <View style={styles.updateRow}>
          <View style={styles.iconBox}>
            <Feather name="search" size={22} color="black" />
          </View>

          <View style={styles.updateText}>
            <Text>Still Searching? Explore ideas</Text>
            <Text>related to Java</Text>
          </View>

          <Entypo name="dots-three-horizontal" size={18} color="black" />
        </View>

        <View style={styles.updateRow}>
          <View style={styles.iconBox}>
            <Feather name="search" size={22} color="black" />
          </View>

          <View style={styles.updateText}>
            <Text>Still Searching? Explore ideas</Text>
            <Text>related to Spring Boot</Text>
          </View>

          <Entypo name="dots-three-horizontal" size={18} color="black" />
        </View>

        <View style={styles.updateRow}>
          <View style={styles.iconBox}>
            <Feather name="search" size={22} color="black" />
          </View>

          <View style={styles.updateText}>
            <Text>Still Searching? Explore ideas</Text>
            <Text>related to React Native</Text>
          </View>

          <Entypo name="dots-three-horizontal" size={18} color="black" />
        </View>

      </View>
    </Screen>
  )
}

export default Inbox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 24,
    fontWeight: '800',
  },

  subHeader: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },

  seeAllText: {
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  messageRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  messageText: {
    marginLeft: 10,
    flex: 1,
  },

  messageTitle: {
    fontWeight: '700',
  },

  messageSubtitle: {
    color: '#555',
  },

  time: {
    color: '#888',
    fontSize: 12,
  },

  inviteRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: '#DED8D8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bold: {
    fontWeight: '600',
  },

  light: {
    color: '#555',
  },

  updateTitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: '700',
  },

  updateRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  updateText: {
    flex: 1,
    marginHorizontal: 10,
  },
})
