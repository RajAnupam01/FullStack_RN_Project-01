import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  getSinglePin,
  toggleFollow,
  toggleLikeUnLikePin,
  toggleSaveUnSavePin
} from '@/services/pinApi';
import Screen from '@/components/Screen';
import { useAuth } from '@/context/useAuth';

type Pin = {
  id: string;
  image: string;
  title: string;
  description?: string;
  category?: string;
  owner: {
    _id: string;
    name: string;
    avatar?: string;
  };
};

type Params = {
  id: string;
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const { user, setUser } = useAuth();

  const [pin, setPin] = useState<Pin | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratio, setRatio] = useState(1);
  const [saved, setSaved] = useState(false);
  const [like, setLike] = useState(0);
  const [followingUsers, setFollowingUsers] = useState<string[]>([]);

  // ✅ correct check
  const isFollowing = pin
    ? followingUsers.includes(pin.owner._id)
    : false;

  // ✅ run only once (important fix)
  useEffect(() => {
    if (user?.following) {
      setFollowingUsers(user.following);
    }
  }, []);

const handleFollow = async () => {
  if (!pin) return;

  try {
    const ownerId = pin.owner._id;

    const res = await toggleFollow(ownerId);

    // ✅ update local state (DetailScreen)
    setFollowingUsers(prev => {
      if (res.data.isFollowing) {
        if (prev.includes(ownerId)) return prev;
        return [...prev, ownerId];
      } else {
        return prev.filter(id => id !== ownerId);
      }
    });

    // 🔥 IMPORTANT: update global user (AuthContext)
    setUser((prev: any) => {
      if (!prev) return prev;

      if (res.data.isFollowing) {
        if (prev.following.includes(ownerId)) return prev;

        return {
          ...prev,
          following: [...prev.following, ownerId],
        };
      } else {
        return {
          ...prev,
          following: prev.following.filter(
            (id: string) => id !== ownerId
          ),
        };
      }
    });

  } catch (error) {
    console.log(error);
  }
};

  const handleToggle = async () => {
    try {
      const pinId = id as string;
      await toggleSaveUnSavePin(pinId);
      setSaved(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const pinId = id as string;
      const res = await toggleLikeUnLikePin(pinId);
      setLike(res.data.totalLikes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await getSinglePin(id);
        const data = res.data;

        setPin(data);
        setLike(data.likes?.length || 0);

        Image.getSize(
          data.image,
          (width, height) => {
            setRatio(width / height);
          },
          (error) => {
            console.log("Image size error:", error);
          }
        );

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPin();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!pin) {
    return (
      <View style={styles.loader}>
        <Text>Pin not found</Text>
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
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
            onPress={handleFollow}
            style={styles.followBtn}
          >
            <Text style={styles.followBtnTxt}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <TouchableOpacity
            style={styles.savedBtn}
            onPress={handleToggle}
          >
            <Text style={styles.savedBtnTxt}>
              {saved ? "Unsave" : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            style={styles.likebtn}
          >
            <Text style={styles.likedbtn}>
              Like: {like}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%' },
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