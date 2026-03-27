import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Screen from '@/components/Screen';
import { getAllPins } from '@/services/pinApi';
import PinList from '@/components/pinList';


export type Pin = {
  _id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
};

const Home = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const {refresh} = useLocalSearchParams()

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await getAllPins();
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, [refresh]);

  return (
  
      <Screen>
      <PinList data={pins} isHome />
    </Screen>
  );
};

export default Home;