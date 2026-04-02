import { ActivityIndicator, Text, View } from 'react-native'
import Screen from '@/components/Screen';
import PinList from '@/components/pinList';
import { useSavedPin } from '@/hooks/useSaved';



const saved = () => {
  const {data:pins,isLoading, isError, refetch,isFetching} = useSavedPin();
  if(isLoading){
    return (
      <View style={{flex:1,justifyContent:'center'}} >
        <ActivityIndicator/>
      </View>
    )
  }
  if(isError){
    return(
      <View>
        <Text>Something went wrong</Text>
        <Text onPress={()=>refetch()}></Text>
      </View>
    )
  }
  return (
    <Screen>
      {isFetching && <ActivityIndicator size="small" />}
      <PinList data={pins || []} />
    </Screen>
  )
}

export default saved

