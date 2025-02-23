import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { database } from '../firebase';

const AddScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  const addStudent = () => {
    if (name && age && grade) {
      const newRef = database.ref('/students').push();
      newRef
        .set({ name, age, grade })
        .then(() => {
          Alert.alert('Success', 'Student added successfully');
          setName('');
          setAge('');
          setGrade('');
          navigation.goBack();  // Automatically navigate back to HomeScreen
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to add student: ' + error.message);
        });
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Name" 
        value={name} 
        onChangeText={setName} 
        placeholderTextColor="gray" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Age" 
        value={age} 
        onChangeText={setAge} 
        keyboardType="numeric" 
        placeholderTextColor="gray" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Grade" 
        value={grade} 
        onChangeText={setGrade} 
        placeholderTextColor="gray" 
      />

      <TouchableOpacity style={styles.button} onPress={addStudent}>
        <Text style={styles.txtBtn}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 16,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 350,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFC5CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  txtBtn: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
});
