import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Pin } from "../app/(tabs)/index"

type CardProps = {
  item: Pin;
  onPress: () => void;
  isHome: boolean
};

const Card = ({ item, onPress, isHome = false }: CardProps) => {
  const cardStyle = isHome
    ? { width: 155, height: 200 }   
    : { width: 130, height: 160 };  
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card,cardStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal:8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});