import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Screen from '@/components/Screen';
import { getAllPins } from '@/services/pinApi';
import Card from '@/components/card';


export type Pin = {
  _id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
};

const Home = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const router = useRouter();
  const {refresh} = useLocalSearchParams()

  useEffect(() => {
    const fetchPins = async () => {
      try {
        console.log("db calling")
        const res = await getAllPins();
        console.log("db was calling")
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, [refresh]);

  return (
    <Screen>
      <FlatList
        data={pins}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => router.push(`/${item._id}`)} // navigate with id
          />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          paddingHorizontal: 8,
        }}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Home;