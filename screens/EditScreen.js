import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { database } from '../firebase';

const EditScreen = ({ route, navigation }) => {
  const { student } = route.params;
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);

  const updateStudent = () => {
    database.ref(`/students/${student.id}`).update({
      name,
      age,
      grade,
    }).then(() => {
      alert('Student updated successfully!');
      navigation.goBack(); // Return to Home Screen
    }).catch(error => {
      alert(error.message);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} value={grade} onChangeText={setGrade} />

      <TouchableOpacity style={styles.button} onPress={updateStudent}>
        <Text style={styles.txtBtn}>Update Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#FFC5CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  txtBtn: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;

