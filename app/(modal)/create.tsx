import { Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { FIREBASE_DB } from '@/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const create = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');

  const onCreateGroup = async () => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, 'groups'), {
        name,
        description: desc, 
        icon_url: icon,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName}></TextInput>

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.textInput} value={desc} onChangeText={setDesc}></TextInput>

      <Text style={styles.label}>Icon</Text>
      <TextInput style={styles.textInput} value={icon} onChangeText={setIcon}></TextInput>

      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#F8F5EA',
    padding: 10,
  },
  label: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default create