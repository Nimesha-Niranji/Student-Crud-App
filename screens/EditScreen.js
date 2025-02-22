import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddEditScreen = ({ route, navigation }) => {
  const student = route.params?.student || { name: '', age: '', grade: '' };
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);

  const handleSubmit = () => {
    if (student.id) {
      axios.put(`http://localhost:3000/students/${student.id}`, { name, age, grade })
        .then(() => navigation.goBack());
    } else {
      axios.post('http://localhost:3000/students', { name, age, grade })
        .then(() => navigation.goBack());
    }
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <TextInput value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <TextInput value={grade} onChangeText={setGrade} placeholder="Grade" />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default AddEditScreen;
