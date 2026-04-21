import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Screen from '@/components/Screen'
import * as ImagePicker from "expo-image-picker"
import { useCreatePin } from '@/hooks/useCreatePin'
import { router } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';



const CreatePost = () => {

  const { mutate: createPinMutation, isPending } = useCreatePin()


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState<any>(null)



  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmitPin = async () => {
    if (!title || !description || !category || !image) {
      alert("All fields are required.")
      return
    }
    createPinMutation(
      { title, description, category, image },
      {
        onSuccess: (res) => {
          alert(res.message);
          setTitle('')
          setDescription('')
          setCategory('')
          setImage(null)

          router.back()
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message || error?.message || "Creation failed.";
          alert(message)
        }
      }
    )
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>

              <Text style={styles.header}>Create Post</Text>

              <Pressable onPress={pickImage} style={styles.imageWrapper}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Tap to upload image</Text>
                  </View>
                )}
              </Pressable>

              <View style={styles.form}>

                <TextInput
                  placeholder='Title'
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                  placeholderTextColor="#888"
                />

                <TextInput
                  placeholder='Description'
                  value={description}
                  onChangeText={setDescription}
                  style={[styles.input, styles.textArea]}
                  multiline
                />

                <TextInput
                  placeholder='Category'
                  value={category}
                  onChangeText={setCategory}
                  style={styles.input}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmitPin}
                  disabled={isPending}
                >
                  {isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  )
}

export default CreatePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111'
  },
  imageWrapper: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    color: '#6b7280'
  },
  form: {
    gap: 15
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#e60023',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
