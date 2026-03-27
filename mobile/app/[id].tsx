import { View, Image, Text, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getSinglePin, toggleSaveUnSavePin } from '@/services/pinApi';
import Screen from '@/components/Screen';

type Pin = {
  id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
};

type Params = {
  id: string;
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const [pin, setPin] = useState<Pin | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratio,setRatio] = useState(1)
  const [saved, setSaved] = useState(false)

  const handleToggle = async ()=>{
    try {
      const pinId = id as string
      await toggleSaveUnSavePin(pinId);
      setSaved(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchPin = async () => {
      try {
       
        const res = await getSinglePin(id);
        
        const data = res.data
        setPin(data)
         Image.getSize(
        data.image,
        (width, height) => {
          setRatio(width / height);
        },
        (error) => {
          console.log("Image size error:", error);
        }
      );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPin();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        
      </View>
    );
  }

  if (!pin) {
    return (
      <View style={styles.loader}>
        <Text>Pin not found</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Image source={{ uri: pin.image }} style={[styles.image,{aspectRatio:ratio}]} resizeMode="cover" />
        <TouchableOpacity style={styles.savedBtn} onPress={handleToggle} >
          <Text style={styles.savedBtnTxt} >{saved ?"unsave":"saved"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{pin.title}</Text>
        {pin.description && <Text style={styles.text}>{pin.description}</Text>}
        {pin.category && <Text style={styles.text}>{pin.category}</Text>}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loader: {
    flex: 1,
   justifyContent:'center',
   alignItems:'center'
    
  },
  image: {
    width:"100%",
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  savedBtn:{
    marginVertical:10,
    marginHorizontal:16,
    backgroundColor:'black',
    width:"20%",
    padding:10
  },
  savedBtnTxt:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  }
});