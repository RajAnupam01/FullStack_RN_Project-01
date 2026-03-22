import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getSinglePin } from '@/services/pinApi';
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
});