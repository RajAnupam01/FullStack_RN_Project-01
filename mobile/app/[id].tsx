import { View, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Screen from '@/components/Screen';
import { useLocalSearchParams } from 'expo-router';
import { useSinglePin } from '@/hooks/useSinglePin';
import { usePinAction } from '@/hooks/usePinAction';
import { useAuth } from '@/context/useAuth';


const DetailScreen = () => {

  const {user} = useAuth()

  const { id } = useLocalSearchParams();

  const { data: pin, isLoading } = useSinglePin(id as string)
  console.log(pin)

  const { likeMutation, followMutation, saveMutation } = usePinAction(id as string)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!pin) {
    return <Text>Not found.</Text>
  }
  return (
    <Screen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: pin.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.mainFrame}>
          <View style={styles.avatarFrame}>
            <View style={styles.avatar}>
              {pin.owner?.avatar ? (
                <Image
                  source={{ uri: pin.owner.avatar }}
                  style={styles.avatarimg}
                />
              ) : (
                <Text style={styles.initial}>
                  {pin.owner?.name?.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>

            <Text style={styles.avatarframetxt}>
              {pin.owner?.name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={()=> followMutation.mutate(pin.owner._id)}
            style={styles.followBtn}
          >
            <Text style={styles.followBtnTxt}>
              {pin.isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <TouchableOpacity
            style={styles.savedBtn}
            onPress={()=> saveMutation.mutate()}
          >
            <Text style={styles.savedBtnTxt}>
              {pin.isSaved ? "Unsave" : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>likeMutation.mutate()}
            style={styles.likebtn}
          >
            <Text style={styles.likedbtn}>
             Like: {pin.likes.length}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{pin.title}</Text>

        {pin.description && (
          <Text style={styles.text}>{pin.description}</Text>
        )}

        {pin.category && (
          <Text style={styles.text}>{pin.category}</Text>
        )}

        <View style={[styles.avatarFrame, { marginBottom: 20 }]}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatarimg}
            />
          </View>
          <Text style={styles.avatarframetxt}>
            {user?.name}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%' ,height:'150%'},
  mainFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  },
  avatarFrame: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarimg: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  initial: { fontWeight: 'bold' },
  avatarframetxt: { marginLeft: 10 },
  followBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8
  },
  followBtnTxt: { color: 'white' },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  savedBtn: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8
  },
  savedBtnTxt: {},
  likebtn: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8
  },
  likedbtn: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 5
  }
});