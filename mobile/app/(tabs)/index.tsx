import Screen from '@/components/Screen';
import PinList from '@/components/pinList';
import { usePins } from '@/hooks/usePins';
import { ActivityIndicator, Text, View } from 'react-native';

const Home = () => {
  const { data: pins, isLoading, isError, error, refetch, isFetching } = usePins();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Something went wrong</Text>
        <Text onPress={() => refetch()}>Retry</Text>
      </View>
    );
  }

  return (
    <Screen>
      {isFetching && <ActivityIndicator size="small" />} 
      <PinList data={pins || []} isHome />
    </Screen>
  );
};

export default Home;