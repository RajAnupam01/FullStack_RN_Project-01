import Screen from '@/components/Screen'
import PinList from '@/components/pinList'
import { useCreatedPin } from '@/hooks/useCreatedPin'
import { ActivityIndicator, View,Text } from 'react-native';
const created = () => {

 const {data:pins,isLoading, isError,refetch, isFetching} = useCreatedPin();
 if(isLoading){
  return(
    <View style={{flex:1, justifyContent:'center'}} >
      <ActivityIndicator/>
    </View>
  )
 }

 if(isError){
  return (
    <View>
      <Text>Something went wrong</Text>
      <Text onPress={()=>refetch()}>Retry</Text>
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

export default created

