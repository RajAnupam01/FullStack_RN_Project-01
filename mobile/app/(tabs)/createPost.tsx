import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '@/components/Screen'
import * as ImagePicker from "expo-image-picker"
import { createPin } from '@/services/pinApi'
import { router } from 'expo-router'

const CreatePost = () => {

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [image, setImage] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };


  const handleSubmitPin = async () => {
    if (!title || !description || !category || !image) {
      alert("Title, Description,Image and Category is required.")
      return
    }
    try {
      setLoading(true)
      const res = await createPin({ title, description, category, image })
      alert(res.message)
      router.replace("/(tabs)")
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Creation failed."
      alert(message)

    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen>
      <View style={styles.container} >
        <View style={styles.header} >
          <Text style={styles.headertxt} >Create</Text>
        </View>

        <Pressable onPress={pickImage} >
          <View style={styles.imgbox}>
            {image ? <Image source={{ uri: image.uri }} style={styles.img} /> : <Image source={{ uri: "https://st.depositphotos.com/2934765/53420/v/450/depositphotos_534202026-stock-illustration-default-image-icon-vector-missing.jpg" }} style={styles.img} />}
          </View>
        </Pressable>
        <View style={styles.form}>
          <TextInput
            placeholder='Title'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder='Description'
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            placeholder='Category'
            value={category}
            onChangeText={setCategory}
          />

          <TouchableOpacity onPress={handleSubmitPin} disabled={loading} >
            <Text>{loading ? "wait.." : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

export default CreatePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  imgbox: {
    width: "100%",
    height: 250,
    borderWidth: 2,
    borderColor: 'black'
  },
  img: {
    width: "100%",
    height: "100%"
  },
  header: {
    margin: 10
  },
  headertxt: {
    fontSize: 22,
  },
  form: {

  }
})