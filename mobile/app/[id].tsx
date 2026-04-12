import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Screen from '@/components/Screen';
import { useLocalSearchParams } from 'expo-router';
import { useSinglePin } from '@/hooks/useSinglePin';
import { usePinAction } from '@/hooks/usePinAction';
import { useAuth } from '@/context/useAuth';
import { useState } from 'react';
import { useComment } from '@/hooks/useComment';
import { useEditPin } from '@/hooks/useEditPin';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useDeletePin } from '@/hooks/useDeletePin';
import { router } from "expo-router";

const DetailScreen = () => {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();


  const { mutate: deletePin, isPending: isDeletingPin } = useDeletePin()

  const handleRemovePin = () => {
    Alert.alert(
      "Delete Pin",
      "Are you sure you want to delete this pin?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deletePin(pin._id, {
              onSuccess: () => {
                router.back();
              },
              onError: (err: any) => {
                Alert.alert(
                  "Error",
                  err?.message || "Failed to delete the Pin."
                );
              },
            });
          },
        },
      ]
    );
  };


  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: editPin, isPending: isUpdating } = useEditPin();

  const startEditing = (pin: any) => {
    setTitle(pin.title);
    setDescription(pin.description || '');
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!title.trim() && !description.trim()) {
      Alert.alert('Error', 'Please enter something');
      return;
    }

    editPin(
      {
        id: pin._id,
        data: {
          title: title.trim(),
          description: description.trim(),
        },
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Pin updated');
          setIsEditing(false);
        },
      }
    );
  };

  const [content, setContent] = useState('');
  const {
    comments,
    isLoading: isCommentsLoading,
    addComment,
    isAdding,
    deleteComment,
    isDeleting

  } = useComment(id as string);



  const handleComment = () => {
    if (!content.trim()) {
      Alert.alert('Please add some content to add Comment.');
      return;
    }
    addComment(content.trim());
    setContent('');
  };





  const { data: pin, isLoading } = useSinglePin(id as string);
  const { likeMutation, followMutation, saveMutation } =
    usePinAction(id as string);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pin) {
    return <Text style={{ textAlign: 'center' }}>Not found.</Text>;
  }

  return (
    <Screen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <Image source={{ uri: pin.image }} style={styles.image} resizeMode="cover" />

        {/* CONTENT */}
        <View style={styles.content}>
          {/* USER + FOLLOW */}
          <View style={styles.mainFrame}>
            <View style={styles.avatarFrame}>
              <View style={styles.avatar}>
                {pin.owner?.avatar ? (
                  <Image source={{ uri: pin.owner.avatar }} style={styles.avatarimg} />
                ) : (
                  <Text style={styles.initial}>
                    {pin.owner?.name?.charAt(0).toUpperCase()}
                  </Text>
                )}
              </View>
              <Text style={styles.avatarText}>{pin.owner?.name}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                followMutation.mutate(pin.owner._id, {
                  onError: (err: any) => {
                    const message =
                      err?.response?.data?.message || "Something went wrong";

                    Alert.alert("Error", message);
                  },
                })
              }
              style={styles.followBtn}
            >
              <Text style={styles.followBtnTxt}>
                {pin.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ACTIONS */}
          <View style={styles.action}>
            {pin.owner?._id === user?._id && (
              <>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => startEditing(pin)}
                >
                  <Text style={styles.actionText}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={handleRemovePin}
                  disabled={isDeletingPin}
                >
                  <Text style={[styles.actionText, { color: "red" }]}>
                    {isDeletingPin ? "Deleting..." : "🗑 Delete"}
                  </Text>
                </TouchableOpacity>
              </>

            )}
            <TouchableOpacity style={styles.actionBtn} onPress={() => saveMutation.mutate()}>
              <Text style={styles.actionText}>{pin.isSaved ? 'Saved ✓' : 'Save'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => likeMutation.mutate()}>
              <Text style={styles.actionText}>❤️ {pin.likes.length}</Text>
            </TouchableOpacity>
          </View>

          {/* TITLE & DESCRIPTION */}
          <Text style={styles.title}>{pin.title}</Text>
          {pin.description && <Text style={styles.description}>{pin.description}</Text>}

          {/* ADD COMMENT */}
          <View style={styles.bottomUser}>
            <View style={styles.avatar}>
              <Image source={{ uri: user?.avatar }} style={styles.avatarimg} />
            </View>
            <Text style={styles.avatarText}>{user?.name}</Text>
            <View style={styles.addComment}>
              <TextInput
                style={styles.addCommentInput}
                placeholder="Enter your comment"
                value={content}
                onChangeText={setContent}
              />
              <TouchableOpacity
                style={[styles.submitComment, { opacity: isAdding ? 0.5 : 1 }]}
                onPress={handleComment}
                disabled={isAdding}
              >
                <AntDesign name="arrow-up" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* COMMENTS */}
          <View style={styles.commentsContainer}>
            {isCommentsLoading ? (
              <ActivityIndicator />
            ) : comments?.length === 0 ? (
              <Text style={styles.emptyComments}>No comments yet. Be the first one!</Text>
            ) : (
              comments.map((item: any) => (
                <View key={item._id} style={styles.commentItem}>
                  <View style={styles.commentAvatar}>
                    {item.user?.avatar ? (
                      <Image source={{ uri: item.user.avatar }} style={styles.avatarimg} />
                    ) : (
                      <Text style={styles.initial}>
                        {item.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </Text>
                    )}
                  </View>
                  <View style={styles.commentTextContainer}>
                    <View>
                      <Text style={styles.commentName}>{item.user?.name || 'User'}</Text>
                      <Text style={styles.commentContent}>{item.content}</Text>
                    </View>
                    <View>{item.user?._id === user?._id && (
                      <TouchableOpacity onPress={() => deleteComment(item._id)} disabled={isDeleting}  >
                        <FontAwesome5 name="trash" size={16} color="red" />
                      </TouchableOpacity>
                    )}
                    </View>
                  </View>

                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView >
      <Modal visible={isEditing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>Edit Pin</Text>

            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleUpdate}
                disabled={isUpdating}
                style={[styles.saveBtn, { opacity: isUpdating ? 0.6 : 1 }]}
              >
                <Text style={{ color: 'white' }}>
                  {isUpdating ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </Screen >
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 360,
    borderRadius: 16,
    marginVertical: 10,
  },

  content: {
    paddingHorizontal: 15,
  },

  mainFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  avatarFrame: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  avatarimg: {
    width: '100%',
    height: '100%',
  },

  initial: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },

  avatarText: {
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },

  followBtn: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  followBtnTxt: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  action: {
    flexDirection: 'row',
    marginTop: 20,
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  actionText: {
    fontWeight: '500',
    fontSize: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#111',
  },

  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginVertical: 10,
  },

  bottomUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 15,
  },

  addCommentInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    color: '#333',
  },

  submitComment: {
    backgroundColor: '#e60023',
    padding: 8,
    borderRadius: 20,
    marginLeft: 5,
  },

  commentsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  commentTextContainer: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  commentName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },

  commentContent: {
    fontSize: 14,
    color: '#555',
  },

  emptyComments: {
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  saveBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },

});