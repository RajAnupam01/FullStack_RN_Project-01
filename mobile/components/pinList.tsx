import { FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Card from './card';

type Pin = {
  _id: string;
  image: string;
  title: string;
};

type Props = {
  data: Pin[];
  isHome?: boolean
};

const PinList = ({ data, isHome = false }: Props) => {
  const router = useRouter();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Card
          isHome={isHome}
          item={item}
          onPress={() => router.push(`/${item._id}`)}
        />
      )}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',

      }}
      showsVerticalScrollIndicator={false}
      
    />
  );
};

export default PinList;