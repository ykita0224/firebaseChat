import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router';
import { FIREBASE_DB } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const Page = () => {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    console.log('DB call');
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'groups'), (snapshot) => {
      const temp: React.SetStateAction<any[]> = [];
      snapshot.docs.forEach((doc) => {
        temp.push({
          _id: doc.id,
          ...doc.data(),
        } );
      });
      setGroups(temp);
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1}}>
      <ScrollView style={styles.container}>
        {
          groups.map((group) => (
            <Link href={{pathname: '/(chat)/[chatid]', params: {chatid: group._id}}} key={group._id} asChild>
              <TouchableOpacity style={styles.group}>
                <Image source={{ uri: group.icon_url}} style={{width: 50, height: 50}}/>
                <View style={{flex: 1}}>
                  <Text>{group.name}</Text>
                  <Text style={{color:'#888'}}>{group.description}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F5EA',
  },
  group: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  }
});

export default Page