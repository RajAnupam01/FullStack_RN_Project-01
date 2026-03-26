import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Screen from '@/components/Screen'
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/useAuth';
import { router } from 'expo-router';



const Profile = () => {

  const { user, updateUser } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
    }
  }, [user])

  const handleUpdate = async () => {
    if (
      name.trim() === user?.name &&
      email.trim() === user?.email &&
      !avatar
    ) {
      Alert.alert("No changes made");
      return;
    }
    try {
      setLoading(true)
      const res = await updateUser(name, email, avatar)
      Alert.alert(res.message)
      router.replace("/(tabs)/account")

    } catch (error: any) {
      const message =
        console.log("UPDATE ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>Update your details</Text>
          </View>

          {/* Avatar */}
          <View style={styles.avatarBox}>
            <Pressable onPress={pickImage}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri:
                      avatar?.uri ||
                      user?.avatar
                  }}
                  style={styles.avatarimg}
                />
              </View>
            </Pressable>
          </View>

          {/* Form Card */}
          <View style={styles.card}>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#999"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
              onPress={handleUpdate}
              disabled={loading}
            >
              <Text style={styles.submitBtnTxt}>
                {loading ? "Updating..." : "Save Changes"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </Screen>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  avatarBox: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatarimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#f7f7f7",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#222",
  },

  submitBtn: {
    marginTop: 25,
    backgroundColor: "#e60023",
    paddingVertical: 15,
    borderRadius: 12,
  },

  submitBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});