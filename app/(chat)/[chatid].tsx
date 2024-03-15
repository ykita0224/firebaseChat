import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ListRenderItem, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebaseConfig';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const Channel = () => {
  const { chatid  } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadGroup = async () => {
      const docRef = doc(FIREBASE_DB, 'groups', chatid as string);
      const group = await getDoc(docRef);
      navigation.setOptions({ headerTitle: group.data()?.name || ''});
    };

    loadGroup();
  }, [chatid]);

  useEffect(() => {
    const loadUser = async () => {
      const temp = await AsyncStorage.getItem('user');
      setUser(temp);
    };
    loadUser();

    console.log('DB call');
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'channel'), (snapshot) => {
      const temp: React.SetStateAction<any[]> = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.group_id == chatid) {
          temp.push({
            _id: doc.id,
            ...data,
          } );
        }
      });
      setMessages(temp);
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  const renderMessage: any = ({item}: any) => {
    const isUserMessage = item?.user === user;
    // console.log(item.user);
    return (
      <View style={[styles.messageContainer, isUserMessage ? styles.userMesageContainer : styles.otherMessageContainer]}>
        <Text>{item?.content || ''}</Text>
      </View>
    );
  };

  const handleSendMessage = async () => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, 'channel'), {
        group_id: chatid,
        content: newMessage, 
        user: user || '',
        sendAt: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList data={messages} renderItem={renderMessage} keyExtractor={(item) => item._id}/>
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={styles.textInput} value={newMessage} onChangeText={setNewMessage} placeholder='Type your message' placeholderTextColor="gray" multiline={true}/>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={newMessage === ''}>
              <Ionicons name="send-outline" style={styles.sendButtonText}/>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EA',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
    paddingTop: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  userMesageContainer: {
    backgroundColor: '#791363',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  userMessageText: {
    color: '#fff'
  },
  timeStamp: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});

export default Channel