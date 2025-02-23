import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
import { database } from '../firebase';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    const reference = database.ref('/students');
    reference.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentArray);
      } else {
        setStudents([]);
      }
    });
    return () => reference.off();
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudents();  // Refresh student list when returning
    }, [])
  );

  const deleteStudent = (id) => {
    database.ref(`/students/${id}`).remove()
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch((error) => {
        alert("Error deleting student: " + error.message);
      });
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000080" />

      {/* Add Student Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Students')}>
        <Text style={styles.txtBtn}>Add Student</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerCell]}>Name</Text>
          <Text style={[styles.cell, styles.headerCell]}>Age</Text>
          <Text style={[styles.cell, styles.headerCell]}>Grade</Text>
          <Text style={[styles.cell, styles.headerCell]}>Edit</Text>
          <Text style={[styles.cell, styles.headerCell]}>Delete</Text>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.age}</Text>
              <Text style={styles.cell}>{item.grade}</Text>

              {/* Edit Button */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('Edit Students', { student: item })} 
                style={styles.editButton}
              >
                <Icon name="edit-2" size={22} color="#00ff00" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => deleteStudent(item.id)} style={styles.deleteButton}>
                <Icon name="trash-2" size={22} color="red" />
              </TouchableOpacity>
            </View>
          )}
          
        />
      </View>

      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 16,
    alignItems: 'center',
  },
  table: {
    marginTop: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFA500',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'black',
  },
  cell: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'stretch',
    
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
  editButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'stretch',
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'stretch',
  },
});
