import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Pin } from "../app/(tabs)/index"

type CardProps = {
  item: Pin;
  onPress: () => void;
};

const Card = ({ item, onPress }: CardProps) => {
  
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 175,
    height: 200,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});