import { FlatList, Text, View } from 'react-native';
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
      style={{ flex: 1 }}
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
      ListEmptyComponent={
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>
            Nothing to show
          </Text>
          <Text style={{ marginTop: 8, color: '#999' }}>
            Be the first one to create !
          </Text>
        </View>
      }

    />
  );
};

export default PinList;